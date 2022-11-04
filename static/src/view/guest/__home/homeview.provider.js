import viewService from "../../../services/view.service";

const idHomeTemplate = 'guest_view-home';
export default function getHomeView ( callerHomeView ) {
    return viewService().getClonedView(idHomeTemplate);;
}