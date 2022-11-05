import viewService from "../../../services/view.service";


const idAccesibilityTemplate = 'guest_view-accesibilidad';
export default function getAccesibilidadView ( callerAccesibilidadView ) {
    return viewService().getClonedView(idAccesibilityTemplate);
}