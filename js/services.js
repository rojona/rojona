const games = [
    {
        id: 1,
        title: "Cyberpunk 3",
        price: 59.99,
        image: "images/cyberpunk.webp",
        description: "The latest installment in the Cyberpunk series.",
        details: {
            genre: "RPG",
            releaseDate: "2025",
            publisher: "CD Projekt RED",
            features: ["Open World", "Character Customization", "Ray Tracing"],
            systemRequirements: "Quantum Computer with at least 1 petabyte RAM"
        }
    },
    {
        id: 2,
        title: "The Sim: You Edition",
        price: 0.00,
        image: "images/thesim.webp",
        description: "The game that reminds you to stop playing games and go outside in order to experience the most realistic simulation ever possible.",
        details: {
            genre: "Life Simulation",
            releaseDate: "2,000,000 BC",
            publisher: "Gaia",
            features: ["Earth World Size", "Unlimited Activities", "Finite Play Time"],
            systemRequirements: "Brain, Body"
        }
    },
];

let cart = [];

function displayGames() {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = '';

    games.forEach(game => {
        const gameCard = `
            <div class="col-md-4">
                <div class="card game-card">
                    <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    <div class="card-body" d-flex flex-column>
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">${game.description}</p>
                        <p class="card-text">$${game.price}</p>
                        <div class="mt-auto">
                            <button onclick="showGameDetails(${game.id})" class="btn btn-info mb-2 w-100">Details</button>
                            <button onclick="addToCart(${game.id})" class="btn btn-primary w-100">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += gameCard;
    });
}

function showGameDetails(gameId) {
    const game = games.find(g => g.id === gameId);
    const modal = document.getElementById('gameModal');
    const modalBody = modal.querySelector('.modal-body');

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${game.image}" class="img-fluid" alt="${game.title}">
            </div>
            <div class="col-md-6">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <h4>Details</h4>
                    Genre: ${game.details.genre}<br/>
                    Release Date: ${game.details.releaseDate}<br/>
                    Publisher: ${game.details.publisher}<br/><br/>
                <h4>Features:</h4>
                <ul>
                    ${game.details.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p><strong>System Requirements:</strong> ${game.details.systemRequirements}</p>
            </div>
        </div>
    `;

    new bootstrap.Modal(modal).show();
}

function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    cart.push(game);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    updateCartDisplay();
    
    const toastTotalElement = document.getElementById('toastTotal');
    toastTotalElement.textContent = total.toFixed(2);
    
    const toastElement = document.getElementById('cartToast');
    const toast = new bootstrap.Toast(toastElement, {
        animation: false,
        autohide: false,
    })
    toast.show();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((game, index) => {
        total += game.price;
        cartItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${game.title} - $${game.price}</span>
                <button onclick="removeFromCart(${index})" class="btn btn-danger btn-sm">Remove</button>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Already outside your door!');
    cart = [];
    updateCartDisplay();
    document.getElementById('cartModal').hide();
}

async function fetchExchangeRate() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const rate = data.rates.SEK;
        document.getElementById('exchangeRate').textContent = rate.toFixed(2);
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        document.getElementById('exchangeRate').textContent = 'Error loading rate';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayGames();
    fetchExchangeRate();
});