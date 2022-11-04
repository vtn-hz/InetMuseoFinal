

class CloseButton extends HTMLElement {
    #ButtonTemplate;
    #getButtonTemplate( idElement = 'close-button-template' ) {
        this.#ButtonTemplate = document.getElementById(idElement).cloneNode(true).content;
    }

    #setCloseEvent () {
        this.#ButtonTemplate.firstElementChild.addEventListener('click', event => {
            event.preventDefault();
            const elementToDelete = document.getElementById(this.idRef);
            
            if (elementToDelete) {
                elementToDelete.parentNode.removeChild(elementToDelete);
            }

        }) 
    }


    get getButtonClose () {
        return this.#ButtonTemplate.firstElementChild;
    }

    get idRef() {
        return this.getAttribute('idRef') || '';
    }

    constructor(){
        super();
        this.#getButtonTemplate();
        this.#setCloseEvent();


        this.attachShadow({mode: 'open'})
        .appendChild(this.#ButtonTemplate);
    }
}


export default function defineButtonClose () {
    window.customElements.define('button-close', CloseButton);
}

