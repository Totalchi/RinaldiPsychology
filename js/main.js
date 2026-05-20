/* Ester Rinaldi — Clinical Psychologist · main.js */

/* ── Supabase config ── */
const ER_CONFIG = {
  supabaseUrl:     'https://lxcgetwiaawieqyqxaqk.supabase.co',
  supabaseAnonKey: 'sb_publishable_ilYSvYBWI2QlEVvsgGwb9w_Fz9tQE3s',
};
const _erSb = (typeof supabase !== 'undefined' && ER_CONFIG.supabaseUrl && ER_CONFIG.supabaseAnonKey)
  ? supabase.createClient(ER_CONFIG.supabaseUrl, ER_CONFIG.supabaseAnonKey)
  : null;

function _erSession() {
  let id = sessionStorage.getItem('er_sid');
  if (!id) { id = Math.random().toString(36).slice(2); sessionStorage.setItem('er_sid', id); }
  return id;
}
function _erBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}
function _erOs() {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'Mac';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('Linux')) return 'Linux';
  return 'Other';
}
async function _erTrack(extraGeo) {
  if (!_erSb) return;
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const row = {
    page, event_type: 'pageview',
    session_id: _erSession(),
    browser: _erBrowser(), os: _erOs(),
    referrer: document.referrer || null,
    ...extraGeo,
  };
  _erSb.from('analytics_events').insert(row).then(() => {});
}

// Track pageview — optionally with geo from ipapi.co
(async () => {
  try {
    const r = await fetch('https://ipapi.co/json/');
    if (r.ok) {
      const g = await r.json();
      _erTrack({ lat: g.latitude, lng: g.longitude, city: g.city, region: g.region, country: g.country_name });
    } else { _erTrack({}); }
  } catch { _erTrack({}); }
})();

/* ── Translations ── */
const T = {
  en: {
    'nav.home':        'Home',
    'nav.about':       'About',
    'nav.services':    'Services',
    'nav.appointment': 'Book a session',
    'hero.badge1':     'Clinical Psychologist',
    'hero.badge2':     'CBT & ACT',
    'hero.badge3':     'Online & In-person',
    'hero.title':      'A space to heal.<br>A mind at <em>peace</em>.',
    'hero.sub':        'I\'m Ester, a clinical psychologist dedicated to helping you navigate life\'s challenges with warmth and evidence-based care. You deserve to feel heard.',
    'hero.cta1':       'Book a session',
    'hero.cta2':       'Learn more',
    'hero.stat1.n':    '50′',
    'hero.stat1.l':    'Session length',
    'hero.stat2.n':    'CBT',
    'hero.stat2.l':    'Primary approach',
    'hero.stat3.n':    '2',
    'hero.stat3.l':    'Formats available',
    'hero.app1':       'Evidence-based therapy',
    'hero.app2':       'Compassionate, non-judgmental space',
    'hero.app3':       'Tailored to your unique needs',
    'services.label':  'What I offer',
    'services.title':  'How I can help you',
    'services.sub':    'Every person\'s journey is different. I offer focused support across the areas where people most often need care.',
    'svc1.title':      'Anxiety & Depression',
    'svc1.desc':       'Practical, evidence-based tools to understand and manage anxiety, panic, and low mood. Together we\'ll build clarity, resilience, and joy.',
    'svc2.title':      'Life Transitions & Burnout',
    'svc2.desc':       'Career changes, grief, relationship shifts, exhaustion. Therapy helps you process these moments and move forward with confidence.',
    'svc3.title':      'Personal Growth',
    'svc3.desc':       'Stronger self-esteem, clearer values, better boundaries. Growth-focused therapy to help you become who you want to be.',
    'svc4.title':      'Psychological Assessment',
    'svc4.desc':       'Thorough, insightful evaluations to bring clarity on mental health, diagnosis, and cognitive strengths. A clear roadmap for your wellbeing.',
    'about.label':     'About Ester',
    'about.title':     'Who I am',
    'about.p1':        'Hello, I\'m Ester Rinaldi, a clinical psychologist with a genuine passion for helping people discover their inner strength. I recently completed my training and am building my practice with a deep commitment to creating a safe, judgment-free space where you can truly be yourself.',
    'about.p2':        'I use an integrative approach combining Cognitive Behavioral Therapy (CBT) and Acceptance and Commitment Therapy (ACT) — tailored to what works best for you. Whether facing anxiety, depression, burnout, or seeking personal growth, I meet you where you are.',
    'about.p3':        'What drives my work is simple: everyone deserves compassionate, accessible care. You don\'t need to have reached a crisis point to seek support. Choosing therapy is one of the most courageous decisions you can make.',
    'about.cta':       'More about me',
    'faq.label':       'Common questions',
    'faq.title':       'What you might be wondering',
    'faq.q1':          'Is therapy right for me?',
    'faq.a1':          'Therapy isn\'t just for crisis moments — it\'s for anyone who wants to feel better, understand themselves more deeply, or make positive changes. You don\'t need a diagnosis to benefit. If you\'re feeling stuck or overwhelmed, that\'s enough reason to reach out.',
    'faq.q2':          'How long does therapy take?',
    'faq.a2':          'This varies person-to-person. Some people see real progress in 8–12 sessions; others benefit from longer-term work. We\'ll discuss your goals in our first meeting and create a plan that fits you.',
    'faq.q3':          'Will I be judged?',
    'faq.a3':          'Absolutely not. My role is to listen without judgment — only with curiosity and compassion. Everything you share is confidential. Your honesty is what makes real change possible.',
    'faq.q4':          'Online or in-person?',
    'faq.a4':          'I offer both. Online therapy is just as effective as in-person work, and many people find it more convenient. We\'ll figure out what works best for you.',
    'faq.q5':          'What if we\'re not a good fit?',
    'faq.a5':          'Our first session is about getting to know each other. If for any reason you feel we\'re not aligned, I\'ll support you in finding another therapist. Your comfort matters most.',
    'cta.title':       'Ready to take the next step?',
    'cta.sub':         'I have availability for new clients. Sessions are 50 minutes, online or in-person.',
    'cta.btn':         'Book your first session',
    'footer.desc':     'Clinical psychologist specialising in anxiety, depression, life transitions, and personal growth. Warm, evidence-based care.',
    'footer.nav':      'Navigation',
    'footer.contact':  'Contact',
    'cookie.p':        'This site uses essential cookies. <a href="#">Privacy policy</a>.',
    'cookie.btn':      'Accept',

    /* ── About page ── */
    'about.ph.label':       'About Ester',
    'about.ph.title':       'A psychologist who <em>truly listens</em>.',
    'about.ph.lead':        'With rigorous clinical training and a warm personal approach, I guide people through life\'s challenges toward authentic, lasting wellbeing.',
    'about.cta2':           'Book an introductory session',
    'about.v1.title':       'Evidence-based approach',
    'about.v1.desc':        'CBT and ACT integrated and tailored to your individual needs, using interventions grounded in up-to-date scientific research.',
    'about.v2.title':       'Non-judgmental space',
    'about.v2.desc':        'A safe, confidential and welcoming environment where you can express yourself freely. Your privacy is absolute.',
    'about.v3.title':       'Collaborative',
    'about.v3.desc':        'I\'m not an expert who tells you what to do. We work together as partners toward your goals.',
    'about.v4.title':       'Accessible',
    'about.v4.desc':        'Everyone deserves quality psychological support. I offer online and in-person sessions to fit around your life.',
    'about.approach.label': 'My approach',
    'about.approach.title': 'How I work with you',
    'about.approach.sub':   'Each session is a living space where theory and practice come together in service of your personal growth.',
    'about.cbt.title':      'CBT — Cognitive Behavioural Therapy',
    'about.cbt.desc':       'CBT is one of the most studied and validated treatments for anxiety, depression and many other difficulties. It is based on the idea that thoughts, emotions and behaviours are interconnected: by modifying dysfunctional thinking patterns, emotional wellbeing and behaviour can improve. Sessions are structured, goal-oriented and often include practical exercises for daily life.',
    'about.act.title':      'ACT — Acceptance and Commitment Therapy',
    'about.act.desc':       'ACT belongs to the third wave of cognitive and behavioural therapies. Rather than fighting difficult thoughts and feelings, ACT teaches you to accept them with awareness and flexibility, and to choose actions aligned with your deepest values. The result is a richer, more meaningful life — not the absence of pain, but the ability to move toward what truly matters.',
    'about.quote':          '"My goal is not to become indispensable to you, but to give you the tools to flourish on your own."',
    'about.quote.attr':     '— Ester Rinaldi, Clinical Psychologist',

    /* ── Services page ── */
    'svc.ph.title':         'How I can <em>help you</em>.',
    'svc.ph.lead':          'I offer tailored support for your needs. Whether you are going through a difficult time or simply want to grow, there is a path designed for you.',
    'svc1.badge':           'Most requested',
    'svc1.long1':           'Anxiety and depression are among the most common difficulties, yet they are often lived in silence and solitude. Anxiety can manifest as constant worry, panic attacks, physical tension or avoidance of everyday situations. Depression brings heaviness, loss of motivation, emptiness and difficulty finding joy in things you once loved.',
    'svc1.long2':           'Through CBT, we work together to identify and restructure the negative automatic thoughts that fuel these states. With ACT, you learn to develop a different relationship with difficult emotions — not to eliminate them, but to stop being ruled by them.',
    'svc1.exp1':            'Personalised assessment of your thinking and behaviour patterns',
    'svc1.exp2':            'Practical anxiety management techniques applicable in daily life',
    'svc1.exp3':            'A structured path with clear and measurable goals',
    'svc2.long1':           'Life is made of changes — some chosen, others not. A career change, the end of a relationship, relocation, the loss of a loved one, entering a new life phase: these transitions can deeply destabilise us. Burnout is the result of chronic unmanaged stress that depletes physical, emotional and cognitive resources.',
    'svc2.long2':           'In therapy we create a space to process losses and changes, rediscover identity in a new context and build concrete tools for resilience. Working on burnout also means reconnecting with your values and boundaries, learning to say no and to care for yourself without guilt.',
    'svc2.exp1':            'Guided, safe emotional processing of transitions and losses',
    'svc2.exp2':            'Strategies to recover energy, motivation and sense of direction',
    'svc2.exp3':            'Realignment with your values to guide future choices',
    'svc3.long1':           'You don\'t need to be struggling to start therapy. Many people choose psychological support because they want to know themselves better, improve their relationships, strengthen self-esteem or simply become the best version of themselves. Personal growth is a continuous, courageous process.',
    'svc3.long2':           'In this work we address limiting beliefs, recurring relational patterns that cause suffering, and the ability to establish healthy boundaries. Authentic self-esteem is not built by ignoring your limitations, but by learning to fully accept yourself while working toward desired change.',
    'svc3.exp1':            'Exploration of beliefs about yourself and identification of limiting patterns',
    'svc3.exp2':            'Work on boundaries, assertiveness and relationship quality',
    'svc3.exp3':            'Building stable self-esteem rooted in your own values',
    'svc4.long1':           'Sometimes the main difficulty is not finding support, but understanding precisely what is happening. Psychological assessment is a structured process that uses clinical interviews and standardised psychometric tools to analyse a person\'s emotional, cognitive and behavioural functioning.',
    'svc4.long2':           'The outcome of the assessment is a clear and detailed report providing a map of your psychological profile: strengths, areas of vulnerability, possible diagnoses and recommendations for the most appropriate support path.',
    'svc4.exp1':            'In-depth clinical interviews and administration of validated psychometric tests',
    'svc4.exp2':            'Clear and detailed final report with your psychological profile',
    'svc4.exp3':            'Specific guidance for a therapeutic path or support resources',
    'svc.cta':              'Talk to me →',
    'svc.expect.title':     'What you can expect',
    'svc.how.label':        'How I work',
    'svc.how.title':        'My method',
    'svc.how.sub':          'Every path is unique, but my way of working follows clear principles: respect, collaboration and research-validated tools.',
    'svc.how1.title':       'Free initial consultation',
    'svc.how1.desc':        'Our first meeting is a getting-to-know-you conversation with no commitment. We talk about what you\'re experiencing, your goals and how I could help. We decide together whether to continue.',
    'svc.how2.title':       'Assessment and therapy plan',
    'svc.how2.desc':        'In the first sessions I explore your history, needs and resources. Together we build a working plan with clear, measurable goals.',
    'svc.how3.title':       'Regular sessions (CBT + ACT)',
    'svc.how3.desc':        'Each 50-minute session combines reflection, practical exercises and new skill development. Weekly or biweekly, online or in person.',
    'svc.how4.title':       'Ongoing review and ending',
    'svc.how4.desc':        'We regularly monitor progress and adapt the path. Therapy has an end: we work toward your autonomy, not your dependence.',

    /* ── Appointment page ── */
    'appt.ph.label':        'Book',
    'appt.ph.title':        'Start your <em>journey</em>.',
    'appt.ph.lead':         'The first step is the bravest. I am here to welcome you with care and without judgement.',
    'appt.info.label':      'Practical information',
    'appt.info.title':      'How it works',
    'appt.d1.label':        'Individual session',
    'appt.d1.val':          '50 minutes per session',
    'appt.d2.label':        'Frequency',
    'appt.d2.val':          'Weekly or biweekly',
    'appt.d3.label':        'Format',
    'appt.d3.val':          'Online (secure video) and in person',
    'appt.d4.label':        'Response',
    'appt.d4.val':          'Within 48 working hours',
    'appt.d5.label':        'First consultation',
    'appt.d5.val':          'Free and no commitment',
    'appt.d6.label':        'Email',
    'appt.form.title':      'Request an appointment',
    'appt.form.free':       'Free first consultation',
    'appt.form.sub':        'Fill in the form and I\'ll get back to you within 48 hours.',
    'appt.f.nome':          'First name *',
    'appt.f.nome.ph':       'E.g. Maria',
    'appt.f.cognome':       'Last name',
    'appt.f.cognome.ph':    'E.g. Rossi',
    'appt.f.email':         'Email *',
    'appt.f.email.ph':      'name@email.com',
    'appt.f.tel':           'Phone',
    'appt.f.tel.ph':        '+39 000 000 0000',
    'appt.f.motivo':        'Reason for request',
    'appt.f.motivo.default':'Select an area (optional)',
    'appt.f.motivo.1':      'Anxiety and stress',
    'appt.f.motivo.2':      'Depression and low mood',
    'appt.f.motivo.3':      'Life transitions and burnout',
    'appt.f.motivo.4':      'Personal growth and self-esteem',
    'appt.f.motivo.5':      'Psychological assessment',
    'appt.f.motivo.6':      'Other',
    'appt.f.msg':           'Message',
    'appt.f.msg.ph':        'Briefly tell me what you\'re experiencing or what you\'re looking for. It\'s not required, but it helps me prepare for our first meeting.',
    'appt.f.privacy':       'I have read and accept the <a href="#">privacy policy</a> under GDPR. My data will be used solely to manage this appointment request.',
    'appt.form.success':    'Thank you! I\'ve received your request and will reply within 48 hours. See you soon.',
    'appt.tiles.label':     'Everything you need to know',
    'appt.tiles.title':     'Sessions at a glance',
    'appt.tile1.label':     'Duration',
    'appt.tile1.val':       '50 minutes',
    'appt.tile1.sub':       'Each individual session is a standard 50 minutes long. Punctuality helps us make the most of our time together.',
    'appt.tile2.label':     'Frequency',
    'appt.tile2.val':       '1–2 times / week',
    'appt.tile2.sub':       'In the early phase of the process we usually meet once a week. Frequency adapts as progress is made.',
    'appt.tile3.label':     'Confidentiality',
    'appt.tile3.val':       '100% confidential',
    'appt.tile3.sub':       'Professional secrecy is guaranteed by law and professional ethics. What you share remains strictly confidential.',
    'appt.cta.email':       'Write directly to Ester',
  },
  it: {
    'nav.home':        'Home',
    'nav.about':       'Chi sono',
    'nav.services':    'Servizi',
    'nav.appointment': 'Prenota una sessione',
    'hero.badge1':     'Psicologa Clinica',
    'hero.badge2':     'CBT & ACT',
    'hero.badge3':     'Online & In presenza',
    'hero.title':      'Uno spazio per guarire.<br>Una mente in <em>pace</em>.',
    'hero.sub':        'Sono Ester, una psicologa clinica dedicata ad aiutarti ad affrontare le sfide della vita con calore e interventi fondati su prove scientifiche. Meriti di sentirti ascoltata.',
    'hero.cta1':       'Prenota una sessione',
    'hero.cta2':       'Scopri di più',
    'hero.stat1.n':    '50′',
    'hero.stat1.l':    'Durata sessione',
    'hero.stat2.n':    'CBT',
    'hero.stat2.l':    'Approccio principale',
    'hero.stat3.n':    '2',
    'hero.stat3.l':    'Formati disponibili',
    'hero.app1':       'Terapia basata su prove scientifiche',
    'hero.app2':       'Spazio sicuro e senza giudizio',
    'hero.app3':       'Adattata alle tue esigenze uniche',
    'services.label':  'Cosa offro',
    'services.title':  'Come posso aiutarti',
    'services.sub':    'Il percorso di ogni persona è diverso. Offro supporto mirato nelle aree in cui le persone hanno più spesso bisogno di cura.',
    'svc1.title':      'Ansia e Depressione',
    'svc1.desc':       'Strumenti pratici e basati su prove per comprendere e gestire ansia, panico e umore basso. Insieme costruiremo chiarezza, resilienza e gioia.',
    'svc2.title':      'Transizioni e Burnout',
    'svc2.desc':       'Cambiamenti di carriera, lutto, fine di relazioni, esaurimento. La terapia ti aiuta a elaborare questi momenti e ad andare avanti con fiducia.',
    'svc3.title':      'Crescita Personale',
    'svc3.desc':       'Maggiore autostima, valori più chiari, confini più forti. Terapia focalizzata sulla crescita per aiutarti a diventare chi vuoi essere.',
    'svc4.title':      'Valutazione Psicologica',
    'svc4.desc':       'Valutazioni approfondite per fare chiarezza sulla salute mentale, diagnosi e punti di forza cognitivi. Una chiara roadmap per il tuo benessere.',
    'about.label':     'Chi è Ester',
    'about.title':     'Chi sono',
    'about.p1':        'Ciao, sono Ester Rinaldi, una psicologa clinica con una vera passione nell\'aiutare le persone a scoprire la propria forza interiore. Ho recentemente completato la mia formazione e sto costruendo la mia pratica con un profondo impegno nel creare uno spazio sicuro e senza giudizio.',
    'about.p2':        'Utilizzo un approccio integrativo che combina la Terapia Cognitivo-Comportamentale (CBT) e l\'Acceptance and Commitment Therapy (ACT), personalizzato per ciò che funziona meglio per te. Che tu stia affrontando ansia, depressione, burnout o cerchi crescita personale, ti incontro dove sei.',
    'about.p3':        'Ciò che guida il mio lavoro è semplice: tutti meritano cure compassionevoli e accessibili. Non devi aver raggiunto un punto di crisi per cercare supporto. Scegliere la terapia è una delle decisioni più coraggiose che puoi prendere.',
    'about.cta':       'Scopri di più',
    'faq.label':       'Domande frequenti',
    'faq.title':       'Cosa potresti chiederti',
    'faq.q1':          'La terapia fa per me?',
    'faq.a1':          'La terapia non è solo per momenti di crisi — è per chiunque voglia sentirsi meglio, capirsi più profondamente o fare cambiamenti positivi. Non hai bisogno di una diagnosi per beneficiarne. Se ti senti bloccata o sopraffatta, questo è motivo sufficiente.',
    'faq.q2':          'Quanto dura la terapia?',
    'faq.a2':          'Varia da persona a persona. Alcune persone vedono progressi reali in 8–12 sessioni; altre beneficiano di un lavoro più a lungo termine. Discuteremo i tuoi obiettivi nel primo incontro e creeremo un piano adatto a te.',
    'faq.q3':          'Sarò giudicata?',
    'faq.a3':          'Assolutamente no. Il mio ruolo è ascoltare senza giudizio — solo con curiosità e compassione. Tutto ciò che condividi è riservato. La tua onestà è ciò che rende possibile il vero cambiamento.',
    'faq.q4':          'Online o in presenza?',
    'faq.a4':          'Offro entrambe le opzioni. La terapia online è altrettanto efficace di quella in presenza, e molte persone la trovano più comoda. Capiremo insieme cosa funziona meglio per te.',
    'faq.q5':          'E se non siamo compatibili?',
    'faq.a5':          'La nostra prima sessione serve a conoscerci. Se per qualunque motivo senti che non siamo allineate, ti supporterò nel trovare un altro terapeuta. Il tuo comfort conta di più.',
    'cta.title':       'Pronta a fare il prossimo passo?',
    'cta.sub':         'Ho disponibilità per nuovi clienti. Le sessioni durano 50 minuti, online o in presenza.',
    'cta.btn':         'Prenota la tua prima sessione',
    'footer.desc':     'Psicologa clinica specializzata in ansia, depressione, transizioni di vita e crescita personale. Cura calda e basata su prove scientifiche.',
    'footer.nav':      'Navigazione',
    'footer.contact':  'Contatti',
    'cookie.p':        'Questo sito utilizza cookie essenziali. <a href="#">Informativa sulla privacy</a>.',
    'cookie.btn':      'Accetta',

    /* ── About page ── */
    'about.ph.label':       'Chi è Ester',
    'about.ph.title':       'Una psicologa che <em>ti ascolta davvero</em>.',
    'about.ph.lead':        'Con formazione clinica rigorosa e un approccio caldo e personale, accompagno le persone attraverso le sfide della vita verso un benessere autentico e duraturo.',
    'about.cta2':           'Prenota una sessione conoscitiva',
    'about.v1.title':       'Approccio evidence-based',
    'about.v1.desc':        'CBT e ACT integrati e adattati alle tue esigenze individuali, con interventi fondati su ricerca scientifica aggiornata.',
    'about.v2.title':       'Spazio senza giudizio',
    'about.v2.desc':        'Un ambiente sicuro, riservato e accogliente dove puoi esprimerti liberamente. La riservatezza è assoluta.',
    'about.v3.title':       'Collaborativa',
    'about.v3.desc':        'Non sono una esperta che ti dice cosa fare. Lavoriamo insieme come partner verso i tuoi obiettivi.',
    'about.v4.title':       'Accessibile',
    'about.v4.desc':        'Ogni persona merita supporto psicologico di qualità. Offro sessioni online e in presenza per adattarmi alla tua vita.',
    'about.approach.label': 'Il mio approccio',
    'about.approach.title': 'Come lavoro con te',
    'about.approach.sub':   'Ogni seduta è uno spazio vivo, dove teoria e pratica si fondono al servizio della tua crescita personale.',
    'about.cbt.title':      'CBT — Terapia Cognitivo-Comportamentale',
    'about.cbt.desc':       'La CBT è uno dei trattamenti più studiati e validati per ansia, depressione e molti altri disturbi. Si basa sull\'idea che pensieri, emozioni e comportamenti siano interconnessi: modificando i pattern di pensiero disfunzionali è possibile migliorare il benessere emotivo e il comportamento. Le sedute sono strutturate, orientate agli obiettivi e spesso includono esercizi pratici da svolgere nella vita quotidiana.',
    'about.act.title':      'ACT — Acceptance and Commitment Therapy',
    'about.act.desc':       'L\'ACT appartiene alla terza generazione delle terapie cognitive e comportamentali. Piuttosto che combattere pensieri e sensazioni difficili, l\'ACT ti insegna ad accettarli con consapevolezza e flessibilità, e a scegliere azioni in linea con i tuoi valori profondi. Il risultato è una vita più ricca e significativa, anche in presenza di difficoltà.',
    'about.quote':          '"Il mio obiettivo non è diventare indispensabile per te, ma darti gli strumenti per fiorire da solo."',
    'about.quote.attr':     '— Ester Rinaldi, Psicologa Clinica',

    /* ── Services page ── */
    'svc.ph.title':         'Come posso <em>aiutarti</em>.',
    'svc.ph.lead':          'Offro un supporto su misura per le tue esigenze. Che tu stia attraversando un momento difficile o voglia semplicemente crescere, c\'è un percorso pensato per te.',
    'svc1.badge':           'Più richiesto',
    'svc1.long1':           'Ansia e depressione sono tra le difficoltà più diffuse, eppure spesso vissute in silenzio e solitudine. L\'ansia può manifestarsi come preoccupazione costante, attacchi di panico, tensione fisica o evitamento di situazioni quotidiane. La depressione porta con sé pesantezza, perdita di motivazione, senso di vuoto e difficoltà a trovare gioia nelle cose che una volta amavi.',
    'svc1.long2':           'Attraverso la CBT, lavoriamo insieme per identificare e ristrutturare i pensieri automatici negativi che alimentano questi stati. Con l\'ACT, impari a sviluppare una relazione diversa con le emozioni difficili — non per eliminarle, ma per non lasciarti dominare da loro.',
    'svc1.exp1':            'Valutazione personalizzata dei tuoi schemi di pensiero e comportamento',
    'svc1.exp2':            'Tecniche pratiche di gestione dell\'ansia applicabili nella vita quotidiana',
    'svc1.exp3':            'Un percorso strutturato con obiettivi chiari e verificabili nel tempo',
    'svc2.long1':           'La vita è fatta di cambiamenti — alcuni scelti, altri subiti. Un cambio di lavoro, la fine di una relazione, un trasloco, la perdita di una persona cara: queste transizioni possono destabilizzarci profondamente. Il burnout, invece, è il risultato di uno stress cronico non gestito.',
    'svc2.long2':           'In terapia creiamo uno spazio per elaborare le perdite e i cambiamenti, ritrovare l\'identità in un contesto nuovo e costruire strumenti concreti per la resilienza. Lavorare sul burnout significa anche riconnettersi con i propri valori e confini.',
    'svc2.exp1':            'Elaborazione emotiva delle transizioni e delle perdite in modo guidato e sicuro',
    'svc2.exp2':            'Strategie per recuperare energia, motivazione e senso di direzione',
    'svc2.exp3':            'Riallineamento con i propri valori per orientare le scelte future',
    'svc3.long1':           'Non occorre stare "male" per iniziare la terapia. Molte persone scelgono un percorso psicologico perché vogliono conoscersi meglio, migliorare le proprie relazioni, rafforzare l\'autostima o semplicemente diventare la versione migliore di sé stesse.',
    'svc3.long2':           'In questo percorso lavoriamo su credenze limitanti su di sé, su schemi relazionali ricorrenti che causano sofferenza, e sulla capacità di stabilire confini sani con gli altri. L\'autostima autentica non si costruisce ignorando i propri limiti, ma imparando ad accettarsi pienamente.',
    'svc3.exp1':            'Esplorazione delle credenze su di sé e identificazione di schemi limitanti',
    'svc3.exp2':            'Lavoro su confini, assertività e qualità delle relazioni',
    'svc3.exp3':            'Costruzione di un\'autostima stabile e radicata nei propri valori',
    'svc4.long1':           'A volte la difficoltà principale non è trovare supporto, ma capire con precisione cosa sta succedendo. La valutazione psicologica è un processo strutturato che utilizza colloqui clinici e strumenti psicometrici standardizzati per analizzare il funzionamento emotivo, cognitivo e comportamentale.',
    'svc4.long2':           'L\'esito della valutazione è una relazione chiara e dettagliata che fornisce una mappa del tuo profilo psicologico: punti di forza, aree di vulnerabilità, eventuali diagnosi e raccomandazioni per il percorso di supporto più adatto.',
    'svc4.exp1':            'Colloqui clinici approfonditi e somministrazione di test psicometrici validati',
    'svc4.exp2':            'Relazione finale chiara e dettagliata con il tuo profilo psicologico',
    'svc4.exp3':            'Indicazioni specifiche per il percorso terapeutico o le risorse di supporto',
    'svc.cta':              'Parlane con me →',
    'svc.expect.title':     'Cosa puoi aspettarti',
    'svc.how.label':        'Come lavoro',
    'svc.how.title':        'Il mio metodo',
    'svc.how.sub':          'Ogni percorso è unico, ma il mio modo di lavorare segue principi chiari: rispetto, collaborazione e strumenti validati dalla ricerca.',
    'svc.how1.title':       'Prima consulenza gratuita',
    'svc.how1.desc':        'Il nostro primo incontro è un colloquio conoscitivo senza impegno. Parliamo di quello che stai vivendo, dei tuoi obiettivi e di come potrei aiutarti. Decidiamo insieme se proseguire.',
    'svc.how2.title':       'Valutazione e piano terapeutico',
    'svc.how2.desc':        'Nelle prime sessioni approfondisco la tua storia, i tuoi bisogni e le tue risorse. Costruiamo insieme un piano di lavoro con obiettivi chiari e verificabili.',
    'svc.how3.title':       'Sessioni regolari (CBT + ACT)',
    'svc.how3.desc':        'Ogni seduta di 50 minuti combina riflessione, esercizi pratici e sviluppo di nuove competenze. Sessioni settimanali o bisettimanali, online o in presenza.',
    'svc.how4.title':       'Valutazione continua e chiusura',
    'svc.how4.desc':        'Monitoriamo regolarmente i progressi e adattiamo il percorso. La terapia ha un termine: lavoriamo verso la tua autonomia, non verso la dipendenza.',

    /* ── Appointment page ── */
    'appt.ph.label':        'Prenota',
    'appt.ph.title':        'Inizia il tuo <em>percorso</em>.',
    'appt.ph.lead':         'Il primo passo è il più coraggioso. Sono qui per accoglierti con cura e senza giudizio.',
    'appt.info.label':      'Informazioni pratiche',
    'appt.info.title':      'Come funziona',
    'appt.d1.label':        'Sessione individuale',
    'appt.d1.val':          '50 minuti per sessione',
    'appt.d2.label':        'Frequenza',
    'appt.d2.val':          'Settimanale o bisettimanale',
    'appt.d3.label':        'Formato',
    'appt.d3.val':          'Online (video sicuro) e in presenza',
    'appt.d4.label':        'Risposta',
    'appt.d4.val':          'Entro 48 ore lavorative',
    'appt.d5.label':        'Prima consulenza',
    'appt.d5.val':          'Gratuita e senza impegno',
    'appt.d6.label':        'Email',
    'appt.form.title':      'Richiedi un appuntamento',
    'appt.form.free':       'Prima consulenza gratuita',
    'appt.form.sub':        'Compila il modulo e ti rispondo entro 48 ore.',
    'appt.f.nome':          'Nome *',
    'appt.f.nome.ph':       'Es. Maria',
    'appt.f.cognome':       'Cognome',
    'appt.f.cognome.ph':    'Es. Rossi',
    'appt.f.email':         'Email *',
    'appt.f.email.ph':      'nome@email.it',
    'appt.f.tel':           'Telefono',
    'appt.f.tel.ph':        '+39 000 000 0000',
    'appt.f.motivo':        'Motivo della richiesta',
    'appt.f.motivo.default':'Seleziona un\'area (opzionale)',
    'appt.f.motivo.1':      'Ansia e stress',
    'appt.f.motivo.2':      'Depressione e umore basso',
    'appt.f.motivo.3':      'Transizioni di vita e burnout',
    'appt.f.motivo.4':      'Crescita personale e autostima',
    'appt.f.motivo.5':      'Valutazione psicologica',
    'appt.f.motivo.6':      'Altro',
    'appt.f.msg':           'Messaggio',
    'appt.f.msg.ph':        'Raccontami brevemente cosa stai vivendo o cosa stai cercando. Non è obbligatorio, ma mi aiuta a prepararmi al meglio per il nostro primo incontro.',
    'appt.f.privacy':       'Ho letto e accetto l\'<a href="#">informativa sulla privacy</a> ai sensi del GDPR. I miei dati saranno trattati esclusivamente per la gestione della richiesta di appuntamento.',
    'appt.form.success':    'Grazie! Ho ricevuto la tua richiesta e ti rispondo entro 48 ore. A presto.',
    'appt.tiles.label':     'Tutto quello che devi sapere',
    'appt.tiles.title':     'Le sessioni in breve',
    'appt.tile1.label':     'Durata',
    'appt.tile1.val':       '50 minuti',
    'appt.tile1.sub':       'Ogni sessione individuale ha una durata standard di 50 minuti. La puntualità ci permette di lavorare in modo efficace.',
    'appt.tile2.label':     'Frequenza',
    'appt.tile2.val':       '1–2 volte / sett.',
    'appt.tile2.sub':       'Nella fase iniziale del percorso si lavora solitamente una volta a settimana. In seguito la frequenza si adatta ai progressi.',
    'appt.tile3.label':     'Riservatezza',
    'appt.tile3.val':       '100% riservato',
    'appt.tile3.sub':       'Il segreto professionale è garantito dalla legge e dall\'etica professionale. Quello che condividi rimane strettamente confidenziale.',
    'appt.cta.email':       'Scrivi direttamente a Ester',
  }
};

let lang = localStorage.getItem('er-lang') || 'it';

function applyLang(l) {
  lang = l;
  localStorage.setItem('er-lang', l);
  document.documentElement.lang = l;
  document.querySelectorAll('[data-lang-btn]').forEach(b => b.classList.toggle('is-active', b.dataset.langBtn === l));
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T[l]?.[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = T[l]?.[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = T[l]?.[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  /* ── Nav scroll ── */
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Mobile nav ── */
  const burger  = document.getElementById('nav-burger');
  const mobNav  = document.getElementById('mob-nav');
  const mobClose= document.getElementById('mob-close');
  const mobOvl  = document.getElementById('mob-overlay');
  const openNav = () => { mobNav?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeNav= () => { mobNav?.classList.remove('open'); document.body.style.overflow = ''; };
  burger?.addEventListener('click', openNav);
  mobClose?.addEventListener('click', closeNav);
  mobOvl?.addEventListener('click', closeNav);
  document.querySelectorAll('.mob-links a').forEach(a => a.addEventListener('click', closeNav));

  /* ── Lang ── */
  document.querySelectorAll('[data-lang-btn]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.langBtn)));
  applyLang(lang);

  /* ── Active nav ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Reveal on scroll ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      else io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ── Cookie bar ── */
  const bar = document.getElementById('cookie-bar');
  if (bar) {
    if (localStorage.getItem('er-cookies')) bar.classList.add('hidden');
    document.getElementById('cookie-ok')?.addEventListener('click', () => {
      localStorage.setItem('er-cookies', '1');
      bar.classList.add('hidden');
    });
  }

  /* ── Contact form ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = document.getElementById('form-success');
      btn.disabled = true;

      const payload = {
        nome:      form.nome?.value?.trim() || null,
        cognome:   form.cognome?.value?.trim() || null,
        email:     form.email?.value?.trim() || null,
        tel:       form.tel?.value?.trim() || null,
        motivo:    form.motivo?.value || null,
        messaggio: form.messaggio?.value?.trim() || null,
        lang:      lang || 'it',
        status:    'new',
      };

      if (_erSb) {
        const { error } = await _erSb.from('appointment_requests').insert(payload);
        if (error) console.warn('Form submit error:', error.message);
      } else {
        await new Promise(r => setTimeout(r, 800));
      }

      btn.disabled = false;
      form.reset();
      if (success) { success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 6000); }
    });
  }
});
