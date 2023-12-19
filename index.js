let player = {
    name: document.getElementById("player-name"),
    chips: 200,
    cards: [],
    sum: 0,
    cardsEl: document.getElementById("cards-el"),
    sumEl: document.getElementById("yoursum-el"),
    playerEl: document.getElementById("player-el")
}

let dealer = {
    cards: [],
    sum: 0,
    hidden: true,
    cardsEl: document.getElementById("dealercard-el"),
    sumEl: document.getElementById("dealersum-el"),
}

let hasBlackJack = false
let isAlive = false
let stood = false
let message = ""
let messageEl = document.getElementById("message-el")
let greetingEl = document.getElementById("greeting-el")

function savePlayerInformation() {
    player.name = document.getElementById("player-name")
    player.playerEl.textContent = player.name.value + ": $" + player.chips
    greetingEl.textContent = "Hello, " + player.name.value + "!"
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    dealer.hidden = true;
    hasBlackJack = false;
    stood = false;
    player.cards = [getRandomCard(), getRandomCard()]
    player.sum = player.cards[0] + player.cards[1]
    dealer.cards = [getRandomCard(), getRandomCard()]
    dealer.sum = dealer.cards[0] + dealer.cards[1]
    renderGame()
}

function checkWin() {
    if(player.sum < dealer.sum) {
        console.log("Dealer wins :( you better go home")
        return;
    }
    if(player.sum > 21) {
        console.log('bro u r bad')
        return;
    
    }
    while (dealer.sum <= 16){
        let card = getRandomCard()
        dealer.sum += card
        dealer.cards.push(card)

        renderDealer();
    }

    // if dealersum > 21 -> dealer loses
    if( dealer.sum > 21){
        console.log(" Player winds")        
    } else if (dealer.sum == player.sum){
        console.log("draw")
    } else if (dealer.sum > player.sum){
        console.log("Dealser wins")
    } else {
        console.log("Player Wins")
    }
}

function renderDealer() {
    dealer.cardsEl.textContent = "Cards: ";
    if (dealer.hidden == false) {
        for (let i = 0; i < dealer.cards.length; i++) {
            dealer.cardsEl.textContent += dealer.cards[i] + " ";
        }
        dealer.sumEl.textContent = "Dealer's Sum: " + dealer.sum;
    } else {
        dealer.cardsEl.textContent += "? " + dealer.cards[1] + " ";
        dealer.sumEl.textContent = "Dealer's Sum: ?";
    }
}

function renderGame() {
    renderDealer()

    player.cardsEl.textContent = "Cards: "
    for (let i = 0; i < player.cards.length; i++) {
        player.cardsEl.textContent += player.cards[i] + " "
    }

    player.sumEl.textContent = "Your Sum: " + player.sum
    if (player.sum <= 20) {
        if (!stood) {
            message = "Do you want to draw a new card?"
        } else if (player.sum === dealer.sum) {
            message = "Oh oh it's a draw wanna play another game?"
        } else if (player.sum > dealer.sum || dealer.sum > 21){
            message = "Yay! you win"
        } else {
            message = "opps you lost"
        }
            // playersum == dealersum, > or < 
    
    } else if (player.sum === 21) {
        dealer.hidden = false;
        renderDealer()
        message = "You've got Blackjack!"
        hasBlackJack = true
        dealer.hidden = true;
    } else {
        dealer.hidden = false;
        renderDealer()
        message = "You're out of the game!"
        isAlive = false
        dealer.hidden = true;
    }
    messageEl.textContent = message   
}

function hit() {
    if (isAlive === true && hasBlackJack === false && stood === false) {
        let card = getRandomCard()
        player.sum += card
        player.cards.push(card)
        renderGame()        
    }
}
function stand() {
    if (isAlive === true && hasBlackJack === false && stood === false) {
        stood = true;
        dealer.hidden = false;
        checkWin();
        renderGame();
    }
}


// // Modal
// var myModal = document.getElementById('staticBackdrop')
// myModal.show()
