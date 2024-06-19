const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

const cardValues = [
    'figura1.jpg', 'figura2.jpg', 'figura3.jpg', 'figura4.jpg',
    'figura5.jpg', 'figura6.jpg', 'figura7.jpg', 'figura8.jpg'
];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
    cards = [...cardValues, ...cardValues];
    cards.sort(() => 0.5 - Math.random());
    gameBoard.innerHTML = '';
    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = `<img src="${value}" alt="Imagen de carta">`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartButton.addEventListener('click', createBoard);

createBoard();
