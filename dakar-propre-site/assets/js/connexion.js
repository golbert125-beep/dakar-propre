/* ==========================================================================
   Connexion de l'espace association : se connecter, créer un compte,
   mot de passe oublié, bouton Google.
   DÉMONSTRATION : rien n'est vérifié ni enregistré. Avant un usage réel, brancher
   ces formulaires sur un vrai service de comptes (par exemple Firebase Authentication
   ou Supabase Auth), qui gère aussi « Continuer avec Google » et l'e-mail de
   réinitialisation. Ne jamais stocker de mot de passe dans le navigateur.
   ========================================================================== */
(function () {
  "use strict";
  var UI = window.DPIUI;

  function montrer(id) {
    document.querySelectorAll(".auth__vue").forEach(function (v) { v.classList.toggle("cache", v.id !== id); });
    document.querySelectorAll(".auth__erreur").forEach(function (e) { e.classList.add("cache"); });
    var cible = document.querySelector("#" + id + " input") || document.getElementById(id);
    if (cible) cible.focus();
  }
  function erreur(form, texte) {
    var e = form.querySelector(".auth__erreur");
    if (!e) { UI.message(texte); return; }
    e.textContent = texte; e.classList.remove("cache");
  }
  function emailValide(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function confirmer(titre, texte, entrer) {
    document.getElementById("ok-titre").textContent = titre;
    document.getElementById("ok-texte").textContent = texte;
    document.getElementById("ok-entrer").classList.toggle("cache", !entrer);
    montrer("vue-ok");
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-vue]");
    if (b) { montrer(b.dataset.vue); return; }
    if (e.target.closest("[data-google]")) {
      /* À brancher : nécessite un identifiant client Google (console Google Cloud) et un service de comptes. */
      UI.message("Connexion Google : à activer avec un identifiant Google.");
    }
  });

  /* Se connecter */
  document.getElementById("vue-connexion").addEventListener("submit", function (e) {
    e.preventDefault();
    location.href = "asso-tableau.html";
  });

  /* Créer un compte */
  document.getElementById("vue-creation").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = this.elements;
    if (!f.nom.value.trim()) return erreur(this, "Indiquez votre nom.");
    if (!emailValide(f.email.value)) return erreur(this, "Cet e-mail n’est pas valide.");
    if (f.mdp.value.length < 8) return erreur(this, "Le mot de passe doit faire au moins 8 caractères.");
    if (f.mdp.value !== f.mdp2.value) return erreur(this, "Les deux mots de passe ne sont pas identiques.");
    var prenom = f.nom.value.trim().split(" ")[0];
    this.reset();
    confirmer("Bienvenue " + prenom + ".", "En conditions réelles, votre compte serait créé puis validé par l’association.", true);
  });

  /* Mot de passe oublié */
  document.getElementById("vue-oubli").addEventListener("submit", function (e) {
    e.preventDefault();
    var email = this.elements.email.value;
    if (!emailValide(email)) return erreur(this, "Cet e-mail n’est pas valide.");
    this.reset();
    confirmer("Vérifiez vos e-mails.", "En conditions réelles, un lien de réinitialisation serait envoyé à " + email + ".", false);
  });
})();
