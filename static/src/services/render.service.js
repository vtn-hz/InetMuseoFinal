
/*
Es un helper esto, discutir con pimentel o mover en todo caso (dudoso)
repito, re ver que onda. Es util pero dudo que tenga que estar aca. 

Ademas verificar donde estan las dependencias del mismo

*/ 

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

