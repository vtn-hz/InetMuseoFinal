import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";

import { FormController } from "../../../controller/Form";

import createCard from "../../../custom/widget/card/CardHandler";
import createRecordlist from "../../../custom/widget/recordlist/RecordListHandler";



const Generator =  ElementGenerator ();
const idReservaTemplate = 'guest_view-reserva';

export default function getReservaView ( callerReservaView ) {
    const ReservaView = viewService().getClonedView(idReservaTemplate);
    const CardRoot = ReservaView.querySelector('#row-2');
    
    // CardHandlerInstance Submit
    const cardSubmitReference = ReservaView.querySelector('#card-content-reserva');
    const cardSubmitHandler = createCard (event => {
        event.preventDefault();
        //const data = new FormData(event.target);
            
        /*No track values ???????*/
        
        /*Without formdata alternative*/ 
        const dataParse = []
        const Form = event.target;  
        Form.querySelectorAll('#content-container > input').forEach(element => {
            dataParse.push(element.value);
        });

        console.log({
            idVisitaGuiada: event.target.getAttribute('idVisitaGuiada'),
            nombre: dataParse[1],
            apellido: dataParse[2],
            dni: dataParse[3],
            mail: dataParse[0],
            cantPersonas: dataParse[4]
        })

        const APIPOST_crearInscripcion ='/InscripcionCreate';
        FormController().sendForm({url: APIPOST_crearInscripcion, method:'POST' }, {
            idVisitaGuiada: event.target.getAttribute('idVisitaGuiada'),
            nombre: dataParse[1],
            apellido: dataParse[2],
            dni: dataParse[3],
            mail: dataParse[0],
            cantPersonas: dataParse[4]
        }, ['', undefined]).then(msg => {
            callerReservaView();
            alert(msg.success)
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference);


    const ButtonAdd = Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme']);  
    const ButtonAddListener = event  => {
        Generator.removeAllElements(CardRoot);
        const cardSubmitElement = cardSubmitHandler.getCard();

        cardSubmitElement.setAttribute('idVisitaGuiada', event.target.value);
        // console.log(cardSubmitElement)

        CardRoot.appendChild(cardSubmitElement)
    }
    // RecordlistInstance
    const RecordListRoot = ReservaView.querySelector('#row-1');
    const APIGET_VisitaGuiadaList ='/VisitaGuiadaView';
    const recordList = createRecordlist(APIGET_VisitaGuiadaList, {headNames: ['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'], 
    keys: {
        primaryKey: 'idVisitaGuiada',
        partialKeys:['fecha', 'hora', 'idioma']
    }, operationElements: [{
        element: ButtonAdd,
        listenEvent: 'click',
        handlerEvent: ButtonAddListener
    }]});

    RecordListRoot.appendChild(recordList.getRecordlist());
    return ReservaView;
}