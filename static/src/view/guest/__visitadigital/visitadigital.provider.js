import viewService from "../../../services/view.service";

const idVisitaDTemplate = 'guest_view-visitadigital';
export default function getVisitadigitalView ( callerVisitaDView ) {
    return viewService().getClonedView(idVisitaDTemplate);
}