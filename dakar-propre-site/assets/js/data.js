/* ==========================================================================
   Données d'exemple du pilote (noms et chiffres FICTIFS, pour la démonstration).
   À remplacer plus tard par de vraies données ou par une base de données.
   ========================================================================== */
window.DPI = {
  jours: ["L", "M", "M", "J", "V", "S", "D"],
  joursPassage: [0, 2, 4],                 // lundi, mercredi, vendredi (exemple)
  joursNoms: "Lundi · Mercredi · Vendredi",
  prochainPassage: "mercredi",
  menagesParCharrette: 40,
  prixKiloTrie: 75,                        // FCFA le kilo, recyclables triés (hypothèse du dossier)

  charretiers: [
    { id: "0041", nom: "Ibrahima Ndiaye", zone: "Guédiawaye", tournees: 12, kilos: 318, statut: "Labellisé" },
    { id: "0042", nom: "Moussa Sarr",     zone: "Guédiawaye", tournees: 11, kilos: 324, statut: "Labellisé" },
    { id: "0043", nom: "Cheikh Fall",     zone: "Guédiawaye", tournees: 12, kilos: 341, statut: "Labellisé" },
    { id: "0044", nom: "Modou Diop",      zone: "Guédiawaye", tournees: 10, kilos: 296, statut: "Labellisé" },
    { id: "0045", nom: "Abdou Sow",       zone: "Pikine",     tournees: 12, kilos: 335, statut: "Labellisé" },
    { id: "0046", nom: "Pape Gueye",      zone: "Pikine",     tournees: 11, kilos: 310, statut: "Labellisé" },
    { id: "0047", nom: "Mamadou Ba",      zone: "Pikine",     tournees: 12, kilos: 352, statut: "Labellisé" },
    { id: "0048", nom: "Ousmane Faye",    zone: "Pikine",     tournees: 9,  kilos: 270, statut: "Labellisé" },
    { id: "0049", nom: "Lamine Cissé",    zone: "Médina",     tournees: 12, kilos: 344, statut: "Labellisé" },
    { id: "0050", nom: "Assane Seck",     zone: "Médina",     tournees: 12, kilos: 350, statut: "En formation" }
  ],

  /* Coordonnées approximatives des quartiers : zones indicatives, à découper par rues. */
  zones: [
    { nom: "Guédiawaye", lat: 14.7769, lng: -17.3949, couleur: "#149E63", charrettes: 4, menages: 160 },
    { nom: "Pikine",     lat: 14.7550, lng: -17.3900, couleur: "#FFC42E", charrettes: 4, menages: 160 },
    { nom: "Médina",     lat: 14.6790, lng: -17.4520, couleur: "#D4622A", charrettes: 2, menages: 80 }
  ],

  signalements: [
    { date: "Lundi",    type: "Rue bloquée",               charretier: "0045", source: "Charretier", statut: "En cours" },
    { date: "Lundi",    type: "Rue bloquée",               charretier: "0042", source: "Charretier", statut: "En cours" },
    { date: "Vendredi", type: "Déchets tombés dans la rue", charretier: "0049", source: "Ménage",     statut: "Résolu" },
    { date: "Vendredi", type: "Kit abîmé",                 charretier: "0046", source: "Charretier", statut: "Résolu" },
    { date: "Mercredi", type: "Pas passé aujourd’hui",     charretier: "0048", source: "Ménage",     statut: "Résolu" }
  ],

  recyclablesParSemaine: [610, 680, 720, 760, 790, 810, 830, 860],   // en kilos
  dechetsTombesParTournee: "0,3",
  tourneesFaitesAujourdhui: 7,

  /* --- Petites fonctions utiles ------------------------------------------ */
  charretier: function (id) {
    return this.charretiers.find(function (c) { return c.id === id; }) || this.charretiers[1];
  },
  initiales: function (nom) {
    return nom.split(" ").map(function (m) { return m[0]; }).join("").slice(0, 2).toUpperCase();
  },
  /* Les signalements envoyés depuis la fiche ménage ou l'espace charretier sont gardés
     dans le navigateur (localStorage) pour la démonstration. Rien n'est envoyé sur un serveur. */
  lireLocaux: function () {
    try { return JSON.parse(localStorage.getItem("dpi_signalements") || "[]"); } catch (e) { return []; }
  },
  ajouterSignalement: function (s) {
    try {
      var liste = this.lireLocaux();
      liste.unshift(s);
      localStorage.setItem("dpi_signalements", JSON.stringify(liste));
    } catch (e) { /* stockage indisponible : on continue sans enregistrer */ }
  },
  tousSignalements: function () {
    return this.lireLocaux().concat(this.signalements);
  }
};
