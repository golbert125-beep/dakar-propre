/* ==========================================================================
   Dakar Propre & Inclusif — éléments communs à toutes les pages :
   icônes, logo, en-tête, pied de page, menu mobile, images de secours.
   ========================================================================== */
(function () {
  "use strict";

  /* --- Icônes (trait, grille de 24 px) ------------------------------------ */
  var ICONES = {
    charrette: '<path d="M3 11h16l-1.5 3.5H4.5z"/><circle cx="10" cy="18" r="2.6"/><path d="M4.5 11C4.5 7.5 8 5 13 5h6v6"/>',
    sac: '<path d="M5.5 8h13l-1.2 12.5H6.7z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/><path d="M10 13.5l1.5 1.5 3-3"/>',
    passages: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M7.5 15h.01M12 15h.01M16.5 15h.01"/>',
    recyclage: '<path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12a8 8 0 0 1 13.7-5.6"/><path d="M18 2.8v4h-4M6 21.2v-4h4"/>',
    menage: '<path d="M3 11l9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
    label: '<circle cx="12" cy="9.5" r="6"/><path d="M9.5 9.5l1.8 1.8L14.8 8"/><path d="M8.6 14.5L7.2 21l4.8-2.4 4.8 2.4-1.4-6.5"/>',
    env: '<path d="M4.5 19.5C4.5 10.5 10 4.5 20 4.5c0 10-6 15-14.5 15"/><path d="M4.5 19.5l9-9"/>',
    zone: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    flecheG: '<path d="M15 5l-7 7 7 7"/>',
    flecheD: '<path d="M9 5l7 7-7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    moins: '<path d="M5 12h14"/>',
    son: '<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    alerte: '<path d="M12 4l9 16H3L12 4zM12 10v4.5M12 17.2v.3"/>',
    outil: '<path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17l3 3 5.3-5.3a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z"/>',
    bloque: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    points: '<path d="M6 12h.01M12 12h.01M18 12h.01" stroke-width="3.2"/>',
    coeur: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    fermer: '<path d="M6 6l12 12M18 6L6 18"/>',
    sortie: '<path d="M10 5H5v14h5M15 8l4 4-4 4M19 12H9"/>'
  };
  function ic(nom) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + (ICONES[nom] || "") + "</svg>";
  }

  /* --- Logo : symbole « roue à trois feuilles » + nom ---------------------- */
  var FEUILLES = ["M120.00 105.00 C78.00 84.00, 86.00 46.00, 130.00 34.00 C158.00 56.00, 154.00 90.00, 120.00 105.00 Z", "M132.99 127.50 C172.18 101.63, 201.09 127.56, 189.48 171.66 C156.43 184.91, 128.98 164.44, 132.99 127.50 Z", "M107.01 127.50 C109.82 174.37, 72.91 186.44, 40.52 154.34 C45.57 119.09, 77.02 105.56, 107.01 127.50 Z"];
  function symbole(blanc) {
    var jante = blanc ? "#FFFFFF" : "#0B3D2E", feuille = blanc ? "#FFFFFF" : "#149E63";
    return '<svg viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="100" fill="none" stroke="' + jante +
      '" stroke-width="17"/><path d="' + FEUILLES[0] + '" fill="#FFC42E"/><path d="' + FEUILLES[1] + '" fill="' + feuille +
      '"/><path d="' + FEUILLES[2] + '" fill="' + feuille + '"/><circle cx="120" cy="120" r="8" fill="' + jante + '"/></svg>';
  }
  function logo(blanc, lien, signature) {
    return '<a class="logo' + (blanc ? " logo--blanc" : "") + '" href="' + (lien || "index.html") +
      '" aria-label="Dakar Propre & Inclusif, accueil">' + symbole(blanc) +
      "<span><b>Dakar Propre <i>&amp; Inclusif</i></b>" + (signature === false ? "" : "<small>Éco-Innov Dakar</small>") + "</span></a>";
  }

  /* --- Semaine de passage --------------------------------------------------- */
  function semaine() {
    var d = window.DPI;
    return '<div class="semaine" aria-label="Jours de passage : ' + d.joursNoms + '">' + d.jours.map(function (j, i) {
      return "<span" + (d.joursPassage.indexOf(i) !== -1 ? ' class="actif"' : "") + ">" + j + "</span>";
    }).join("") + "</div>";
  }

  /* --- Petit message temporaire ---------------------------------------------- */
  function message(texte) {
    var b = document.createElement("div");
    b.className = "info-bulle"; b.setAttribute("role", "status"); b.textContent = texte;
    document.body.appendChild(b);
    setTimeout(function () { b.remove(); }, 2600);
  }

  window.DPIUI = { ic: ic, logo: logo, symbole: symbole, semaine: semaine, message: message };

  /* --- En-tête, menu mobile et pied de page du site vitrine ------------------ */
  var LIENS = [
    ["solution", "solution.html", "La solution"],
    ["label", "label.html", "Le label"],
    ["sponsors", "sponsors.html", "Sponsors & commune"],
    ["charretier", "charretier.html", "Devenir charretier"]
  ];
  function monterSite(page) {
    var nav = LIENS.map(function (l) {
      return '<a href="' + l[1] + '"' + (l[0] === page ? ' aria-current="page"' : "") + ">" + l[2] + "</a>";
    }).join("");
    var entete = document.createElement("header");
    entete.className = "entete";
    entete.innerHTML = '<div class="entete__barre">' + logo(false) + '<nav aria-label="Navigation principale">' + nav + "</nav>" +
      '<div class="entete__actions"><a class="lien" href="asso-connexion.html">Espace réseau</a>' +
      '<a class="bouton bouton--sombre" href="contact.html">Contact</a>' +
      '<button class="entete__menu" type="button" aria-label="Ouvrir le menu" aria-expanded="false">' + ic("menu") + "</button></div></div>";
    document.body.prepend(entete);

    var menu = document.createElement("div");
    menu.className = "menu-mobile"; menu.id = "menu-mobile";
    menu.innerHTML = '<div class="menu-mobile__haut">' + logo(true) + '<button type="button" aria-label="Fermer le menu">' + ic("fermer") + "</button></div>" +
      '<a href="index.html">Accueil</a>' + LIENS.map(function (l) { return '<a href="' + l[1] + '">' + l[2] + "</a>"; }).join("") +
      '<a href="contact.html">Contact</a>' +
      '<div class="menu-mobile__bas"><span class="surtitre" style="color:#FFC42E">Réseau</span>' +
      '<a href="espace-charretier.html">Espace charretier</a><a href="asso-connexion.html">Espace association</a></div>';
    document.body.appendChild(menu);
    var ouvrir = entete.querySelector(".entete__menu"), fermer = menu.querySelector("button");
    function basculer(etat) {
      menu.classList.toggle("ouvert", etat);
      ouvrir.setAttribute("aria-expanded", etat ? "true" : "false");
      document.body.style.overflow = etat ? "hidden" : "";
      (etat ? fermer : ouvrir).focus();
    }
    ouvrir.addEventListener("click", function () { basculer(true); });
    fermer.addEventListener("click", function () { basculer(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("ouvert")) basculer(false); });

    var pied = document.createElement("footer");
    pied.className = "pied";
    pied.innerHTML = '<div><div class="pied__haut"><div>' + logo(true) +
      "<p>Collecte de proximité par Éco-Charrette. Un projet de l’association Éco-Innov Dakar.</p></div>" +
      '<div><h2>Le projet</h2><ul><li><a href="solution.html">La solution</a></li><li><a href="label.html">Le label</a></li></ul></div>' +
      '<div><h2>Participer</h2><ul><li><a href="sponsors.html">Sponsors &amp; commune</a></li><li><a href="charretier.html">Devenir charretier</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h2>Réseau</h2><ul><li><a href="espace-charretier.html">Espace charretier</a></li><li><a href="asso-connexion.html">Espace association</a></li></ul></div></div>' +
      '<div class="pied__bas"><span>Éco-Innov Dakar · Groupe 48</span><span>Site de démonstration · données d’exemple</span></div></div>';
    document.body.appendChild(pied);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var corps = document.body;
    if (corps.dataset.gabarit === "site") monterSite(corps.dataset.page);

    /* <i data-ic="sac"></i> devient une icône ; <span data-logo> devient le logo */
    document.querySelectorAll("[data-ic]").forEach(function (el) { el.outerHTML = ic(el.dataset.ic); });
    document.querySelectorAll("[data-symbole]").forEach(function (el) { el.outerHTML = symbole(el.dataset.symbole === "blanc"); });
    document.querySelectorAll("[data-logo]").forEach(function (el) { el.outerHTML = logo(el.dataset.logo === "blanc", el.dataset.lien); });
    document.querySelectorAll("[data-semaine]").forEach(function (el) { el.outerHTML = semaine(); });

    /* Photos : si le fichier manque, on affiche l'image de secours ou on retire le bloc */
    document.querySelectorAll("img[data-secours]").forEach(function (img) {
      function secours() {
        if (img.dataset.secours === "retirer") { (img.closest("[data-bloc-photo]") || img).remove(); return; }
        if (img.src.indexOf(img.dataset.secours) === -1) img.src = img.dataset.secours;
      }
      img.addEventListener("error", secours);
      if (img.complete && img.naturalWidth === 0) secours();
    });

    /* Lignes de tableau cliquables */
    document.addEventListener("click", function (e) {
      var tr = e.target.closest("tr[data-href]");
      if (tr) location.href = tr.dataset.href;
    });
  });
})();
