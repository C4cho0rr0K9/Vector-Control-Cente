import React, { useState } from "react";

// ─── VECTOR FÍSICO — Programa real sincronizado con HTML ───────────────
const VECTORS = [
  {
    id: "cyber", short: "CYBER", color: "#00f5d4",
    tasks: [
      { id: "c1", label: "Deep Work ofensivo", type: "hours",   target: 40, unit: "h",    note: "5.7h/día. Sin teléfono. Timer en pantalla." },
      { id: "c2", label: "Labs HTB/Portswigger", type: "count",   target: 7,  unit: "labs", note: "Mínimo 1/día." },
      { id: "c3", label: "Write-ups publicados (EN)", type: "count",   target: 3,  unit: "docs", note: "GitHub o blog. Visibles." },
      { id: "c4", label: "Investigación CVE original", type: "hours",   target: 5,  unit: "h",    note: "Busca algo no reportado." },
      { id: "c5", label: "Contribución open source", type: "boolean", target: 1,  unit: "",     note: "PR, issue o script publicado." },
      { id: "c6", label: "Estudio certificación (OSCP/SANS)", type: "hours",   target: 12, unit: "h",    note: "OSCP → OSED → SANS GXPN." },
    ],
  },
  {
    id: "physical", short: "FÍSICO", color: "#ff6b35",
    tasks: [
      { id: "p_lun", label: "LUN — Pecho + Tríceps", type: "count", target: 6, unit: "ejercicios",
        note: "Push-ups 4×12 · Aperturas 3×15 · Press pecho 3×12 · Dips silla 3×12 · Ext. tríceps 3×12 · Cardio 25min." },
      { id: "p_mar", label: "MAR — Espalda + Bíceps", type: "count", target: 5, unit: "ejercicios",
        note: "Remo 1 brazo 4×12 · Remo inclinado 3×15 · Curl bíceps 4×15 · Curl martillo 3×12 · Cardio 20min." },
      { id: "p_jue", label: "JUE — Piernas + Glúteos", type: "count", target: 6, unit: "ejercicios",
        note: "Sentadilla 4×15 · Zancadas 3×12 · Peso muerto rumano 3×12 · Sumo 3×15 · Pantorrillas 4×20 · HIIT 20min." },
      { id: "p_vie", label: "VIE — Hombros + Core", type: "count", target: 6, unit: "ejercicios",
        note: "Press militar 4×12 · Elev. laterales 4×15 · Elev. frontales 3×12 · Plancha 3×45s · Abdominales 4×20 · Cardio 20min." },
      { id: "p_sab", label: "SÁB — Full Body + Cardio", type: "count", target: 5, unit: "ejercicios",
        note: "Burpees 3×10 · Sentadillas salto 3×15 · Montañista 3×20 · Abdominales máquina 3×25 · Caminadora 30min." },
      { id: "p_cardio", label: "Cardio Zona 2 — total semanal", type: "minutes", target: 240, unit: "min",
        note: "25min LUN + 20min MAR + 20min JUE + 20min VIE + 30min SÁB = 115min mín. Meta élite: 240min incluyendo warm-ups." },
      { id: "p_sleep",  label: "Noches 7-8h sueño", type: "count", target: 7, unit: "noches",
        note: "Recuperación neurológica. Sin 7.5h el rendimiento cognitivo cae 30%." },
      { id: "p_nutri",  label: "Días nutrición trackeada", type: "count", target: 7, unit: "días",
        note: "2g proteína/kg mínimo. 175g/día. Registrar calorías." },
      { id: "p_mobil",  label: "Movilidad / recuperación activa", type: "count", target: 2, unit: "ses",
        note: "MIÉ y DOM: 20-30min. Estiramientos, caminata suave." },
    ],
  },
  {
    id: "linguistic", short: "IDIOMAS", color: "#b48eff",
    tasks: [
      { id: "l1", label: "Lectura técnica en inglés", type: "hours", target: 12, unit: "h",      note: "Solo en inglés. Papers, docs, libros." },
      { id: "l2", label: "Outputs escritos técnicos (EN)", type: "count", target: 5,  unit: "docs",  note: "Write-ups, emails, posts." },
      { id: "l3", label: "Speaking técnico", type: "hours", target: 6,  unit: "h",      note: "Shadowing + conversación." },
      { id: "l4", label: "Vocabulario técnico nuevo", type: "count", target: 70, unit: "words",  note: "10 palabras/día con Anki." },
      { id: "l5", label: "Podcasts / videos técnicos (EN)", type: "hours", target: 5,  unit: "h",      note: "SANS, DEF CON, Darknet Diaries." },
    ],
  },
  {
    id: "leverage", short: "MARCA", color: "#ff9f1c",
    tasks: [
      { id: "b1", label: "Post técnico publicado", type: "count",   target: 2, unit: "posts", note: "Blog/LinkedIn/GitHub. En inglés." },
      { id: "b2", label: "Interacciones comunidades élite", type: "count",   target: 10, unit: "int.",  note: "HTB/Twitter/Discord." },
      { id: "b3", label: "Conexiones estratégicas nuevas", type: "count",   target: 3,  unit: "cont.", note: "Personas donde quieres estar." },
      { id: "b4", label: "Bug bounty / CTF internacional", type: "boolean", target: 1,  unit: "",      note: "HackerOne, Bugcrowd, CTFtime." },
      { id: "b5", label: "Portfolio público (horas)", type: "hours",   target: 3,  unit: "h",     note: "GitHub organizado. Tu CV es tu GitHub." },
    ],
  },
  {
    id: "financial", short: "FINANZAS", color: "#ff3860",
    tasks: [
      { id: "f1", label: "Entrevista Banco Pichincha", type: "boolean", target: 1, unit: "",        note: "Primer escalón documentado." },
      { id: "f2", label: "Skills premium mapeados con $", type: "count",   target: 5, unit: "skills", note: "Cloud Sec, Red Team, DFIR, AppSec, AI Sec." },
      { id: "f3", label: "Fuentes de ingreso planificadas", type: "count",   target: 3, unit: "fuentes",note: "Empleo + freelance/bug bounty + contenido." },
      { id: "f4", label: "Research mercado global remoto", type: "hours",   target: 3, unit: "h",      note: "Toptal, Contra, LinkedIn global." },
      { id: "f5", label: "% ahorro/inversión ejecutado", type: "boolean", target: 1, unit: "",        note: "Mínimo 30%. Invertido." },
    ],
  },
  {
    id: "impact", short: "IMPACTO", color: "#ffd60a",
    tasks: [
      { id: "i1", label: "Reunión TECHO con agenda", type: "boolean", target: 1, unit: "",        note: "Lidera, no asistas." },
      { id: "i2", label: "Acción Q2 definida y con fecha", type: "boolean", target: 1, unit: "",        note: "Específica. Medible. Con deadline." },
      { id: "i3", label: "Personas impactadas directamente", type: "count",   target: 5, unit: "pers.",  note: "Mentoría, ayuda técnica, conexión." },
      { id: "i4", label: "Contenido impacto social publicado", type: "count",   target: 1, unit: "post",   note: "LinkedIn/X. Tu historia inspira." },
    ],
  },
  {
    id: "cognitive", short: "MENTE", color: "#39ff14",
    tasks: [
      { id: "m1", label: "Sesiones de piano deliberadas", type: "count",   target: 5,  unit: "ses",     note: "30min c/u. Metrónomo. Pieza difícil." },
      { id: "m2", label: "Páginas libro no-ficción", type: "count",   target: 100, unit: "págs",    note: "14/día. Biografías élite, filosofía." },
      { id: "m3", label: "Entradas de diario / reflexión", type: "count",   target: 7,  unit: "entradas",note: "1/día. 10min. Sin excepción." },
      { id: "m4", label: "Meditación / visualización", type: "minutes", target: 70, unit: "min",     note: "10min/día. Visualiza el resultado." },
      { id: "m5", label: "Estudio 2do idioma (FR/DE/ZH)", type: "hours",   target: 3,  unit: "h",       note: "30min/día. C1 en 3 años compuesto." },
    ],
  },
];

const WORKOUT_SPLIT = {
  lunes:    { label:"Pecho + Tríceps", emoji:"💪", color:"#ff6b35", exercises:["Push-ups 4×12","Aperturas 3×15","Press pecho 3×12","Dips silla 3×12","Ext. tríceps 3×12","Cardio 25min Z2"] },
  martes:   { label:"Espalda + Bíceps", emoji:"🏋️", color:"#ff6b35", exercises:["Remo 1 brazo 4×12","Remo inclinado 3×15","Curl bíceps 4×15","Curl martillo 3×12","Cardio 20min Z2"] },
  miercoles:{ label:"Descanso Activo", emoji:"🚶", color:"#2d3a4e", exercises:["Movilidad 30min","Estiramientos completos","Hidratación 3L","Caminar suave"] },
  jueves:   { label:"Piernas + Glúteos", emoji:"🦵", color:"#ff6b35", exercises:["Sentadilla 4×15","Zancadas 3×12","Peso muerto rumano 3×12","Sentadilla sumo 3×15","Pantorrillas 4×20","HIIT 20min"] },
  viernes:  { label:"Hombros + Core", emoji:"🎯", color:"#ff6b35", exercises:["Press militar 4×12","Elev. laterales 4×15","Elev. frontales 3×12","Plancha 3×45s","Abdominales 4×20","Cardio 20min Z2"] },
  sabado:   { label:"Full Body + Cardio", emoji:"🔄", color:"#ff6b35", exercises:["Burpees 3×10","Sentadillas salto 3×15","Montañista 3×20","Abdominales máquina 3×25","Caminadora 30min Z2"] },
  domingo:  { label:"Descanso Total", emoji:"🌟", color:"#2d3a4e", exercises:["Estiramiento 20min suave","Meal prep semanal","Revisión progreso","Sueño 11h"] },
};

const SCHEDULE = {
  LUN: {
    date: "09 MAR", label: "LUNES",
    workout: { focus: "PECHO + TRÍCEPS", duration: 75, day: "lunes" },
    blocks: [
      { time:"05:00", end:"05:30", label:"DESPERTAR · DIARIO · VISUALIZACIÓN",         vec:"MENTE",    detail:"10min diario escrito + 15min visualización. Sin teléfono.", taskRef:"m3,m4" },
      { time:"05:30", end:"06:45", label:"🏋️ PECHO + TRÍCEPS — Calentamiento 10min",   vec:"FÍSICO",   detail:"Calentamiento: caminadora 10min suave + rotación hombros. Luego: Push-ups 4×12 · Aperturas pesas 3×15 · Press pecho piso 3×12 · Dips silla 3×12 · Ext. tríceps 3×12.", taskRef:"p_lun" },
      { time:"06:45", end:"07:10", label:"🏃 CARDIO — Caminadora 25min Z2",             vec:"FÍSICO",   detail:"FC 130-150bpm. Inclinación 3-5%. Quema grasa post-músculo. Pace 6-7km/h.", taskRef:"p_lun,p_cardio" },
      { time:"07:10", end:"07:40", label:"DUCHA FRÍA · NUTRICIÓN · TRACK",              vec:"BASE",     detail:"Ducha fría 2min. Desayuno: proteína + carbohidratos. Meta: 2g proteína/kg. Registrar calorías.", taskRef:"p_sleep,p_nutri" },
      { time:"07:40", end:"09:40", label:"DEEP WORK CYBER #1 — OSCP/SANS PATHWAY",     vec:"CYBER",    detail:"Bloque 2h. Estudio certificación. Sin interrupciones absolutas. Timer visible.", taskRef:"c1,c6" },
      { time:"09:40", end:"09:55", label:"BREAK · HIDRATACIÓN · MOVIMIENTO",            vec:"BASE",     detail:"10min caminando. Come algo. Regresa al 100%.", taskRef:"" },
      { time:"09:55", end:"11:40", label:"LAB HTB / PORTSWIGGER #1",                    vec:"CYBER",    detail:"Lab activo. Documenta vectores de ataque mientras trabajas.", taskRef:"c2" },
      { time:"11:40", end:"12:40", label:"LECTURA TÉCNICA EN INGLÉS",                   vec:"IDIOMAS",  detail:"Paper o documentación técnica. Subrayar vocab nuevo para Anki.", taskRef:"l1" },
      { time:"12:40", end:"13:40", label:"ALMUERZO · DESCANSO SIN PANTALLAS",           vec:"BASE",     detail:"Comida #2. Proteína. Caminar 15min. No pantallas los primeros 20min.", taskRef:"p_nutri" },
      { time:"13:40", end:"15:40", label:"DEEP WORK CYBER #2 — INVESTIGACIÓN CVE",     vec:"CYBER",    detail:"2h búsqueda vulnerabilidad original. Documenta todo.", taskRef:"c1,c4" },
      { time:"15:40", end:"16:40", label:"SPEAKING TÉCNICO · SHADOWING EN",            vec:"IDIOMAS",  detail:"1h shadowing + práctica oral. Imita acento, ritmo y vocabulario.", taskRef:"l3" },
      { time:"16:40", end:"17:10", label:"PIANO — SESIÓN 1 · METRÓNOMO",               vec:"MENTE",    detail:"30min deliberados. Una pieza técnicamente difícil. Metrónomo activado.", taskRef:"m1" },
      { time:"17:10", end:"18:10", label:"WRITE-UP / DOCUMENTACIÓN CYBER (EN)",        vec:"CYBER",    detail:"Escribe lo aprendido hoy en inglés. Sube a GitHub.", taskRef:"c3,b5" },
      { time:"18:10", end:"18:30", label:"VOCABULARIO ANKI — 10 PALABRAS",             vec:"IDIOMAS",  detail:"10 palabras técnicas en contexto.", taskRef:"l4" },
      { time:"18:30", end:"19:10", label:"RESEARCH MERCADO GLOBAL · FINANZAS",         vec:"FINANZAS", detail:"Toptal, Contra, LinkedIn global. Benchmark salarial.", taskRef:"f4" },
      { time:"19:10", end:"19:55", label:"LECTURA — LIBRO NO FICCIÓN 14 PÁGS",         vec:"MENTE",    detail:"14 páginas mínimo. Biografías élite o filosofía estoica.", taskRef:"m2" },
      { time:"19:55", end:"20:25", label:"CENA · NUTRICIÓN TRACK · PODCAST EN",        vec:"BASE",     detail:"Comida #3. Registrar totales. Podcast técnico EN.", taskRef:"p_nutri,l5" },
      { time:"20:25", end:"20:45", label:"DIARIO NOCTURNO · REVISIÓN KPIs",            vec:"MENTE",    detail:"¿Qué logré? ¿Qué fallé? ¿Qué hago diferente mañana?", taskRef:"m3" },
      { time:"20:45", end:"21:30", label:"RUTINA SUEÑO — APAGAR PANTALLAS",            vec:"BASE",     detail:"Sin teléfono. Temperatura fría.", taskRef:"p_sleep" },
      { time:"21:30", end:"05:00", label:"SUEÑO 7.5h — INAMOVIBLE",                    vec:"BASE",     detail:"El sueño es el anabólico más potente. Sin 7.5h, rendimiento cognitivo cae 30%.", taskRef:"p_sleep" },
    ]
  },
  MAR: {
    date: "10 MAR", label: "MARTES",
    highlight: "TECHO 18:00",
    workout: { focus: "ESPALDA + BÍCEPS", duration: 70, day: "martes" },
    blocks: [
      { time:"05:00", end:"05:30", label:"DESPERTAR · DIARIO · PREP TECHO",             vec:"MENTE",    detail:"Diario AM. Hoy tienes TECHO 18:00. Escribe la agenda a proponer.", taskRef:"m3,m4" },
      { time:"05:30", end:"06:40", label:"🏋️ ESPALDA + BÍCEPS — Calentamiento 10min",  vec:"FÍSICO",   detail:"Calentamiento: caminadora 10min suave + gato-vaca 10 reps. Luego: Remo 1 brazo 4×12 · Remo inclinado 3×15 · Curl bíceps 4×15 · Curl martillo 3×12.", taskRef:"p_mar" },
      { time:"06:40", end:"07:00", label:"🏃 CARDIO — Caminadora 20min Z2",             vec:"FÍSICO",   detail:"Post pesas el cardio quema más grasa (glucógeno bajo). Inclinación 3%. FC 130-150.", taskRef:"p_mar,p_cardio" },
      { time:"07:00", end:"07:30", label:"DUCHA · NUTRICIÓN · TRACK",                   vec:"BASE",     detail:"Desayuno. Proteína. Registrar calorías.", taskRef:"p_nutri" },
      { time:"07:30", end:"09:30", label:"DEEP WORK CYBER #1 — LAB PORTSWIGGER #2",    vec:"CYBER",    detail:"Lab activo. Foco en inyecciones o autenticación.", taskRef:"c1,c2" },
      { time:"09:30", end:"09:45", label:"BREAK · HIDRATACIÓN",                         vec:"BASE",     detail:"10min. Muévete.", taskRef:"" },
      { time:"09:45", end:"11:45", label:"DEEP WORK CYBER #2 — INVESTIGACIÓN CVE",     vec:"CYBER",    detail:"Continúa investigación CVE. 2h en encontrar algo original.", taskRef:"c1,c4" },
      { time:"11:45", end:"12:45", label:"LECTURA TÉCNICA EN INGLÉS",                   vec:"IDIOMAS",  detail:"1h de documentación técnica en EN.", taskRef:"l1" },
      { time:"12:45", end:"13:30", label:"ALMUERZO · PREPARAR AGENDA TECHO",            vec:"IMPACTO",  detail:"Come y en 20min escribe agenda TECHO. Define acción Q2 concreta.", taskRef:"i1,i2" },
      { time:"13:30", end:"15:30", label:"DEEP WORK CYBER #3 — CERT STUDY",            vec:"CYBER",    detail:"2h estudio certificación OSCP/SANS.", taskRef:"c1,c6" },
      { time:"15:30", end:"16:00", label:"PIANO — SESIÓN 2",                            vec:"MENTE",    detail:"30min. Metrónomo. Progresión técnica deliberada.", taskRef:"m1" },
      { time:"16:00", end:"17:00", label:"PREP REUNIÓN TECHO · ACCIÓN Q2",             vec:"IMPACTO",  detail:"Repasa agenda. Define acción Q2 específica, medible, con fecha.", taskRef:"i1,i2" },
      { time:"17:00", end:"17:55", label:"VOCABULARIO ANKI · SPEAKING EN",             vec:"IDIOMAS",  detail:"10 palabras Anki + 45min speaking técnico.", taskRef:"l4,l3" },
      { time:"17:55", end:"18:00", label:"TRANSPORTE — LLEGA 10MIN ANTES",             vec:"BASE",     detail:"Mentalidad de líder. Llega antes.", taskRef:"" },
      { time:"18:00", end:"19:30", label:"★ REUNIÓN TECHO — LIDERA",                   vec:"IMPACTO",  detail:"Propón la acción Q2. Conecta con 3 personas estratégicas.", taskRef:"i1,i3" },
      { time:"19:30", end:"20:20", label:"REPORTE POST-TECHO · CONTENIDO SOCIAL",      vec:"IMPACTO",  detail:"Documenta acuerdos. Publica 1 post en LinkedIn.", taskRef:"i2,i4" },
      { time:"20:20", end:"21:00", label:"CENA · LECTURA · PODCAST EN",                vec:"BASE",     detail:"Cena. 14 páginas libro. Podcast técnico EN.", taskRef:"p_nutri,m2,l5" },
      { time:"21:00", end:"21:20", label:"DIARIO NOCTURNO · KPIs",                     vec:"MENTE",    detail:"¿Cómo fue TECHO? Registro KPIs del día.", taskRef:"m3" },
      { time:"21:20", end:"05:00", label:"SUEÑO 7.5h",                                 vec:"BASE",     detail:"Inamovible.", taskRef:"p_sleep" },
    ]
  },
  MIÉ: {
    date: "11 MAR", label: "MIÉRCOLES",
    workout: { focus: "DESCANSO ACTIVO", duration: 30, day: "miercoles", rest: true },
    blocks: [
      { time:"05:00", end:"05:30", label:"DESPERTAR · DIARIO · REVISIÓN KPIs MID",     vec:"MENTE",    detail:"Diario AM. Auditoría rápida mitad de semana.", taskRef:"m3,m4" },
      { time:"05:30", end:"06:00", label:"🚶 DESCANSO ACTIVO — Movilidad 30min",        vec:"FÍSICO",   detail:"No pesas. Estiramientos completos + caminata suave. Hidratación 3L mín.", taskRef:"p_mobil" },
      { time:"06:00", end:"06:30", label:"DUCHA · NUTRICIÓN · TRACK",                   vec:"BASE",     detail:"Desayuno. Proteína igual que siempre.", taskRef:"p_nutri" },
      { time:"06:30", end:"07:30", label:"MOCK INTERVIEW TÉCNICA #1 — GRABADA",        vec:"CYBER",    detail:"Grábate respondiendo Red Team + seguridad ofensiva en inglés.", taskRef:"c1" },
      { time:"07:30", end:"09:30", label:"DEEP WORK CYBER — REPASO POST-MOCK",         vec:"CYBER",    detail:"Profundiza en lo que fallaste en el mock.", taskRef:"c1,c6" },
      { time:"09:30", end:"11:00", label:"SPEAKING TÉCNICO EN + BEHAVIORAL EN",        vec:"IDIOMAS",  detail:"1.5h: shadowing + respuestas entrevista en inglés.", taskRef:"l3,l2" },
      { time:"11:00", end:"12:00", label:"ALMUERZO · DESCANSO",                         vec:"BASE",     detail:"Comida. Sin pantallas 20min. Caminata.", taskRef:"p_nutri" },
      { time:"12:00", end:"14:00", label:"DEEP WORK CYBER — LAB HTB #3",               vec:"CYBER",    detail:"Tercer lab. Foco en vulnerabilidades.", taskRef:"c1,c2" },
      { time:"14:00", end:"15:00", label:"WRITE-UP PUBLICADO #1 — GITHUB/BLOG EN",     vec:"CYBER",    detail:"Publica write-up del lab. En inglés. Con screenshots.", taskRef:"c3,b1" },
      { time:"15:00", end:"15:45", label:"CONEXIONES ESTRATÉGICAS — LINKEDIN",         vec:"MARCA",    detail:"3 mensajes personalizados a personas donde quieres estar.", taskRef:"b3" },
      { time:"15:45", end:"16:25", label:"VOCABULARIO ANKI · LECTURA TÉCNICA EN",      vec:"IDIOMAS",  detail:"10 palabras + 30min lectura técnica EN.", taskRef:"l4,l1" },
      { time:"16:25", end:"17:05", label:"CENA TEMPRANA · PODCAST TÉCNICO EN",         vec:"BASE",     detail:"Cena. Registrar totales. Podcast EN.", taskRef:"p_nutri,l5" },
      { time:"17:05", end:"17:45", label:"LECTURA — LIBRO 14 PÁGINAS",                 vec:"MENTE",    detail:"14 páginas. No negociable.", taskRef:"m2" },
      { time:"17:45", end:"18:15", label:"DIARIO · AUDITORÍA MID-WEEK · KPIs",         vec:"MENTE",    detail:"Revisión KPIs mitad de semana. ¿Qué ajustar?", taskRef:"m3" },
      { time:"18:15", end:"18:45", label:"OPEN SOURCE · INTERACCIONES COMUNIDAD",      vec:"MARCA",    detail:"Contribución a repo o 5 interacciones en Discord/HTB/Twitter.", taskRef:"c5,b2" },
      { time:"18:45", end:"19:15", label:"ESTUDIO 2DO IDIOMA — FR/DE/ZH",              vec:"MENTE",    detail:"30min. Pimsleur, Michel Thomas o clases reales.", taskRef:"m5" },
      { time:"19:15", end:"20:00", label:"RUTINA RELAJACIÓN · DIARIO CIERRE",          vec:"MENTE",    detail:"Reflexión. Prepara mente para JUE entrenamiento piernas.", taskRef:"m3" },
      { time:"20:00", end:"05:00", label:"SUEÑO 9h — RECUPERACIÓN MUSCULAR",           vec:"BASE",     detail:"9h esta noche. Mañana es día de piernas.", taskRef:"p_sleep" },
    ]
  },
  JUE: {
    date: "12 MAR", label: "JUEVES",
    note: "PRE-ENTREVISTA — máxima preparación",
    workout: { focus: "PIERNAS + GLÚTEOS", duration: 80, day: "jueves" },
    blocks: [
      { time:"05:00", end:"05:20", label:"DESPERTAR · DIARIO",                          vec:"MENTE",    detail:"Mañana es la entrevista. Hoy preparas mente y cuerpo al máximo.", taskRef:"m3" },
      { time:"05:20", end:"05:40", label:"MEDITACIÓN 20MIN — VISUALIZACIÓN",            vec:"MENTE",    detail:"Visualización completa: cada respuesta técnica en la entrevista.", taskRef:"m4" },
      { time:"05:40", end:"07:00", label:"🏋️ PIERNAS + GLÚTEOS — Calentamiento 10min", vec:"FÍSICO",   detail:"Calentamiento: caminadora 10min inclinación 5% + sentadillas sin peso 15 reps. Luego: Sentadilla pesas 4×15 · Zancadas 3×12 · Peso muerto rumano 3×12 · Sentadilla sumo 3×15 · Pantorrillas 4×20.", taskRef:"p_jue" },
      { time:"07:00", end:"07:20", label:"🏃 CARDIO HIIT — 20min",                      vec:"FÍSICO",   detail:"Protocolo HIIT: 1min rápido 8-9km/h + 2min lento 5km/h. Repetir 6-7 veces.", taskRef:"p_jue,p_cardio" },
      { time:"07:20", end:"07:50", label:"DUCHA · NUTRICIÓN · PREP ENTREVISTA",         vec:"BASE",     detail:"Desayuno. Proteína. Prepara ropa y documentos para mañana.", taskRef:"p_nutri" },
      { time:"07:50", end:"09:50", label:"REPASO TÉCNICO INTENSIVO #1",                 vec:"CYBER",    detail:"OWASP Top 10, redes, AD attacks, metodología red team.", taskRef:"c1,c6" },
      { time:"09:50", end:"11:20", label:"MOCK INTERVIEW #2 — GRABADA EN",              vec:"CYBER",    detail:"Segunda mock. En inglés. Behavioral + técnica.", taskRef:"c1" },
      { time:"11:20", end:"12:50", label:"REPASO TÉCNICO #2 — GAPS DEL MOCK",           vec:"CYBER",    detail:"Profundiza en puntos débiles del mock #2.", taskRef:"c1,c6" },
      { time:"12:50", end:"13:50", label:"ALMUERZO LIGERO · DESCANSO MENTAL",           vec:"BASE",     detail:"Comida ligera. Caminar 20min. Despejar la mente.", taskRef:"p_nutri" },
      { time:"13:50", end:"15:20", label:"RESPUESTAS ENTREVISTA EN VOZ ALTA EN",        vec:"IDIOMAS",  detail:"'Tell me about yourself' · strengths · technical deep dives.", taskRef:"l3,l2" },
      { time:"15:20", end:"15:50", label:"PIANO — SESIÓN 3",                            vec:"MENTE",    detail:"30min. La mente relajada post-piano rinde mejor bajo presión.", taskRef:"m1" },
      { time:"15:50", end:"16:50", label:"INVESTIGACIÓN BANCO PICHINCHA",               vec:"FINANZAS", detail:"Estructura, áreas de ciberseguridad, stack tecnológico, cultura.", taskRef:"f1,f2" },
      { time:"16:50", end:"17:50", label:"SKILLS PREMIUM + SALARY BENCHMARK",           vec:"FINANZAS", detail:"Cloud Security, Red Team, DFIR. Valor de mercado LATAM y global.", taskRef:"f2,f4" },
      { time:"17:50", end:"18:30", label:"POST LINKEDIN + INTERACCIONES COMUNIDAD",     vec:"MARCA",    detail:"Publica algo de tu proceso. Luego 5 interacciones en foros.", taskRef:"b1,b2" },
      { time:"18:30", end:"19:00", label:"VOCABULARIO ANKI · PODCAST EN",               vec:"IDIOMAS",  detail:"10 palabras Anki. Podcast técnico EN liviano.", taskRef:"l4,l5" },
      { time:"19:00", end:"19:40", label:"LECTURA 14 PÁGINAS · DIARIO NOCTURNO",        vec:"MENTE",    detail:"14 páginas. Luego diario: 'Estoy listo para mañana.'", taskRef:"m2,m3" },
      { time:"19:40", end:"20:00", label:"PREP FINAL DOCUMENTOS ENTREVISTA",            vec:"FINANZAS", detail:"CV listo. Portfolio listo. 3 preguntas para el entrevistador.", taskRef:"f1" },
      { time:"20:00", end:"05:00", label:"SUEÑO 9h — CRÍTICO PRE-ENTREVISTA",           vec:"BASE",     detail:"9h inamovibles. El rendimiento cognitivo depende directamente de esto.", taskRef:"p_sleep" },
    ]
  },
  VIE: {
    date: "13 MAR", label: "VIERNES",
    highlight: "★★ ENTREVISTA BANCO PICHINCHA",
    critical: true,
    workout: { focus: "HOMBROS + CORE", duration: 70, day: "viernes" },
    blocks: [
      { time:"05:00", end:"05:20", label:"DESPERTAR — DÍA DE MISIÓN",                  vec:"BASE",     detail:"Todo lo que hiciste esta semana fue para este momento.", taskRef:"" },
      { time:"05:20", end:"05:40", label:"MEDITACIÓN 20MIN — ESTADO DE FLOW",           vec:"MENTE",    detail:"Respira. Visualiza éxito. Confianza absoluta.", taskRef:"m4" },
      { time:"05:40", end:"06:05", label:"🏋️ WARM-UP — Movilidad y activación 25min",  vec:"FÍSICO",   detail:"No pesas pesadas hoy. Movilidad completa. Cuerpo activo, mente alerta.", taskRef:"p_mobil" },
      { time:"06:05", end:"06:45", label:"DUCHA FRÍA · NUTRICIÓN ÓPTIMA",               vec:"BASE",     detail:"Ducha fría 2min. Desayuno: proteína + carbohidratos complejos.", taskRef:"p_nutri" },
      { time:"06:45", end:"07:45", label:"REPASO FINAL 1H — SOLO NOTAS CLAVE",          vec:"CYBER",    detail:"Repasa notas, no aprendas nuevo material. Confianza, no ansiedad.", taskRef:"c6" },
      { time:"07:45", end:"08:15", label:"PRÁCTICA ORAL EN INGLÉS — 30MIN",             vec:"IDIOMAS",  detail:"3 mejores respuestas técnicas en voz alta. Una sola vez cada una.", taskRef:"l3" },
      { time:"08:15", end:"09:30", label:"PREPARACIÓN FINAL · TRANSPORTE",              vec:"BASE",     detail:"Sal 30min antes. Llega tranquilo. Mentalidad de élite.", taskRef:"" },
      { time:"09:30", end:"11:00", label:"★★ ENTREVISTA BANCO PICHINCHA",               vec:"FINANZAS", detail:"Ejecuta. Confía. Escucha antes de responder. Haz preguntas al final.", taskRef:"f1" },
      { time:"11:00", end:"11:45", label:"DEBRIEFING POST-ENTREVISTA",                  vec:"FINANZAS", detail:"Anota todo fresco: preguntas, respuestas, qué mejorar.", taskRef:"f1,f2" },
      { time:"11:45", end:"12:45", label:"ALMUERZO — CELEBRA EL PROCESO",               vec:"BASE",     detail:"Come bien. Celebras el proceso, no el resultado.", taskRef:"p_nutri" },
      { time:"12:45", end:"14:05", label:"🏋️ HOMBROS + CORE — Calentamiento 10min",   vec:"FÍSICO",   detail:"Calentamiento: caminadora 10min suave + círculos hombros. Luego: Press militar 4×12 · Elev. laterales 4×15 · Elev. frontales 3×12 · Plancha 3×45s · Abdominales máquina 4×20.", taskRef:"p_vie" },
      { time:"14:05", end:"14:25", label:"🏃 CARDIO — Caminadora 20min Z2",             vec:"FÍSICO",   detail:"Libera adrenalina post-entrevista. Pace 6km/h. Inclinación 3%.", taskRef:"p_vie,p_cardio" },
      { time:"14:25", end:"16:25", label:"DEEP WORK CYBER — LAB HTB #4",               vec:"CYBER",    detail:"El mundo no para. Vuelve al trabajo. Cuarto lab de la semana.", taskRef:"c1,c2" },
      { time:"16:25", end:"17:25", label:"WRITE-UP PUBLICADO #2 — GITHUB EN",           vec:"CYBER",    detail:"Segundo write-up técnico de la semana. Publicado. Visible.", taskRef:"c3,b1" },
      { time:"17:25", end:"17:55", label:"PIANO — SESIÓN 4",                            vec:"MENTE",    detail:"30min. Recompensa cognitiva.", taskRef:"m1" },
      { time:"17:55", end:"18:55", label:"LECTURA TÉCNICA EN + VOCABULARIO ANKI",       vec:"IDIOMAS",  detail:"1h lectura técnica EN + 10 palabras Anki.", taskRef:"l1,l4" },
      { time:"18:55", end:"19:55", label:"FUENTES INGRESO + INCOME STACK PLAN",         vec:"FINANZAS", detail:"Documenta income stack: empleo + freelance/bug bounty + contenido.", taskRef:"f3,f5" },
      { time:"19:55", end:"20:35", label:"CENA · PODCAST EN · NUTRICIÓN TRACK",         vec:"BASE",     detail:"Cena. Registrar totales semana. Podcast EN.", taskRef:"p_nutri,l5" },
      { time:"20:35", end:"21:05", label:"LECTURA 14 PÁGINAS + DIARIO REFLEXIÓN",       vec:"MENTE",    detail:"14 páginas. Diario: ¿Cómo fue la entrevista? ¿Qué aprendiste?", taskRef:"m2,m3" },
      { time:"21:05", end:"05:00", label:"SUEÑO 8h — DESCANSA",                         vec:"BASE",     detail:"Descansas. Mañana entrenas duro.", taskRef:"p_sleep" },
    ]
  },
  SÁB: {
    date: "14 MAR", label: "SÁBADO",
    workout: { focus: "FULL BODY + CARDIO", duration: 60, day: "sabado" },
    blocks: [
      { time:"05:30", end:"06:00", label:"DESPERTAR · DIARIO",                          vec:"MENTE",    detail:"Media hora más. El diario es inamovible igual.", taskRef:"m3,m4" },
      { time:"06:00", end:"07:00", label:"🏋️ FULL BODY — Calentamiento 8min",           vec:"FÍSICO",   detail:"Calentamiento: saltos de tijera 2min + trote lugar 2min. Circuito: Burpees 3×10 · Sentadillas salto 3×15 · Montañista 3×20 · Abdominales máquina 3×25.", taskRef:"p_sab" },
      { time:"07:00", end:"07:30", label:"🏃 CARDIO — Caminadora 30min Z2",             vec:"FÍSICO",   detail:"El cardio más largo de la semana. Inclinación 5-8%.", taskRef:"p_sab,p_cardio" },
      { time:"07:30", end:"08:00", label:"DUCHA · NUTRICIÓN · TRACK",                   vec:"BASE",     detail:"Desayuno. Proteína. Trackear.", taskRef:"p_nutri" },
      { time:"08:00", end:"11:00", label:"DEEP WORK CYBER — BLOQUE 3H: HTB + CVE",     vec:"CYBER",    detail:"Bloque largo. HTB lab #5 + investigación CVE. Máximo output del día.", taskRef:"c1,c2,c4" },
      { time:"11:00", end:"11:20", label:"BREAK · HIDRATACIÓN · MOVIMIENTO",            vec:"BASE",     detail:"20min. Come. Muévete.", taskRef:"" },
      { time:"11:20", end:"13:20", label:"DEEP WORK CYBER — CERT STUDY CONTINUACIÓN",  vec:"CYBER",    detail:"2h certificación OSCP/SANS. Total hoy: 5h Cyber.", taskRef:"c1,c6" },
      { time:"13:20", end:"14:20", label:"ALMUERZO · DESCANSO REAL",                    vec:"BASE",     detail:"Comida. Descanso 45min real.", taskRef:"p_nutri" },
      { time:"14:20", end:"15:50", label:"CONTENIDO PÚBLICO — POST TÉCNICO EN",        vec:"MARCA",    detail:"Escribe y publica post técnico en inglés. LinkedIn + blog/GitHub.", taskRef:"b1,b5" },
      { time:"15:50", end:"16:35", label:"2DO IDIOMA — FR/DE/ZH ESTUDIO",              vec:"MENTE",    detail:"45min. Pimsleur, Michel Thomas o clases reales. No Duolingo.", taskRef:"m5" },
      { time:"16:35", end:"17:05", label:"PIANO — SESIÓN 5",                            vec:"MENTE",    detail:"30min. Quinta sesión. Mira cuánto progresaste en la semana.", taskRef:"m1" },
      { time:"17:05", end:"18:05", label:"SKILLS PREMIUM · INCOME STACK · INVERSIÓN",  vec:"FINANZAS", detail:"Mapea 5 skills con valor de mercado. Diseña income stack real.", taskRef:"f2,f3,f5" },
      { time:"18:05", end:"18:45", label:"INTERACCIONES COMUNIDAD ÉLITE — 5 POSTS",    vec:"MARCA",    detail:"Discord HTB, Twitter/X técnico, foros seguridad.", taskRef:"b2,b4" },
      { time:"18:45", end:"19:25", label:"CENA · PODCAST EN · NUTRICIÓN",              vec:"BASE",     detail:"Cena. Podcast EN. Registrar totales semana.", taskRef:"p_nutri,l5" },
      { time:"19:25", end:"20:05", label:"LECTURA 14 PÁGINAS",                          vec:"MENTE",    detail:"14 páginas. Acerca al target 100 páginas.", taskRef:"m2" },
      { time:"20:05", end:"20:35", label:"DIARIO · PRE-AUDITORÍA · RECOPILA DATOS",    vec:"MENTE",    detail:"Reflexión sábado. Mañana es auditoría. ¿Tienes los números listos?", taskRef:"m3" },
      { time:"20:35", end:"05:30", label:"SUEÑO 9h",                                   vec:"BASE",     detail:"9h. Mañana auditoría a las 05:00.", taskRef:"p_sleep" },
    ]
  },
  DOM: {
    date: "15 MAR", label: "DOMINGO",
    highlight: "★★★ AUDITORÍA TOTAL",
    workout: { focus: "DESCANSO TOTAL + MEAL PREP", duration: 20, day: "domingo", rest: true },
    blocks: [
      { time:"05:00", end:"05:20", label:"DESPERTAR — DÍA DE CUENTAS",                 vec:"BASE",     detail:"Hoy se mide todo. ¿Hiciste lo que prometiste?", taskRef:"" },
      { time:"05:20", end:"05:55", label:"MEDITACIÓN · DIARIO DE CIERRE SEMANAL",      vec:"MENTE",    detail:"35min. Reflexión honesta y completa de la semana.", taskRef:"m3,m4" },
      { time:"05:55", end:"06:15", label:"🚶 DESCANSO TOTAL — Estiramiento 20min",      vec:"FÍSICO",   detail:"No entrenas. Estiramiento suave 15-20min. Meal prep: prepara comidas de la semana.", taskRef:"p_mobil" },
      { time:"06:15", end:"06:45", label:"DUCHA · NUTRICIÓN",                           vec:"BASE",     detail:"Desayuno. Trackear.", taskRef:"p_nutri" },
      { time:"06:45", end:"07:35", label:"RECOPILACIÓN DATOS — TODOS LOS KPIs",        vec:"MENTE",    detail:"Abre el dashboard 0.1% Machine. Ingresa datos reales de la semana.", taskRef:"m3" },
      { time:"07:35", end:"09:05", label:"★★★ AUDITORÍA TOTAL — SEMANA 1",             vec:"MENTE",    detail:"Vector por vector. Score real. Sin excusas. ¿Llegaste al 8.0?", taskRef:"m3" },
      { time:"09:05", end:"11:05", label:"DEEP WORK CYBER — CERT STUDY 2H",            vec:"CYBER",    detail:"Mantén el ritmo aunque sea domingo. 2h certificación.", taskRef:"c1,c6" },
      { time:"11:05", end:"12:05", label:"ALMUERZO · MEAL PREP",                        vec:"BASE",     detail:"Comida. Prepara tuppers para la semana. Proteína lista.", taskRef:"p_nutri" },
      { time:"12:05", end:"13:35", label:"DISEÑO PLAN SEMANA 2 — DATOS REALES",        vec:"MENTE",    detail:"¿Qué subió? ¿Qué bajó? Ajusta targets S2 basado en performance real.", taskRef:"m3" },
      { time:"13:35", end:"14:35", label:"PORTFOLIO PÚBLICO — ACTUALIZA GITHUB",       vec:"MARCA",    detail:"GitHub organizado. Todos los write-ups publicados. Bio en inglés.", taskRef:"b5,c3" },
      { time:"14:35", end:"15:20", label:"2DO IDIOMA + VOCABULARIO ANKI",               vec:"MENTE",    detail:"45min segundo idioma. 10 palabras Anki.", taskRef:"m5,l4" },
      { time:"15:20", end:"15:50", label:"PIANO — SESIÓN LIBRE",                        vec:"MENTE",    detail:"Toca lo que quieras. Recompensa creativa al final de la semana.", taskRef:"m1" },
      { time:"15:50", end:"16:25", label:"FOLLOW-UP CONEXIONES ESTRATÉGICAS",          vec:"MARCA",    detail:"Mensajes follow-up a conexiones nuevas de la semana.", taskRef:"b3,b2" },
      { time:"16:25", end:"17:00", label:"CENA · MOVILIDAD · RECUPERACIÓN",            vec:"FÍSICO",   detail:"Cena. Sesión movilidad 30min. Cierra la semana físicamente.", taskRef:"p_mobil" },
      { time:"17:00", end:"17:40", label:"LECTURA 14 PÁGINAS — CIERRA 100 TOTAL",      vec:"MENTE",    detail:"14 páginas. Cierra el contador en 100 para la semana.", taskRef:"m2" },
      { time:"17:40", end:"18:05", label:"COMPROMISO ESCRITO SEMANA 2 — FÍRMALO",      vec:"MENTE",    detail:"Escribe en papel el compromiso de la Semana 2. Específico. Fírmalo literalmente.", taskRef:"m3" },
      { time:"18:05", end:"05:00", label:"SUEÑO 11h — RECUPERACIÓN SEMANAL TOTAL",     vec:"BASE",     detail:"Semana 1 completada. Descansa profundo. Mañana empieza Semana 2.", taskRef:"p_sleep" },
    ]
  },
};

const V_COLORS = {
  CYBER:"#00f5d4", FÍSICO:"#ff6b35", IDIOMAS:"#b48eff",
  MARCA:"#ff9f1c", FINANZAS:"#ff3860", IMPACTO:"#ffd60a",
  MENTE:"#39ff14", BASE:"#1e2a3a",
};

const DAYS = ["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];

// ─── CALORIE TARGET ────────────────────────────────────────────────────
const CALORIE_TARGET = 1950; // kcal/día
const CALORIE_MEALS = [
  { id: "desayuno",   label: "DESAYUNO",   emoji: "🌅", color: "#ffd60a", hint: "~600–800 kcal" },
  { id: "almuerzo",   label: "ALMUERZO",   emoji: "☀️",  color: "#ff9f1c", hint: "~800–1000 kcal" },
  { id: "merienda",   label: "MERIENDA",   emoji: "🍎",  color: "#00f5d4", hint: "~200–400 kcal" },
  { id: "aperitivos", label: "APERITIVOS", emoji: "🥜",  color: "#b48eff", hint: "~100–300 kcal" },
];

function computeScore(vec, vals) {
  let t = 0;
  vec.tasks.forEach(tk => { t += Math.min((parseFloat(vals[tk.id]||0))/tk.target, 1); });
  return Math.round(t/vec.tasks.length*100)/10;
}
function getColor(s){
  if(s>=9)return"#39ff14"; if(s>=7)return"#00f5d4";
  if(s>=5)return"#ffd60a"; if(s>=3)return"#ff6b35"; return"#ff3860";
}
function getLabel(s){
  if(s>=9)return"ÉLITE"; if(s>=7)return"TOP 5%";
  if(s>=5)return"EN RUTA"; if(s>=3)return"PROMEDIO"; return"CRÍTICO";
}
function computeDayPct(dayKey, completed) {
  const blocks = SCHEDULE[dayKey].blocks.filter(b => b.vec !== "BASE");
  if(!blocks.length) return 0;
  const done = blocks.filter((_,i) => completed[`${dayKey}-${i}`]).length;
  return Math.round((done/blocks.length)*100);
}

// ─── CALORIE TRACKER TAB ────────────────────────────────────────────────
function CalorieTracker({ calorieData, setCalorieData }) {
  const DAYS_SHORT = ["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];
  const DATES = ["09","10","11","12","13","14","15"];
  const [activeCalDay, setActiveCalDay] = useState("LUN");

  function setMeal(day, mealId, value) {
    setCalorieData(prev => ({
      ...prev,
      [day]: { ...(prev[day]||{}), [mealId]: value }
    }));
  }

  function getDayTotal(day) {
    const d = calorieData[day] || {};
    return CALORIE_MEALS.reduce((sum, m) => sum + (parseFloat(d[m.id]||0)||0), 0);
  }

  const dayData = calorieData[activeCalDay] || {};
  const dayTotal = getDayTotal(activeCalDay);
  const diff = dayTotal - CALORIE_TARGET;
  const pct = Math.min((dayTotal / CALORIE_TARGET) * 100, 110);
  const statusColor = dayTotal === 0 ? "#2d4a60" : Math.abs(diff) < 150 ? "#39ff14" : diff > 0 ? "#ff3860" : "#ffd60a";
  const statusLabel = dayTotal === 0 ? "SIN DATOS" : Math.abs(diff) < 150 ? "EN PUNTO" : diff > 150 ? "EXCESO" : "DÉFICIT";

  // Weekly overview
  const weeklyTotals = DAYS_SHORT.map(d => getDayTotal(d));
  const weeklyAvg = weeklyTotals.filter(v=>v>0).length
    ? Math.round(weeklyTotals.filter(v=>v>0).reduce((a,b)=>a+b,0) / weeklyTotals.filter(v=>v>0).length)
    : 0;

  return (
    <div style={{animation:"fadeUp .3s ease"}}>

      {/* Day selector */}
      <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
        {DAYS_SHORT.map((d,i)=>{
          const tot = getDayTotal(d);
          const hasData = tot > 0;
          return(
            <button key={d}
              onClick={()=>setActiveCalDay(d)}
              style={{
                background: activeCalDay===d ? "#070d18" : "transparent",
                border: `1px solid ${activeCalDay===d ? "#00f5d4" : hasData ? "#00f5d430" : "#0d1825"}`,
                color: activeCalDay===d ? "#00f5d4" : hasData ? "#8ecfbf" : "#3a5060",
                fontFamily:"'IBM Plex Mono',monospace",
                fontSize:9, letterSpacing:2,
                padding:"7px 12px", cursor:"pointer",
                transition:"all .15s", textTransform:"uppercase",
                minWidth: 52,
              }}>
              <div>{d}</div>
              <div style={{fontSize:7,opacity:.7,marginTop:2}}>{DATES[i]} MAR</div>
              {hasData && <div style={{fontSize:7,color:"#00f5d480",marginTop:1}}>{Math.round(tot/100)/10}k</div>}
            </button>
          );
        })}
      </div>

      {/* Day input card */}
      <div style={{
        background:"#060b14",
        border:`1px solid ${statusColor}30`,
        borderLeft:`3px solid ${statusColor}`,
        padding:"22px 24px",
        marginBottom:14,
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a7060",marginBottom:6}}>
              CALORÍAS · {activeCalDay} {DATES[DAYS_SHORT.indexOf(activeCalDay)]} MAR
            </div>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:52,fontWeight:900,color:statusColor,lineHeight:.9,letterSpacing:2}}>
              {dayTotal > 0 ? dayTotal.toLocaleString() : "—"}
              <span style={{fontSize:16,color:"#3a5060",marginLeft:6}}>kcal</span>
            </div>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:statusColor,letterSpacing:2,marginTop:8}}>{statusLabel}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:2,color:"#2d4a60",marginBottom:4}}>TARGET</div>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:28,fontWeight:700,color:"#ffd60a",letterSpacing:2,lineHeight:1}}>
              {CALORIE_TARGET.toLocaleString()}
              <span style={{fontSize:12,color:"#3a5060",marginLeft:4}}>kcal</span>
            </div>
            {dayTotal > 0 && (
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color: diff>0?"#ff3860":diff<-50?"#ffd60a":"#39ff14",marginTop:4}}>
                {diff > 0 ? `+${diff}` : diff} kcal
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{height:5,background:"#0a1220",marginBottom:20,position:"relative"}}>
          <div style={{position:"absolute",left:`${(CALORIE_TARGET/CALORIE_TARGET)*100}%`,top:-3,bottom:-3,width:1,background:"#ffd60a",opacity:.6}}/>
          <div style={{
            height:"100%",
            width:`${pct}%`,
            background:pct > 103
              ? "linear-gradient(90deg,#ff386050,#ff3860)"
              : `linear-gradient(90deg,${statusColor}50,${statusColor})`,
            transition:"width .4s",
            boxShadow: dayTotal > 0 ? `0 0 6px ${statusColor}40` : "none",
          }}/>
        </div>

        {/* Meal inputs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10}}>
          {CALORIE_MEALS.map(meal => {
            const val = dayData[meal.id] || "";
            const kcal = parseFloat(val||0)||0;
            return (
              <div key={meal.id} style={{
                background:"#030508",
                border:`1px solid ${kcal>0 ? meal.color+"30" : "#0a1220"}`,
                padding:"14px 16px",
                transition:"border-color .2s",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontSize:18}}>{meal.emoji}</span>
                  <div>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color: kcal>0 ? meal.color : "#4a6070",letterSpacing:2,fontWeight:700}}>
                      {meal.label}
                    </div>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#2d4a60",marginTop:2}}>{meal.hint}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={val}
                    placeholder="0"
                    onChange={e => setMeal(activeCalDay, meal.id, e.target.value)}
                    style={{
                      background:"#060b14",
                      border:`1px solid ${kcal>0 ? meal.color+"50" : "#141e2e"}`,
                      color: kcal>0 ? meal.color : "#8aa0b0",
                      fontFamily:"'IBM Plex Mono',monospace",
                      fontSize:14, fontWeight:700,
                      padding:"8px 10px",
                      width:"100%", outline:"none",
                      letterSpacing:1,
                    }}
                  />
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#2d4a60",flexShrink:0}}>kcal</span>
                </div>
                {kcal > 0 && (
                  <div style={{marginTop:6,height:2,background:"#0a1220"}}>
                    <div style={{
                      height:"100%",
                      width:`${Math.min((kcal/CALORIE_TARGET)*100*4,100)}%`,
                      background:meal.color,
                      transition:"width .3s",
                    }}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Macro breakdown bar */}
      {dayTotal > 0 && (
        <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"16px 20px",marginBottom:14}}>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#3a5060",marginBottom:12}}>DISTRIBUCIÓN POR COMIDA</div>
          <div style={{height:14,background:"#030508",display:"flex",overflow:"hidden",marginBottom:10}}>
            {CALORIE_MEALS.map(meal => {
              const kcal = parseFloat(dayData[meal.id]||0)||0;
              const pct = dayTotal > 0 ? (kcal/dayTotal)*100 : 0;
              return pct > 0 ? (
                <div key={meal.id} style={{
                  width:`${pct}%`,height:"100%",
                  background:meal.color,
                  transition:"width .4s",
                  position:"relative",
                }}/>
              ) : null;
            })}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {CALORIE_MEALS.map(meal => {
              const kcal = parseFloat(dayData[meal.id]||0)||0;
              const pct = dayTotal > 0 ? Math.round((kcal/dayTotal)*100) : 0;
              return (
                <div key={meal.id} style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:meal.color,flexShrink:0}}/>
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#4a6070"}}>
                    {meal.emoji} {meal.label}: <span style={{color:meal.color}}>{kcal>0?kcal:"—"}</span> {kcal>0?`(${pct}%)`:""} 
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly overview */}
      <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"18px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#3a5060"}}>RESUMEN SEMANAL</div>
          {weeklyAvg > 0 && (
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:20,fontWeight:700,color:"#00f5d4",letterSpacing:2}}>
              Ø {weeklyAvg.toLocaleString()} <span style={{fontSize:10,color:"#3a5060"}}>kcal/día</span>
            </div>
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
          {DAYS_SHORT.map((d,i) => {
            const tot = getDayTotal(d);
            const barPct = tot > 0 ? Math.min((tot/CALORIE_TARGET)*100, 115) : 0;
            const dColor = tot === 0 ? "#1a2535"
              : Math.abs(tot-CALORIE_TARGET) < 150 ? "#39ff14"
              : tot > CALORIE_TARGET+150 ? "#ff3860"
              : "#ffd60a";
            const isActive = d === activeCalDay;
            return (
              <div key={d} style={{cursor:"pointer",textAlign:"center"}} onClick={()=>setActiveCalDay(d)}>
                <div style={{fontFamily:"'Barlow Condensed'",fontSize:16,fontWeight:800,letterSpacing:1,color:isActive?"#00f5d4":"#4a6070",marginBottom:4}}>{d}</div>
                <div style={{height:52,background:"#030508",border:`1px solid ${isActive?"#00f5d420":"#0a1220"}`,position:"relative",overflow:"hidden"}}>
                  <div style={{
                    position:"absolute",bottom:0,left:0,right:0,
                    height:`${barPct}%`,
                    background:`linear-gradient(0deg,${dColor}60,${dColor}20)`,
                    transition:"height .4s",
                  }}/>
                  {/* target line */}
                  <div style={{position:"absolute",bottom:"86.8%",left:0,right:0,height:1,background:"#ffd60a",opacity:.3}}/>
                </div>
                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:dColor,marginTop:3}}>
                  {tot > 0 ? `${Math.round(tot/100)/10}k` : "—"}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#1a2535",marginTop:10,display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:16,height:1,background:"#ffd60a",opacity:.4}}/>
          <span style={{color:"#ffd60a",opacity:.4}}>TARGET {CALORIE_TARGET.toLocaleString()} kcal</span>
        </div>
      </div>
    </div>
  );
}


// ─── POMODORO TIMER ────────────────────────────────────────────────────
function PomodoroTimer() {
  const PRESETS = [
    { label: "FOCUS",  minutes: 25, color: "#00f5d4", emoji: "⚡" },
    { label: "CORTO",  minutes: 5,  color: "#39ff14", emoji: "🌿" },
    { label: "LARGO",  minutes: 15, color: "#b48eff", emoji: "🔋" },
    { label: "DEEP",   minutes: 90, color: "#ff9f1c", emoji: "🔥" },
  ];

  const [mode, setMode]           = useState(0);
  const [customMin, setCustomMin] = useState("");
  const [totalSecs, setTotalSecs] = useState(PRESETS[0].minutes * 60);
  const [remaining, setRemaining] = useState(PRESETS[0].minutes * 60);
  const [running, setRunning]     = useState(false);
  const [finished, setFinished]   = useState(false);
  const [sessions, setSessions]   = useState([]);
  const [label, setLabel]         = useState("");
  const intervalRef               = React.useRef(null);
  const startRef                  = React.useRef(null);
  const snapRef                   = React.useRef(null);

  // Load timer sessions from storage on mount
  React.useEffect(() => {
    async function loadSessions() {
      try {
        const r = await window.storage.get('battleos-timer');
        if (r && r.value) {
          const d = JSON.parse(r.value);
          if (d.sessions) setSessions(d.sessions);
        }
      } catch(e) {}
    }
    loadSessions();
  }, []);

  // Save sessions whenever they change
  React.useEffect(() => {
    if (!sessions.length) return;
    window.storage.set('battleos-timer', JSON.stringify({ sessions })).catch(()=>{});
  }, [sessions]);

  React.useEffect(() => {
    if (running) {
      startRef.current = Date.now();
      snapRef.current  = remaining;
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
        const next    = snapRef.current - elapsed;
        if (next <= 0) {
          clearInterval(intervalRef.current);
          setRemaining(0);
          setRunning(false);
          setFinished(true);
          setSessions(prev => [{
            label: label || (mode >= 0 ? PRESETS[mode].label : "CUSTOM"),
            duration: totalSecs,
            at: new Date().toLocaleTimeString("es-EC", {hour:"2-digit", minute:"2-digit"}),
          }, ...prev.slice(0, 11)]);
        } else {
          setRemaining(next);
        }
      }, 250);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function applyPreset(i) {
    clearInterval(intervalRef.current);
    setMode(i); setCustomMin("");
    const s = PRESETS[i].minutes * 60;
    setTotalSecs(s); setRemaining(s);
    setRunning(false); setFinished(false);
  }

  function applyCustom(v) {
    const m = parseInt(v);
    if (!m || m < 1) return;
    clearInterval(intervalRef.current);
    setMode(-1);
    const s = m * 60;
    setTotalSecs(s); setRemaining(s);
    setRunning(false); setFinished(false);
  }

  function toggle()  { if (!finished) setRunning(r => !r); }
  function reset()   { clearInterval(intervalRef.current); setRunning(false); setFinished(false); setRemaining(totalSecs); }

  const mins  = Math.floor(remaining / 60);
  const secs  = remaining % 60;
  const pct   = totalSecs > 0 ? ((totalSecs - remaining) / totalSecs) * 100 : 0;
  const ap    = mode >= 0 ? PRESETS[mode] : { label:"CUSTOM", color:"#ff9f1c", emoji:"⚙️" };
  const col   = finished ? "#39ff14" : ap.color;

  const R = 94, CIRC = 2 * Math.PI * R;
  const dash = finished ? 0 : CIRC - (pct / 100) * CIRC;

  return (
    <div style={{animation:"fadeUp .3s ease"}}>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        {PRESETS.map((p,i) => (
          <button key={i} onClick={() => applyPreset(i)} style={{
            background: mode===i ? "#070d18" : "transparent",
            border: `1px solid ${mode===i ? p.color : "#0d1825"}`,
            color:  mode===i ? p.color : "#4a6070",
            fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2,
            padding:"9px 16px", cursor:"pointer", transition:"all .15s", textTransform:"uppercase",
          }}>
            {p.emoji} {p.label} <span style={{opacity:.55,fontSize:8,marginLeft:4}}>{p.minutes}m</span>
          </button>
        ))}
        <div style={{display:"flex",alignItems:"center",gap:6,background:"#060b14",border:`1px solid ${mode===-1?"#ff9f1c":"#0d1825"}`,padding:"8px 12px"}}>
          <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#4a6070",letterSpacing:1}}>⚙️</span>
          <input type="number" min="1" max="300"
            value={customMin} placeholder="min"
            onChange={e => setCustomMin(e.target.value)}
            onKeyDown={e => e.key==="Enter" && applyCustom(customMin)}
            style={{
              background:"transparent", border:"none",
              borderBottom:`1px solid ${mode===-1?"#ff9f1c":"#1a2535"}`,
              color: mode===-1 ? "#ff9f1c" : "#8aacbf",
              fontFamily:"'IBM Plex Mono',monospace", fontSize:14, fontWeight:700,
              width:46, outline:"none", padding:"2px 4px", textAlign:"center",
            }}/>
          <button onClick={() => applyCustom(customMin)} style={{
            background:"transparent",border:"1px solid #1a2535",color:"#4a6070",
            fontFamily:"'IBM Plex Mono',monospace",fontSize:8,padding:"3px 8px",cursor:"pointer",letterSpacing:1,
          }}>SET</button>
        </div>
      </div>

      <div style={{marginBottom:16}}>
        <input type="text" placeholder="Nombre de sesión (ej: OSCP study, Deep Work #1)..."
          value={label} onChange={e => setLabel(e.target.value)}
          style={{
            background:"#060b14", border:"1px solid #0d1825",
            borderLeft:`3px solid ${col}40`,
            color:"#8aacbf", fontFamily:"'IBM Plex Mono',monospace",
            fontSize:10, padding:"10px 14px", width:"100%", outline:"none", letterSpacing:1,
          }}/>
      </div>

      <div style={{
        background:"#060b14", border:`1px solid ${col}20`,
        padding:"40px 24px 32px", marginBottom:12,
        display:"flex", flexDirection:"column", alignItems:"center",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:360,height:360,borderRadius:"50%",background:`radial-gradient(circle,${col}06,transparent 65%)`,pointerEvents:"none"}}/>

        <div style={{position:"relative",width:230,height:230,marginBottom:28}}>
          <svg width="230" height="230" style={{position:"absolute",top:0,left:0,transform:"rotate(-90deg)"}}>
            <circle cx="115" cy="115" r={R} fill="none" stroke="#0a1220" strokeWidth="7"/>
            <circle cx="115" cy="115" r={R} fill="none"
              stroke={col} strokeWidth="7" strokeLinecap="round"
              strokeDasharray={CIRC} strokeDashoffset={dash}
              style={{
                transition: running ? "stroke-dashoffset .25s linear" : "stroke-dashoffset .5s ease",
                filter:`drop-shadow(0 0 8px ${col}70)`,
              }}/>
          </svg>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",width:"100%"}}>
            {finished ? (
              <div>
                <div style={{fontSize:44,lineHeight:1,marginBottom:8}}>✓</div>
                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:10,color:"#39ff14",letterSpacing:3}}>COMPLETADO</div>
              </div>
            ) : (
              <>
                <div style={{
                  fontFamily:"'Barlow Condensed'",fontSize:64,fontWeight:900,letterSpacing:3,lineHeight:1,
                  color: running ? col : "#dde8f0",
                  transition:"color .3s",
                  textShadow: running ? `0 0 24px ${col}50` : "none",
                }}>
                  {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
                </div>
                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#4a6070",letterSpacing:3,marginTop:8}}>
                  {ap.emoji} {ap.label}
                </div>
                {running && (
                  <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:col,opacity:.6,marginTop:4,letterSpacing:2,animation:"blink 2s step-end infinite"}}>
                    ● EN CURSO
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#3a5060",letterSpacing:2,marginBottom:6}}>
          {Math.round(pct)}% · {Math.ceil(remaining/60)} min restantes
        </div>
        <div style={{width:200,height:2,background:"#0a1220",marginBottom:28,position:"relative"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${col}60,${col})`,transition:"width .25s linear"}}/>
        </div>

        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <button onClick={reset} style={{
            background:"transparent", border:"1px solid #1a2535", color:"#4a6070",
            fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2,
            padding:"11px 22px", cursor:"pointer", transition:"all .15s", textTransform:"uppercase",
          }}>↺ RESET</button>

          <button onClick={toggle} disabled={finished} style={{
            background: running ? `${col}18` : `${col}12`,
            border:`2px solid ${finished?"#1a2535":col}`,
            color: finished ? "#2a3a4e" : col,
            fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:4, fontWeight:700,
            padding:"14px 44px", cursor: finished?"not-allowed":"pointer",
            transition:"all .2s", textTransform:"uppercase",
            boxShadow: running ? `0 0 24px ${col}30` : "none",
          }}>
            {finished ? "— FIN —" : running ? "⏸  PAUSA" : "▶  INICIAR"}
          </button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        {[
          {l:"SESIONES HOY",     v: sessions.length,                                                          c:"#00f5d4"},
          {l:"TIEMPO ACUMULADO", v: sessions.length ? `${Math.round(sessions.reduce((a,s)=>a+s.duration,0)/60)}min` : "—", c:"#b48eff"},
          {l:"TIMER ACTIVO",     v: `${Math.round(totalSecs/60)}min`,                                         c: col},
        ].map(m=>(
          <div key={m.l} style={{background:"#060b14",border:"1px solid #0d1825",padding:"12px 14px"}}>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:6,letterSpacing:2,color:"#4a6070",marginBottom:4}}>{m.l}</div>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:26,fontWeight:700,color:m.c,letterSpacing:2,lineHeight:1}}>{m.v}</div>
          </div>
        ))}
      </div>

      {sessions.length > 0 && (
        <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"18px 20px"}}>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:12}}>HISTORIAL DE SESIONES</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {sessions.map((s,i) => (
              <div key={i} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",
                background:"#030508",border:"1px solid #0a1220",padding:"9px 14px",
                opacity: Math.max(1 - i*0.07, 0.35),
              }}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#39ff14",flexShrink:0,boxShadow:"0 0 4px #39ff14"}}/>
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:"#7090a0",letterSpacing:1}}>{s.label}</span>
                </div>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <span style={{fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:700,color:"#39ff14",letterSpacing:1}}>{Math.round(s.duration/60)}min</span>
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#3a5060"}}>{s.at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ scores, kpiValues, completed, setTab, setActiveDay }) {
  const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
  const totalKpiTasks = VECTORS.flatMap(v=>v.tasks).length;
  const doneKpiTasks  = VECTORS.flatMap(v=>v.tasks).filter(t=>parseFloat(kpiValues[t.id]||0)>=t.target).length;
  const dayCompletions = DAYS.map(d => ({ day: d, pct: computeDayPct(d, completed), data: SCHEDULE[d] }));
  const physVec = VECTORS.find(v=>v.id==="physical");
  const physScore = computeScore(physVec, kpiValues);
  const trainDays = ["p_lun","p_mar","p_jue","p_vie","p_sab"].filter(id=>parseFloat(kpiValues[id]||0)>0).length;
  const cardioMin = parseFloat(kpiValues["p_cardio"]||0);
  const sleepNights = parseFloat(kpiValues["p_sleep"]||0);
  const nutriDays = parseFloat(kpiValues["p_nutri"]||0);
  const todayWorkout = WORKOUT_SPLIT["lunes"];

  return (
    <div style={{animation:"fadeUp .3s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <div style={{background:"linear-gradient(135deg,#060b14 0%,#0a1220 100%)",border:`1px solid ${getColor(avg)}30`,padding:"20px 24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:`radial-gradient(circle,${getColor(avg)}15,transparent 70%)`}}/>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:6}}>SCORE GLOBAL</div>
          <div style={{fontFamily:"'Barlow Condensed'",fontSize:64,fontWeight:900,color:getColor(avg),lineHeight:.85,letterSpacing:2}}>
            {avg.toFixed(2)}<span style={{fontSize:20,color:"#3a5060"}}>/10</span>
          </div>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:getColor(avg),letterSpacing:2,marginTop:8}}>{getLabel(avg)}</div>
          <div style={{height:3,background:"#0a1220",marginTop:12,position:"relative"}}>
            <div style={{position:"absolute",left:"80%",top:-2,bottom:-2,width:1,background:"#ffd60a",opacity:.5}}/>
            <div style={{height:"100%",width:`${Math.min(avg/10,1)*100}%`,background:`linear-gradient(90deg,#00f5d4,${getColor(avg)})`,transition:"width .5s"}}/>
          </div>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#ffd60a",opacity:.7,marginTop:4}}>▲ TARGET 8.0</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"14px 18px",flex:1}}>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:8}}>TAREAS COMPLETADAS</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
              <div style={{fontFamily:"'Barlow Condensed'",fontSize:40,fontWeight:800,color:"#b48eff",lineHeight:1}}>{doneKpiTasks}</div>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#4a6070",paddingBottom:6}}>/ {totalKpiTasks}</div>
            </div>
            <div style={{height:3,background:"#0a1220",marginTop:8}}>
              <div style={{height:"100%",width:`${(doneKpiTasks/totalKpiTasks)*100}%`,background:"#b48eff",transition:"width .4s"}}/>
            </div>
          </div>
          <div style={{background:"#060b14",border:`1px solid #ff6b3530`,padding:"14px 18px",flex:1,cursor:"pointer"}} onClick={()=>{setActiveDay("LUN");setTab("schedule");}}>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#ff6b35",marginBottom:6}}>HOY · FÍSICO</div>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:700,color:"#dde8f0",letterSpacing:1}}>{todayWorkout.emoji} {todayWorkout.label}</div>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#4a6070",marginTop:4}}>LUN 09 MAR · 75min → ver horario</div>
          </div>
        </div>
      </div>

      <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"18px 20px",marginBottom:12}}>
        <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:14}}>7 VECTORES — PERFORMANCE</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 24px"}}>
          {VECTORS.map((v,i)=>(
            <div key={v.id} style={{cursor:"pointer"}} onClick={()=>setTab("kpis")}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:v.color,boxShadow:`0 0 4px ${v.color}`}}/>
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#7090a0",letterSpacing:1}}>{v.short}</span>
                </div>
                <span style={{fontFamily:"'Barlow Condensed'",fontSize:16,fontWeight:700,color:getColor(scores[i]),letterSpacing:1}}>{scores[i].toFixed(1)}</span>
              </div>
              <div style={{height:4,background:"#0a1220",position:"relative"}}>
                <div style={{height:"100%",width:`${scores[i]*10}%`,background:`linear-gradient(90deg,${v.color}50,${v.color})`,transition:"width .5s"}}/>
                <div style={{position:"absolute",left:"80%",top:-2,bottom:-2,width:1,background:"#ffd60a",opacity:.25}}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#060b14",border:"1px solid #ff6b3540",padding:"18px 20px",marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#ff6b35",boxShadow:"0 0 6px #ff6b35"}}/>
            <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#ff6b35",letterSpacing:2,fontWeight:700}}>FÍSICO — DESGLOSE SEMANAL</span>
          </div>
          <div style={{fontFamily:"'Barlow Condensed'",fontSize:22,fontWeight:700,color:getColor(physScore),letterSpacing:1}}>
            {physScore.toFixed(1)}<span style={{fontSize:10,color:"#4a6070"}}>/10</span>
          </div>
        </div>
        <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:2,color:"#4a6070",marginBottom:8}}>ENTRENAMIENTO SEMANAL</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:14}}>
          {Object.entries(WORKOUT_SPLIT).map(([day,info],idx)=>{
            const dayKeys = ["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];
            const taskIds = ["p_lun","p_mar",null,"p_jue","p_vie","p_sab",null];
            const tid = taskIds[idx];
            const done = tid ? parseFloat(kpiValues[tid]||0)>0 : false;
            const isRest = info.label.includes("Descanso") || info.label.includes("Total");
            return(
              <div key={day} style={{background:done?"#ff6b3515":isRest?"#0a1220":"#050a12",border:`1px solid ${done?"#ff6b3540":isRest?"#0d1825":"#0d1825"}`,padding:"8px 4px",textAlign:"center",cursor:"pointer",transition:"all .15s"}}
                onClick={()=>{setActiveDay(dayKeys[idx]);setTab("schedule");}}>
                <div style={{fontSize:14,marginBottom:3}}>{info.emoji}</div>
                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:done?"#ff6b35":isRest?"#2a3a4e":"#4a6070",letterSpacing:1}}>{dayKeys[idx]}</div>
                {done&&<div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#ff6b35",marginTop:2}}>✓</div>}
              </div>
            );
          })}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {[
            {l:"ENTRENOS",v:`${trainDays}/5`,c:"#ff6b35",sub:"días activos"},
            {l:"CARDIO",v:`${cardioMin}min`,c:"#ff9f1c",sub:"meta 240min"},
            {l:"SUEÑO",v:`${sleepNights}/7`,c:"#b48eff",sub:"noches 7-8h"},
            {l:"NUTRICIÓN",v:`${nutriDays}/7`,c:"#00f5d4",sub:"días trackeados"},
          ].map(m=>(
            <div key={m.l} style={{background:"#050a12",border:"1px solid #0d1825",padding:"10px 12px"}}>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:6,letterSpacing:2,color:"#4a6070",marginBottom:4}}>{m.l}</div>
              <div style={{fontFamily:"'Barlow Condensed'",fontSize:22,fontWeight:700,color:m.c,lineHeight:1}}>{m.v}</div>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#3a5060",marginTop:3}}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"18px 20px",marginBottom:12}}>
        <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:12}}>PROGRESO HORARIO — SEMANA 1</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
          {dayCompletions.map(({day,pct,data})=>(
            <div key={day} style={{cursor:"pointer"}} onClick={()=>{setActiveDay(day);setTab("schedule");}}>
              <div style={{fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:800,color:data.critical?"#ff3860":data.highlight?"#ff6b35":pct>0?"#dde8f0":"#2a3a4e",letterSpacing:1,marginBottom:4}}>{day}</div>
              <div style={{height:40,background:"#050a12",border:"1px solid #0d1825",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:`${pct}%`,background:`linear-gradient(0deg,#00f5d460,#00f5d420)`,transition:"height .4s"}}/>
              </div>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:pct>0?"#00f5d4":"#2a3a4e",marginTop:4,textAlign:"center"}}>{pct}%</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"18px 20px"}}>
        <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:14}}>PROGRAMA FÍSICO — SPLIT SEMANAL</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8}}>
          {Object.entries(WORKOUT_SPLIT).map(([day,info],idx)=>{
            const dayLabels = ["LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES","SÁBADO","DOMINGO"];
            const isRest = info.label.includes("Descanso") || info.label.includes("Total");
            return(
              <div key={day} style={{background:"#050a12",border:`1px solid ${isRest?"#0d1825":"#ff6b3520"}`,padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:isRest?"#2a3a4e":"#ff6b35",letterSpacing:1}}>{dayLabels[idx]}</span>
                  <span style={{fontSize:16}}>{info.emoji}</span>
                </div>
                <div style={{fontFamily:"'Barlow Condensed'",fontSize:16,fontWeight:700,color:isRest?"#3a5060":"#dde8f0",letterSpacing:1,marginBottom:8,lineHeight:1.2}}>{info.label}</div>
                <div style={{display:"flex",flexDirection:"column",gap:2}}>
                  {info.exercises.map((ex,i)=>(
                    <div key={i} style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#4a6070",display:"flex",alignItems:"center",gap:4}}>
                      <span style={{color:isRest?"#2a3a4e":"#ff6b3550",fontSize:8}}>·</span>{ex}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab]             = useState("dashboard");
  const [activeDay, setActiveDay] = useState("LUN");
  const [completed, setCompleted] = useState({});
  const [expanded, setExpanded]   = useState(null);
  const [kpiValues, setKpiValues] = useState({});
  const [openVec, setOpenVec]     = useState(null);
  const [saved, setSaved]         = useState(false);
  const [calorieData, setCalorieData] = useState({});
  const [loaded, setLoaded]       = useState(false);

  // ─── LOAD from storage on mount ───────────────────────────────────────
  React.useEffect(() => {
    async function load() {
      try {
        const r = await window.storage.get('battleos-state');
        if (r && r.value) {
          const s = JSON.parse(r.value);
          if (s.tab)          setTab(s.tab);
          if (s.activeDay)    setActiveDay(s.activeDay);
          if (s.completed)    setCompleted(s.completed);
          if (s.kpiValues)    setKpiValues(s.kpiValues);
          if (s.calorieData)  setCalorieData(s.calorieData);
        }
      } catch(e) { /* first time, no data yet */ }
      setLoaded(true);
    }
    load();
  }, []);

  // ─── SAVE to storage on every change (debounced 600ms) ────────────────
  const saveTimer = React.useRef(null);
  React.useEffect(() => {
    if (!loaded) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set('battleos-state', JSON.stringify({
          tab, activeDay, completed, kpiValues, calorieData
        }));
      } catch(e) {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [tab, activeDay, completed, kpiValues, calorieData, loaded]);

  const scores = VECTORS.map(v => computeScore(v, kpiValues));
  const avg    = scores.reduce((a,b)=>a+b,0)/scores.length;
  const target = 8.0;

  function toggleBlock(key){ setCompleted(p=>({...p,[key]:!p[key]})); }
  function setKpi(id,val){ setKpiValues(p=>({...p,[id]:val})); }

  const day = SCHEDULE[activeDay] || SCHEDULE["LUN"];
  if (!loaded) return (
    <div style={{background:"#020508",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:4,color:"#00f5d4",opacity:.5}}>CARGANDO...</div>
    </div>
  );

  const dayVecMin = {};
  day.blocks.forEach(b=>{ if(b.vec!=="BASE") dayVecMin[b.vec]=(dayVecMin[b.vec]||0)+
    (()=>{ const [sh,sm]=b.time.split(":").map(Number); const [eh,em]=b.end.split(":").map(Number);
      let d=(eh*60+em)-(sh*60+sm); if(d<0)d+=24*60; return d; })(); });

  const totalKpiTasks = VECTORS.flatMap(v=>v.tasks).length;
  const doneKpiTasks  = VECTORS.flatMap(v=>v.tasks).filter(t=>parseFloat(kpiValues[t.id]||0)>=t.target).length;

  return (
    <div style={{background:"#020508",minHeight:"100vh",color:"#c5d0e0",fontFamily:"'IBM Plex Mono','Courier New',monospace"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;700&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1a2535}
        input[type=number]{background:#060b14;border:1px solid #141e2e;color:#c5d0e0;font-family:'IBM Plex Mono',monospace;font-size:12px;padding:7px 10px;width:84px;outline:none;}
        input[type=number]:focus{border-color:#00f5d4;}
        input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .25s ease forwards}
        .tab-btn{background:transparent;border:1px solid #0d1825;color:#4a6070;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:3px;padding:9px 18px;cursor:pointer;transition:all .15s;text-transform:uppercase}
        .tab-btn.on{background:#070d18;border-color:#00f5d4;color:#00f5d4}
        .tab-btn.dash.on{border-color:#ff6b35;color:#ff6b35}
        .tab-btn.cals.on{border-color:#ffd60a;color:#ffd60a}
        .tab-btn.tmr.on{border-color:#00f5d4;color:#00f5d4}
        .day-btn{background:transparent;border:1px solid #0d1825;color:#4a6070;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:2px;padding:7px 12px;cursor:pointer;transition:all .15s;text-transform:uppercase}
        .day-btn:hover{color:#7090a0;border-color:#1a2535}
        .day-btn.on{background:#070d18;border-color:#dde8f0;color:#dde8f0}
        .day-btn.hl{border-color:#ff6b3550;color:#ff6b3580}
        .day-btn.hl.on{border-color:#ff6b35;color:#ff6b35;background:#0a0804}
        .day-btn.cr{border-color:#ff386050;color:#ff386080}
        .day-btn.cr.on{border-color:#ff3860;color:#ff3860;background:#0a0408}
        .block-item{display:flex;gap:0;cursor:pointer;transition:opacity .15s}
        .block-item:hover .bi{filter:brightness(1.2)}
        .block-item.done{opacity:.38}
        .bi{transition:filter .15s}
        .bool-btn{background:#060b14;border:1px solid #141e2e;color:#5a7080;font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:2px;padding:7px 14px;cursor:pointer;transition:all .15s;text-transform:uppercase}
        .bool-btn.on{border-color:#00f5d4;color:#00f5d4;background:rgba(0,245,212,.06)}
        .save-btn{background:transparent;border:1px solid #00f5d4;color:#00f5d4;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:3px;padding:11px 26px;cursor:pointer;text-transform:uppercase;transition:all .15s}
        .save-btn:hover{background:rgba(0,245,212,.06)}
        .save-btn.ok{border-color:#39ff14;color:#39ff14}
        .vec-card{background:#060b14;border:1px solid #0d1825;padding:18px 20px;cursor:pointer;transition:border-color .2s,transform .15s;position:relative;overflow:hidden}
        .vec-card:hover{transform:translateY(-1px)}
        .week-cell{background:#050a12;border:1px solid #0d1825;padding:10px 8px;cursor:pointer;transition:border-color .2s}
        .week-cell:hover{border-color:#1a2535}
      `}</style>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"36px 18px"}}>

        <header style={{borderBottom:"1px solid #0d1825",paddingBottom:24,marginBottom:28,position:"relative"}}>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,letterSpacing:5,color:"#00f5d4",opacity:.7,marginBottom:10}}>
            // PROTOCOLO 0.1% · ARQUITECTO DE RENDIMIENTO · SIN EXCUSAS
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
            <div>
              <h1 style={{fontFamily:"'Barlow Condensed'",fontSize:"clamp(38px,8vw,74px)",fontWeight:900,letterSpacing:5,lineHeight:.88,color:"#dde8f0",textTransform:"uppercase"}}>
                BATTLE OS<br/><span style={{color:"#00f5d4"}}>SEMANA 1</span>
              </h1>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,letterSpacing:4,color:"#3a5060",marginTop:8}}>
                09—15 MAR 2026 · QUITO → MUNDO · 7 VECTORES · TARGET 8.0/10
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,letterSpacing:3,color:"#ff3860",animation:"blink 1s step-end infinite",marginBottom:6}}>● OPERACIONAL</div>
              <div style={{fontFamily:"'Barlow Condensed'",fontSize:28,fontWeight:800,color:getColor(avg),letterSpacing:3,lineHeight:1}}>
                {avg.toFixed(2)}<span style={{fontSize:14,color:"#3a5060"}}>/10</span>
              </div>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:getColor(avg),letterSpacing:1}}>{getLabel(avg)}</div>
            </div>
          </div>
          <div style={{height:3,background:"#0a1220",marginTop:16,position:"relative"}}>
            <div style={{position:"absolute",left:`${target*10}%`,top:-3,bottom:-3,width:1,background:"#ffd60a",opacity:.5}}/>
            <div style={{height:"100%",width:`${Math.min(avg/10,1)*100}%`,background:`linear-gradient(90deg,#00f5d4,${getColor(avg)})`,transition:"width .5s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
            <span style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#3a5060"}}>KPIs: {doneKpiTasks}/{totalKpiTasks} completados</span>
            <span style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#ffd60a",opacity:.7}}>TARGET 8.0 ▲</span>
          </div>
        </header>

        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {[["dashboard","⬛ DASHBOARD","dash"],["schedule","HORARIO",""],["kpis","KPIs / REGISTRO",""],["week","VISTA SEMANA",""],["calories","🔥 CALORÍAS","cals"],["timer","⏱ TIMER","tmr"]].map(([id,lbl,cls])=>(
            <button key={id} className={`tab-btn ${cls} ${tab===id?"on":""}`} onClick={()=>setTab(id)}>{lbl}</button>
          ))}
        </div>

        {tab==="dashboard" && (
          <Dashboard scores={scores} kpiValues={kpiValues} completed={completed} setTab={setTab} setActiveDay={setActiveDay}/>
        )}

        {tab==="schedule" && (
          <div className="fade">
            <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
              {DAYS.map(d=>{
                const data=SCHEDULE[d];
                return(
                  <button key={d} className={`day-btn ${activeDay===d?"on":""} ${data.critical?"cr":data.highlight?"hl":""}`}
                    onClick={()=>setActiveDay(d)}>
                    <div>{d}</div><div style={{fontSize:7,opacity:.55}}>{data.date}</div>
                  </button>
                );
              })}
            </div>

            {day.workout && (
              <div style={{background:"#060b14",border:"1px solid #ff6b3530",borderLeft:"3px solid #ff6b35",padding:"12px 18px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:2,color:"#ff6b35",marginBottom:3}}>
                    {day.workout.rest ? "💤 DESCANSO" : "🏋️ ENTRENAMIENTO"}
                  </div>
                  <div style={{fontFamily:"'Barlow Condensed'",fontSize:22,fontWeight:700,color:day.workout.rest?"#3a5060":"#dde8f0",letterSpacing:2}}>
                    {day.workout.focus}
                  </div>
                </div>
                {!day.workout.rest && (
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Barlow Condensed'",fontSize:36,fontWeight:900,color:"#ff6b35",lineHeight:1}}>{day.workout.duration}<span style={{fontSize:14,color:"#3a5060"}}>min</span></div>
                  </div>
                )}
              </div>
            )}

            <div style={{background:"#060b14",border:"1px solid #0d1825",borderLeft:`3px solid ${day.critical?"#ff3860":day.highlight?"#ff6b35":"#00f5d4"}`,padding:"14px 18px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontFamily:"'Barlow Condensed'",fontSize:28,fontWeight:900,letterSpacing:3,color:day.critical?"#ff3860":day.highlight?"#ff6b35":"#dde8f0"}}>
                  {day.label} — {day.date}
                </div>
                {day.highlight&&<div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:day.critical?"#ff3860":"#ff6b35",marginTop:3}}>{day.highlight}</div>}
                {day.note&&<div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#4a6070",marginTop:3}}>{day.note}</div>}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {Object.entries(dayVecMin).sort((a,b)=>b[1]-a[1]).map(([vec,min])=>(
                  <div key={vec} style={{borderLeft:`2px solid ${V_COLORS[vec]||"#1a2535"}`,paddingLeft:8}}>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#4a6070"}}>{vec}</div>
                    <div style={{fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:700,color:V_COLORS[vec]||"#4a6070",letterSpacing:1,lineHeight:1}}>
                      {Math.round(min/60*10)/10}h
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{height:3,background:"#0a1220",marginBottom:18}}>
              <div style={{height:"100%",width:`${computeDayPct(activeDay,completed)}%`,background:"linear-gradient(90deg,#00f5d4,#39ff14)",transition:"width .4s",boxShadow:"0 0 6px rgba(0,245,212,.4)"}}/>
            </div>

            <div style={{position:"relative"}}>
              <div style={{position:"absolute",left:76,top:0,bottom:0,width:1,background:"#080f18",zIndex:0}}/>
              {day.blocks.map((b,idx)=>{
                const key=`${activeDay}-${idx}`;
                const isDone=completed[key];
                const isExp=expanded===key;
                const color=V_COLORS[b.vec]||"#1a2535";
                const isBase=b.vec==="BASE";
                const isStar=b.label.startsWith("★");
                const isWorkout=b.vec==="FÍSICO";
                const [sh,sm]=b.time.split(":").map(Number);
                const [eh,em]=b.end.split(":").map(Number);
                let dur=(eh*60+em)-(sh*60+sm); if(dur<0)dur+=24*60;

                return(
                  <div key={idx} className={`block-item ${isDone?"done":""}`} style={{marginBottom:2,opacity:isDone?.4:1}}>
                    <div style={{width:72,flexShrink:0,paddingTop:10,textAlign:"right",paddingRight:12,zIndex:1,position:"relative"}}>
                      <span style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:isBase?"#2a3a4e":"#4a6070",fontWeight:isStar?700:400}}>{b.time}</span>
                    </div>
                    <div style={{width:10,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",zIndex:1,position:"relative"}}>
                      <div style={{width:isStar||isWorkout?10:6,height:isStar||isWorkout?10:6,borderRadius:"50%",background:isBase?"#0d1825":color,marginTop:13,flexShrink:0,boxShadow:(isStar||isWorkout)?`0 0 10px ${color}`:"none",border:isBase?"1px solid #1a2535":"none"}}/>
                      <div style={{flex:1,width:1,background:"#080f18"}}/>
                    </div>
                    <div style={{flex:1,marginLeft:8,marginBottom:2}} onClick={()=>setExpanded(isExp?null:key)}>
                      <div className="bi" style={{
                        background:isBase?"#030508":isStar?`${color}10`:isWorkout?`${color}08`:"#060b14",
                        border:`1px solid ${isBase?"#090e18":isStar||isWorkout?color+"40":color+"18"}`,
                        borderLeft:`3px solid ${isBase?"#111a28":color}`,
                        padding:"7px 12px",cursor:"pointer",
                        minHeight:Math.max(dur*.38,32),
                      }}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:isExp?5:0}}>
                              {!isBase&&<span style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:2,color,background:color+"15",padding:"2px 5px",flexShrink:0}}>{b.vec}</span>}
                              <span style={{fontFamily:"'IBM Plex Mono'",fontSize:isStar||isWorkout?11:9,fontWeight:isStar||isWorkout?700:400,color:isBase?"#2a3a4e":isStar||isWorkout?color:"#8aacbf",letterSpacing:.3}}>
                                {b.label}
                              </span>
                            </div>
                            {isExp&&(
                              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:"#5a7890",lineHeight:1.65,marginTop:6,animation:"fadeUp .2s ease"}}>
                                {b.detail}
                                {b.taskRef&&<span style={{color,marginLeft:8,fontSize:8}}>→ KPIs: {b.taskRef}</span>}
                              </div>
                            )}
                          </div>
                          <div style={{flexShrink:0,textAlign:"right"}}>
                            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#2a3a4e"}}>
                              {dur>=60?`${Math.floor(dur/60)}h${dur%60>0?dur%60+"m":""}`:dur+"m"}
                            </div>
                            {!isBase&&(
                              <button onClick={e=>{e.stopPropagation();toggleBlock(key);}}
                                style={{background:isDone?color+"18":"transparent",border:`1px solid ${isDone?color:"#1a2535"}`,color:isDone?color:"#4a6070",fontFamily:"'IBM Plex Mono'",fontSize:7,padding:"3px 7px",cursor:"pointer",marginTop:4,letterSpacing:1,transition:"all .15s"}}>
                                {isDone?"✓":"○"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{marginTop:20,background:"#060b14",border:"1px solid #0d1825",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#4a6070",letterSpacing:2}}>BLOQUES COMPLETADOS: {computeDayPct(activeDay,completed)}%</span>
              <span style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#3a5060"}}>Click bloque = detalles · ○ = marcar hecho</span>
            </div>
          </div>
        )}

        {tab==="kpis" && (
          <div className="fade">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:20}}>
              {[
                {l:"SCORE",v:avg.toFixed(2),u:"/10",c:getColor(avg)},
                {l:"TARGET",v:target.toFixed(1),u:"/10",c:"#ffd60a"},
                {l:"DELTA",v:(avg-5>=0?"+":"")+(avg-5).toFixed(2),u:"",c:avg>=5?"#39ff14":"#ff3860"},
                {l:"TAREAS",v:`${doneKpiTasks}/${totalKpiTasks}`,u:"",c:"#b48eff"},
              ].map(m=>(
                <div key={m.l} style={{background:"#060b14",border:"1px solid #0d1825",padding:"12px 14px"}}>
                  <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:2,color:"#4a6070",marginBottom:4}}>{m.l}</div>
                  <div style={{fontFamily:"'Barlow Condensed'",fontSize:26,fontWeight:700,color:m.c,letterSpacing:2,lineHeight:1}}>
                    {m.v}<span style={{fontSize:11,color:"#3a5060",marginLeft:3}}>{m.u}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"16px 18px",marginBottom:20}}>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,letterSpacing:3,color:"#4a6070",marginBottom:14}}>VECTORES — SCORE / 10</div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {VECTORS.map((v,i)=>(
                  <div key={v.id} style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#4a6070",width:68,flexShrink:0}}>{v.short}</div>
                    <div style={{flex:1,height:5,background:"#0a1220",position:"relative"}}>
                      <div style={{height:"100%",width:`${scores[i]*10}%`,background:`linear-gradient(90deg,${v.color}60,${v.color})`,transition:"width .5s"}}/>
                      <div style={{position:"absolute",left:`${target*10}%`,top:-3,bottom:-3,width:1,background:"#ffd60a",opacity:.35}}/>
                    </div>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:11,fontWeight:700,color:v.color,width:30,textAlign:"right"}}>{scores[i].toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:10,marginBottom:20}}>
              {VECTORS.map(v=>{
                const score=computeScore(v,kpiValues);
                const isOpen=openVec===v.id;
                return(
                  <div key={v.id} className="vec-card" style={{borderColor:isOpen?v.color+"40":"#0d1825"}}>
                    <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:v.color,boxShadow:`0 0 8px ${v.color}50`}}/>
                    <div onClick={()=>setOpenVec(isOpen?null:v.id)} style={{paddingLeft:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
                            <div style={{width:6,height:6,borderRadius:"50%",background:v.color,boxShadow:`0 0 5px ${v.color}`}}/>
                            <span style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:v.color,letterSpacing:1,fontWeight:700}}>{v.short}</span>
                          </div>
                          <div style={{fontSize:10,color:"#4a6070",paddingLeft:13}}>{v.tasks.length} métricas</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"'Barlow Condensed'",fontSize:30,fontWeight:700,color:getColor(score),letterSpacing:1,lineHeight:1}}>{score.toFixed(1)}</div>
                          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:getColor(score),letterSpacing:1}}>{getLabel(score)}</div>
                        </div>
                      </div>
                      <div style={{height:3,background:"#0a1220",marginTop:10,marginBottom:isOpen?10:0}}>
                        <div style={{height:"100%",width:`${score*10}%`,background:v.color,transition:"width .4s"}}/>
                      </div>
                    </div>
                    {isOpen&&(
                      <div className="fade" style={{paddingLeft:8}} onClick={e=>e.stopPropagation()}>
                        {v.tasks.map(task=>{
                          const val=kpiValues[task.id]||"";
                          const prog=Math.min((parseFloat(val||0)/task.target)*100,100);
                          const done=prog>=100;
                          return(
                            <div key={task.id} style={{background:"#030508",border:`1px solid ${done?v.color+"30":"#0a1220"}`,padding:"12px 14px",marginBottom:7}}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8,gap:8}}>
                                <div style={{flex:1}}>
                                  <div style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:done?v.color:"#dde8f0",marginBottom:3,display:"flex",alignItems:"center",gap:5}}>
                                    {done&&<span style={{color:v.color}}>✓</span>}{task.label}
                                  </div>
                                  <div style={{fontSize:9,color:"#4a6070",lineHeight:1.5}}>{task.note}</div>
                                </div>
                                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:v.color,flexShrink:0,textAlign:"right"}}>
                                  TARGET<br/>{task.target}{task.unit?" "+task.unit:""}
                                </div>
                              </div>
                              {task.type==="boolean"?(
                                <button className={`bool-btn ${val==="1"?"on":""}`}
                                  style={val==="1"?{borderColor:v.color,color:v.color,background:`${v.color}08`}:{}}
                                  onClick={()=>setKpi(task.id,val==="1"?"0":"1")}>
                                  {val==="1"?"✓ COMPLETADO":"○ PENDIENTE"}
                                </button>
                              ):(
                                <div style={{display:"flex",alignItems:"center",gap:10}}>
                                  <input type="number" min="0" step={task.type==="hours"?"0.5":"1"}
                                    value={val} placeholder="0" onChange={e=>setKpi(task.id,e.target.value)}/>
                                  <div style={{flex:1,height:4,background:"#0a1220"}}>
                                    <div style={{height:"100%",width:`${prog}%`,background:done?v.color:`${v.color}70`,transition:"width .3s"}}/>
                                  </div>
                                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:9,color:done?v.color:"#4a6070",width:32,textAlign:"right",fontWeight:done?700:400}}>
                                    {Math.round(prog)}%
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:20}}>
              <button className={`save-btn ${saved?"ok":""}`}
                onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}}>
                {saved?"✓ REGISTRADO — SIGUE TRABAJANDO":"GUARDAR PROGRESO"}
              </button>
            </div>
          </div>
        )}

        {tab==="week" && (
          <div className="fade">
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8,marginBottom:20}}>
              {DAYS.map(d=>{
                const data=SCHEDULE[d]; const pct=computeDayPct(d,completed);
                const vecMap=data.blocks.reduce((acc,b)=>{
                  if(b.vec!=="BASE"){const[sh,sm]=b.time.split(":").map(Number);const[eh,em]=b.end.split(":").map(Number);let dur=(eh*60+em)-(sh*60+sm);if(dur<0)dur+=24*60;acc[b.vec]=(acc[b.vec]||0)+dur;}return acc;},{});
                return(
                  <div key={d} className="week-cell"
                    style={{borderColor:d===activeDay?"#00f5d4":data.critical?"#ff386040":data.highlight?"#ff6b3540":"#0d1825"}}
                    onClick={()=>{setActiveDay(d);setTab("schedule");}}>
                    <div style={{fontFamily:"'Barlow Condensed'",fontSize:20,fontWeight:800,letterSpacing:2,color:data.critical?"#ff3860":data.highlight?"#ff6b35":"#4a6070"}}>{d}</div>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#2a3a4e",marginBottom:4}}>{data.date}</div>
                    {data.workout&&(
                      <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#ff6b3580",marginBottom:6,lineHeight:1.4}}>{data.workout.focus}</div>
                    )}
                    {data.highlight&&<div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:data.critical?"#ff3860":"#ff6b35",marginBottom:4,lineHeight:1.4}}>{data.highlight}</div>}
                    {Object.entries(vecMap).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([vec,min])=>(
                      <div key={vec} style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
                        <div style={{width:3,height:3,borderRadius:"50%",background:V_COLORS[vec]||"#2d3a4e",flexShrink:0}}/>
                        <span style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#3a5060"}}>{vec.slice(0,5)} {Math.round(min/60*10)/10}h</span>
                      </div>
                    ))}
                    <div style={{height:2,background:"#0a1220",marginTop:6}}>
                      <div style={{height:"100%",width:`${pct}%`,background:"#00f5d4",transition:"width .4s"}}/>
                    </div>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:pct>0?"#00f5d4":"#2a3a4e",marginTop:2}}>{pct}%</div>
                  </div>
                );
              })}
            </div>
            <div style={{background:"#060b14",border:"1px solid #0d1825",padding:"18px 20px",marginBottom:16}}>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#4a6070",marginBottom:14}}>TOTALES SEMANALES</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12}}>
                {Object.entries(
                  Object.values(SCHEDULE).flatMap(d=>d.blocks).reduce((acc,b)=>{
                    if(b.vec!=="BASE"){const[sh,sm]=b.time.split(":").map(Number);const[eh,em]=b.end.split(":").map(Number);let dur=(eh*60+em)-(sh*60+sm);if(dur<0)dur+=24*60;acc[b.vec]=(acc[b.vec]||0)+dur;}return acc;},{})
                ).sort((a,b)=>b[1]-a[1]).map(([vec,min])=>(
                  <div key={vec} style={{borderLeft:`2px solid ${V_COLORS[vec]||"#2d3a4e"}`,paddingLeft:10}}>
                    <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#4a6070",marginBottom:3}}>{vec}</div>
                    <div style={{fontFamily:"'Barlow Condensed'",fontSize:24,fontWeight:700,color:V_COLORS[vec]||"#3a5060",letterSpacing:1,lineHeight:1}}>
                      {Math.round(min/60*10)/10}<span style={{fontSize:11,color:"#3a5060"}}>h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:"#060b14",border:"1px solid #ff6b3520",padding:"18px 20px"}}>
              <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,letterSpacing:3,color:"#ff6b35",marginBottom:12}}>SPLIT FÍSICO SEMANAL</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
                {Object.entries(WORKOUT_SPLIT).map(([day,info],idx)=>{
                  const isRest=info.label.includes("Descanso")||info.label.includes("Total");
                  return(
                    <div key={day} style={{textAlign:"center",padding:"10px 4px",background:"#050a12",border:`1px solid ${isRest?"#0d1825":"#ff6b3525"}`}}>
                      <div style={{fontSize:18,marginBottom:4}}>{info.emoji}</div>
                      <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:isRest?"#2a3a4e":"#ff6b3580",lineHeight:1.4}}>{info.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab==="calories" && (
          <CalorieTracker calorieData={calorieData} setCalorieData={setCalorieData} />
        )}

        {tab==="timer" && (
          <PomodoroTimer />
        )}

        <footer style={{borderTop:"1px solid #0d1825",paddingTop:18,marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'IBM Plex Mono'",fontSize:8,color:"#2a3a4e",lineHeight:2,fontStyle:"italic"}}>
            "Disciplina es hacer lo que tienes que hacer,<br/>cuando tienes que hacerlo, aunque no quieras."
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:800,color:"#2a3a4e",letterSpacing:4}}>SEMANA 1 DE 520</div>
            <div style={{fontFamily:"'IBM Plex Mono'",fontSize:7,color:"#1a2535",marginTop:2}}>AUDITORÍA DOM 15 MAR · 23:59 ECT</div>
          </div>
        </footer>

      </div>
    </div>
  );
}
