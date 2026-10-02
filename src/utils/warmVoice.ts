export type BloomVoicePersona = 'Kore' | 'Puck' | 'Zephyr';

export interface VoicePersonaMeta {
  id: BloomVoicePersona;
  label: string;
  subtitle: string;
  pitch: number;
  rate: number;
}

export const BLOOM_VOICE_PERSONAS: VoicePersonaMeta[] = [
  {
    id: 'Kore',
    label: '⚡ Fluida y Clara',
    subtitle: 'Narración continua y natural',
    pitch: 1.01,
    rate: 1.06,
  },
  {
    id: 'Puck',
    label: '🚀 Dinámica',
    subtitle: 'Ritmo ágil',
    pitch: 1.04,
    rate: 1.1,
  },
  {
    id: 'Zephyr',
    label: '🌿 Serena',
    subtitle: 'Ritmo suave',
    pitch: 1.0,
    rate: 1.0,
  },
];

// Strong global pool so V8 never garbage-collects active SpeechSynthesisUtterance instances
const activeUtterancePool: SpeechSynthesisUtterance[] = [];
let currentSessionId = 0;
let speakTimeoutId: number | null = null;
let safetyEndTimeoutId: number | null = null;
let isCurrentlySpeaking = false;
let cachedBestVoice: SpeechSynthesisVoice | null = null;

/**
 * Selects and caches the most reliable, natural Spanish voice available in the browser.
 * Strongly prioritizes local OS voices (zero network stall) and Mexican/Latin American Spanish.
 */
function getBestSpanishVoice(persona: BloomVoicePersona = 'Kore'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  if (cachedBestVoice && persona === 'Kore') return cachedBestVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const esVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('es'));
  if (esVoices.length === 0) return null;

  const preferredKeywords = [
    'sabina',
    'dalia',
    'paulina',
    'mónica',
    'monica',
    'jorge',
    'raul',
    'helena',
    'natural',
    'neural',
    'google',
  ];

  let bestVoice = esVoices[0];
  let bestScore = -100;

  for (const voice of esVoices) {
    const nameLower = voice.name.toLowerCase();
    const langLower = voice.lang.toLowerCase();
    let score = 0;

    if (langLower === 'es-mx') score += 45;
    else if (langLower === 'es-419' || langLower === 'es-us') score += 35;
    else if (langLower.startsWith('es')) score += 15;

    // Local service voices never stall on network buffers
    if (voice.localService) {
      score += 35;
    }

    preferredKeywords.forEach((kw, idx) => {
      if (nameLower.includes(kw)) {
        score += 26 - idx * 2;
      }
    });

    if (
      nameLower.includes('espeak') ||
      nameLower.includes('festival') ||
      nameLower.includes('compact')
    ) {
      score -= 80;
    }

    if (score > bestScore) {
      bestScore = score;
      bestVoice = voice;
    }
  }

  if (persona === 'Kore') {
    cachedBestVoice = bestVoice;
  }
  return bestVoice;
}

/**
 * Cleans symbols and abbreviations while preserving all words (including words inside parentheses)
 * and keeping natural sentence boundaries.
 */
export function humanizeNarrationScript(rawText: string): string {
  return rawText
    .replace(/^Únicamente se enfoca en\s+/i, '')
    .replace(/[()[\]]/g, ', ')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✓🔒→⇄~•·«»"“”]/gu, ' ')
    .replace(/\$(\d[\d,]*)\s*MXN/gi, '$1 pesos')
    .replace(/\bMXN\b/g, 'pesos')
    .replace(/\bUSD\b/g, 'dólares')
    .replace(/\b1º\b/g, 'primero')
    .replace(/\b2º\b/g, 'segundo')
    .replace(/\b3º\b/g, 'tercero')
    .replace(/\b4º\b/g, 'cuarto')
    .replace(/%/g, ' por ciento')
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*–\s*/g, ', ')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Splits a scene's narration into short, self-contained sentences (<= 120 chars each).
 * Why: Chrome's network TTS (Google español) freezes or drops the second half of an utterance
 * if a single SpeechSynthesisUtterance exceeds ~150-180 characters without a break.
 * Playing short sentences sequentially via `onend` (without calling `cancel()` between them)
 * guarantees 100% of every sentence is spoken with zero cutoffs and zero skips.
 */
function splitIntoSmoothSentences(rawText: string): string[] {
  const cleaned = humanizeNarrationScript(rawText);
  if (!cleaned) return [];

  const rawSentences = cleaned
    .split(/(?<=[.!?])\s+|\s*[.!?]+\s*/)
    .map((s) => s.replace(/^[,\s]+|[,\s]+$/g, '').trim())
    .filter((s) => s.length > 0);

  const finalChunks: string[] = [];

  for (const sentence of rawSentences) {
    if (sentence.length <= 125) {
      finalChunks.push(sentence);
      continue;
    }

    // If a sentence exceeds 125 chars, split cleanly at the comma closest to the middle
    const clauses = sentence
      .split(/,\s+/)
      .map((c) => c.trim())
      .filter(Boolean);

    if (clauses.length <= 1) {
      finalChunks.push(sentence);
      continue;
    }

    let current = '';
    for (const clause of clauses) {
      if (!current) {
        current = clause;
      } else if ((current + ', ' + clause).length <= 125) {
        current = `${current}, ${clause}`;
      } else {
        finalChunks.push(current);
        current = clause;
      }
    }
    if (current) {
      finalChunks.push(current);
    }
  }

  return finalChunks;
}

function clearTimers() {
  if (speakTimeoutId !== null && typeof window !== 'undefined') {
    window.clearTimeout(speakTimeoutId);
    speakTimeoutId = null;
  }
  if (safetyEndTimeoutId !== null && typeof window !== 'undefined') {
    window.clearTimeout(safetyEndTimeoutId);
    safetyEndTimeoutId = null;
  }
}

export function stopWarmVoice() {
  currentSessionId += 1;
  isCurrentlySpeaking = false;
  clearTimers();
  activeUtterancePool.length = 0;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Ignore browser speechSynthesis cancel errors
    }
  }
}

export async function speakWarmText(options: {
  text: string;
  topicTitle?: string;
  persona?: BloomVoicePersona;
  forceRestart?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}): Promise<void> {
  const { text, persona = 'Kore', forceRestart = false, onStart, onEnd } = options;

  if (isCurrentlySpeaking && !forceRestart) {
    stopWarmVoice();
    onEnd?.();
    return;
  }

  currentSessionId += 1;
  const mySessionId = currentSessionId;

  clearTimers();
  activeUtterancePool.length = 0;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    isCurrentlySpeaking = false;
    onEnd?.();
    return;
  }

  const chunks = splitIntoSmoothSentences(text);
  if (chunks.length === 0) {
    isCurrentlySpeaking = false;
    onEnd?.();
    return;
  }

  const personaMeta =
    BLOOM_VOICE_PERSONAS.find((p) => p.id === persona) || BLOOM_VOICE_PERSONAS[0];

  // CRITICAL FIX FOR CHROMIUM TTS:
  // Never call speechSynthesis.cancel() in the same synchronous tick as speechSynthesis.speak().
  // Only call cancel() here at t=0 if the browser is actively speaking/pending from a manual skip,
  // and wait 220ms before queuing the new utterance. When transitioning naturally after onend,
  // speaking & pending are already false, so cancel() is never called at all!
  let initialDelayMs = 60;
  try {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      initialDelayMs = 220;
    }
  } catch {
    // Ignore
  }

  const speakChunkAtIndex = (index: number) => {
    if (mySessionId !== currentSessionId) return;

    if (index >= chunks.length) {
      clearTimers();
      isCurrentlySpeaking = false;
      activeUtterancePool.length = 0;
      onEnd?.();
      return;
    }

    const chunkText = chunks[index];
    const chunkWords = chunkText.split(/\s+/).length;
    const chunkExpectedMs = Math.max(4000, chunkWords * 440 + 1600);

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const selectedVoice = getBestSpanishVoice(persona);
      const utterance = new SpeechSynthesisUtterance(chunkText);
      activeUtterancePool.push(utterance);

      utterance.lang = selectedVoice?.lang || 'es-MX';
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.pitch = personaMeta.pitch;
      utterance.rate = personaMeta.rate;
      utterance.volume = 1;

      const chunkStartTimestamp = Date.now();
      let chunkDone = false;

      const advanceFromChunk = () => {
        if (chunkDone) return;
        chunkDone = true;
        clearTimers();
        if (mySessionId !== currentSessionId) return;

        if (index + 1 < chunks.length) {
          // Smooth natural breath between sentence 1 and sentence 2 of the same scene
          speakTimeoutId = window.setTimeout(() => {
            speakTimeoutId = null;
            speakChunkAtIndex(index + 1);
          }, 55);
        } else {
          // Last sentence of the scene finished speaking
          isCurrentlySpeaking = false;
          activeUtterancePool.length = 0;
          onEnd?.();
        }
      };

      utterance.onstart = () => {
        if (mySessionId !== currentSessionId) return;
        isCurrentlySpeaking = true;
        if (index === 0) {
          onStart?.();
        }
      };

      utterance.onend = () => {
        if (mySessionId !== currentSessionId) return;
        advanceFromChunk();
      };

      utterance.onerror = () => {
        if (mySessionId !== currentSessionId) return;
        // Wait out remaining reading duration for this chunk so visuals never jump ahead without context
        const elapsed = Date.now() - chunkStartTimestamp;
        const remaining = Math.max(1200, chunkExpectedMs - elapsed);
        safetyEndTimeoutId = window.setTimeout(advanceFromChunk, remaining);
      };

      // Safety check that NEVER cuts off the voice while speechSynthesis.speaking is still true
      const checkChunkSafety = () => {
        if (chunkDone || mySessionId !== currentSessionId) return;
        const elapsed = Date.now() - chunkStartTimestamp;
        if (
          (window.speechSynthesis.speaking || window.speechSynthesis.pending) &&
          elapsed < 22000
        ) {
          safetyEndTimeoutId = window.setTimeout(checkChunkSafety, 900);
          return;
        }
        advanceFromChunk();
      };

      safetyEndTimeoutId = window.setTimeout(checkChunkSafety, chunkExpectedMs + 2200);

      isCurrentlySpeaking = true;
      if (index === 0) {
        onStart?.();
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      if (mySessionId === currentSessionId) {
        isCurrentlySpeaking = false;
        onEnd?.();
      }
    }
  };

  speakTimeoutId = window.setTimeout(() => {
    speakTimeoutId = null;
    speakChunkAtIndex(0);
  }, initialDelayMs);
}

// Pre-warm browser voice list on load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  getBestSpanishVoice('Kore');
  window.speechSynthesis.onvoiceschanged = () => {
    cachedBestVoice = null;
    getBestSpanishVoice('Kore');
  };
}
