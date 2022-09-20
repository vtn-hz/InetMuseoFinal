import AdminViewsController from "../view/AdminViews.js";
import GuestViewsController from "../view/GuestViews.js";



import checkSession from "../middleware/checkUser";
import consumeAPI from "./api.service.js";

 
const AdminViews = AdminViewsController();
const GuestViews = GuestViewsController();


export default function MuseoRender(){
    return {
        startUp: () => {
            if (checkSession()) {
                AdminViews.startUp();
            } else {
                GuestViews.startUp();
            }
        }   
    } 
}

export function ElementGenerator (){
    const root = document.getElementById("root");

    this.makeElement = ( tag, atrib, content ) => {
        const element = document.createElement(tag);
        const elementWithAtrib = pushAttrib (element, atrib); 
        const elementWithContent = pushContent (elementWithAtrib, content); 

        return elementWithContent;
    }

    this.getRoot = () => {
        return root;
    }

    this.removeAllElements = (rooter) => {
        while (rooter.firstChild) {
            rooter.removeChild(rooter.lastChild);
        }
    }


    const pushAttrib = ( HTMLElement, attribs ) => {
        if (attribs !== undefined) {
            const attribName =  Object.keys(attribs);
            const attribValues =  Object.values(attribs);
    
            for (let i=0 ; i<attribName.length ; i++) {
                if (attribName!= 'class') {
                    HTMLElement.setAttribute(attribName[i], attribValues[i])
                }else{
                    HTMLElement.classList.add(attribValues[i]);
                }
    
            }
        }
        return HTMLElement;
    }

    const pushContent = (HTMLElement, content) => {
        if (content !== undefined) {
            for (const iterator of content) {
                if (iterator.nodeName !== undefined) {
                    HTMLElement.appendChild (iterator);
                } else {
                    HTMLElement.appendChild (document.createTextNode(iterator));
                }
                
            }   
        }

        return HTMLElement;
    }
}

export function ElementManagement(){
    this.listenerAdder = ( id, event, func ) => {
        document.getElementById(id).addEventListener(event, func);
    }
    
    this.classAdder = ( id, className ) => {
        document.getElementById(id).classList.add(className);
    }

    this.classRemover = ( id, className ) => {
        document.getElementById(id).classList.remove(className);
    }

    this.setActiveClass = ( arr, id ) => {
        arr.forEach(idList => {
            document.getElementById(idList).classList.remove('active');
        });

        document.getElementById(id).classList.add('active');
    }
}

export function TemplateProvider () {
    const Generator = new ElementGenerator();
    const Manager = new ElementManagement();


    this.SubmitCard = ( idRoot,  titleCard, bodyCard ) =>{
        let buttonClose;
        let submitButton;
        const cardElement = Generator.makeElement('form', { method: 'POST', class: 'content-card', action: '' }, [
            Generator.makeElement("h1", {id:'card-header', class: "card-header"}, [titleCard]),
            buttonClose = Generator.makeElement("button", {id:'card-closer', class: "card-close"}, ['Cerrar']),


            ...bodyCard,


            submitButton = Generator.makeElement("input", {id:'card-submit', name: 'submit', class: "form-submit", type: "submit"})
        ]) 


        cardElement.addEventListener('keypress', event => {
            if (event.key === "Enter") {
                event.preventDefault();
                submitButton.click();
            }
        })


        buttonClose.addEventListener('click', event => {
            document.getElementById(idRoot)
            .removeChild(cardElement)
        })

        return cardElement;

    }

    this.ContainerRecordList = ( headNames) => {
        const Table =  Generator.makeElement('table', {id: 'content-table', class: 'table-date'});

        const THead_tr = Generator.makeElement('tr')
        const THead =  Generator.makeElement('thead', {}, [THead_tr])
        headNames.forEach( title => {
            THead_tr.appendChild(Generator.makeElement('td', {}, [title]))
        })


 
        
        Table
        .appendChild(THead)
        
    
        return Table;
    }

    this.ContentRecordList = async ({ apiUrl, method }, {primaryKey, keys}, operationElements) => {
        const TBody = Generator.makeElement('tbody');
        await consumeAPI(apiUrl, {'method': method}).then( records => {
            records.forEach( record => {
                let tr = Generator.makeElement('tr');
                let arrayNodes = [];
                TBody.appendChild(tr);

                keys.forEach(k => {
                    tr.appendChild(Generator.makeElement('td', {}, [record[k]]))
                })

                operationElements.forEach (HTMLNode => {
                    HTMLNode.value = record[primaryKey];
                    arrayNodes.push(HTMLNode.cloneNode(true));
                })  


                tr.appendChild(Generator.makeElement('td', {}, [
                    Generator.makeElement('div', {value: record[primaryKey], class: 'dashboard-container'}, arrayNodes)
                ]))

                
                arrayNodes.length = 0;
            })
        });

        return TBody;
    }
    
}

/*
EXPORTS
*/ 
