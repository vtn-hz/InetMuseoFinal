const CARD_ID = 'card'

const CardTitle_ID = '#card-header';
const CardContainer_ID = '#content-container';
const CardButtonSubmit_ID = '#card-submit';
const CardButtonClose_ID = '#card-closer';

// Only Push, without Pop 
function CardHandler (Card, Content, eventListener) {

    function setClose (buttonClose) {
        buttonClose.addEventListener('click', event => {
            event.preventDefault()
            const cardRef = event.target.parentNode;

            cardRef.parentNode
            .removeChild(Card)
        }) 
    }

    function setSubmit () {
        Card.addEventListener('keypress', event => {
            if (event.key === "Enter") {
                event.preventDefault();
                submitButton.click();
            }
        })

        Card.addEventListener('submit', eventListener)
    }
    
    function strictPushContent(container){
        Card.querySelector(CardTitle_ID).textContent = Content.firstElementChild.textContent;
        const content = new DocumentFragment();
        const HTMLArr = Array.prototype.slice.call( Content.lastElementChild.children );


        HTMLArr.forEach(e => {
            content.appendChild(e);
        });
   

        container.appendChild(content);
    }


    this.getCard = () => {
        setClose(Card.querySelector(CardButtonClose_ID));
        setSubmit();
        strictPushContent(Card.querySelector(CardContainer_ID));

        return Card;
    }
}

export default function createCard ( eventListener, contentReference ) {
    const CardClone = document.getElementById(CARD_ID).cloneNode(1).content.firstElementChild;
    const contentClone = contentReference.cloneNode(1).content;

    const Card = new CardHandler(CardClone, contentClone, eventListener);
    return Card;
}