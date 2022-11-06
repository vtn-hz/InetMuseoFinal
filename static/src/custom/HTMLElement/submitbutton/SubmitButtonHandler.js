

class SubmitButton extends HTMLElement {
    #ButtonTemplate;
    #getButtonTemplate( idElement = 'submit-button-template' ) {
        this.#ButtonTemplate = document.getElementById(idElement).cloneNode(true).content;
    }


    #setSubmitEvent () {
        this.#ButtonTemplate.firstElementChild.addEventListener('click', event => {
            event.preventDefault();
            const elementToSubmit = document.getElementById(this.idRef);
            
            if (elementToSubmit) {
                elementToSubmit.dispatchEvent(new SubmitEvent('submit'));
            }

        }) 
    }



    get getButtonSubmit () {
        return this.#ButtonTemplate.firstElementChild;
    }

    get idRef() {
        return this.getAttribute('idRef') || '';
    }

    constructor(){
        super();
        this.#getButtonTemplate();
        this.#setSubmitEvent();

        this.attachShadow({mode: 'open'})
        .appendChild(this.#ButtonTemplate);
    }
}


export default function defineButtonSubmit () {
    window.customElements.define('button-submit', SubmitButton);
}

