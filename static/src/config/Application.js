import { SessionController } from "../controller/Session";
import { AdminController } from "../controller/UI/Admin"
import { GuestController } from "../controller/UI/Guest"




function Application () {
    function start () {
        SessionController().checkSession()
        ? AdminController('root', 'nav').startUp() 
        : GuestController('root', 'nav').startUp()
    }

    function refresh () {
        start();
    }

    
    this.start = start;
    this.refresh = refresh;
}

const App = new Application;
export default App;