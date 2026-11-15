// Para agregar un proyecto: sumá un objeto a esta lista.
// demo: dirección de la demo (carpeta del sitio o una URL completa). embed: lo que se muestra dentro del marco.
// pantallas: tamaño lógico [ancho, alto] en px de cada vista de la demo.
window.PROYECTOS = [
  {
    id: "vela",
    titulo: "Vela",
    tipo: "PWA",
    descripcion: "App de indicadores del día: mapa, filtros por empresa y vistas pensadas para celular y computadora. Probala acá mismo.",
    stack: ["JavaScript", "Leaflet", "OpenStreetMap"],
    demo: "demos/vela/",
    embed: "demos/vela/?embed=1",
    estado: "Demo con datos ficticios",
    pantallas: { celular: [390, 800], pc: [1180, 720] }
  },
  {
    id: "presupuestador",
    titulo: "Presupuestador",
    tipo: "PWA",
    descripcion: "Armá presupuestos en PDF listos para mandar por WhatsApp. Catálogo propio que te recomienda mientras escribís, funciona sin conexión y guarda todo en el teléfono. Hecha a pedido de un electricista.",
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
    descripcion: "Sitio de trabajos de un electricista de Trenque Lauquen: galería con filtros, comparador en obra y terminado, botón de WhatsApp, QR y tarjeta de presentación. Pensado primero para el celular.",
    stack: ["HTML", "CSS", "JavaScript", "SEO local"],
    demo: "https://caly-lucero.github.io/MLelectricista/",
    embed: "https://caly-lucero.github.io/MLelectricista/",
    estado: "Publicado · sitio real de un cliente",
    pantallas: { celular: [390, 800], pc: [1280, 800] }
  }
];
