import { SessionController } from "../controller/Session";

import { AdminController } from "../controller/UI/Admin"
import { GuestController } from "../controller/UI/Guest"


import viewService from "../services/view.service"


import defineButtonSubmit from "../custom/HTMLElement/submitbutton/SubmitButtonElement.define";
import defineButtonDelete from "../custom/HTMLElement/deletebutton/DeleteButtonElement.define";
import defineButtonClose from "../custom/HTMLElement/closebutton/CloseButtonElement.define";


function Application () {
    function start () {
        viewService().pushViews().then(status => {
            defineButtonClose ();
            defineButtonSubmit();
            defineButtonDelete();

            SessionController().checkSession()
            ? AdminController('root', 'nav').startUp() 
            : GuestController('root', 'nav').startUp()
        }).catch(e => console.error('Application Error...\n' + e))
    }

    function refresh () {
        SessionController().checkSession()
        ? AdminController('root', 'nav').startUp() 
        : GuestController('root', 'nav').startUp()
    }

    
    this.start = start;
    this.refresh = refresh;
}

const App = new Application;
export default App;