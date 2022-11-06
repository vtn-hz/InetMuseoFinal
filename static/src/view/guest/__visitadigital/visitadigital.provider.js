import viewService from "../../../services/view.service";

const idNavElement = 'guest-visitaldigital';
const idVisitaDTemplate = 'guest_view-visitadigital';

export default function getVisitadigitalView () {
    return viewService().getClonedView(idVisitaDTemplate);
}