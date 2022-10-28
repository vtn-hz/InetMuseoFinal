import consumeAPI from "../../../services/api.service";
import { ElementGenerator } from "../../../services/render.service";

const RECORDLIST_ID = 'record-list';

function RecordlistHandler (RecordList, APIUrl, {headNames, keys:{primaryKey, partialKeys}, operationElements }) {

    function setHeadRecord (Generator) {
        headNames.forEach( title => {
            RecordList.querySelector('#record-head').appendChild(Generator.makeElement('td', {}, [title]))
        })
    }

    async function asyncSetBodyRecord (Generator) {
        const fragment = new DocumentFragment ();
        const bodyTable = RecordList.querySelector('#record-body');



        await consumeAPI(APIUrl, {method: 'POST'}).then( recordList => {
            recordList.forEach( record => {
                let tr = Generator.makeElement('tr');
                let arrayOperationElements = [];
                fragment.appendChild(tr);

                partialKeys.forEach(k => {
                    tr.appendChild(Generator.makeElement('td', {}, [record[k]]))
                })

                operationElements.forEach (HTMLNode => {
                    const ElementOperation = HTMLNode.element.cloneNode(true);
                    ElementOperation.value = record[primaryKey];
                    ElementOperation.addEventListener(HTMLNode.listenEvent, HTMLNode.handlerEvent)

                    arrayOperationElements.push(ElementOperation);
                })  


                tr.appendChild(Generator.makeElement('td', {}, [
                    Generator.makeElement('div', {value: record[primaryKey], class: 'dashboard-container'}, arrayOperationElements)
                ]))

                
                arrayOperationElements.length = 0;
            })
            bodyTable.appendChild(fragment);
        }).catch(e => console.error(e));
    }

    this.getRecordlist = () => {
        const Generator = new ElementGenerator () ; 

        setHeadRecord(Generator);
        asyncSetBodyRecord(Generator);
        return RecordList;
    }
}

export default function createRecordlist (APIUrl, {headNames, keys:{primaryKey, partialKeys}, operationElements } ) {
    const RecordlistClone = document.getElementById(RECORDLIST_ID).cloneNode(1).content.firstElementChild;
    const RecordlistHandlerInstance = new RecordlistHandler(RecordlistClone,
        APIUrl, {headNames, keys:{primaryKey, partialKeys}, operationElements } );
    return RecordlistHandlerInstance;
}