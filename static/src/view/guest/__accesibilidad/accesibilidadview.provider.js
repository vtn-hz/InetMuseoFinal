import viewService from "../../../services/view.service";

const idNavElement = 'guest-accesibilidad';
const idAccesibilityTemplate = 'guest_view-accesibilidad';

export default function getAccesibilidadView () {
    return viewService().getClonedView(idAccesibilityTemplate);
}