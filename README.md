# Portafolio

Sitio estático (HTML, CSS y JS) para mostrar proyectos y demos. Se publica gratis con GitHub Pages o Cloudflare Pages.

Estética de plano técnico: cada proyecto es una "lámina" con la demo en vivo dentro de un celular o una PC. Hay tema Plano (oscuro) y Papel (claro).

## Agregar un proyecto
1. Copiar la demo a `demos/<nombre>/index.html`.
2. Sumar un objeto a la lista en `assets/proyectos.js` (id, titulo, tipo, descripcion, stack, demo, embed, estado y los tamaños de `pantallas`).

## Ver en local
```
python -m http.server 8000
```
Abrir http://localhost:8000

## Regla
Las demos solo llevan datos ficticios. Nada de datos, logos ni textos reales de empresas.
