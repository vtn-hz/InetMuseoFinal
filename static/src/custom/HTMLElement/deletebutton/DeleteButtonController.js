import consumeAPI from "../../../services/api.service";



export class DeleteButton extends HTMLElement {
    #ButtonTemplate;
    #setButtonTemplate( idElement = 'delete-button-template' ) {
        this.#ButtonTemplate = document.getElementById(idElement).cloneNode(true).content;
    }


    #setDeleteEvent () {
        this.#ButtonTemplate.firstElementChild.addEventListener('click', event => {
            event.preventDefault();
            const apiURL = this.apiURL;

            const primaryKey = this.primaryKey;
            const primaryKeyValue = this.value;
            const success = eval(this.successHandler);
            const error = eval(this.errorHandler);

            const confirmDelete = confirm ('¿Esta seguro desea eliminar este registro?');

            if (confirmDelete) {
                consumeAPI(apiURL, {method: 'PATCH',  
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({[primaryKey]: primaryKeyValue}),
                }).then(_ => success())
                .catch(e => {
                    error();
                })
            }
        }) 

    }

 
    get getButtonDelete () {
        return this.#ButtonTemplate.firstElementChild;
    }

    get successHandler () {
        return this.getAttribute('success') || '';
    }

    get errorHandler () {
        return this.getAttribute('error') || '';
    }

    get apiURL () {
        return this.getAttribute('apiURL') || '';
    }
    get primaryKey () {
        return this.getAttribute('primaryKey') || '';
    }

    constructor(){
        super();
        this.#setButtonTemplate();
        this.#setDeleteEvent();

        this.attachShadow({mode: 'open'})
        .appendChild(this.#ButtonTemplate);
    }
}

