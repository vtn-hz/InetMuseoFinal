import { SessionController } from "../../../controller/Session";
import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";

import createRecordlist from "../../../custom/widget/recordlist/RecordListHandler";

const Generator =  ElementGenerator();


const idHomeTemplate = 'admin_view-home'
function getAdminHomeView ( callerHomeView ) {
    const HomeView = viewService().getClonedView(idHomeTemplate);
    const RecordListRoot = HomeView.querySelector('#row-1');

    const API_ListInscripcion = '/InscripcionView';
    const RecordList_Incripcion = createRecordlist(API_ListInscripcion, {
        headNames: ['Inscripcion', 'Fecha', 'Hora', 'DNI', 'Personas'],
        keys: {primaryKey: 'idInscripcion', partialKeys: ['fechaInscripcion', 'fecha', 'hora', 'dni', 'cantPersonas']},
        operationElements: []
    });

    RecordListRoot.appendChild(RecordList_Incripcion.getRecordlist());
    return HomeView;
}   


export default function safeGetAdminHomeView ( callerHomeView ) {
    if(SessionController().checkSession()){
        return getAdminHomeView( callerHomeView );
    } return Generator.makeElement('h1', {style: 'color: red; font-size: 24px;'}, ['SESSION FAIL']);
}