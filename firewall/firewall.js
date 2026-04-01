// ============================================================================
// ARCANUM FIREWALL - PROOF OF CONCEPT
// Perspective : Pare-feu de contenu pour bloquer l'exfiltration de données
// ============================================================================

console.log("🛡️ Pare-feu Arcanum activé. Surveillance des requêtes réseau en cours...");

// sauvegarde la fonction native 'fetch' du navigateur avant de la modifier
const originalFetch = window.fetch;

// définit la règle du pare-feu : la donnée sensible à protéger
// Dans un vrai système, cela serait dynamique. Pour la démo, on cible la carte.
const donneesSensibles = [
    "4500-1234-5678-9012", // Le numéro de carte nu
    encodeURIComponent("Numéro de carte : 4500-1234-5678-9012") // La version encodée par l'extension
];

// remplace la fonction 'fetch' par notre propre fonction de filtrage (Monkey Patching)
window.fetch = async function() {
    // récupération de l'URL que l'extension essaie de contacter
    let requeteUrl = arguments[0];
    
    // normalisation au format texte pour faciliter la recherche
    if (requeteUrl instanceof Request) {
        requeteUrl = requeteUrl.url;
    } else {
        requeteUrl = String(requeteUrl);
    }

    //  vérifie si l'URL contient une de nos données sensibles
    let tentativeExfiltration = false;
    for (let donnee of donneesSensibles) {
        if (requeteUrl.includes(donnee)) {
            tentativeExfiltration = true;
            break;
        }
    }

    // Si une fuite est détectée, on bloque tout et on alerte l'utilisateur
    if (tentativeExfiltration) {
        // Affichage bien visible dans la console
        console.error("[ARCANUM FIREWALL] ALERTE DE SÉCURITÉ !");
        console.error("Tentative d'exfiltration bloquée !");
        console.error("URL bloquée : " + requeteUrl);

        // Une alerte visuelle (pop-up) parfaite pour la démo en direct
        alert(" PARE-FEU ARCANUM\n\nUne extension a tenté d'exfiltrer vos données bancaires en arrière-plan.\n\nLa connexion a été bloquée avec succès !");

        // On rejette la promesse pour simuler un échec réseau auprès de l'extension malveillante
        // La vraie fonction fetch n'est JAMAIS appelée.
        return Promise.reject(new Error("Connexion bloquée par la politique de sécurité du Pare-feu de Contenu."));
    }

    // 6. Si tout est propre, on laisse la requête normale s'exécuter
    return originalFetch.apply(this, arguments);
};