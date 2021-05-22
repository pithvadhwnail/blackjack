let cardsEl = document.querySelector(".cards-el");
let sumEl = document.querySelector(".sum-el");
let playerInsEl = document.querySelector(".player-ins-el");
let infoEl = document.querySelector(".info-el");

function getRandomCard() {
  randNum = Math.floor(Math.random() * 13) + 1;
  cards.push(randNum);
}

function cardSum() {
  sum = 0;
  cardsValueArray = [];
  for (i = 0; i < cards.length; i++) {
    if (cards[i] > 10) {
      cardsValueArray.push(10);
    } else if (cards[i] === 1) {
      cardsValueArray.push(11);
    } else {
      cardsValueArray.push(cards[i]);
    }
  }
  for (i = 0; i < cardsValueArray.length; i++) {
    sum += cardsValueArray[i];
  }
}

let cards = [];
let sum = 0;
let isAlive = false;
let hasBlackJack = false;
let message = "";
let player = {
  name: "Player1",
  money: 200,
};
let moneyUpdateVar = 1;
let value = 0;
let randNum = 0;
let cardsValue = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let cardsValueArray = [];

infoEl.textContent = player.name + ": $" + player.money;

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cardsValue[cards[i] - 1] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum < 21) {
    message = "Do you want to keep playing?";
  } else if (sum === 21) {
    message = "You've got BlackJack!";
    hasBlackJack = true;
  } else {
    message = "I'm sorry, you lost.";
    isAlive = false;
  }
  playerInsEl.textContent = message;
}

function moneyUpdate() {
  if (moneyUpdateVar === 1) {
    if (sum === 21) {
      player.money += 50;
    } else if (sum > 21) {
      player.money -= 50;
    }
    infoEl.textContent = player.name + ": $" + player.money;
    moneyUpdateVar = 0;
  }
}

function startGame() {
  if (player.money > 0) {
    moneyUpdateVar = 1;
    isAlive = true;
    hasBlackJack = false;
    cards = [];
    getRandomCard();
    getRandomCard();
    cardSum();
    renderGame();
    moneyUpdate();
  } else {
    playerInsEl.textContent = "Sorry, you're out of money";
    moneyUpdate();
  }
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    getRandomCard();
    cardSum();
    moneyUpdateVar = 1;
    renderGame();
  } else if (hasBlackJack === true) {
    playerInsEl.textContent = "You've already won, start a new game";
  } else if (isAlive === false) {
    playerInsEl.textContent =
      "I'm sorry, you've already lost. Start a new game";
  }
  moneyUpdate();
}
