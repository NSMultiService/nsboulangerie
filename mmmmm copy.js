// Sélection des éléments DOM
const paymentMethod = document.getElementById('payment-method'); // Liste déroulante pour le mode de paiement
const cardPayment = document.getElementById('card-payment'); // Section pour Carte Bancaire
const paypalPayment = document.getElementById('paypal-payment'); // Section pour PayPal
const moncashPayment = document.getElementById('moncash-payment'); // Section pour Mon Cash
const paymentForm = document.getElementById('payment-form'); // Formulaire global

// Fonction pour gérer l'affichage dynamique des sections
paymentMethod.addEventListener('change', () => {
    // Cacher toutes les sections par défaut
    cardPayment.classList.add('hidden');
    paypalPayment.classList.add('hidden');
    moncashPayment.classList.add('hidden');

    // Afficher la section correspondante
    const selectedMethod = paymentMethod.value;
    if (selectedMethod === 'card') {
        cardPayment.classList.remove('hidden');
    } else if (selectedMethod === 'paypal') {
        paypalPayment.classList.remove('hidden');
    } else if (selectedMethod === 'moncash') {
        moncashPayment.classList.remove('hidden');
    }
});

// Gestion de la soumission du formulaire
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    const method = paymentMethod.value;

    // Vérification selon le mode de paiement
    if (!method) {
        alert('Veuillez sélectionner un mode de paiement.');
        return;
    }

    if (method === 'card') {
        const cardName = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;

        if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
            alert('Veuillez remplir tous les champs pour le paiement par carte.');
            return;
        }
    } else if (method === 'moncash') {
        const moncashName = document.getElementById('moncash-name').value;
        const moncashPhone = document.getElementById('moncash-phone').value;
        const moncashPin = document.getElementById('moncash-pin').value;

        if (!moncashName || !moncashPhone || !moncashPin) {
            alert('Veuillez remplir tous les champs pour le paiement Mon Cash.');
            return;
        }
    }

    // Confirmation de paiement
    alert(`Paiement réussi avec ${method === 'card' ? 'Carte Bancaire' : method === 'paypal' ? 'PayPal' : 'Mon Cash'} !`);
    localStorage.removeItem('panier'); // Vider le panier (si applicable)
    window.location.href = 'index.html'; // Redirection vers la page principale
});
