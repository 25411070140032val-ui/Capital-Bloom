import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type BloomEmoteServerId =
  | 'none'
  | 'six_seven'
  | 'floss_dance'
  | 'handsome_fox'
  | 'phonk_face'
  | 'clown_dance'
  | 'russian_dance';

export interface OnlineCommunityMember {
  id: string;
  username: string;
  displayName: string;
  email: string;
  passwordHash: string;
  financialGoal: string;
  completedLessonsCount: number;
  completedLessonKeys: string[];
  completedBiomeIds: number[];
  currentBiomeId: number;
  currentBiomeName: string;
  streakDays: number;
  resilienceXP: number;
  protectedCapitalMXN: number;
  achievementsCount: number;
  plumage: 'emerald' | 'orchid' | 'oasis' | 'desert';
  equippedSkin: 'none' | 'shirt' | 'hoodie' | 'astral_jacket' | 'diamond_armor';
  shirtColor: 'black' | 'magenta' | 'aqua' | 'white';
  hoodieVariant: 'cyber_quetzal' | 'nebula_split' | 'solar_obsidian' | 'arctic_holo';
  jacketVariant: 'aurora_gold' | 'crimson_summit' | 'emerald_guardian';
  armorVariant: 'diamond' | 'emerald' | 'gold' | 'obsidian';
  activeEmote: BloomEmoteServerId;
  cheersReceived: number;
  lastActiveISO: string;
  recentMilestone: string;
}

export interface CommunityFeedEvent {
  id: string;
  userId: string;
  displayName: string;
  plumage: 'emerald' | 'orchid' | 'oasis' | 'desert';
  equippedSkin: 'none' | 'shirt' | 'hoodie' | 'astral_jacket' | 'diamond_armor';
  activeEmote: BloomEmoteServerId;
  actionText: string;
  biomeBadge: string;
  timestampISO: string;
  cheers: number;
}

export type MinigameId = 'nectar_flight' | 'sprint_503020' | 'shield_radar';

export interface OnlineMinigameScore {
  id: string;
  gameId: MinigameId;
  userId: string;
  displayName: string;
  plumage: 'emerald' | 'orchid' | 'oasis' | 'desert';
  equippedSkin: 'none' | 'shirt' | 'hoodie' | 'astral_jacket' | 'diamond_armor';
  activeEmote: BloomEmoteServerId;
  score: number;
  quizStreakBonus: boolean;
  durationSec: number;
  timestampISO: string;
}

interface CommunityStoreData {
  members: OnlineCommunityMember[];
  feed: CommunityFeedEvent[];
  minigameScores: OnlineMinigameScore[];
}

const DATA_FILE_PATH = path.join(__dirname, '.community-progress.json');

const LEGACY_BOT_USER_IDS = new Set([
  'usr_sofia_01',
  'usr_mateo_02',
  'usr_camila_03',
  'usr_diego_04',
  'usr_ximena_05',
  'usr_emilio_06',
]);

function hashPassword(raw: string): string {
  return crypto.createHash('sha256').update(`cb_salt_${raw}`).digest('hex');
}

function loadCommunityStore(): CommunityStoreData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as CommunityStoreData;
      if (Array.isArray(parsed.members) && Array.isArray(parsed.feed)) {
        return {
          members: parsed.members.filter((m) => !LEGACY_BOT_USER_IDS.has(m.id)),
          feed: parsed.feed.filter((f) => !LEGACY_BOT_USER_IDS.has(f.userId)),
          minigameScores: Array.isArray(parsed.minigameScores)
            ? parsed.minigameScores.filter((s) => !LEGACY_BOT_USER_IDS.has(s.userId))
            : [],
        };
      }
    }
  } catch (err) {
    console.error('Error reading community store:', err);
  }
  // Starts completely clean without any simulated bots
  return {
    members: [],
    feed: [],
    minigameScores: [],
  };
}

function saveCommunityStore(store: CommunityStoreData): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving community store:', err);
  }
}

function sanitizeMember(m: OnlineCommunityMember) {
  const { passwordHash: _omitted, ...publicMember } = m;
  return publicMember;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const communityStore = loadCommunityStore();

  // Connected SSE clients for real-time online minigame updates
  const sseClients = new Set<express.Response>();

  const broadcastMinigameEvent = (eventType: string, payload: unknown) => {
    const message = `event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`;
    for (const client of sseClients) {
      try {
        client.write(message);
      } catch {
        sseClients.delete(client);
      }
    }
  };

  app.use(express.json({ limit: '2mb' }));

  // 1. GET /api/community/overview -> Returns real online leaderboard and live progress feed
  app.get('/api/community/overview', (_req, res) => {
    const sortedMembers = [...communityStore.members]
      .sort((a, b) => {
        if (b.completedLessonsCount !== a.completedLessonsCount) {
          return b.completedLessonsCount - a.completedLessonsCount;
        }
        return b.resilienceXP - a.resilienceXP;
      })
      .map(sanitizeMember);

    return res.json({
      members: sortedMembers,
      feed: communityStore.feed.slice(0, 20),
    });
  });

  // 2. POST /api/community/auth -> Login or Register a real user account and sync their progress
  app.post('/api/community/auth', (req, res) => {
    const {
      mode = 'login',
      emailOrUsername = '',
      password = '',
      displayName = '',
      financialGoal = '',
      progress,
    } = req.body as {
      mode?: 'login' | 'register';
      emailOrUsername?: string;
      password?: string;
      displayName?: string;
      financialGoal?: string;
      progress?: Partial<OnlineCommunityMember>;
    };

    const cleanIdentifier = String(emailOrUsername).trim().toLowerCase();
    const cleanPass = String(password).trim();

    if (!cleanIdentifier || cleanPass.length < 3) {
      return res.status(400).json({
        error: 'Ingresa un usuario/correo válido y una contraseña de al menos 3 caracteres.',
      });
    }

    const passHash = hashPassword(cleanPass);
    const existing = communityStore.members.find(
      (m) =>
        m.email.toLowerCase() === cleanIdentifier ||
        m.username.toLowerCase() === cleanIdentifier
    );

    if (mode === 'login') {
      if (!existing) {
        return res.status(404).json({
          error: 'No encontramos esa cuenta. Cambia a "Crear Cuenta" para registrarte.',
        });
      }
      if (existing.passwordHash !== passHash) {
        return res.status(401).json({
          error: 'Contraseña incorrecta. Verifica tus datos e inténtalo de nuevo.',
        });
      }

      if (progress && Array.isArray(progress.completedLessonKeys)) {
        const mergedLessons = Array.from(
          new Set([...existing.completedLessonKeys, ...progress.completedLessonKeys])
        );
        existing.completedLessonKeys = mergedLessons;
        existing.completedLessonsCount = mergedLessons.length;
        existing.resilienceXP = Math.max(existing.resilienceXP, progress.resilienceXP ?? 420);
        existing.streakDays = Math.max(existing.streakDays, progress.streakDays ?? 1);
        existing.protectedCapitalMXN = Math.max(
          existing.protectedCapitalMXN,
          progress.protectedCapitalMXN ?? 1680
        );
        if (progress.plumage) existing.plumage = progress.plumage;
        if (progress.equippedSkin) existing.equippedSkin = progress.equippedSkin;
        if (progress.activeEmote) existing.activeEmote = progress.activeEmote;
      }
      existing.lastActiveISO = new Date().toISOString();
      saveCommunityStore(communityStore);

      return res.json({
        user: sanitizeMember(existing),
      });
    }

    if (existing) {
      return res.status(409).json({
        error: 'Ese usuario o correo ya está registrado. Usa "Iniciar Sesión".',
      });
    }

    const safeUsername =
      cleanIdentifier
        .split('@')[0]
        .replace(/[^a-z0-9_]/g, '_')
        .slice(0, 24) || `explorador_${Date.now().toString().slice(-4)}`;
    const safeDisplayName = String(displayName).trim().slice(0, 40) || safeUsername;
    const safeGoal =
      String(financialGoal).trim().slice(0, 120) ||
      'Completando las 84 lecciones de Capital Bloom y fortaleciendo mi futuro financiero';

    const lessonKeys = Array.isArray(progress?.completedLessonKeys)
      ? progress.completedLessonKeys
      : [];

    const newMember: OnlineCommunityMember = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      username: safeUsername,
      displayName: safeDisplayName,
      email: cleanIdentifier.includes('@') ? cleanIdentifier : `${safeUsername}@capitalbloom.mx`,
      passwordHash: passHash,
      financialGoal: safeGoal,
      completedLessonsCount: lessonKeys.length,
      completedLessonKeys: lessonKeys,
      completedBiomeIds: Array.isArray(progress?.completedBiomeIds)
        ? progress.completedBiomeIds
        : [],
      currentBiomeId: progress?.currentBiomeId || 1,
      currentBiomeName:
        progress?.currentBiomeName || 'Selva Lacandona del Valor del Dinero',
      streakDays: Math.max(1, progress?.streakDays || 1),
      resilienceXP: Math.max(420, progress?.resilienceXP || 420),
      protectedCapitalMXN: Math.max(1680, progress?.protectedCapitalMXN || 1680),
      achievementsCount: progress?.achievementsCount || 0,
      plumage: progress?.plumage || 'emerald',
      equippedSkin: progress?.equippedSkin || 'none',
      shirtColor: progress?.shirtColor || 'black',
      hoodieVariant: progress?.hoodieVariant || 'cyber_quetzal',
      jacketVariant: progress?.jacketVariant || 'aurora_gold',
      armorVariant: progress?.armorVariant || 'diamond',
      activeEmote: progress?.activeEmote || 'none',
      cheersReceived: 0,
      lastActiveISO: new Date().toISOString(),
      recentMilestone:
        lessonKeys.length > 0
          ? `Inició sesión con ${lessonKeys.length} lecciones completadas`
          : 'Creó su cuenta e inició su ruta en Capital Bloom',
    };

    communityStore.members.push(newMember);
    communityStore.feed.unshift({
      id: `evt_${Date.now()}`,
      userId: newMember.id,
      displayName: newMember.displayName,
      plumage: newMember.plumage,
      equippedSkin: newMember.equippedSkin,
      activeEmote: newMember.activeEmote,
      actionText: newMember.recentMilestone,
      biomeBadge: `Bioma ${String(newMember.currentBiomeId).padStart(2, '0')} · ${newMember.completedLessonsCount}/84 Lecciones`,
      timestampISO: new Date().toISOString(),
      cheers: 0,
    });
    saveCommunityStore(communityStore);

    return res.json({
      user: sanitizeMember(newMember),
    });
  });

  // 3. POST /api/community/sync -> Syncs the logged-in user's progress & posts new milestones to the feed
  app.post('/api/community/sync', (req, res) => {
    const { userId, progress, milestoneAnnouncement } = req.body as {
      userId?: string;
      progress?: Partial<OnlineCommunityMember>;
      milestoneAnnouncement?: string;
    };

    if (!userId || !progress) {
      return res.status(400).json({ error: 'Missing userId or progress' });
    }

    const member = communityStore.members.find((m) => m.id === userId);
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (Array.isArray(progress.completedLessonKeys)) {
      member.completedLessonKeys = progress.completedLessonKeys;
      member.completedLessonsCount = progress.completedLessonKeys.length;
    }
    if (Array.isArray(progress.completedBiomeIds)) {
      member.completedBiomeIds = progress.completedBiomeIds;
    }
    if (typeof progress.currentBiomeId === 'number') {
      member.currentBiomeId = progress.currentBiomeId;
    }
    if (typeof progress.currentBiomeName === 'string') {
      member.currentBiomeName = progress.currentBiomeName;
    }
    if (typeof progress.streakDays === 'number') {
      member.streakDays = progress.streakDays;
    }
    if (typeof progress.resilienceXP === 'number') {
      member.resilienceXP = progress.resilienceXP;
    }
    if (typeof progress.protectedCapitalMXN === 'number') {
      member.protectedCapitalMXN = progress.protectedCapitalMXN;
    }
    if (typeof progress.achievementsCount === 'number') {
      member.achievementsCount = progress.achievementsCount;
    }
    if (typeof progress.financialGoal === 'string' && progress.financialGoal.trim()) {
      member.financialGoal = progress.financialGoal.trim().slice(0, 120);
    }
    if (progress.plumage) member.plumage = progress.plumage;
    if (progress.equippedSkin) member.equippedSkin = progress.equippedSkin;
    if (progress.shirtColor) member.shirtColor = progress.shirtColor;
    if (progress.hoodieVariant) member.hoodieVariant = progress.hoodieVariant;
    if (progress.jacketVariant) member.jacketVariant = progress.jacketVariant;
    if (progress.armorVariant) member.armorVariant = progress.armorVariant;
    if (progress.activeEmote) member.activeEmote = progress.activeEmote;

    member.lastActiveISO = new Date().toISOString();

    if (milestoneAnnouncement && milestoneAnnouncement.trim()) {
      member.recentMilestone = milestoneAnnouncement.trim();
      communityStore.feed.unshift({
        id: `evt_${Date.now()}`,
        userId: member.id,
        displayName: member.displayName,
        plumage: member.plumage,
        equippedSkin: member.equippedSkin,
        activeEmote: member.activeEmote,
        actionText: milestoneAnnouncement.trim(),
        biomeBadge: `Bioma ${String(member.currentBiomeId).padStart(2, '0')} · ${member.completedLessonsCount}/84 Lecciones`,
        timestampISO: new Date().toISOString(),
        cheers: 0,
      });
      communityStore.feed = communityStore.feed.slice(0, 30);
    }

    saveCommunityStore(communityStore);

    return res.json({
      user: sanitizeMember(member),
    });
  });

  // 4. POST /api/community/cheer -> Send motivational applause ("¡Impulsar!") to another user or feed event
  app.post('/api/community/cheer', (req, res) => {
    const { targetUserId, eventId } = req.body as {
      targetUserId?: string;
      eventId?: string;
    };

    if (targetUserId) {
      const target = communityStore.members.find((m) => m.id === targetUserId);
      if (target) {
        target.cheersReceived = (target.cheersReceived || 0) + 1;
      }
    }
    if (eventId) {
      const evt = communityStore.feed.find((e) => e.id === eventId);
      if (evt) {
        evt.cheers = (evt.cheers || 0) + 1;
      }
    }

    saveCommunityStore(communityStore);
    return res.json({ ok: true });
  });

  // 5. GET /api/minigames/overview -> Returns real online minigame leaderboards and active connection count
  app.get('/api/minigames/overview', (_req, res) => {
    const sortedScores = [...communityStore.minigameScores].sort(
      (a, b) => b.score - a.score
    );
    return res.json({
      scores: sortedScores,
      onlineConnections: Math.max(1, sseClients.size),
    });
  });

  // 6. GET /api/minigames/stream -> Real-time Server-Sent Events stream for live minigame score updates
  app.get('/api/minigames/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    sseClients.add(res);

    const sortedScores = [...communityStore.minigameScores].sort(
      (a, b) => b.score - a.score
    );
    res.write(
      `event: init\ndata: ${JSON.stringify({
        scores: sortedScores,
        onlineConnections: Math.max(1, sseClients.size),
      })}\n\n`
    );

    req.on('close', () => {
      sseClients.delete(res);
    });
  });

  // 7. POST /api/minigames/submit -> Submit a finished online minigame score & broadcast to connected players
  app.post('/api/minigames/submit', (req, res) => {
    const {
      gameId,
      userId = 'guest_explorer',
      displayName = 'Explorador Bloom',
      plumage = 'emerald',
      equippedSkin = 'none',
      activeEmote = 'none',
      score = 0,
      quizStreakBonus = false,
      durationSec = 30,
    } = req.body as Partial<OnlineMinigameScore>;

    if (!gameId || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid minigame score payload' });
    }

    const gameNames: Record<MinigameId, string> = {
      nectar_flight: 'Vuelo de Néctar CETES',
      sprint_503020: 'Sprint 50/30/20',
      shield_radar: 'Escudo Antifraude',
    };

    const existingIdx = communityStore.minigameScores.findIndex(
      (s) =>
        s.gameId === gameId &&
        (s.userId === userId || s.displayName.toLowerCase() === displayName.toLowerCase())
    );

    const entry: OnlineMinigameScore = {
      id: `mg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      gameId,
      userId,
      displayName: String(displayName).slice(0, 36),
      plumage,
      equippedSkin,
      activeEmote,
      score: Math.max(
        score,
        existingIdx >= 0 ? communityStore.minigameScores[existingIdx].score : 0
      ),
      quizStreakBonus: Boolean(quizStreakBonus),
      durationSec,
      timestampISO: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      communityStore.minigameScores[existingIdx] = entry;
    } else {
      communityStore.minigameScores.push(entry);
    }

    if (userId !== 'guest_local') {
      communityStore.feed.unshift({
        id: `evt_${Date.now()}`,
        userId,
        displayName: entry.displayName,
        plumage,
        equippedSkin,
        activeEmote,
        actionText: `logró ${score} pts en el minijuego online «${gameNames[gameId]}»`,
        biomeBadge: `Minijuego Online · ${durationSec}s`,
        timestampISO: new Date().toISOString(),
        cheers: 0,
      });
      communityStore.feed = communityStore.feed.slice(0, 30);
    }

    saveCommunityStore(communityStore);

    const sortedScores = [...communityStore.minigameScores].sort(
      (a, b) => b.score - a.score
    );

    broadcastMinigameEvent('score:updated', {
      latestEntry: entry,
      scores: sortedScores,
    });

    return res.json({
      entry,
      scores: sortedScores,
    });
  });

  // Server-side Warm Text-to-Speech endpoint using Gemini TTS
  app.post('/api/tts', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: 'GEMINI_API_KEY not configured' });
      }

      const { text, voiceName = 'Kore', stylePrompt } = req.body as {
        text?: string;
        voiceName?: 'Kore' | 'Puck' | 'Zephyr';
        stylePrompt?: string;
      };

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing text parameter' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const warmStyle =
        stylePrompt ||
        'Warm, friendly, enthusiastic, and encouraging Mexican Spanish mentor speaking naturally with a smile';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: text.slice(0, 1400),
                speechMetadata: {
                  style: warmStyle,
                },
              } as Record<string, unknown>,
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: ['Kore', 'Puck', 'Zephyr'].includes(voiceName) ? voiceName : 'Kore',
              },
            },
          },
        },
      });

      const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      if (!inlineData?.data) {
        return res.status(502).json({ error: 'No audio returned from model' });
      }

      return res.json({
        audioBase64: inlineData.data,
        mimeType: inlineData.mimeType || 'audio/wav',
      });
    } catch (error) {
      console.error('TTS error:', error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Error generating warm voice audio',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Capital Bloom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
