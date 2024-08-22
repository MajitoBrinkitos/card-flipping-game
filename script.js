//Declaring variables clicks and found
//another op: clicks = found = 0;
//let clicks =0, found=0;
let clicks =0;
let found = 0;

const clickCounter = document.getElementById("clicks");
const foundCounter = document.getElementById("found");
const grid = document.getElementById("grid");

const shuffleItems = (array) => {
    //Randonmly order cards
    return array.sort( () => Math.random() - 0.3);
}
function reset() {
    clicks = found = 0;
    selectedCards = [];
    grid.innerHTML = '';

    //list of items
    const items = shuffleItems([
            '🍎', '🍎', '🍋', '🍋', '🐶', '🐶', 
            '🐈', '🐈', '🔑', '🔑', '📘', '📘', 
            '🍄', '🍄', '🌲', '🌲'
    ]);

    items.forEach((item, index) => createCard(item, index));
}

    //use those items to create cards
    const createCard = (item, index) => {
    const card = document.createElement('div'); //get the div element and displays it in browser

    //card.setAttribute("class", "card")
    card.addEventListener('click', () => handleCardClick(card));
    card.className = "card";

    const cardContent =
     `
    <div class="card-content">
        <div class="card-front"><p>?</p></div>
        <div class="card-back"><p>${item}</p></div>
    </div>
    `

    //to link the const cardContent to the HTML content
    card.innerHTML = cardContent;
    //a card is created (with its content set) and then added to the grid.
    grid.appendChild(card);
    //add those cards to the grid

};
/*
    card1 = {
        innerHTML = "xyz";
    }

    card2 = {
        innerHTML = "xyz2";
    }
*/

    const handleCardClick = (card) => {
        if (document.getElementsByClassName("card selected").length >=2) return;

        const previousCard = document.querySelector(".card.selected");
        //check if previousCard and the current card are the same
        if(previousCard == card) return;

        //
        clicks = clicks + 1; //clicks++
        updateCounters();

        card.classList.add("selected");

        //match cards
        if (previousCard) {
            if (card.innerHTML === previousCard.innerHTML)
        {
            found++;
            updateCounters();

            const foundCards =[card, previousCard]
            foundCards.forEach((card) => {
                card.classList.remove("selected");
                card.classList.add("found");
            });

            //pop up when games ends
            if(found === 8) {
                setTimeout(() => {
                    const congratsMessage = document.createElement('div');
                    congratsMessage.className = "congrats-message";
                    congratsMessage.textContent = `Congratulations, you have found all the cards in ${clicks} clicks!`;
                    document.body.appendChild(congratsMessage);
                    //Remove the message after 5 seconds
                    setTimeout(() => {
                        congratsMessage.remove();
                        reset();
                    }, 5000);
                }, 1000);
            }
        }
        else {
            //remove the class selected after a certain amount of time has passed
            setTimeout(() => {
                card.classList.remove("selected");
                previousCard.classList.remove("selected");
            }, 2000); //2sec
        }
    }
    }
    //display the other side of the card
    //update the counters
    const updateCounters = () => {
        clickCounter.textContent = clicks;
        foundCounter.textContent = found;
    }

reset();