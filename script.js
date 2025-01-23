// Sélection des éléments DOM
const cartIcon = document.getElementById('cart-icon'); // Icône du panier
const cartModal = document.getElementById('cart-modal'); // Modale du panier
const closeCartButton = document.getElementById('close-cart'); // Bouton "Fermer" dans la modale
const cartItemsContainer = document.getElementById('cart-items'); // Conteneur des produits dans la modale
const cartCount = document.getElementById('cart-count'); // Compteur d'articles du panier
const payButton = document.getElementById('pay-button'); // Bouton "Payer" dans la modale
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');


// Charger les produits du panier depuis le localStorage
function chargerPanier() {
    const panier = JSON.parse(localStorage.getItem('panier')) || []; // Récupérer le panier
    cartItemsContainer.innerHTML = ''; // Vider le conteneur avant de le remplir
    let total = 0; // Initialiser le total

    if (panier.length === 0) {
        // Si le panier est vide
        cartItemsContainer.innerHTML = '<p style="text-align: center;">Votre panier est vide.</p>';
    } else {
        // Si le panier contient des articles
        panier.forEach((item, produits) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.borderBottom = '1px solid #ddd';
            itemDiv.style.padding = '10px 0';
            itemDiv.innerHTML = `
                <span>${item.produit} - ${item.prix}€</span>
                <button onclick="supprimerDuPanier(${produits})" style="float: right; background: #ff5555; color: white; border: none; padding: 5px 10px; cursor: pointer;">Supprimer</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.prix; // Ajouter le prix au total
        });

        // Afficher le total
        const totalDiv = document.createElement('div');
        totalDiv.style.fontWeight = 'bold';
        totalDiv.style.padding = '10px 0';
        totalDiv.textContent = `Total : ${total}€`;
        cartItemsContainer.appendChild(totalDiv);
    }

    // Mettre à jour le compteur sur l'icône du panier
    cartCount.textContent = panier.length;
}

// Ajouter un produit au panier
function ajouterAuPanier(produit, prix) {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.push({ produit, prix });
    localStorage.setItem('panier', JSON.stringify(panier)); // Enregistrer dans le localStorage
    alert(`${produit} a été ajouté au panier.`);
    chargerPanier();
}

// Supprimer un produit du panier
function supprimerDuPanier(produits) {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.splice(produits, 1); // Supprimer l'article à l'produits donné
    localStorage.setItem('panier', JSON.stringify(panier)); // Mettre à jour le localStorage
    chargerPanier();
}

// Ouvrir ou fermer le cart-modal
cartIcon.addEventListener('click', () => {
    // Si la modale est cachée, on l'affiche
    if (cartModal.style.display === 'none' || cartModal.style.display === '') {
        chargerPanier(); // Charger les produits du panier
        cartModal.style.display = 'block';
    } else {
        // Sinon, on la cache
        cartModal.style.display = 'none';
    }
});

// Fermer la modale lorsque le bouton "Fermer" est cliqué
closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Gérer le clic sur le bouton "Payer"
payButton.addEventListener('click', () => {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    if (panier.length === 0) {
        alert("Votre panier est vide. Ajoutez des produits avant de payer.");
    } else {
        window.location.href = 'payment.html'; // Rediriger vers la page de paiement
    }
});

// Charger le panier au chargement de la page
document.addEventListener('DOMContentLoaded', chargerPanier);




//rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
// Sélectionner le bouton de menu hamburger et le menu


// Ajouter un événement de clic pour le bouton
menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('active'); // Active ou désactive l'affichage du menu
});
