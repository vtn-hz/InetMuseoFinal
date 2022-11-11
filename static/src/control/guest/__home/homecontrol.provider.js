import viewService from "../../../services/view.service";

const idHomeTemplate = 'guest_view-home';
export default function getHomeControl () {
    return viewService().getClonedView(idHomeTemplate);;
}