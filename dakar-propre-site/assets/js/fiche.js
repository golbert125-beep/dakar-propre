/* ==========================================================================
   Fiche charretier (ouverte par le QR code du label) et signalement d'un ménage.
   L'adresse fiche.html?id=0042 affiche le charretier n° 0042.
   ========================================================================== */
(function () {
  "use strict";
  var D = window.DPI;
  var id = new URLSearchParams(location.search).get("id") || "0042";
  var c = D.charretier(id);

  /* Remplir la fiche */
  document.getElementById("initiales").textContent = D.initiales(c.nom);
  document.getElementById("nom").textContent = c.nom;
  document.getElementById("numero").textContent = "Charrette propre · N° " + c.id;
  document.getElementById("zone").textContent = "Zone " + c.zone;
  document.getElementById("prochain").textContent = D.prochainPassage;
  document.getElementById("rappel").textContent = c.nom + " · N° " + c.id;
  document.title = c.nom + " · Charrette propre N° " + c.id;

  /* Passer d'une vue à l'autre */
  function montrer(idVue) {
    document.querySelectorAll(".app__colonne").forEach(function (v) { v.classList.toggle("cache", v.id !== idVue); });
    window.scrollTo(0, 0);
    var titre = document.querySelector("#" + idVue + " h1");
    if (titre) { titre.setAttribute("tabindex", "-1"); titre.focus({ preventScroll: true }); }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-vers]");
    if (b) montrer(b.dataset.vers);
  });

  /* Choix du motif (un seul à la fois) */
  var motifs = document.getElementById("motifs");
  motifs.addEventListener("click", function (e) {
    var choisi = e.target.closest(".option");
    if (!choisi) return;
    motifs.querySelectorAll(".option").forEach(function (o) { o.setAttribute("aria-pressed", o === choisi ? "true" : "false"); });
  });

  /* Envoi : le signalement est gardé dans le navigateur et apparaît dans l'espace association */
  document.getElementById("envoyer").addEventListener("click", function () {
    var motif = motifs.querySelector('[aria-pressed="true"]').dataset.motif;
    D.ajouterSignalement({
      date: "Aujourd’hui", type: motif, charretier: c.id, source: "Ménage", statut: "Nouveau",
      detail: document.getElementById("detail").value.trim()
    });
    montrer("vue-ok");
  });
})();
