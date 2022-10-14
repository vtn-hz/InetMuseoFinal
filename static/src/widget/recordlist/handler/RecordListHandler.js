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



        await consumeAPI(APIUrl, {method: 'POST'}).then( records => {
            records.forEach( record => {
                let tr = Generator.makeElement('tr');
                let arrayNodes = [];
                fragment.appendChild(tr);

                partialKeys.forEach(k => {
                    tr.appendChild(Generator.makeElement('td', {}, [record[k]]))
                })

                operationElements.forEach (HTMLNode => {
                    const ElementClone = HTMLNode.element.cloneNode(true);
                    ElementClone.value = record[primaryKey];
                    ElementClone.addEventListener(HTMLNode.listenEvent, HTMLNode.handlerEvent)

                    arrayNodes.push(ElementClone);
                })  


                tr.appendChild(Generator.makeElement('td', {}, [
                    Generator.makeElement('div', {value: record[primaryKey], class: 'dashboard-container'}, arrayNodes)
                ]))

                
                arrayNodes.length = 0;
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
    const Recordlist = new RecordlistHandler(RecordlistClone,
        APIUrl, {headNames, keys:{primaryKey, partialKeys}, operationElements } );
    return Recordlist;
}