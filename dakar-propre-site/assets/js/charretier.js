/* ==========================================================================
   Espace charretier : connexion par numéro de label, puis trois gros boutons
   (tournée faite, kilos vendus, problème). Pensé pour le téléphone.
   ========================================================================== */
(function () {
  "use strict";
  var D = window.DPI, UI = window.DPIUI;
  var app = document.getElementById("app");
  var moi = null;          // le charretier connecté
  var kilos = 15;

  function montrer(idVue) {
    document.querySelectorAll(".app__colonne").forEach(function (v) { v.classList.toggle("cache", v.id !== idVue); });
    /* Fond vert pour la connexion et la confirmation, fond sable pour le reste */
    var sombre = idVue === "vue-connexion" || idVue === "vue-ok";
    app.classList.toggle("app--foret", sombre);
    app.classList.toggle("sombre", sombre);
    window.scrollTo(0, 0);
  }
  function prenom() { return moi.nom.split(" ")[0]; }
  function confirmer(texte) {
    document.getElementById("merci").textContent = texte;
    montrer("vue-ok");
  }

  /* --- Connexion ------------------------------------------------------------ */
  var cases = Array.prototype.slice.call(document.querySelectorAll(".code input"));
  cases.forEach(function (champ, i) {
    champ.addEventListener("input", function () {
      champ.value = champ.value.replace(/\D/g, "").slice(-1);
      if (champ.value && cases[i + 1]) cases[i + 1].focus();
    });
    champ.addEventListener("focus", function () { champ.select(); });
  });
  document.getElementById("connexion").addEventListener("submit", function (e) {
    e.preventDefault();
    var numero = cases.map(function (c) { return c.value; }).join("");
    var trouve = D.charretiers.find(function (c) { return c.id === numero; });
    if (!trouve) { UI.message("Numéro de label inconnu."); return; }
    moi = trouve;
    document.getElementById("bonjour").textContent = "Bonjour " + prenom();
    document.getElementById("ma-zone").textContent = "Zone " + moi.zone + " · N° " + moi.id;
    montrer("vue-accueil");
  });

  /* --- Navigation et actions -------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var vers = e.target.closest("[data-vers]");
    if (vers) { montrer(vers.dataset.vers); return; }

    if (e.target.closest("[data-son]")) { UI.message("Version audio en wolof : à venir."); return; }

    var action = e.target.closest("[data-action]");
    if (!action) return;
    if (action.dataset.action === "tournee") confirmer("Tournée enregistrée. Merci " + prenom() + ". À vendredi.");
    if (action.dataset.action === "kilos") confirmer(kilos + " kg enregistrés. Merci " + prenom() + ".");
    if (action.dataset.action === "probleme") {
      var motif = document.querySelector('#problemes [aria-pressed="true"]').dataset.motif;
      D.ajouterSignalement({ date: "Aujourd’hui", type: motif, charretier: moi.id, source: "Charretier", statut: "Nouveau" });
      confirmer("Problème signalé à l’association. Merci " + prenom() + ".");
    }
  });

  /* --- Kilos vendus -------------------------------------------------------------- */
  function prix() { return Number(document.querySelector('#tri input:checked').value); }
  function majKilos() {
    document.getElementById("kilos").innerHTML = kilos + "<small> kg</small>";
    document.getElementById("calcul").textContent = kilos + " kg × " + prix() + " FCFA";
    document.getElementById("total").textContent = (kilos * prix()).toLocaleString("fr-FR") + " FCFA";
  }
  document.getElementById("plus").addEventListener("click", function () { kilos = Math.min(99, kilos + 1); majKilos(); });
  document.getElementById("moins").addEventListener("click", function () { kilos = Math.max(0, kilos - 1); majKilos(); });
  document.getElementById("tri").addEventListener("change", majKilos);
  majKilos();

  /* --- Choix du problème (un seul à la fois) ---------------------------------------- */
  var problemes = document.getElementById("problemes");
  problemes.addEventListener("click", function (e) {
    var choisi = e.target.closest(".tuile");
    if (!choisi) return;
    problemes.querySelectorAll(".tuile").forEach(function (t) { t.setAttribute("aria-pressed", t === choisi ? "true" : "false"); });
  });
})();
