/*Ayuda a crear y manejar HTMLElement*/


export function ElementGenerator (){
    const root = document.getElementById("root");

    const makeElement = ( tag, atrib, content ) => {
        const element = document.createElement(tag);
        const elementWithAtrib = pushAttrib (element, atrib); 
        const elementWithContent = pushContent (elementWithAtrib, content); 

        return elementWithContent;
    }

    const getRoot = () => {
        return root;
    }

    const removeAllElements = (rooter) => {
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
                if (iterator !== null && 
                    iterator.nodeName !== undefined) {
                    HTMLElement.appendChild (iterator);
                } else {
                    const contentText = iterator!==null? iterator : '';
                    HTMLElement.appendChild (document.createTextNode( contentText ));
                }
                
            }   
        }

        return HTMLElement;
    }


    return {
        makeElement,
        getRoot,
        removeAllElements
    }
}

export function ElementManagement(){
    const listenerAdder = ( id, event, func ) => {
        document.getElementById(id).addEventListener(event, func);
    }
    
    const classAdder = ( id, className ) => {
        document.getElementById(id).classList.add(className);
    }

    const classRemover = ( id, className ) => {
        document.getElementById(id).classList.remove(className);
    }

    const setActiveClass = ( arr, id ) => {
        arr.forEach(idList => {
            document.getElementById(idList).classList.remove('active');
        });

        document.getElementById(id).classList.add('active');
    }

    return {
        listenerAdder, classAdder, 
        classRemover, setActiveClass
    }
}

