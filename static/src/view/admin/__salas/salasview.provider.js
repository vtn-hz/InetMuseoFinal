import { FormController } from "../../../controller/Form";
import { SessionController } from "../../../controller/Session";

import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";

import createCard from "../../../custom/widget/card/CardHandler";
import createRecordlist from "../../../custom/widget/recordlist/RecordListHandler";

const Generator =  ElementGenerator();


const idSalasTemplate = 'admin_view-salas'
function getSalasView ( callerSalasView ) {
    const SalasView = viewService().getClonedView(idSalasTemplate);
    const CardRoot = SalasView.querySelector('#row-2');
    
    
    // CardHandlerInstance Edit
    const cardEditReference = SalasView.querySelector('#edit-card-content-sala');
    const cardEditHandler = createCard ( event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()]

        const APIPOST_registrarSalas = '/editarHabitacion/?idHabitacion=' + event.target.getAttribute('idHabitacion');
        FormController().sendForm({url: APIPOST_registrarSalas, method:'PATCH' }, {
            'idInstitucion': 1,
            'identificador': dataParse[0],
            'idAdministrador': 1
        }, ['', undefined]).then(msg => {
            callerSalasView();
            alert(msg.success);
        }).catch(msg => alert(msg.error))
        
    }, cardEditReference)

    // CardHandlerInstance Submit
    const cardSubmitReference = SalasView.querySelector('#submit-card-content-sala');
    const cardSubmitHandler = createCard (event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()]

        const APIPOST_registrarSalas = '/registrarHabitacion';
        FormController().sendForm({url: APIPOST_registrarSalas, method:'POST' }, {
            'idInstitucion': 1,
            'identificador': dataParse[0],
        }, ['', undefined]).then(msg => {
            callerSalasView();
            alert(msg.success);
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference)


    // RecordlistInstance
    const RecordListRoot = SalasView.querySelector('#recordlist-container');
    const APIGET_ListSalas = '/listarHabitacion';
    const RecordList_Guias = createRecordlist(APIGET_ListSalas, {
        headNames: ['DESCRIPCION'],
        keys: {primaryKey: 'idHabitacion', partialKeys: ['identificador']},
        operationElements: [{
            element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            listenEvent: 'click',
            handlerEvent: event => {
                Generator.removeAllElements(CardRoot);
                const editCardElement = cardEditHandler.getCard();
                editCardElement.setAttribute('idHabitacion', event.target.value);
                CardRoot.appendChild(editCardElement);
            }
        }, {
            element: Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']),
            listenEvent: 'click',
            handlerEvent: event => {
                const APIDEL_deleteSalas = '/cambiarEstadoHabitacion';
                FormController().sendForm({url: APIDEL_deleteSalas, method:'PATCH' }, {
                    'idHabitacion': event.target.value,
                }, []).then(msg => {
                    callerSalasView();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }
        }]
    });

    

    const ButtonAdd = SalasView.querySelector('#add-table-button');
    const buttonAddHandler = e => {
        Generator.removeAllElements(CardRoot);
        CardRoot.appendChild(cardSubmitHandler.getCard())
    }

    ButtonAdd.addEventListener ('click', buttonAddHandler)
    RecordListRoot.appendChild(RecordList_Guias.getRecordlist());

    return SalasView;
}   


export default function safeGetSalasView ( callerSalasView ) {
    if(SessionController().checkSession()){
        return getSalasView( callerSalasView );
    } return Generator.makeElement('h1', {style: 'color: red; font-size: 24px;'}, ['SESSION FAIL']);
}