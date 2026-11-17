# Dakar Propre & Inclusif — site de démonstration

Site statique (HTML, CSS, JavaScript, sans installation) à la charte graphique V3.
Un projet de l'association Éco-Innov Dakar · Groupe 48.

## Ouvrir le site

1. Dans VS Code : **Fichier > Ouvrir le dossier** et choisir `dakar-propre-site`.
2. Installer l'extension **Live Server** (Ritwick Dey), puis clic droit sur `index.html` > **Open with Live Server**.
   Sans extension, un double-clic sur `index.html` suffit aussi.

Une connexion internet est nécessaire pour les polices (Google Fonts),
la carte des zones (Leaflet + OpenStreetMap) et le QR code. Hors connexion, le site reste lisible
avec des solutions de secours.

## Les pages

| Parcours | Fichiers |
|---|---|
| Site vitrine | `index.html`, `solution.html` (avec la vue éclatée 3D ; aussi en page seule : `vue-eclatee.html`), `label.html`, `sponsors.html`, `charretier.html`, `contact.html` |
| Ménage (QR code) | `fiche.html?id=0042` : fiche du charretier et signalement |
| Charretier | `espace-charretier.html` : connexion par numéro de label (0041 à 0050) |
| Association | `asso-connexion.html`, puis `asso-tableau.html`, `asso-charretiers.html`, `asso-fiche.html`, `asso-zones.html`, `asso-signalements.html` |

## Organisation du dossier

```
assets/css/style.css         styles du site (variables de la charte en haut du fichier)
assets/css/vue-eclatee.css   styles de la vue 3D
assets/js/data.js            données d'exemple (charretiers, zones, signalements)
assets/js/site.js            logo, icônes, en-tête, pied de page, menu mobile
assets/js/fiche.js           fiche ménage et signalement
assets/js/charretier.js      espace charretier
assets/js/connexion.js       connexion, création de compte, mot de passe oublié (démonstration)
assets/js/asso.js            espace association (tableau de bord, carte, tableaux)
assets/js/vue-eclatee.js     vue éclatée 3D de l'Éco-Charrette
assets/js/vendor/three.min.js  bibliothèque 3D three.js r128 (licence MIT), incluse pour fonctionner hors connexion
assets/img/                  logo, illustration de secours, carte fixe
```

## À faire avant une mise en ligne

- **Photos** : les quatre images de `assets/img/` (`charrette-logo.jpg`, `rue-propre.jpg`, `sac-tri.jpg`, `charretier.jpg`)
  sont générées par IA. À remplacer par de vraies prises de vue, en gardant les mêmes noms de fichiers.
- **Coordonnées** : remplacer « À renseigner » dans `contact.html`.
- **Formulaire de contact** : il n'envoie rien pour l'instant (voir le commentaire dans `contact.html`).
- **Données** : tout ce qui est dans `assets/js/data.js` est fictif. Les signalements envoyés pendant
  les essais sont gardés dans le navigateur (localStorage), pas sur un serveur.
- **Connexions** : la page `asso-connexion.html` propose connexion, création de compte, mot de passe oublié et
  bouton Google, mais rien n'est branché (voir `assets/js/connexion.js`) : l'espace association n'a pas de vraie authentification, et l'espace charretier
  accepte tout numéro de label existant. À sécuriser côté serveur avant tout usage réel.
- **Zones** : les cercles de la carte sont indicatifs ; le découpage réel se fait par rues.
