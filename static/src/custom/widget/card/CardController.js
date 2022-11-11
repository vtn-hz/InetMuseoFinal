

const CardTitle_ID = '#card-header';
const CardContainer_ID = '#content-container';


export function CardHandler (Card, Content, eventListener) {
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
        setSubmit();
        strictPushContent(Card.querySelector(CardContainer_ID));
    } onCreate();
}

