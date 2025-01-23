// Sélection des éléments DOM
const paymentMethod = document.getElementById('payment-method');
const cardPayment = document.getElementById('card-payment');
const paypalPayment = document.getElementById('paypal-payment');
const moncashPayment = document.getElementById('moncash-payment');
const paymentForm = document.getElementById('payment-form');

// Fonction pour gérer l'affichage dynamique des sections
paymentMethod.addEventListener('change', () => {
    cardPayment.classList.add('hidden');
    paypalPayment.classList.add('hidden');
    moncashPayment.classList.add('hidden');

    const selectedMethod = paymentMethod.value;
    if (selectedMethod === 'card') {
        cardPayment.classList.remove('hidden');
    } else if (selectedMethod === 'paypal') {
        paypalPayment.classList.remove('hidden');
    } else if (selectedMethod === 'moncash') {
        moncashPayment.classList.remove('hidden');
    }
});

// Fonction pour valider un champ avec un pattern en temps réel
function addValidationListener(fieldId, regex, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('span'); // Élément pour le message d'erreur
    errorElement.className = 'error-message';
    field.insertAdjacentElement('afterend', errorElement); // Ajoute le message d'erreur sous le champ

    field.addEventListener('input', () => {
        const value = field.value.trim();
        if (!regex.test(value)) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
        } else {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    });
}

// Ajout de validations en temps réel
addValidationListener('card-name', /^[a-zA-Z\s]+$/, 'Le nom ne doit contenir que des lettres.');
addValidationListener('card-number', /^\d{16}$/, 'Le numéro de carte doit contenir exactement 16 chiffres.');
addValidationListener('card-expiry', /^(0[1-9]|1[0-2])\/\d{2}$/, 'La date d\'expiration doit être au format MM/AA.');
addValidationListener('card-cvv', /^\d{3}$/, 'Le CVV doit contenir exactement 3 chiffres.');
addValidationListener('moncash-name', /^[a-zA-Z\s]+$/, 'Le nom ne doit contenir que des lettres.');
addValidationListener('moncash-phone', /^\d{8}$/, 'Le numéro de téléphone doit contenir exactement 8 chiffres.');
addValidationListener('moncash-pin', /^\d{4}$/, 'Le code PIN doit contenir exactement 4 chiffres.');

// Gestion de la soumission du formulaire
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const method = paymentMethod.value;

    if (!method) {
        alert('Veuillez sélectionner un mode de paiement.');
        return;
    }

    let isValid = true;

    if (method === 'card') {
        isValid &= validateField('card-name', /^[a-zA-Z\s]+$/, 'Le nom ne doit contenir que des lettres.');
        isValid &= validateField('card-number', /^\d{16}$/, 'Le numéro de carte doit contenir exactement 16 chiffres.');
        isValid &= validateField('card-expiry', /^(0[1-9]|1[0-2])\/\d{2}$/, 'La date d\'expiration doit être au format MM/AA.');
        isValid &= validateField('card-cvv', /^\d{3}$/, 'Le CVV doit contenir exactement 3 chiffres.');
    } else if (method === 'moncash') {
        isValid &= validateField('moncash-name', /^[a-zA-Z\s]+$/, 'Le nom ne doit contenir que des lettres.');
        isValid &= validateField('moncash-phone', /^\d{8}$/, 'Le numéro de téléphone doit contenir exactement 8 chiffres.');
        isValid &= validateField('moncash-pin', /^\d{4}$/, 'Le code PIN doit contenir exactement 4 chiffres.');
    }

    if (isValid) {
        alert(`Paiement réussi avec ${method === 'card' ? 'Carte Bancaire' : method === 'paypal' ? 'PayPal' : 'Mon Cash'} !`);
        localStorage.removeItem('panier');
        window.location.href = 'produits.html';
    }
});

// Fonction pour valider un champ au moment de la soumission
function validateField(fieldId, regex, errorMessage) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;

    if (!regex.test(value)) {
        errorElement.textContent = errorMessage;
        field.classList.add('error');
        return false;
    }

    errorElement.textContent = '';
    field.classList.remove('error');
    return true;
}
