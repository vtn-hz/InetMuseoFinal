import { FormController } from "../../../controller/Form";
import { SessionController } from "../../../controller/Session";

import consumeAPI from "../../../services/api.service";

import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";

import createRecordlist from "../../../custom/widget/recordlist/RecordlistWidget.provider";
import createCard from "../../../custom/widget/card/CardWidget.provider";






const Generator = ElementGenerator();

const idNavElement = 'admin-exposiciones';
const idExposicionesTemplate = 'admin_view-exposicion';

function getExposicionControl () {
    const ExposicionesView =  viewService().getClonedView(idExposicionesTemplate);
    const CardRoot = ExposicionesView.querySelector('#row-2');
    
    
    // CardHandlerInstance Edit
    const cardEditReference = ExposicionesView.querySelector('#edit-card-content-exposicion');
    const cardEditHandler = createCard ( event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()];
        const APIPATCH_editExposicion = '/editarExposicion/?idExposicion=' +  event.target.getAttribute('idExposicion');
        FormController()
        .sendForm({url: APIPATCH_editExposicion, method:'PATCH' }, {
            'idHabitacion': dataParse[2],
            'titulo': dataParse[0],
            'descripcion': dataParse[1],
            'idAdministrador': 1
        }, ['', undefined]).then(msg => {
            document.getElementById(idNavElement).dispatchEvent(new Event('click'));
            alert(msg.success);
        }).catch(msg => alert(msg.error))
    }, cardEditReference) 


    // CardHandlerInstance Submit
    const cardSubmitReference = ExposicionesView.querySelector('#submit-card-content-exposicion');
    const cardSubmitHandler = createCard (event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()];
        const APIPOST_addExposicion = '/registrarExposicion' ;
        FormController()
        .sendForm({url: APIPOST_addExposicion, method:'POST' }, {
            'idHabitacion': dataParse[2],
            'titulo': dataParse[0],
            'descripcion': dataParse[1]
        }, ['', undefined]).then(msg => {
            document.getElementById(idNavElement).dispatchEvent(new Event('click'));
            alert(msg.success);
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference)


    // RecordlistInstance
    const RecordListRoot = ExposicionesView.querySelector('#recordlist-container');
    const APIGET_listarExposition = '/listarExposicion';
    const RecordList_Exposicion = createRecordlist(APIGET_listarExposition, {
        headNames: ['Titulo', 'Descripción', 'Sala'],
        keys: {primaryKey: 'idExposcion', partialKeys: ['titulo', 'descripcion', 'identificador']},
        operationElements: [{
            element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            listenEvent: 'click',

            handlerEvent: event => {
                Generator.removeAllElements(CardRoot);
                const editCardElement = cardEditHandler.getCard();
                editCardElement.setAttribute('idExposicion', event.target.value);
                CardRoot.appendChild(editCardElement);
            }

        }, {
            element: Generator.makeElement('button-delete', {
                primaryKey: 'idExposcion',
                apiURL: '/cambiarEstadoExpo',
                success: ()=>{ document.getElementById('admin-exposiciones').dispatchEvent(new Event('click')) },
                error: ()=>{ alert('La operacion fallo...'); },
            }, [])
        }]
    });

                
    const ButtonAdd = ExposicionesView.querySelector('#add-table-button');
    const buttonAddHandler = e => {
        Generator.removeAllElements(CardRoot);
        CardRoot.appendChild(cardSubmitHandler.getCard())
    }

    // Push Async Content, and Turn On Event dependencies
    /*Check Out how minimize it*/ 
    
    const APIGET_listarHabitaciones = '/listarHabitacion';
    consumeAPI (APIGET_listarHabitaciones, {method: 'GET'}).then(data => {
        if (data.length > 0) {
            cardSubmitHandler.removeContent('#card-sala');
            cardEditHandler.removeContent('#card-sala');
        }

        data.forEach( ele => {
            cardSubmitHandler.pushContent('#card-sala',
            Generator.makeElement('option', {class:'', value: `${ele.idHabitacion}`}, [`${ele.identificador}`]))

            cardEditHandler.pushContent('#card-sala',
            Generator.makeElement('option', {class:'', value: `${ele.idHabitacion}`}, [`${ele.identificador}`]))
        })
        

        ButtonAdd.addEventListener ('click', buttonAddHandler)
        RecordListRoot.appendChild(RecordList_Exposicion.getRecordlist())
    }).catch(_ => {
        ButtonAdd.addEventListener ('click', buttonAddHandler)
        RecordListRoot.appendChild(RecordList_Exposicion.getRecordlist())
    })

    return ExposicionesView;
}


export default function safeGetExposicionControl () {
    if(SessionController().checkSession()){
        return getExposicionControl();
    } return Generator.makeElement('h1', {style: 'color: red; font-size: 24px;'}, ['SESSION FAIL']);
}