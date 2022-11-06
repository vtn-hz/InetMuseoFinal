import { FormController } from "../../../controller/Form";
import { SessionController } from "../../../controller/Session";

import consumeAPI from "../../../services/api.service";

import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";


import createCard from "../../../custom/widget/card/CardHandler";
import createRecordlist from "../../../custom/widget/recordlist/RecordListHandler";

const Generator =  ElementGenerator();

const idNavElement = 'admin-fecha';
const idFechasTemplate = 'admin_view-fechas';

function getFechasView () {
    const FechasView =  viewService().getClonedView(idFechasTemplate);
    const cardRoot = FechasView.querySelector('#row-2');
    
    // CardHandlerInstance Edit
    const cardEditReference = FechasView.querySelector('#edit-card-content-fecha');
    const cardEditHandler = createCard ( event => {
        event.preventDefault();
        alert('En desarrollo...');
    }, cardEditReference) 

    // CardHandlerInstance Submit
    const cardSubmitReference = FechasView.querySelector('#submit-card-content-fecha');
    const cardSubmitHandler = createCard ( event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()]
        
        const dateVisita = new Date(dataParse[0]);
        const idGuia = dataParse[1];
        const APIPOST_Visita = '/VisitaGuiadaRegister';
        FormController()                    
        .sendForm({url: APIPOST_Visita, method:'POST' }, {
            fecha:`${dateVisita.getFullYear()}-${(dateVisita.getMonth())+1}-${dateVisita.getDate()}`,
            hora: `${("0" + dateVisita.getHours()).slice(-2)}:${("0" + dateVisita.getMinutes()).slice(-2)}`,
            idGuia: parseInt(idGuia),
            idRecorrido: 1
        }, ['', undefined, null]).then(msg => {
            document.getElementById(idNavElement).dispatchEvent(new Event('click'));
            alert(msg.success)
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference)

    

    // RecordlistInstance 
    const RecordListRoot = FechasView.querySelector('#recordlist-container');
    const APIGET_ListVisitaGuiada = '/VisitaGuiadaView';
    const RecordList_Guias = createRecordlist(APIGET_ListVisitaGuiada, {
        headNames: ['Fecha', 'Hora', 'Idioma', 'Apellido Guia'],
        keys: {primaryKey: 'idVisitaGuiada', partialKeys: ['fecha', 'hora', 'idioma', 'apellido']},
        operationElements: [{
            element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            listenEvent: 'click',

            handlerEvent: event => {
                console.log(cardEditHandler.getCard());
                Generator.removeAllElements(cardRoot);
                cardRoot.appendChild(cardEditHandler.getCard())
            }
        }, {
            element: Generator.makeElement('button-delete', {
                primaryKey: 'idVisitaGuiada',
                apiURL: '/cambiarEstadoVisitaGuiada',
                success: ()=>{ document.getElementById('admin-fecha').dispatchEvent(new Event('click')) },
                error: ()=>{ alert('La operacion fallo...'); },
            }, [])
        }]
    });

    
    const ButtonAdd = FechasView.querySelector('#add-table-button');
    const buttonAddHandler = e => {
        Generator.removeAllElements(cardRoot);
        cardRoot.appendChild(cardSubmitHandler.getCard())
    }


    // Push Async Content, and Turn On Event dependencies
    /*Check Out how minimize it*/ 
    const APIGET_ListGuias = '/ListarGuias';
    consumeAPI (APIGET_ListGuias, {method: 'GET'}).then(data => {
        if (data.length > 0) {
            cardSubmitHandler.removeContent('#card-guia');
            cardEditHandler.removeContent('#card-guia');
        }
        
        
        
        data.forEach( ele => {
            cardEditHandler.pushContent('#card-guia', 
            Generator.makeElement('option', {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]));


            cardSubmitHandler.pushContent('#card-guia', 
            Generator.makeElement('option', {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]));
        })


        ButtonAdd.addEventListener ('click', buttonAddHandler)
        RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
    }).catch(_ => {
        ButtonAdd.addEventListener ('click', buttonAddHandler)
        RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
    })

    return FechasView;
}   


export default function safeGetFechasView () {
    if(SessionController().checkSession()){
        return getFechasView();
    } return Generator.makeElement('h1', {style: 'color: red; font-size: 24px;'}, ['SESSION FAIL']);
}