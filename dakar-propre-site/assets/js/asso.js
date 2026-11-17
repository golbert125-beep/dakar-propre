/* ==========================================================================
   Espace association : menu, tableau de bord, charretiers, fiche, zones, signalements.
   Chaque page indique son nom dans <body data-page="…"> ; ce fichier remplit le contenu.
   ========================================================================== */
(function () {
  "use strict";
  var D = window.DPI, UI = window.DPIUI;
  var page = document.body.dataset.page;

  function etiquette(statut) {
    var classe = statut === "Nouveau" ? " etiquette--nouveau" : statut === "En cours" || statut === "En formation" ? " etiquette--cours" : "";
    return '<span class="etiquette' + classe + '">' + statut + "</span>";
  }
  function echapper(t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  /* --- Menu latéral (devient une barre d'onglets en bas sur petit écran) ----- */
  var MENU = [
    ["tableau", "asso-tableau.html", "Tableau de bord", "Accueil", "env"],
    ["charretiers", "asso-charretiers.html", "Charretiers", "Charretiers", "charrette"],
    ["zones", "asso-zones.html", "Zones", "Zones", "zone"],
    ["signalements", "asso-signalements.html", "Signalements", "Signal.", "menage"]
  ];
  var actif = page === "fiche" ? "charretiers" : page;
  var menu = document.createElement("aside");
  menu.className = "asso__menu";
  menu.innerHTML = UI.logo(true, "asso-tableau.html") + '<nav aria-label="Espace association">' + MENU.map(function (m) {
    return '<a href="' + m[1] + '"' + (m[0] === actif ? ' aria-current="page"' : "") + ">" + UI.ic(m[4]) +
      '<span class="menu-long">' + m[2] + "</span></a>";
  }).join("") + '</nav><div class="asso__compte"><b>Éco-Innov Dakar</b><a href="index.html">Voir le site</a><a href="asso-connexion.html">Déconnexion</a></div>';
  document.querySelector(".asso").prepend(menu);
  var barre = document.createElement("div");
  barre.className = "asso__barre-mobile";
  barre.innerHTML = UI.logo(true, "asso-tableau.html", false) + '<a href="asso-connexion.html">Déconnexion</a>';
  document.querySelector(".asso__page").prepend(barre);

  /* --- Tableau de bord ------------------------------------------------------------ */
  if (page === "tableau") {
    var semaines = D.recyclablesParSemaine, max = Math.max.apply(null, semaines);
    var kilosMois = semaines.slice(-4).reduce(function (a, b) { return a + b; }, 0);
    var tous = D.tousSignalements();
    var nouveaux = tous.filter(function (s) { return s.statut === "Nouveau"; }).length;
    var labellises = D.charretiers.filter(function (c) { return c.statut === "Labellisé"; }).length;
    document.getElementById("kpis").innerHTML = [
      ["Charrettes labellisées", labellises, "sur " + D.charretiers.length + " prévues"],
      ["Déchets tombés par tournée", D.dechetsTombesParTournee, "en baisse sur le mois"],
      ["Signalements", tous.length, nouveaux + " nouveau" + (nouveaux > 1 ? "x" : "")],
      ["Recyclables vendus ce mois", kilosMois.toLocaleString("fr-FR") + " kg", D.charretiers.length * D.menagesParCharrette + " ménages couverts"]
    ].map(function (k) {
      return '<div class="kpi"><span class="surtitre">' + k[0] + "</span><b>" + k[1] + "</b><small>" + k[2] + "</small></div>";
    }).join("");
    document.getElementById("barres").innerHTML = semaines.map(function (v, i) {
      return "<div>" + v + '<i style="height:' + Math.round(v / max * 70) + '%"></i><span>S' + (i + 1) + "</span></div>";
    }).join("");
    document.getElementById("derniers").innerHTML = tous.slice(0, 4).map(function (s) {
      var c = D.charretier(s.charretier);
      return "<div><span><b>" + echapper(s.type) + "</b><small>" + c.zone + " · " + s.source.toLowerCase() + "</small></span>" + etiquette(s.statut) + "</div>";
    }).join("");
    document.getElementById("faites").textContent = D.tourneesFaitesAujourdhui + " faites sur " + D.charretiers.length;
    document.getElementById("tournees").innerHTML = D.charretiers.map(function (c, i) {
      return '<a href="asso-fiche.html?id=' + c.id + '"' + (i < D.tourneesFaitesAujourdhui ? ' class="faite"' : "") + ">N° " + c.id + "</a>";
    }).join("");
    document.getElementById("exporter").addEventListener("click", function () {
      /* Export CSV simple des charretiers, à ouvrir dans un tableur */
      var lignes = [["Numero", "Nom", "Zone", "Tournees du mois", "Recyclables (kg)", "Statut"]].concat(D.charretiers.map(function (c) {
        return [c.id, c.nom, c.zone, c.tournees, c.kilos, c.statut];
      }));
      var csv = "﻿" + lignes.map(function (l) { return l.join(";"); }).join("\r\n");
      var lien = document.createElement("a");
      lien.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      lien.download = "dakar-propre-pilote.csv";
      lien.click();
      URL.revokeObjectURL(lien.href);
    });
  }

  /* --- Liste des charretiers --------------------------------------------------------- */
  if (page === "charretiers") {
    var liste = document.getElementById("liste");
    var afficher = function (filtre) {
      var f = (filtre || "").toLowerCase();
      var lignes = D.charretiers.filter(function (c) { return (c.nom + " " + c.id + " " + c.zone).toLowerCase().indexOf(f) !== -1; });
      liste.innerHTML = lignes.map(function (c) {
        return '<tr data-href="asso-fiche.html?id=' + c.id + '"><td>N° ' + c.id + '</td><td class="fort"><a href="asso-fiche.html?id=' + c.id +
          '" style="text-decoration:none">' + c.nom + '</a></td><td class="masque-mobile">' + c.zone +
          '</td><td class="masque-tablette">Kit de base</td><td class="masque-tablette">' + c.tournees + ' / 12</td><td class="masque-tablette">' + c.kilos +
          "</td><td>" + etiquette(c.statut) + "</td></tr>";
      }).join("") || '<tr><td colspan="7">Aucun charretier ne correspond.</td></tr>';
    };
    document.getElementById("recherche").addEventListener("input", function () { afficher(this.value); });
    afficher("");
  }

  /* --- Fiche d'un charretier ------------------------------------------------------------ */
  if (page === "fiche") {
    var c = D.charretier(new URLSearchParams(location.search).get("id") || "0042");
    document.querySelector(".asso__titre h1").textContent = c.nom;
    document.title = c.nom + " · Espace association";
    document.getElementById("publique").href = "fiche.html?id=" + c.id;
    document.getElementById("initiales").textContent = D.initiales(c.nom);
    document.getElementById("statut").textContent = c.statut === "Labellisé" ? "Charretier labellisé" : "Charretier en formation";
    document.getElementById("bandeau").textContent = "Charrette propre · N° " + c.id;
    document.getElementById("infos").innerHTML = [
      ["Zone", c.zone], ["Ménages", D.menagesParCharrette], ["Jours de passage", D.joursNoms],
      ["Kit", "Kit de base posé"], ["Formation", c.statut === "Labellisé" ? "Suivie" : "En cours"], ["Participation au kit", "Versée"]
    ].map(function (l) {
      return '<div class="entre"><dt class="surtitre" style="color:var(--gris)">' + l[0] + '</dt><dd style="margin:0;font-weight:700;text-align:right">' + l[1] + "</dd></div>";
    }).join("");
    var siens = D.tousSignalements().filter(function (s) { return s.charretier === c.id; });
    var ouverts = siens.filter(function (s) { return s.statut !== "Résolu"; }).length;
    document.getElementById("kpis").innerHTML = [
      ["Tournées ce mois", c.tournees + " / 12", (12 - c.tournees) + " manquée" + (12 - c.tournees > 1 ? "s" : "")],
      ["Recyclables vendus", c.kilos + " kg", "ce mois"],
      ["Signalements", siens.length, ouverts + " en cours"]
    ].map(function (k) {
      return '<div class="kpi" style="background:var(--blanc);color:inherit"><span class="surtitre" style="color:var(--vert-700)">' + k[0] + "</span><b>" + k[1] + "</b><small>" + k[2] + "</small></div>";
    }).join("");
    var historique = [["Tournée faite", "Mercredi", "Résolu"], ["15 kg de recyclables vendus", "Mercredi", "Résolu"]].concat(
      siens.map(function (s) { return [(s.source === "Ménage" ? "Signalement d’un ménage : " : "Problème : ") + s.type.toLowerCase(), s.date, s.statut]; }),
      [["Tournée faite", "Lundi", "Résolu"]]);
    document.getElementById("historique").innerHTML = historique.map(function (h) {
      return "<div><b>" + echapper(h[0]) + '</b><small style="font-size:13px">' + h[1] + "</small>" + etiquette(h[2]) + "</div>";
    }).join("");
  }

  /* --- Zones : vraie carte OpenStreetMap avec Leaflet ------------------------------------ */
  if (page === "zones") {
    document.getElementById("zones").innerHTML = D.zones.map(function (z) {
      return '<div class="panneau zone"><i style="background:' + z.couleur + '"></i><div><h3>' + z.nom + '</h3><p class="note" style="font-size:13px">' +
        z.charrettes + " charrettes · " + z.menages + ' ménages</p></div><a class="lien" style="font-size:13px" href="asso-charretiers.html">Voir →</a></div>';
    }).join("");
    var cible = document.getElementById("carte");
    if (window.L) {
      var carte = L.map(cible, { scrollWheelZoom: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: '&copy; les contributeurs d’<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(carte);
      var limites = [];
      D.zones.forEach(function (z) {
        L.circle([z.lat, z.lng], { radius: 950, color: z.couleur, weight: 2, fillColor: z.couleur, fillOpacity: 0.3 })
          .addTo(carte).bindTooltip(z.nom, { permanent: true, direction: "top", className: "zone-nom" });
        /* Une pastille par charrette, répartie autour du centre de la zone (positions d'exemple) */
        for (var i = 0; i < z.charrettes; i++) {
          var angle = (i / z.charrettes) * Math.PI * 2 + 0.6;
          L.circleMarker([z.lat + Math.sin(angle) * 0.0045, z.lng + Math.cos(angle) * 0.0045], {
            radius: 7, color: "#0B3D2E", weight: 3, fillColor: "#FFC42E", fillOpacity: 1
          }).addTo(carte).bindPopup("Charrette labellisée · zone " + z.nom);
        }
        limites.push([z.lat, z.lng]);
      });
      carte.fitBounds(limites, { padding: [60, 60] });
    } else {
      /* Hors connexion : image fixe de la carte */
      cible.style.backgroundImage = 'url("assets/img/carte-dakar.png")';
    }
  }

  /* --- Signalements ------------------------------------------------------------------------ */
  if (page === "signalements") {
    var corps = document.getElementById("liste"), filtre = "";
    var dessiner = function () {
      var lignes = D.tousSignalements().filter(function (s) { return !filtre || s.statut === filtre; });
      corps.innerHTML = lignes.map(function (s) {
        var c = D.charretier(s.charretier);
        return '<tr data-href="asso-fiche.html?id=' + c.id + '"><td class="masque-mobile">' + echapper(s.date) + '</td><td class="fort">' + echapper(s.type) +
          (s.detail ? '<br><small style="font-weight:400;color:var(--gris)">' + echapper(s.detail) + "</small>" : "") + "</td><td>" + c.nom + " · " + c.id +
          '</td><td class="masque-tablette">' + c.zone + '</td><td class="masque-tablette">' + s.source + "</td><td>" + etiquette(s.statut) + "</td></tr>";
      }).join("") || '<tr><td colspan="6">Aucun signalement.</td></tr>';
    };
    document.getElementById("filtres").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      filtre = b.dataset.filtre;
      this.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      dessiner();
    });
    document.getElementById("vider").addEventListener("click", function () {
      try { localStorage.removeItem("dpi_signalements"); } catch (e) { /* rien à effacer */ }
      dessiner();
    });
    dessiner();
  }
})();
