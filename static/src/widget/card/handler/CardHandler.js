const CARD_ID = 'card'

const CardTitle_ID = '#card-header';
const CardContainer_ID = '#content-container';
const CardButtonSubmit_ID = '#card-submit';
const CardButtonClose_ID = '#card-closer';


function CardHandler (Card, Content, eventListener) {
    function setClose (buttonClose) {
        buttonClose.addEventListener('click', event => {
            event.preventDefault();
            const cardRef = event.target.parentNode;
            cardRef.parentNode
            .removeChild(Card)
        
        }) 
    }

    function setSubmit () {
        Card.addEventListener('keypress', event => {
            if (event.key === "Enter") {
                event.preventDefault();
                Card.dispatchEvent(new SubmitEvent('submit'));
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

    this.removeContent = ( cardContentContainerId ) => {
        const CardToRemove = this.getCard();
        const elementContainer = CardToRemove.querySelector('#content-container').querySelector(cardContentContainerId);


        while (elementContainer.firstElementChild) {
            elementContainer.removeChild(elementContainer.lastElementChild)
        }
    }


    this.pushContent = ( cardContentContainerId , contentElement ) => {
        const CardToPush = this.getCard();
        const elementContainer = CardToPush.querySelector('#content-container').querySelector(cardContentContainerId);
        elementContainer.appendChild(contentElement)
    }

    this.getCard = () => {
        return Card;
    }
    
    function onCreate () {
        setClose(Card.querySelector(CardButtonClose_ID));
        setSubmit();
        strictPushContent(Card.querySelector(CardContainer_ID));
    } onCreate();
}

export default function createCard ( eventListener, contentReference ) {
    const CardClone = document.getElementById(CARD_ID).cloneNode(1).content.firstElementChild;
    const contentCardClone = contentReference.cloneNode(1).content;

    const CardHandlerInstance = new CardHandler(CardClone, contentCardClone, eventListener);
    return CardHandlerInstance;
}