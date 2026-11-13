(function () {
  var grid = document.getElementById("grid");
  (window.PROYECTOS || []).forEach(function (p) {
    var card = document.createElement("article");
    card.className = "card";

    var tipo = document.createElement("span");
    tipo.className = "tag tag-tipo";
    tipo.textContent = p.tipo;

    var h3 = document.createElement("h3");
    h3.textContent = p.titulo;

    var desc = document.createElement("p");
    desc.textContent = p.descripcion;

    var techs = document.createElement("ul");
    techs.className = "techs";
    p.tecnologias.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      techs.appendChild(li);
    });

    var estado = document.createElement("p");
    estado.className = "estado";
    estado.textContent = p.estado;

    var a = document.createElement("a");
    a.className = "btn";
    a.href = p.demo;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Abrir demo";

    card.append(tipo, h3, desc, techs, estado, a);
    grid.appendChild(card);
  });
})();
