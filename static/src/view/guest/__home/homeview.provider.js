import viewService from "../../../services/view.service";

const idNavElement = 'home';
const idHomeTemplate = 'guest_view-home';

export default function getHomeView () {
    return viewService().getClonedView(idHomeTemplate);;
}