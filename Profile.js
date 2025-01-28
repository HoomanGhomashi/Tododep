// Fonction pour obtenir et afficher la date actuelle
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('fr-FR', options);
    document.getElementById('date').textContent = dateString;
}

// Afficher immédiatement la date
updateDate();
