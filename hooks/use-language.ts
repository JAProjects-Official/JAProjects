import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'es' | 'en'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, lang?: Language) => string
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.about': { es: 'Sobre mí', en: 'About' },
  'nav.projects': { es: 'Proyectos', en: 'Projects' },
  'nav.apps': { es: 'Apps', en: 'Apps' },
  'nav.stack': { es: 'Stack', en: 'Stack' },
  'nav.experience': { es: 'Experiencia', en: 'Experience' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'nav.hireMe': { es: 'Hablemos', en: 'Let\'s Talk' },

  // Hero Section
  'hero.available': { es: 'Disponible para proyectos', en: 'Available for projects' },
  'hero.headline': { es: 'JAProjects', en: 'JAProjects' },
  'hero.subheadline': { es: 'Desarrollo Web Profesional', en: 'Professional Web Development' },
  'hero.description': { es: 'Transformo ideas en aplicaciones web escalables y de alto rendimiento. Especializado en .NET Core, PHP, JavaScript y arquitecturas SQL.', en: 'I transform ideas into scalable, high-performance web applications. Specialized in .NET Core, PHP, JavaScript and SQL architectures.' },
  'hero.cta1': { es: 'Ver Proyectos', en: 'View Projects' },
  'hero.cta2': { es: 'Contactar', en: 'Get in Touch' },
  'hero.scroll': { es: 'Explorar', en: 'Explore' },

  // About Section
  'about.title': { es: 'Sobre mí', en: 'About Me' },
  'about.name': { es: 'Iván Jurado', en: 'Iván Jurado' },
  'about.role': { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
  'about.location': { es: 'España', en: 'Spain' },
  'about.availability': { es: 'Abierto a oportunidades', en: 'Open to opportunities' },
  'about.bio': { es: 'Desarrollador web con experiencia real en entornos de producción. Mi enfoque: código limpio que escala, arquitecturas que perduran y soluciones que generan valor tangible para el negocio.', en: 'Web developer with real production experience. My focus: clean code that scales, architectures that last, and solutions that deliver tangible business value.' },
  'about.skills': { es: 'Stack Técnico', en: 'Technical Stack' },
  'about.quote': { es: '"Cada línea de código es una oportunidad para construir algo que funcione mejor y más rápido."', en: '"Every line of code is an opportunity to build something that works better and faster."' },
  'about.stats.tech': { es: 'Tecnologías', en: 'Technologies' },
  'about.stats.projects': { es: 'Proyectos', en: 'Projects' },
  'about.stats.experience': { es: 'Años Exp.', en: 'Years Exp.' },

  // Projects Section
  'projects.section': { es: 'Proyectos', en: 'Projects' },
  'projects.title': { es: 'Proyectos destacados', en: 'Selected Work' },
  'projects.description': { es: 'Soluciones reales para problemas reales — desde herramientas de productividad hasta apps educativas y CRUDs empresariales.', en: 'Real solutions for real problems — from productivity tools to educational apps and enterprise CRUD systems.' },
  'projects.personal': { es: 'Proyecto personal', en: 'Personal Project' },
  'projects.developing': { es: 'En desarrollo', en: 'In Development' },
  'filters.all': { es: 'Todos', en: 'All' },
  'filters.dotnet': { es: '.NET Core', en: '.NET Core' },
  'filters.php': { es: 'PHP', en: 'PHP' },
  'filters.javascript': { es: 'JavaScript', en: 'JavaScript' },
  'filters.sql': { es: 'SQL', en: 'SQL' },
  'filters.websockets': { es: 'WebSockets', en: 'WebSockets' },
  'projects.client': { es: 'Proyecto cliente', en: 'Client Project' },
  'projects.noResults': { es: 'No hay proyectos con este filtro.', en: 'No projects match this filter.' },
  'projects.liveDemo': { es: 'Ver demo', en: 'Live Demo' },
  'projects.featured': { es: 'Destacado', en: 'Featured' },
  // Project 1: Laravel CRUD
  'projects.crud.title': { es: 'Sistema CRUD con Laravel', en: 'Laravel CRUD System' },
  'projects.crud.description': { es: 'Aplicación Laravel con autenticación, gestión de registros y panel administrativo. Construida para demostrar prácticas de CRUD y seguridad en un entorno PHP moderno.', en: 'Laravel application with authentication, record management and an admin panel. Built to demonstrate CRUD practices and security in a modern PHP environment.' },
  // Project 2: Language practice
  'projects.language.title': { es: 'Aplicación de práctica de idiomas', en: 'Language Practice App' },
  'projects.language.description': { es: 'Plataforma de práctica de idiomas con ejercicios interactivos y contenido educativo. Diseñada para reforzar vocabulario y comprensión desde cualquier dispositivo.', en: 'Language practice platform with interactive exercises and educational content. Designed to reinforce vocabulary and comprehension from any device.' },
  // Project 3: PHP Task Manager
  'projects.todo.title': { es: 'Gestor de tareas en PHP', en: 'PHP Task Manager' },
  'projects.todo.description': { es: 'Aplicación de gestión de tareas con backend PHP y base de datos MySQL. Funcionalidades incluidas: creación, edición, eliminación y búsqueda de tareas con interfaz limpia y responsiva.', en: 'Task management app with a PHP backend and MySQL database. Features include: creating, editing, deleting and searching tasks with a clean, responsive interface.' },
  // Project 4: Angular quiz
  'projects.quiz.title': { es: 'Aplicación de cuestionarios en Angular', en: 'Angular Quiz App' },
  'projects.quiz.description': { es: 'Cuestionario interactivo construido en Angular con navegación fluida y respuestas en tiempo real. Ideal para evaluar conocimiento con diseño limpio y experiencia de usuario moderna.', en: 'Interactive quiz built in Angular with smooth navigation and real-time answers. Ideal for assessing knowledge with a clean design and a modern user experience.' },
  // Project 5: Text-to-speech
  'projects.tts.title': { es: 'Conversor de texto a voz', en: 'Text-to-Speech Converter' },
  'projects.tts.description': { es: 'Herramienta de lectura de texto que convierte contenido en voz en tiempo real. Interfaz accesible, controles de reproducción y compatibilidad con múltiples navegadores.', en: 'Text reading tool that converts content into speech in real time. Accessible interface, playback controls and multi-browser compatibility.' },

  // Mobile Apps Section
  'mobile.section': { es: 'Aplicaciones Móviles', en: 'Mobile Apps' },
  'mobile.title': { es: 'Aplicaciones Android en producción', en: 'Android apps in production' },
  'mobile.description': { es: 'El mismo enfoque de código limpio y arquitecturas escalables, llevado a Android: aplicaciones completas, de principio a fin, publicadas y en uso real en Google Play.', en: 'The same clean-code, scalable-architecture approach, applied to Android: complete apps, built end to end, published and running on Google Play.' },
  'mobile.featured': { es: 'Destacado', en: 'Featured' },
  'mobile.productivity': { es: 'Productividad', en: 'Productivity' },
  'mobile.game': { es: 'Juego', en: 'Game' },
  'mobile.viewOnPlayStore': { es: 'Ver en Google Play', en: 'View on Google Play' },
  'mobile.timeplan.name': { es: 'TimePlan', en: 'TimePlan' },
  'mobile.timeplan.description': { es: 'Registra tus jornadas, fichajes y descansos. Exporta a PDF o CSV. Funciona sin conexión.', en: 'Track your work hours, clock-ins and breaks. Export to PDF or CSV. Works fully offline.' },
  'mobile.lumivex.name': { es: 'Flappy LUMIVEX', en: 'Flappy LUMIVEX' },
  'mobile.lumivex.description': { es: 'Arcade de un toque: esquiva obstáculos y bate tu récord.', en: 'One-tap arcade: dodge obstacles and beat your high score.' },
  'mobile.blockpuzzle.name': { es: 'Block Puzzle+', en: 'Block Puzzle+' },
  'mobile.blockpuzzle.description': { es: 'Puzzle 8x8 con 3 modos, niveles y misiones diarias.', en: '8x8 puzzle with 3 modes, levels, and daily missions.' },

  // Stack Section
  'stack.section': { es: 'Tecnologías', en: 'Tech Stack' },
  'stack.title': { es: 'Mi stack de desarrollo', en: 'My Development Stack' },
  'stack.description': { es: 'Herramientas probadas en producción que me permiten entregar desde APIs robustas hasta interfaces modernas con rendimiento óptimo.', en: 'Production-tested tools that let me deliver everything from robust APIs to modern interfaces with optimal performance.' },

  // Stack Items Descriptions
  'stack.dotnet': { es: 'APIs backend y servicios', en: 'Backend APIs & services' },
  'stack.php': { es: 'Aplicaciones web', en: 'Web applications' },
  'stack.javascript': { es: 'Frontend y scripting', en: 'Frontend & scripting' },
  'stack.mysql': { es: 'Bases de datos relacionales', en: 'Relational databases' },
  'stack.mariadb': { es: 'Base de datos open-source', en: 'Open-source database' },
  'stack.restapis': { es: 'Integración de servicios', en: 'Service integrations' },
  'stack.python': { es: 'Desarrollo backend y automatización', en: 'Backend development & automation' },
  'stack.visualstudio': { es: 'IDE y herramientas de desarrollo', en: 'IDE & tooling' },

  // Experience Section
  'experience.section': { es: 'Experiencia', en: 'Experience' },
  'experience.title': { es: 'Lo que aporto', en: 'What I Bring' },
  'experience.description': { es: 'Dominio técnico full stack con visión de producto. Desde la arquitectura de datos hasta la experiencia de usuario.', en: 'Full stack technical expertise with product vision. From data architecture to user experience.' },
  'experience.dotnet': { es: 'Desarrollo .NET Core', en: '.NET Core Development' },
  'experience.dotnetDesc': { es: 'Construyo servicios backend de nivel empresarial y APIs con Visual Studio, Entity Framework y ASP.NET Core. Experiencia en arquitectura limpia, inyección de dependencias y pruebas unitarias.', en: 'Building enterprise-grade backend services and APIs with Visual Studio, Entity Framework, and ASP.NET Core. Experience with clean architecture, dependency injection, and unit testing.' },
  'experience.php': { es: 'Aplicaciones PHP & JavaScript', en: 'PHP & JavaScript Web Apps' },
  'experience.phpDesc': { es: 'Desarrollo de aplicaciones web full stack usando PHP para lógica del servidor y JavaScript vanilla o frameworks para interfaces dinámicas. Énfasis en patrones MVC limpios y componentes reutilizables.', en: 'Developing full-stack web applications using PHP for server-side logic and vanilla JavaScript or frameworks for dynamic UIs. Emphasis on clean MVC patterns and reusable components.' },
  'experience.database': { es: 'Diseño de Bases de Datos SQL', en: 'SQL Database Design' },
  'experience.databaseDesc': { es: 'Diseño y optimización de bases de datos relacionales con MySQL y MariaDB. Experiencia en consultas complejas, procedimientos almacenados, estrategias de indexación y migraciones de esquema.', en: 'Designing and optimizing relational databases with MySQL and MariaDB. Experience with complex queries, stored procedures, indexing strategies, and schema migrations.' },
  'experience.project': { es: 'Gestión de Proyectos', en: 'Project Management' },
  'experience.projectDesc': { es: 'Uso de Jira para planificación de sprints ágiles, seguimiento de problemas y colaboración de equipo. Cómodo trabajando en ciclos de desarrollo estructurados con comunicación con stakeholders.', en: 'Using Jira for agile sprint planning, issue tracking, and team collaboration. Comfortable working in structured development cycles with stakeholder communication.' },

  // Contact Section
  'contact.section': { es: 'Contacto', en: 'Contact' },
  'contact.title': { es: 'Trabajemos', en: 'Let\'s work' },
  'contact.description': { es: 'Si tienes un proyecto en mente o buscas un desarrollador para tu equipo, me encantaría escucharte.', en: 'If you have a project in mind or are looking for a developer for your team, I\'d love to hear from you.' },
  'contact.getInTouch': { es: 'Conectemos', en: 'Get in touch' },
  'contact.email': { es: 'Email', en: 'Email' },
  'contact.github': { es: 'GitHub', en: 'GitHub' },
  'contact.linkedin': { es: 'LinkedIn', en: 'LinkedIn' },
  'contact.sendMessage': { es: 'Enviar mensaje', en: 'Send a message' },
  'contact.name': { es: 'Nombre', en: 'Name' },
  'contact.namePlaceholder': { es: 'Tu nombre', en: 'Your name' },
  'contact.emailPlaceholder': { es: 'tu@email.com', en: 'your@email.com' },
  'contact.message': { es: 'Mensaje', en: 'Message' },
  'contact.messagePlaceholder': { es: 'Cuéntame sobre tu proyecto o idea...', en: 'Tell me about your project or idea...' },
  'contact.sending': { es: 'Enviando...', en: 'Sending...' },
  'contact.sendBtn': { es: 'Enviar', en: 'Send Message' },
  'contact.sent': { es: 'Mensaje enviado', en: 'Message sent!' },
  'contact.sentMessage': { es: 'Gracias por contactarme. Te responderé lo antes posible.', en: 'Thanks for reaching out. I\'ll get back to you as soon as possible.' },
  'contact.cta': { es: '¿Tienes un proyecto en mente? Hablemos.', en: 'Have a project in mind? Let\'s talk.' },
  'contact.together': { es: 'juntos.', en: 'together.' },
  'contact.error.rateLimit': {
  es: 'Demasiados intentos. Espera un minuto.',
  en: 'Too many requests. Please wait a minute.',
},
'contact.error.missing': {
  es: 'Completa todos los campos.',
  en: 'Please fill all fields.',
},
'contact.error.invalidEmail': {
  es: 'Email inválido.',
  en: 'Invalid email.',
},
'contact.error.blocked': {
  es: 'Este email no está permitido.',
  en: 'This email is not allowed.',
},
'contact.error.spam': {
  es: 'Mensaje detectado como spam.',
  en: 'Spam detected.',
},
'contact.error.short': {
  es: 'El mensaje es demasiado corto.',
  en: 'Message too short.',
},
'contact.error.server': {
  es: 'Error del servidor. Inténtalo más tarde.',
  en: 'Server error. Try again later.',
},

  // Footer
  'footer.tagline': { es: 'Desarrollo Web Profesional', en: 'Professional Web Development' },
  'footer.developed': { es: 'Desarrollado por', en: 'Developed by' },
  'footer.builtWith': { es: 'Construido con', en: 'Built with' },
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'es',
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: string, lang?: Language) => {
        const currentLang = lang || get().language
        return translations[key]?.[currentLang] || key
      },
    }),
    {
      name: 'language-store',
      skipHydration: true,
    }
  )
)
