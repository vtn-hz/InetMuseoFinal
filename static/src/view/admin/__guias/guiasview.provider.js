import { FormController } from "../../../controller/Form";
import { SessionController } from "../../../controller/Session";

import consumeAPI from "../../../services/api.service";

import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";

import createCard from "../../../custom/widget/card/CardHandler";
import createRecordlist from "../../../custom/widget/recordlist/RecordListHandler";



const Generator =  ElementGenerator();

const idGuiasTemplate = 'admin_view-guias'
function getGuiasView ( callerGuiasView ) {
    const GuiasView =  viewService().getClonedView(idGuiasTemplate);
    const CardRoot = GuiasView.querySelector('#row-2');
   
    // CardHandlerInstance Edit
    const cardEditReference = GuiasView.querySelector('#edit-card-content-guia');
    const cardEditHandler = createCard ( event => {
        event.preventDefault();
        alert('En desarrollo...');
    }, cardEditReference);

    // CardHandlerInstance Submit
    const cardSubmitReference = GuiasView.querySelector('#submit-card-content-guia');
    const cardSubmitHandler = createCard (event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()]
        const idiomas = dataParse.splice(3, dataParse.length);


        const APIPOST_GuiaRegister = '/GuiaRegister' ;
        FormController().sendForm({url: APIPOST_GuiaRegister, method:'POST' }, {
            'dni': dataParse[2],
            'nombre': dataParse[0],
            'apellido': dataParse[1],
            'IdIdioma': idiomas[0]
        }, ['', undefined, NaN]).then(msg => {
            callerGuiasView();
            alert(msg.success);
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference)

    

    // RecordlistInstance
    const RecordListRoot = GuiasView.querySelector('#recordlist-container');
    const APIGET_ListGuias = '/ListarGuias' ;
    const RecordList_Guias = createRecordlist(APIGET_ListGuias, {
        headNames: ['Titulo', 'Descripción', 'Sala'],
        keys: {primaryKey: 'idGuia', partialKeys: ['nombre', 'apellido', 'dni', 'idioma']},
        operationElements: [{
            element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            listenEvent: 'click',
            handlerEvent: event => {
                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(cardEditHandler.getCard())
            }
            
        }, {
            element: Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']),
            listenEvent: 'click',
            handlerEvent: event => {
                const APIDEL_DeleteGuia = '/cambiarEstadoGuia';
                FormController().sendForm({url: APIDEL_DeleteGuia, method:'PATCH' }, {
                    idGuia: event.target.value
                }, ['', undefined]).then(msg => {
                    callerGuiasView();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }
        }]
    });

    
    const ButtonAdd = GuiasView.querySelector('#add-table-button');
    const buttonAddHandler = e => {
        Generator.removeAllElements(CardRoot);
        CardRoot.appendChild(cardSubmitHandler.getCard())
    }


    // Push Async Content, and Turn On Event dependencies
    /*Check Out how minimize it*/ 
    const APIGET_ListIdiomas = '/listarIdioma';
    consumeAPI (APIGET_ListIdiomas, {method: 'GET'}).then(data => {
        data.forEach(x => {
            cardSubmitHandler.pushContent('#card-idiomas-guia',
            Generator.makeElement('div', {}, [
                Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                Generator.makeElement('label', {for: ''}, [x.idioma])
            ]))

            cardEditHandler.pushContent('#card-idiomas-guia',
            Generator.makeElement('div', {}, [
                Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                Generator.makeElement('label', {for: ''}, [x.idioma])
            ]))
        });



        ButtonAdd.addEventListener ('click', buttonAddHandler)
        RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
    }).catch(_ => {
        ButtonAdd.addEventListener ('click', buttonAddHandler)
        RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
    })

    return GuiasView;
}   


export default function safeGetGuiasView ( callerGuiasView ) {
    if(SessionController().checkSession()){
        return getGuiasView( callerGuiasView );
    } return Generator.makeElement('h1', {style: 'color: red; font-size: 24px;'}, ['SESSION FAIL']);
}