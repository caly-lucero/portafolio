// Para agregar un proyecto: sumá un objeto a esta lista.
// demo: dirección de la demo (carpeta del sitio o una URL completa). embed: lo que se muestra dentro del marco.
// pantallas: tamaño lógico [ancho, alto] en px de cada vista de la demo.
// problema / hace / resultado: las tres líneas que se muestran en la ficha de cada lámina.
window.PROYECTOS = [
  {
    id: "tablero",
    titulo: "Tablero de ventas",
    tipo: "Tablero",
    descripcion: "Un tablero de ventas interactivo con tres rubros de ejemplo (distribuidora, comercio e inmobiliaria). Cambiá el rubro, filtrá y tocá las barras.",
    problema: "Las ventas viven en planillas y nadie sabe rápido cómo viene el mes.",
    hace: "Muestra ventas, ticket promedio, cantidad de operaciones y clientes con compra contra el período anterior, la evolución de los últimos 12 meses, el ranking de vendedores y el mix por categoría. Todo se filtra con un toque.",
    resultado: "Una sola pantalla que responde «¿cómo venimos?» en segundos, en el celular o en la computadora. Es la base de lo que armo con los datos reales de cada negocio.",
    stack: ["JavaScript", "HTML y CSS", "Datos ficticios"],
    demo: "demos/tablero/",
    embed: "demos/tablero/",
    estado: "Demo con datos ficticios",
    pantallas: { celular: [390, 820], pc: [1180, 760] }
  },
  {
    id: "vela",
    titulo: "Vela",
    tipo: "PWA",
    descripcion: "Versión de demostración de la app que uso en mi trabajo: indicadores del día, mapa, filtros por empresa y vistas pensadas para celular y computadora.",
    problema: "El equipo comercial de una distribuidora miraba la venta en planillas armadas a mano, cada una con su versión de los números.",
    hace: "App instalable con inicio por áreas y botones según el rol de cada persona: avance contra objetivo, cobro, cobertura de clientes, preventa, planificador del día, mapa de zonas, ranking por mesa, stock y retiros.",
    resultado: "Está en producción con el equipo comercial: los datos se actualizan cada hora, cada persona ve solo lo que le corresponde y reemplazó varias herramientas de reportes.",
    stack: ["JavaScript", "PWA", "Google Cloud", "BigQuery", "Firebase"],
    demo: "demos/vela/",
    embed: "demos/vela/?embed=1",
    estado: "Demo con datos ficticios · la real está en producción",
    pantallas: { celular: [390, 800], pc: [1180, 720] }
  },
  {
    id: "presupuestador",
    titulo: "Presupuestador",
    tipo: "PWA",
    descripcion: "Armá presupuestos en PDF listos para mandar por WhatsApp. Hecha a pedido de un electricista.",
    problema: "Armar presupuestos a mano en obra es lento y queda desprolijo.",
    hace: "Catálogo propio que te recomienda mientras escribís, genera el PDF y lo comparte por WhatsApp. Funciona sin conexión y guarda todo en el teléfono.",
    resultado: "Presupuestos prolijos en el momento, desde el celular y sin depender de internet.",
    stack: ["JavaScript", "PWA sin conexión", "jsPDF", "Web Share"],
    demo: "https://caly-lucero.github.io/presupuestos/?demo=1",
    embed: "https://caly-lucero.github.io/presupuestos/?demo=1",
    estado: "Demo con datos de ejemplo",
    pantallas: { celular: [390, 800], pc: [1100, 760] }
  },
  {
    id: "ml-electricista",
    titulo: "ML Electricista",
    tipo: "Sitio web",
    descripcion: "El sitio de trabajos de un electricista de Trenque Lauquen, pensado primero para el celular.",
    problema: "Un electricista que trabaja por recomendación necesitaba mostrar sus trabajos y que lo contacten fácil.",
    hace: "Galería con filtros, comparador de obra en curso y terminada, botón de WhatsApp, código QR y tarjeta de presentación.",
    resultado: "Sitio real, publicado y en uso por el cliente.",
    stack: ["HTML", "CSS", "JavaScript", "SEO local"],
    demo: "https://caly-lucero.github.io/MLelectricista/",
    embed: "https://caly-lucero.github.io/MLelectricista/",
    estado: "Publicado · sitio real de un cliente",
    pantallas: { celular: [390, 800], pc: [1280, 800] }
  }
];
