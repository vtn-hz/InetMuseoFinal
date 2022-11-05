import viewService from "../../../services/view.service";
import Application from "../../../config/Application";
import { SessionController } from "../../../controller/Session";


const idLoginTemplate = 'guest_view-login';
export default function getLoginView ( callerLoginView ) {
    const LoginView = viewService().getClonedView(idLoginTemplate);

    LoginView.querySelector('#id-form').addEventListener('submit', event => {
        event.preventDefault()
        const data = new FormData(event.target);
        const dataParse = [...data.values()]
        const body = {
            username: dataParse[0],
            password: dataParse[1],
        }

        SessionController()
        .createSession(body).then(message=> {
            Application.refresh();
            alert(message.success);
            
        }).catch(message => alert(message.error))    
    })

    return LoginView;
}