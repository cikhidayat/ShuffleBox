const cardsContainer = document.getElementById('cards');
const countElement = document.getElementById('count');
const checkCountElement = document.getElementById('check-count');
const userNameElement = document.getElementById('user-name');
const userClassElement = document.getElementById('user-class');
const winMessageElement = document.getElementById('win-message');
const restartButton = document.getElementById('restart-button'); // New Button
let selectedCards = [];
let exchangeCount = 0;
let checkCount = 0;
let userName = '';
let userClass = '';
let gameFinished = false;
let gameMode = ''; // New variable to track the game mode

// Generate cards in random order
function generateCards() {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

    shuffledNumbers.forEach(number => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = number; // Store the number as a data attribute
        card.addEventListener('click', () => selectCard(card));
        cardsContainer.appendChild(card);
    });
}

// Select a card
function selectCard(card) {
    if (gameFinished) return; // Prevent selection if the game is finished
    if (selectedCards.length < 2 && !card.classList.contains('selected')) {
        card.classList.add('selected', 'flipped');
        card.textContent = card.dataset.number; // Reveal the card number
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkCount++;
            checkCountElement.textContent = checkCount;
        }
    } else if (card.classList.contains('selected')) {
        card.classList.remove('selected', 'flipped');
        card.textContent = ''; // Hide the card number
        selectedCards = selectedCards.filter(c => c !== card);
    }
}

// Swap cards
function swapCards() {
    if (gameFinished) return; // Prevent swapping if the game is finished
    if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;
        const card1Number = card1.dataset.number;
        const card2Number = card2.dataset.number;

        card1.classList.add('swapping');
        card2.classList.add('swapping');

        setTimeout(() => {
            card1.dataset.number = card2Number;
            card2.dataset.number = card1Number;

            card1.classList.remove('selected', 'swapping', 'flipped');
            card2.classList.remove('selected', 'swapping', 'flipped');

            card1.textContent = ''; // Hide the card number
            card2.textContent = ''; // Hide the card number

            selectedCards = [];

            // Increment and update the exchange count
            exchangeCount++;
            countElement.textContent = exchangeCount;

            checkWinCondition();
        }, 500); // Durasi animasi harus sesuai dengan durasi @keyframes swap
    }
}

// Continue game without swapping cards
function continueGame() {
    if (gameFinished) return; // Prevent continuing if the game is finished
    if (selectedCards.length === 2) {
        selectedCards.forEach(card => {
            card.classList.remove('selected', 'flipped');
            card.textContent = ''; // Hide the card number
        });
        selectedCards = [];
    }
}

// Show popup to enter user info
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

// Start game with the selected mode
function startGame(mode) {
    userName = document.getElementById('name').value;
    userClass = document.getElementById('class').value;

    if (userName && userClass) {
        userNameElement.textContent = userName;
        userClassElement.textContent = userClass;

        const popup = document.getElementById('popup');
        popup.style.display = 'none';

        gameMode = mode;
        generateCards();
    } else {
        alert('Harap isi Nama dan Kelas.');
    }
}

// Check if the cards are in correct order
function checkWinCondition() {
    const cards = Array.from(document.getElementsByClassName('card'));
    let isOrdered = false;

    if (gameMode === 'ascending') {
        isOrdered = cards.every((card, index) => parseInt(card.dataset.number) === index + 1);
    } else if (gameMode === 'descending') {
        isOrdered = cards.every((card, index) => parseInt(card.dataset.number) === 10 - index);
    }

    if (isOrdered) {
        gameFinished = true; // Set game as finished
        revealAllCards(cards);
        disableAllCards(cards);
        winMessageElement.textContent = `Selamat ${userName} dari kelas ${userClass}, kamu telah menyelesaikan permainan dengan pertukaran ${exchangeCount} kali dan pengecekan ${checkCount} kali.`;
        restartButton.style.display = 'inline'; // Show restart button
    }
}

// Reveal all cards
function revealAllCards(cards) {
    cards.forEach(card => {
        card.classList.add('flipped');
        card.textContent = card.dataset.number;
    });
}

// Disable all cards
function disableAllCards(cards) {
    cards.forEach(card => {
        card.classList.add('disabled');
        card.removeEventListener('click', () => selectCard(card)); // Remove click event listener
    });
}

// Restart game
function restartGame() {
    location.reload(); // Refresh the page
}

// Initialize popup
showPopup();
