# Projet Pratique 2 : Arcanum - Pare-feu de Contenu (Proof of Concept)

Ce dépôt contient la démonstration (proof of concept) simplifiée réalisée dans le cadre du Projet Pratique 2. L'objectif est d'illustrer une perspective d'amélioration issue de l'article scientifique : *Arcanum: Detecting and Evaluating the Privacy Risks of Browser Extensions on Web Pages and Web Content*.

**Avertissement :** Conformément aux contraintes du projet, ce code ne contient aucun hacking, aucune attaque réelle, ni aucune collecte de données sensibles.

## Structure du Projet

Le projet est divisé en trois dossiers distincts pour bien séparer les rôles lors de la démonstration :
* `/page_victime` : Contient la fausse page bancaire (Turtle Banque) avec une donnée "sensible" codée en dur.
* `/extension_malveillante` : Contient une extension de navigateur simulée qui tente d'exfiltrer les données de la page.
* `/pare_feu` : Contient le script `firewall.js` qui illustre notre perspective : un pare-feu de contenu interceptant les requêtes frauduleuses.

## Prérequis

* Un navigateur basé sur Chromium (Google Chrome, Microsoft Edge, Brave, etc.).
* Les fichiers de ce dépôt clonés ou téléchargés sur votre machine locale.

## Guide d'exécution (Scénario de démonstration)

Suivez ces étapes pour reproduire la démonstration.

### Étape 1 : Installation de l'extension malveillante
1. Ouvrez votre navigateur et accédez à la page de gestion des extensions (`chrome://extensions/` ou `edge://extensions/`).
2. Activez le **"Mode développeur"** (généralement un interrupteur en haut à droite).
3. Cliquez sur **"Charger l'extension non empaquetée"** (Load unpacked).
4. Sélectionnez le dossier `/extension_malveillante` situé sur votre machine. L'extension "Extension Malveillante (Démo)" est maintenant active.

### Étape 2 : Acte 1 - La vulnérabilité (Sans le pare-feu)
1. Ouvrez le fichier `index.html` (situé dans `/page_victime`) dans votre navigateur.
2. Ouvrez les outils de développement (Touche **F12** ou Clic droit -> **Inspecter**).
3. Allez dans l'onglet **Console**. Vous verrez que l'extension a lu le faux numéro de carte de crédit.
4. Allez dans l'onglet **Réseau** (Network). Vous y verrez une requête sortante vers `httpbin.org` contenant la donnée volée dans l'URL. La vulnérabilité d'exfiltration est confirmée.

### Étape 3 : Acte 2 - Activation du Pare-feu (La Perspective)
1. Ouvrez le fichier `index.html` dans un éditeur de texte ou de code (VS Code, Notepad, etc.).
2. À la toute fin du fichier, juste avant la balise `</body>`, **décommentez** la ligne d'appel du script du pare-feu.
   * *Changez :* ``
   * *En :* `<script src="../pare_feu/firewall.js"></script>`
3. Sauvegardez le fichier `index.html`.

### Étape 4 : Acte 3 - La protection en action
1. Retournez sur votre navigateur et **rechargez la page** (F5).
2. Observez à nouveau l'onglet **Console** et l'onglet **Réseau** (F12).
3. Le pare-feu intercepte désormais la requête d'exfiltration avant qu'elle ne quitte le navigateur. Une alerte rouge s'affiche dans la console, et aucune requête frauduleuse n'apparaît dans l'onglet Réseau. La perspective de défense est démontrée !
