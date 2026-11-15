// Genera la marca personal (logo, monograma, íconos e imagen para compartir) con las letras convertidas a curvas.
// Uso: node generar-marca.js <carpeta con node_modules> <carpeta de salida>
// Paquetes: opentype.js, @fontsource/bricolage-grotesque, @fontsource/jetbrains-mono, @resvg/resvg-js
// Tipografías (licencia OFL): Bricolage Grotesque ExtraBold y JetBrains Mono SemiBold.
const fs = require("node:fs");
const path = require("node:path");
const base = process.argv[2];
const out = process.argv[3];
if (!base || !out) { console.error("Uso: node generar-marca.js <carpeta con node_modules> <salida>"); process.exit(1); }
const opentype = require(path.join(base, "node_modules", "opentype.js"));
const { Resvg } = require(path.join(base, "node_modules", "@resvg", "resvg-js"));
fs.mkdirSync(out, { recursive: true });

const cargar = (rel) => { const b = fs.readFileSync(path.join(base, "node_modules", rel)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const brico = cargar("@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff");
const mono = cargar("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff");

// Colores de la marca
const NAVY = "#0a1a2f", HIELO = "#e6f0ff", AMARILLO = "#ffd23f", ROJO = "#d4380d", AZUL_GRIS = "#8fa9c9";

// Disposición de letras propia (la de la librería falla con algunas tipografías): ancho de cada letra + kerning.
function disponer(font, t, size, spacing) {
  const s = size / font.unitsPerEm;
  const p = new opentype.Path();
  let x = 0, prev = null;
  for (const ch of t) {
    const g = font.charToGlyph(ch);
    if (prev) {
      let k = 0;
      try { k = font.getKerningValue(prev, g) || 0; } catch (e) { k = 0; }
      // La librería a veces devuelve ajustes absurdos para ciertos pares: se ignoran los mayores a 12 % del cuerpo.
      if (Math.abs(k) > font.unitsPerEm * 0.12) k = 0;
      x += k * s;
    }
    p.extend(g.getPath(x, 0, size));
    x += g.advanceWidth * s + (spacing || 0) * size;
    prev = g;
  }
  return p;
}
// Convierte el trazado a texto SVG. (El convertidor de la librería genera valores NaN con estas letras.)
function aTexto(p) {
  const n = (v) => {
    const r = Math.round(v * 100) / 100;
    if (!Number.isFinite(r)) throw new Error("Coordenada inválida");
    return String(r);
  };
  return p.commands.map((c) => {
    if (c.type === "M" || c.type === "L") return c.type + n(c.x) + " " + n(c.y);
    if (c.type === "Q") return "Q" + n(c.x1) + " " + n(c.y1) + " " + n(c.x) + " " + n(c.y);
    if (c.type === "C") return "C" + n(c.x1) + " " + n(c.y1) + " " + n(c.x2) + " " + n(c.y2) + " " + n(c.x) + " " + n(c.y);
    return "Z";
  }).join("");
}
function mover(p, dx, dy) {
  p.commands.forEach((c) => {
    if ("x" in c) { c.x += dx; c.y += dy; }
    if ("x1" in c) { c.x1 += dx; c.y1 += dy; }
    if ("x2" in c) { c.x2 += dx; c.y2 += dy; }
  });
}
// Devuelve el trazado del texto ubicado con su esquina superior izquierda en (x, y) y su tamaño real.
function texto(font, t, size, x, y, spacing) {
  const p = disponer(font, t, size, spacing);
  const b = p.getBoundingBox();
  mover(p, x - b.x1, y - b.y1);
  return { d: aTexto(p), w: b.x2 - b.x1, h: b.y2 - b.y1 };
}
// Igual, pero centrado en (cx, cy)
function textoCentrado(font, t, size, cx, cy, spacing) {
  const m = texto(font, t, size, 0, 0, spacing);
  return texto(font, t, size, cx - m.w / 2, cy - m.h / 2, spacing);
}
// Línea de cota: una línea con topes en los extremos (referencia al lenguaje de los planos)
const cota = (x1, x2, y, alto, grosor, color) =>
  `<path d="M${x1} ${y}H${x2}M${x1} ${y - alto / 2}V${y + alto / 2}M${x2} ${y - alto / 2}V${y + alto / 2}" fill="none" stroke="${color}" stroke-width="${grosor}" stroke-linecap="butt"/>`;

/* ---------- Monograma "CL" ---------- */
function monograma(redondeo) {
  const m = texto(brico, "CL", 100, 0, 0, -0.01);
  const size = 100 * 50 / m.h;                       // letras de ~50 unidades de alto
  const t = textoCentrado(brico, "CL", size, 60, 50, -0.01);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">` +
    `<title>Caly Lucero</title><rect width="120" height="120" rx="${redondeo}" fill="${NAVY}"/>` +
    `<path d="${t.d}" fill="${HIELO}"/>${cota(27, 93, 93, 13, 3.6, AMARILLO)}</svg>`;
}

/* ---------- Logo horizontal ---------- */
function logo(colorTexto, colorAcento) {
  const m = texto(brico, "Caly Lucero", 100, 24, 24, -0.025);
  const t = texto(brico, "Caly Lucero", 100, 24, 24, -0.025);
  const yCota = 24 + t.h + 30;
  const W = Math.ceil(t.w + 48), H = Math.ceil(yCota + 30);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><title>Caly Lucero</title>` +
    `<path d="${t.d}" fill="${colorTexto}"/>${cota(24, 24 + t.w, yCota, 18, 5, colorAcento)}</svg>`;
}

/* ---------- Imagen para compartir (1200 x 630) ---------- */
function og() {
  const t = texto(brico, "Caly Lucero", 190, 80, 215, -0.03);
  const yCota = 215 + t.h + 34;
  const tag = texto(mono, "SOFTWARE A MEDIDA · APPS WEB · PWAS · PROTOTIPOS", 24, 80, yCota + 52, 0.08);
  const url = texto(mono, "CALY-LUCERO.GITHUB.IO/PORTAFOLIO", 20, 80, 560, 0.08);
  const mono96 = monograma(22).replace(/<svg[^>]*>/, "").replace("</svg>", "");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">` +
    `<defs><pattern id="g" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#82b4ff" stroke-opacity=".07" stroke-width="1"/></pattern>` +
    `<linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${NAVY}" stop-opacity="0"/><stop offset=".85" stop-color="${NAVY}"/></linearGradient></defs>` +
    `<rect width="1200" height="630" fill="${NAVY}"/><rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#f)"/>` +
    `<g transform="translate(80 70) scale(.75)">${mono96}</g>` +
    `<path d="${t.d}" fill="${HIELO}"/>${cota(80, 80 + t.w, yCota, 22, 6, AMARILLO)}` +
    `<path d="${tag.d}" fill="${AZUL_GRIS}"/><path d="${url.d}" fill="${AMARILLO}"/></svg>`;
}

const escribir = (n, s) => {
  if (/NaN|undefined|Infinity/.test(s)) throw new Error("El SVG " + n + " tiene valores inválidos");
  fs.writeFileSync(path.join(out, n), s);
};
const png = (svg, ancho) => new Resvg(svg, { fitTo: { mode: "width", value: ancho } }).render().asPng();

const svgMono = monograma(27), svgMonoCuadrado = monograma(0);
const svgClaro = logo(HIELO, AMARILLO), svgOscuro = logo(NAVY, ROJO), svgOg = og();
for (const [n, s] of [["og", svgOg], ["monograma-cuadrado", svgMonoCuadrado]]) {
  if (/NaN|undefined|Infinity/.test(s)) throw new Error("El SVG " + n + " tiene valores inválidos");
}
escribir("monograma.svg", svgMono);
escribir("logo-claro.svg", svgClaro);
escribir("logo-oscuro.svg", svgOscuro);
fs.writeFileSync(path.join(out, "favicon-32.png"), png(svgMono, 32));
fs.writeFileSync(path.join(out, "apple-touch-icon.png"), png(svgMonoCuadrado, 180));
fs.writeFileSync(path.join(out, "icono-512.png"), png(svgMonoCuadrado, 512));
fs.writeFileSync(path.join(out, "og.png"), png(svgOg, 1200));
console.log(fs.readdirSync(out).map((f) => `${f} (${Math.round(fs.statSync(path.join(out, f)).size / 1024)} KB)`).join("\n"));
