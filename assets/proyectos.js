// Para agregar un proyecto: sumá un objeto a esta lista y poné la demo en demos/<carpeta>/
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
  }
];
