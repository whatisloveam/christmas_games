const cards = document.querySelectorAll('.memory-card');
let turnedCard = false;
let turnedCardAlreadyExist = false;
let chosenCard1;

function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  };
  shuffle();

function turnCard() {
    this.classList.add('turn');
    let chosenCard2;
    if (turnedCardAlreadyExist){
        chosenCard2 = this;
        if (chosenCard1 === chosenCard2) {
            unturnCards([chosenCard1]);
            chosenCard1 = undefined;
            chosenCard2 = undefined;
            turnedCardAlreadyExist = false;
            return;
        }
        checkForMatch(chosenCard1, chosenCard2);
        turnedCardAlreadyExist = false;
    }
    else {
        chosenCard1 = this;
        turnedCardAlreadyExist = true;
    }
}

cards.forEach(card => card.addEventListener('click', turnCard));

 function checkForMatch(card1, card2) {
    if (card1.attributes.content.nodeValue === card2.attributes.content.nodeValue) {
      disableCards([card1, card2]);
      setTimeout(checkWin, 500);
    }
  
    else
    {
        setTimeout(unturnCards, 500, [card1, card2]);
        chosenCard1 = undefined;
    }
    
  }

  function disableCards(cards) {
    for (let e of cards) {
         e.removeEventListener('click', turnCard);
         e.style.cursor = 'default';
         e.pair = true;
    }
        
  }
 
   function unturnCards(cards) {
    for (let e of cards)
        e.classList.remove('turn');
  }

  function checkWin() {
    for (let e of cards) {
      if (!e.pair)
        return; 
    }
    let a = document.querySelector('.congr');
    a.style.visibility = 'visible';
  }

 