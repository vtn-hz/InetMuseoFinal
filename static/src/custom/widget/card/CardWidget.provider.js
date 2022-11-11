import { CardHandler } from "./CardController";
const CARD_ID = 'card';

export default function createCard ( eventListener, contentReference ) {
    const CardClone = document.getElementById(CARD_ID).cloneNode(true).content.firstElementChild;
    const contentCardClone = contentReference.cloneNode(true).content;

    const CardHandlerInstance = new CardHandler(CardClone, contentCardClone, eventListener);
    return CardHandlerInstance;
}