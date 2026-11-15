# Portafolio

Sitio estático (HTML, CSS y JS) para mostrar proyectos y demos. Se publica gratis con GitHub Pages o Cloudflare Pages.

Estética de plano técnico: cada proyecto es una "lámina" con la demo en vivo dentro de un celular o una PC. Hay tema Plano (oscuro) y Papel (claro).

## Agregar un proyecto
1. Copiar la demo a `demos/<nombre>/index.html`.
2. Sumar un objeto a la lista en `assets/proyectos.js` (id, titulo, tipo, descripcion, stack, demo, embed, estado y los tamaños de `pantallas`).

## Marca personal
- **Logo:** nombre "Caly Lucero" en Bricolage Grotesque ExtraBold con una línea de cota (referencia al plano) debajo. **Monograma:** una carita: la C y la L (Bricolage ExtraBold) hacen de ojos y la línea amarilla es una sonrisa sutil con topes en las puntas, como una cota. Colores: azul `#0a1a2f`, hielo `#e6f0ff`, amarillo `#ffd23f` (y rojo `#d4380d` sobre fondo claro).
- **Tipografías (licencia OFL):** Bricolage Grotesque para títulos y JetBrains Mono para anotaciones.
- **Archivos:** `assets/marca/` (SVG y PNG). Se regeneran con `marca-src/generar-marca.js` (letras convertidas a curvas, sin depender de fuentes instaladas).

## Ver en local
```
python -m http.server 8000
```
Abrir http://localhost:8000

## Regla
Las demos solo llevan datos ficticios. Nada de datos, logos ni textos reales de empresas.
