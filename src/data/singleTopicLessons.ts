import { BiomeModule } from './biomesData';

export interface SingleTopicSubLessonMeta {
  lessonNumber: 1 | 2 | 3 | 4 | 5 | 6;
  topicTitle: string; // El único tema que abarca esta lección
  topicFocusSummary: string; // Explicación breve de que solo aborda este subtema
  interactiveBadge: string;
}

/**
 * Cada uno de los 14 Biomas divide su contenido en 6 Lecciones donde CADA LECCIÓN
 * abarca ÚNICAMENTE UN TEMA específico de principio a fin (sin mezclar otros subtemas).
 */
export const BIOME_SINGLE_TOPIC_META: Record<number, SingleTopicSubLessonMeta[]> = {
  1: [
    {
      lessonNumber: 1,
      topicTitle: 'La historia del dinero y el trueque',
      topicFocusSummary:
        'Únicamente se enfoca en el origen del trueque y cómo evolucionó el dinero a lo largo de la historia (del cacao y metales a billetes y dinero digital).',
      interactiveBadge: 'Historia y Evolución',
    },
    {
      lessonNumber: 2,
      topicTitle: 'El valor del dinero fiduciario y Banxico',
      topicFocusSummary:
        'Únicamente se enfoca en por qué los billetes y monedas actuales tienen valor y cómo los respalda el Banco de México.',
      interactiveBadge: 'Respaldo Monetario',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Los 3 sectores productivos de México',
      topicFocusSummary:
        'Únicamente se enfoca en cómo se divide la producción en México: Sector Primario (campo), Secundario (industria) y Terciario (servicios).',
      interactiveBadge: 'Sectores del PIB',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Economía formal vs. economía informal',
      topicFocusSummary:
        'Únicamente se enfoca en las diferencias entre trabajar en la formalidad (con seguro e historial) frente a la informalidad.',
      interactiveBadge: 'Formalidad Laboral',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Cómo tus habilidades generan ingresos',
      topicFocusSummary:
        'Únicamente se enfoca en cómo resolver problemas reales con tus habilidades determina cuánto dinero ganas por tu tiempo.',
      interactiveBadge: 'Generación de Ingresos',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Impuestos básicos y el régimen RESICO',
      topicFocusSummary:
        'Únicamente se enfoca en cómo funcionan los primeros impuestos al ganar dinero y las tasas bajas del Régimen Simplificado de Confianza.',
      interactiveBadge: 'Cultura Fiscal',
    },
  ],
  2: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es el Costo de Oportunidad',
      topicFocusSummary:
        'Únicamente se enfoca en entender qué es el costo de oportunidad: aquello a lo que renuncias cada vez que eliges gastar.',
      interactiveBadge: 'Concepto Único',
    },
    {
      lessonNumber: 2,
      topicTitle: 'El cerebro ante las compras por impulso',
      topicFocusSummary:
        'Únicamente se enfoca en cómo reacciona la dopamina ante las ofertas frente a la corteza prefrontal que planea el futuro.',
      interactiveBadge: 'Neurofinanzas',
    },
    {
      lessonNumber: 3,
      topicTitle: 'La trampa de las monedas virtuales y micropagos',
      topicFocusSummary:
        'Únicamente se enfoca en cómo las gemas, diamantes y pagos con 1 clic disfrazan el precio real en pesos.',
      interactiveBadge: 'Psicología Digital',
    },
    {
      lessonNumber: 4,
      topicTitle: 'La Regla de las 72 Horas',
      topicFocusSummary:
        'Únicamente se enfoca en cómo aplicar paso a paso la pausa de 3 días (72 horas) para enfriar cualquier impulso de compra.',
      interactiveBadge: 'Protocolo 72h',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Convertir precios a horas de tu vida',
      topicFocusSummary:
        'Únicamente se enfoca en calcular cuántas horas reales de tu esfuerzo cuesta cualquier producto antes de pagarlo.',
      interactiveBadge: 'Valor del Tiempo',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo vencer la presión social (FOMO)',
      topicFocusSummary:
        'Únicamente se enfoca en identificar y frenar el miedo a quedarse fuera (FOMO) cuando todos compran por moda.',
      interactiveBadge: 'Decisión Autónoma',
    },
  ],
  3: [
    {
      lessonNumber: 1,
      topicTitle: 'Por qué falla ahorrar sin un objetivo claro',
      topicFocusSummary:
        'Únicamente se enfoca en entender la contabilidad mental y por qué el dinero sin etiqueta se gasta en el primer antojo.',
      interactiveBadge: 'Contabilidad Mental',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Los elementos de una meta SMART',
      topicFocusSummary:
        'Únicamente se enfoca en cómo definir una meta específica, medible, alcanzable y con fecha exacta en el calendario.',
      interactiveBadge: 'Estructura SMART',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Plazos financieros: corto, mediano y largo',
      topicFocusSummary:
        'Únicamente se enfoca en clasificar tus metas según el tiempo: corto (<1 año), mediano (1-3 años) y largo plazo (>3 años).',
      interactiveBadge: 'Horizontes de Tiempo',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Cómo dividir una meta grande en cuotas semanales',
      topicFocusSummary:
        'Únicamente se enfoca en la matemática sencilla de partir una meta grande en pequeños pagos semanales o quincenales.',
      interactiveBadge: 'Fraccionamiento',
    },
    {
      lessonNumber: 5,
      topicTitle: 'El blindaje de tus apartados con nombre',
      topicFocusSummary:
        'Únicamente se enfoca en cómo separar tus metas en apartados etiquetados para no mezclarlas con el gasto diario.',
      interactiveBadge: 'Apartados Blindados',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Seguimiento y constancia de tu meta',
      topicFocusSummary:
        'Únicamente se enfoca en cómo mantener tu racha de ahorro sin vaciar tu apartado a mitad del camino.',
      interactiveBadge: 'Disciplina de Meta',
    },
  ],
  4: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es el flujo de efectivo (Ingresos vs. Egresos)',
      topicFocusSummary:
        'Únicamente se enfoca en entender cómo entra y cómo sale el dinero de tu bolsillo cada mes.',
      interactiveBadge: 'Flujo de Efectivo',
    },
    {
      lessonNumber: 2,
      topicTitle: 'El Gasto Hormiga y su impacto anual',
      topicFocusSummary:
        'Únicamente se enfoca en identificar los pequeños antojos diarios repetitivos y calcular cuánto suman en un año.',
      interactiveBadge: 'Gasto Hormiga',
    },
    {
      lessonNumber: 3,
      topicTitle: 'El Gasto Fantasma: suscripciones olvidadas',
      topicFocusSummary:
        'Únicamente se enfoca en detectar y cancelar cargos automáticos y suscripciones digitales que pagas sin usar.',
      interactiveBadge: 'Gasto Fantasma',
    },
    {
      lessonNumber: 4,
      topicTitle: 'El Gasto Vampiro: comisiones y recargos',
      topicFocusSummary:
        'Únicamente se enfoca en eliminar fugas por envíos urgentes, recargos por pago tardío y comisiones de cajero.',
      interactiveBadge: 'Gasto Vampiro',
    },
    {
      lessonNumber: 5,
      topicTitle: 'La regla "Págate a ti primero"',
      topicFocusSummary:
        'Únicamente se enfoca en el hábito de separar tu ahorro el mismo día que recibes dinero, antes de gastar.',
      interactiveBadge: 'Prioridad de Ahorro',
    },
    {
      lessonNumber: 6,
      topicTitle: 'El método de presupuesto 50 / 30 / 20',
      topicFocusSummary:
        'Únicamente se enfoca en distribuir tu ingreso en 50% necesidades, 30% gustos planeados y 20% ahorro/inversión.',
      interactiveBadge: 'Presupuesto 50/30/20',
    },
  ],
  5: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es el Fondo de Emergencia',
      topicFocusSummary:
        'Únicamente se enfoca en entender para qué sirve un fondo de imprevistos y por qué evita caer en deudas caras.',
      interactiveBadge: 'Escudo Financiero',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Cómo calcular de 3 a 6 meses de gastos básicos',
      topicFocusSummary:
        'Únicamente se enfoca en sumar tus gastos indispensables mensuales para definir el tamaño exacto de tu fondo.',
      interactiveBadge: 'Cálculo del Fondo',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Por qué el dinero bajo el colchón pierde valor',
      topicFocusSummary:
        'Únicamente se enfoca en los riesgos de guardar efectivo físico en casa (inflación, robo o pérdida).',
      interactiveBadge: 'Riesgo del Efectivo',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Riesgos de las tandas frente al ahorro formal',
      topicFocusSummary:
        'Únicamente se enfoca en analizar por qué las tandas informales no dan rendimientos ni tienen garantía legal.',
      interactiveBadge: 'Tandas vs. Formalidad',
    },
    {
      lessonNumber: 5,
      topicTitle: 'El seguro bancario del IPAB (400,000 UDIs)',
      topicFocusSummary:
        'Únicamente se enfoca en cómo el IPAB protege legalmente tus ahorros en bancos regulados en México.',
      interactiveBadge: 'Protección IPAB',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo verificar instituciones en el SIPRES (CONDUSEF)',
      topicFocusSummary:
        'Únicamente se enfoca en consultar el registro oficial SIPRES antes de depositar dinero en cualquier institución.',
      interactiveBadge: 'Registro SIPRES',
    },
  ],
  6: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué son las Cuentas de Custodia para jóvenes',
      topicFocusSummary:
        'Únicamente se enfoca en cómo funcionan las cuentas abiertas con apoyo de madre, padre o tutor para empezar antes de los 18 años.',
      interactiveBadge: 'Cuentas de Custodia',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Cuentas Titulares y requisitos al cumplir 18 años',
      topicFocusSummary:
        'Únicamente se enfoca en qué necesitas (INE, RFC, CLABE) para asumir la titularidad completa de tus cuentas.',
      interactiveBadge: 'Titularidad Plena',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Qué es la GAT Nominal vs. la GAT Real',
      topicFocusSummary:
        'Únicamente se enfoca en leer el indicador oficial GAT Real para saber cuánto ganas después de restar la inflación.',
      interactiveBadge: 'Indicador GAT Real',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Cómo identificar comisiones ocultas y saldos mínimos',
      topicFocusSummary:
        'Únicamente se enfoca en revisar contratos bancarios para elegir cuentas con $0 de comisión por manejo.',
      interactiveBadge: 'Cero Comisiones',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Diferencia entre Bancos y SOFIPOs reguladas',
      topicFocusSummary:
        'Únicamente se enfoca en conocer las Sociedades Financieras Populares (SOFIPOs), su seguro PROSOFIPO y los bancos.',
      interactiveBadge: 'Bancos y SOFIPOs',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo automatizar tu ahorro con transferencias programadas',
      topicFocusSummary:
        'Únicamente se enfoca en configurar cargos automáticos hacia tu cuenta de inversión para ahorrar sin esfuerzo.',
      interactiveBadge: 'Ahorro Automático',
    },
  ],
  7: [
    {
      lessonNumber: 1,
      topicTitle: 'Diferencia entre tarjeta de débito y de crédito',
      topicFocusSummary:
        'Únicamente se enfoca en distinguir cuándo usas tu propio dinero (débito) y cuándo pides prestado al banco (crédito).',
      interactiveBadge: 'Débito vs. Crédito',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Fecha de Corte y Fecha Límite de Pago',
      topicFocusSummary:
        'Únicamente se enfoca en dominar el calendario de 30 días de compra más 20 días para pagar sin intereses.',
      interactiveBadge: 'Fechas del Crédito',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Qué significa ser "Totalero" vs. el Pago Mínimo',
      topicFocusSummary:
        'Únicamente se enfoca en por qué pagar el "Pago para no generar intereses" te da financiamiento al 0% y el pago mínimo te endeuda.',
      interactiveBadge: 'Estrategia Totalera',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Qué es el CAT (Costo Anual Total)',
      topicFocusSummary:
        'Únicamente se enfoca en entender cómo el CAT suma tasa de interés, anualidad y comisiones en un solo porcentaje.',
      interactiveBadge: 'Indicador CAT',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Cómo funciona el Buró de Crédito y el Score',
      topicFocusSummary:
        'Únicamente se enfoca en cómo se construye tu calificación crediticia (de 400 a 850 puntos) al pagar a tiempo.',
      interactiveBadge: 'Buró y Score',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo detectar y evitar apps "Montadeudas"',
      topicFocusSummary:
        'Únicamente se enfoca en identificar préstamos digitales fraudulentos que roban tus contactos y extorsionan.',
      interactiveBadge: 'Prevención de Fraude',
    },
  ],
  8: [
    {
      lessonNumber: 1,
      topicTitle: 'Cómo funciona el sistema SPEI y la clave CLABE',
      topicFocusSummary:
        'Únicamente se enfoca en cómo el Banco de México procesa transferencias interbancarias en segundos con los 18 dígitos CLABE.',
      interactiveBadge: 'Rieles SPEI',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Pagos digitales con Dimo y CoDi',
      topicFocusSummary:
        'Únicamente se enfoca en cómo enviar y recibir dinero sin comisiones usando solo el número de celular o códigos QR.',
      interactiveBadge: 'Dimo y CoDi',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Seguridad en línea: Tarjetas digitales y CVV dinámico',
      topicFocusSummary:
        'Únicamente se enfoca en cómo los códigos de seguridad temporales de 3 dígitos evitan la clonación al comprar en internet.',
      interactiveBadge: 'CVV Dinámico',
    },
    {
      lessonNumber: 4,
      topicTitle: 'El espejismo de "Compra Ahora y Paga Después" (BNPL)',
      topicFocusSummary:
        'Únicamente se enfoca en analizar los pagos fraccionados en quincenas sin tarjeta y sus comisiones ocultas.',
      interactiveBadge: 'Análisis BNPL',
    },
    {
      lessonNumber: 5,
      topicTitle: 'La regla de oro de los Meses Sin Intereses (MSI)',
      topicFocusSummary:
        'Únicamente se enfoca en la regla: la vida útil del producto debe ser mayor al plazo en meses que tardarás en pagarlo.',
      interactiveBadge: 'Regla de los MSI',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo detectar el Phishing y robo de identidad',
      topicFocusSummary:
        'Únicamente se enfoca en reconocer mensajes, enlaces y llamadas falsas que intentan robar tus contraseñas bancarias.',
      interactiveBadge: 'Ciberseguridad',
    },
  ],
  9: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es la Inflación y el INPC',
      topicFocusSummary:
        'Únicamente se enfoca en cómo el aumento generalizado de precios reduce lo que puedes comprar con los mismos billetes.',
      interactiveBadge: 'La Inflación',
    },
    {
      lessonNumber: 2,
      topicTitle: 'La Tasa de Referencia del Banco de México',
      topicFocusSummary:
        'Únicamente se enfoca en cómo Banxico ajusta la tasa de interés para controlar la inflación hacia su meta del 3%.',
      interactiveBadge: 'Política Monetaria',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Interés Simple vs. Interés Compuesto',
      topicFocusSummary:
        'Únicamente se enfoca en la diferencia entre retirar las ganancias o reinvertirlas para ganar intereses sobre intereses.',
      interactiveBadge: 'Interés Compuesto',
    },
    {
      lessonNumber: 4,
      topicTitle: 'El poder del factor Tiempo en tus inversiones',
      topicFocusSummary:
        'Únicamente se enfoca en por qué empezar a invertir joven con poco dinero supera a empezar tarde con mucho dinero.',
      interactiveBadge: 'El Factor Tiempo',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Cómo aplicar la Regla del 72',
      topicFocusSummary:
        'Únicamente se enfoca en dividir 72 entre tu tasa de rendimiento anual para calcular en cuántos años se duplica tu capital.',
      interactiveBadge: 'Regla del 72',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo calcular tu Rendimiento Real neto',
      topicFocusSummary:
        'Únicamente se enfoca en restar la inflación a la tasa nominal de tu inversión para conocer tu ganancia verdadera.',
      interactiveBadge: 'Rendimiento Real',
    },
  ],
  10: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué son los CETES y cómo funcionan',
      topicFocusSummary:
        'Únicamente se enfoca en qué son los Certificados de la Tesorería, su valor nominal de $10 MXN y por qué se compran a descuento.',
      interactiveBadge: '¿Qué es un CETE?',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Qué es Bonddia y la liquidez diaria',
      topicFocusSummary:
        'Únicamente se enfoca en cómo funciona el fondo Bonddia para disponer de tu dinero cualquier día hábil sin penalización.',
      interactiveBadge: 'Liquidez Bonddia',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Los plazos de CETES: 28, 91, 182 y 364 días',
      topicFocusSummary:
        'Únicamente se enfoca en cómo elegir y combinar los distintos plazos de vencimiento según la fecha de tus metas.',
      interactiveBadge: 'Plazos y Escalera',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Cómo funciona la Reinversión Automática en CETES Directo',
      topicFocusSummary:
        'Únicamente se enfoca en activar la reinversión al vencimiento sin pagar comisiones de intermediación.',
      interactiveBadge: 'Reinversión $0',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Qué son los Bonos y Udibonos en CETES Directo',
      topicFocusSummary:
        'Únicamente se enfoca en conocer los instrumentos gubernamentales de largo plazo que pagan intereses cada 6 meses.',
      interactiveBadge: 'Bonos de Largo Plazo',
    },
    {
      lessonNumber: 6,
      topicTitle: 'La tasa de CETES como detector de estafas piramidales',
      topicFocusSummary:
        'Únicamente se enfoca en usar la tasa libre de riesgo de CETES para desenmascarar promesas falsas de dinero rápido.',
      interactiveBadge: 'Detector Anti-Estafas',
    },
  ],
  11: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es el Tipo de Cambio (USD / MXN)',
      topicFocusSummary:
        'Únicamente se enfoca en por qué sube o baja el precio del dólar frente al peso mexicano todos los días.',
      interactiveBadge: 'Tipo de Cambio',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Qué es la Inflación Importada en productos globales',
      topicFocusSummary:
        'Únicamente se enfoca en cómo el tipo de cambio impacta el precio en México de celulares, computadoras e insumos.',
      interactiveBadge: 'Inflación Importada',
    },
    {
      lessonNumber: 3,
      topicTitle: 'El tratado comercial T-MEC y América del Norte',
      topicFocusSummary:
        'Únicamente se enfoca en cómo funciona el comercio entre México, Estados Unidos y Canadá y sus reglas de contenido regional.',
      interactiveBadge: 'Comercio T-MEC',
    },
    {
      lessonNumber: 4,
      topicTitle: 'El fenómeno del Nearshoring en México',
      topicFocusSummary:
        'Únicamente se enfoca en por qué las fábricas globales se mudan a México para reducir tiempos de transporte de 40 a 3 días.',
      interactiveBadge: 'Nearshoring',
    },
    {
      lessonNumber: 5,
      topicTitle: 'El papel de las Remesas en la economía familiar',
      topicFocusSummary:
        'Únicamente se enfoca en cómo los envíos de dinero desde el exterior sostienen el consumo de millones de hogares mexicanos.',
      interactiveBadge: 'Flujo de Remesas',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo evitar comisiones caras al cambiar divisas',
      topicFocusSummary:
        'Únicamente se enfoca en comparar el tipo de cambio interbancario frente a casas de cambio y plataformas reguladas.',
      interactiveBadge: 'Cambio Inteligente',
    },
  ],
  12: [
    {
      lessonNumber: 1,
      topicTitle: 'Diferencia entre Renta Fija y Renta Variable',
      topicFocusSummary:
        'Únicamente se enfoca en comparar prestar dinero a tasa fija (bonos) frente a ser copropietario de empresas (acciones).',
      interactiveBadge: 'Fija vs. Variable',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Qué es una Acción y las bolsas de valores (BMV / BIVA)',
      topicFocusSummary:
        'Únicamente se enfoca en cómo funcionan las bolsas de valores en México y qué significa ser socio de una empresa pública.',
      interactiveBadge: 'Acciones y Bolsas',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Qué es un ETF (Fondo Cotizado en Bolsa)',
      topicFocusSummary:
        'Únicamente se enfoca en cómo un ETF agrupa cientos de empresas (como el S&P 500) dentro de una sola canasta diversificada.',
      interactiveBadge: 'Canastas ETF',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Qué es el SIC (Sistema Internacional de Cotizaciones)',
      topicFocusSummary:
        'Únicamente se enfoca en cómo invertir en empresas y ETFs de todo el mundo en pesos desde México de forma legal.',
      interactiveBadge: 'Mercado Global SIC',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Regulación de las Casas de Bolsa por la CNBV',
      topicFocusSummary:
        'Únicamente se enfoca en verificar que tu intermediario bursátil esté autorizado por la Comisión Nacional Bancaria y de Valores.',
      interactiveBadge: 'Seguridad CNBV',
    },
    {
      lessonNumber: 6,
      topicTitle: 'La estrategia de aportaciones constantes (DCA)',
      topicFocusSummary:
        'Únicamente se enfoca en por qué invertir un monto fijo cada mes vence al intento de adivinar el precio del mercado.',
      interactiveBadge: 'Constancia Bursátil',
    },
  ],
  13: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es una Cobertura Financiera (Hedging)',
      topicFocusSummary:
        'Únicamente se enfoca en el concepto de proteger tu patrimonio contra devaluaciones o subidas de precios.',
      interactiveBadge: 'Concepto Cobertura',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Qué son las UDIs (Unidades de Inversión) de Banxico',
      topicFocusSummary:
        'Únicamente se enfoca en cómo la UDI actualiza su valor todos los días exactamente al ritmo de la inflación en México.',
      interactiveBadge: 'Valor de la UDI',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Cómo blindar metas nacionales con Udibonos',
      topicFocusSummary:
        'Únicamente se enfoca en cómo los Udibonos pagan la inflación acumulada más una tasa de interés real fija.',
      interactiveBadge: 'Escudo Udibonos',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Por qué los billetes de dólar en casa también pierden valor',
      topicFocusSummary:
        'Únicamente se enfoca en entender que las monedas extranjeras también sufren su propia inflación si se dejan sin invertir.',
      interactiveBadge: 'Inflación en Divisas',
    },
    {
      lessonNumber: 5,
      topicTitle: 'Cómo empatar la moneda de tu ahorro con la de tu meta',
      topicFocusSummary:
        'Únicamente se enfoca en ahorrar en pesos/UDIs para metas en México y en activos en USD/EUR para metas en el extranjero.',
      interactiveBadge: 'Moneda de tu Meta',
    },
    {
      lessonNumber: 6,
      topicTitle: 'Cómo evitar comprar divisas en momentos de pánico',
      topicFocusSummary:
        'Únicamente se enfoca en promediar tus compras de cobertura mes a mes en lugar de comprar caro por noticias alarmistas.',
      interactiveBadge: 'Calma Cambiaria',
    },
  ],
  14: [
    {
      lessonNumber: 1,
      topicTitle: 'Qué es la tecnología Blockchain (Cadena de Bloques)',
      topicFocusSummary:
        'Únicamente se enfoca en cómo funciona técnicamente un libro contable distribuido y protegido por criptografía.',
      interactiveBadge: 'Tecnología Blockchain',
    },
    {
      lessonNumber: 2,
      topicTitle: 'Diferencia entre dinero legal (Fiat), tokens y criptoactivos',
      topicFocusSummary:
        'Únicamente se enfoca en por qué los criptoactivos no son moneda de curso legal en México según Banxico y la Ley Fintech.',
      interactiveBadge: 'Marco Legal y Fiat',
    },
    {
      lessonNumber: 3,
      topicTitle: 'Qué es la volatilidad extrema en los criptoactivos',
      topicFocusSummary:
        'Únicamente se enfoca en por qué estos activos pueden caer de 50% a 80% en pocos días y por qué nunca reemplazan al ahorro.',
      interactiveBadge: 'Riesgo de Volatilidad',
    },
    {
      lessonNumber: 4,
      topicTitle: 'Cómo funciona un fraude "Pump and Dump" y las memecoins',
      topicFocusSummary:
        'Únicamente se enfoca en detectar cómo se inflan artificialmente monedas sin valor en redes sociales para estafar a compradores.',
      interactiveBadge: 'Estafas Pump & Dump',
    },
    {
      lessonNumber: 5,
      topicTitle: 'La regla prudencial del tope máximo del 5%',
      topicFocusSummary:
        'Únicamente se enfoca en por qué los gestores de riesgo limitan cualquier activo hipervolátil a menos del 5% del portafolio.',
      interactiveBadge: 'Regla del 5%',
    },
    {
      lessonNumber: 6,
      topicTitle: 'La Pirámide Patrimonial completa de Capital Bloom',
      topicFocusSummary:
        'Únicamente se enfoca en integrar en orden los 4 pisos de tu patrimonio: Liquidez, Renta Fija, Renta Variable y Punta Opcional.',
      interactiveBadge: 'Pirámide Patrimonial',
    },
  ],
};

export function getBiomeSingleTopicLessons(biomeId: number): SingleTopicSubLessonMeta[] {
  return BIOME_SINGLE_TOPIC_META[biomeId] || BIOME_SINGLE_TOPIC_META[1];
}
