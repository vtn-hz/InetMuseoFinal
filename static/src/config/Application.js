import { SessionController } from "../controller/Session";

import { AdminController } from "../controller/UI/Admin"
import { GuestController } from "../controller/UI/Guest"


import viewService from "../services/view.service"

import defineButtonSubmit from "../custom/HTMLElement/submitbutton/SubmitButtonHandler";
import defineButtonClose from "../custom/HTMLElement/closebutton/CloseButtonHandler";



function Application () {
    function start () {
        viewService().pushViews().then(status => {
            defineButtonClose ();
            defineButtonSubmit();

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