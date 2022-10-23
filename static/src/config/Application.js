import { SessionController } from "../controller/Session";
import { AdminController } from "../controller/UI/Admin"
import { GuestController } from "../controller/UI/Guest"
import viewService from "../services/view.service";




function Application () {
    function start () {
        viewService().pushViews().then(status => {
            SessionController().checkSession()
            ? AdminController('root', 'nav').startUp() 
            : GuestController('root', 'nav').startUp()
        }).catch(_ => console.error('Application Error...'))
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