(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = matchMedia("(pointer: fine)").matches;

  function $(sel) { return document.querySelector(sel); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function pad2(n) { return n < 10 ? "0" + n : String(n); }
  // Dirección que se muestra en la barra del navegador del marco (sin "https://" ni parámetros)
  function direccionVisible(demo) {
    if (/^https?:\/\//.test(demo)) return demo.replace(/^https?:\/\//, "").split("?")[0].replace(/\/$/, "");
    return location.host + location.pathname.replace(/\/$/, "") + "/" + demo.split("?")[0];
  }

  /* ---------- Tema plano / papel ---------- */
  var temaBtn = $("#tema");
  var meta = document.querySelector('meta[name="theme-color"]');
  function syncMeta() { if (meta) meta.content = root.dataset.tema === "papel" ? "#f3eee1" : "#0a1a2f"; }
  syncMeta();
  temaBtn.addEventListener("click", function () {
    root.dataset.tema = root.dataset.tema === "papel" ? "plano" : "papel";
    try { localStorage.setItem("tema", root.dataset.tema); } catch (e) {}
    syncMeta();
  });

  /* ---------- Láminas ---------- */
  var proyectos = window.PROYECTOS || [];
  var main = $("#laminas");
  var indice = $("#indice");
  var total = proyectos.length;

  function fila(dt, dd) {
    var row = el("div", "row");
    row.append(el("dt", null, dt), el("span", "leader"), el("dd", null, dd));
    return row;
  }

  function lamina(p, n) {
    var modo = "celular";
    var live = false;

    var art = el("article", "lamina");
    art.id = p.id;

    var head = el("div", "lamina-head");
    var left = el("span");
    left.append(document.createTextNode("Lámina "), el("b", null, pad2(n)), document.createTextNode(" / " + pad2(total)));
    head.append(left, el("span", null, p.tipo));

    var body = el("div", "lamina-body");

    /* escenario */
    var stage = el("div", "stage");
    var vista = el("div", "vista");
    vista.append(document.createTextNode("Vista"));
    var btnCel = el("button", null, "Celular");
    var btnPc = el("button", null, "Computadora");
    btnCel.type = btnPc.type = "button";
    vista.append(btnCel, btnPc);

    var wrap = el("div", "wrap");
    var device = el("div", "device");
    var bar = el("div", "bar");
    bar.append(el("i"), el("i"), el("i"), el("span", null, direccionVisible(p.demo)));
    var vp = el("div", "viewport");
    var screen = el("div", "screen");
    var iframe = document.createElement("iframe");
    iframe.title = "Demo en vivo de " + p.titulo;
    iframe.setAttribute("referrerpolicy", "no-referrer");
    screen.append(iframe);
    var veil = el("button", "veil");
    veil.type = "button";
    veil.setAttribute("aria-label", "Activar la demo de " + p.titulo + " para probarla");
    veil.append(el("span", null, "Tocar para probar"));
    vp.append(screen, veil);
    device.append(bar, vp);

    var soltar = el("button", "soltar", "Soltar ✕");
    soltar.type = "button";
    var dimW = el("div", "dim dim-w"); dimW.setAttribute("aria-hidden", "true"); dimW.append(el("span"));
    var dimH = el("div", "dim dim-h"); dimH.setAttribute("aria-hidden", "true"); dimH.append(el("span"));
    wrap.append(device, soltar, dimW, dimH);
    stage.append(vista, wrap);

    /* ficha técnica */
    var spec = el("div", "spec");
    var dl = el("dl");
    dl.append(fila("Tipo", p.tipo), fila("Stack", p.stack.join(" · ")), fila("Estado", p.estado));
    var abrir = el("a", "btn", "Abrir pantalla completa ↗");
    abrir.href = p.demo; abrir.target = "_blank"; abrir.rel = "noopener";
    spec.append(el("h2", null, p.titulo), el("p", null, p.descripcion), dl, abrir);

    body.append(stage, spec);
    art.append(head, body);

    /* escala de la pantalla según el ancho disponible */
    function fit() {
      var size = p.pantallas[modo === "celular" ? "celular" : "pc"];
      var W = size[0], H = size[1];
      var cs = getComputedStyle(stage);
      var avail = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var chrome = modo === "celular" ? 22 : 2;
      var maxH = Math.min(window.innerHeight * 0.78, 720);
      var barH = modo === "celular" ? 40 : 30;
      var s = Math.min((avail - chrome) / W, (maxH - barH) / H, 1);
      if (!(s > 0)) return;
      screen.style.width = W + "px";
      screen.style.height = H + "px";
      screen.style.transform = "scale(" + s + ")";
      vp.style.width = Math.round(W * s) + "px";
      vp.style.height = Math.round(H * s) + "px";
      dimW.firstChild.textContent = W + " px";
      dimH.firstChild.textContent = H + " px";
    }

    function setModo(m) {
      modo = m;
      device.classList.toggle("is-phone", m === "celular");
      device.classList.toggle("is-pc", m === "pc");
      btnCel.setAttribute("aria-pressed", String(m === "celular"));
      btnPc.setAttribute("aria-pressed", String(m === "pc"));
      fit();
    }
    btnCel.addEventListener("click", function () { setModo("celular"); });
    btnPc.addEventListener("click", function () { setModo("pc"); });
    setModo("celular");
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(stage);
    else window.addEventListener("resize", fit);

    /* cargar la demo solo cuando se acerca a la pantalla */
    var loaded = false;
    function load() { if (!loaded) { loaded = true; iframe.src = p.embed || p.demo; } }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, o) {
        if (es[0].isIntersecting) { load(); o.disconnect(); }
      }, { rootMargin: "400px" }).observe(art);
    } else load();

    /* revelar la lámina */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, o) {
        if (es[0].isIntersecting) { art.classList.add("in"); o.disconnect(); }
      }, { threshold: 0.08 }).observe(art);
    } else art.classList.add("in");

    /* interacción: tocar para probar / soltar */
    veil.addEventListener("click", function () {
      live = true; wrap.classList.add("live"); wrap.style.transform = "";
      iframe.focus();
    });
    soltar.addEventListener("click", function () { live = false; wrap.classList.remove("live"); });

    /* leve inclinación 3D siguiendo el mouse */
    if (finePointer && !reduce) {
      stage.addEventListener("pointermove", function (e) {
        if (live) return;
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) / r.width;
        var y = (e.clientY - (r.top + r.height / 2)) / r.height;
        x = Math.max(-1, Math.min(1, x)); y = Math.max(-1, Math.min(1, y));
        wrap.style.transform = "perspective(1400px) rotateY(" + (x * 7).toFixed(2) + "deg) rotateX(" + (-y * 5).toFixed(2) + "deg)";
      });
      stage.addEventListener("pointerleave", function () { wrap.style.transform = ""; });
    }

    return art;
  }

  proyectos.forEach(function (p, i) {
    main.appendChild(lamina(p, i + 1));

    var li = el("li");
    var a = el("a");
    a.href = "#" + p.id;
    a.append(el("span", "n", pad2(i + 1)), el("span", "t", p.titulo), el("span", "leader"), el("span", "k", p.tipo));
    li.append(a);
    indice.append(li);
  });

  /* lámina "próximamente" */
  var pronto = el("div", "pronto");
  var b = el("b", null, "Lámina " + pad2(total + 1));
  pronto.append(b, document.createTextNode(" · en el tablero de dibujo"), el("i"));
  main.appendChild(pronto);

  /* cajetín */
  $("#hoja").textContent = "1 de 1";
  $("#fecha").textContent = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "").toUpperCase();
})();
