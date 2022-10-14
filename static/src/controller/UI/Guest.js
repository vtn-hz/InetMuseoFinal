import { ElementGenerator, ElementManagement, getClonedView } from "../../services/render.service"
import createCard from "../../widget/card/handler/CardHandler";


import createNavbar from "../../widget/navbar/handler/NavHandler";
import createRecordlist from "../../widget/recordlist/handler/RecordListHandler";
import { SessionController } from "../Session";

const GuestDomainView = ['home', 'guest-reserva', 'guest-visitaldigital', 'guest-accesibilidad', 'access'];

export function GuestController( DynamicContentRoot, StaticContentRoot){
    const Generator = new ElementGenerator ();
    const Manager = new ElementManagement ();

    const DynamicContentRender = {
        "renderHome": function (idHomeTemplate) {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'home');

            const HomeView = getClonedView(idHomeTemplate);
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

        "renderReserva": function (idReservaTemplate) {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-reserva');

            const ReservaView = getClonedView(idReservaTemplate);
            const RecordListRoot = ReservaView.querySelector('#row-1');
            const CardRoot = ReservaView.querySelector('#row-2');
            const CardContent = ReservaView.querySelector('#card-content-reserva');
            const Button = Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme']);  

      
            const ButtonListener = event  => {
                const Card = createCard( eventForm => {
                    eventForm.preventDefault();
                    const data = new FormData(eventForm.target);
                    const dataParse = [...data.values()]
    


                    const urlPOSTVisita ='/InscripcionCreate';
                    FormController().sendForm({url: urlPOSTVisita, method:'POST' }, {
                        idVisitaGuiada: event.target.value,
                        nombre: dataParse[1],
                        apellido: dataParse[2],
                        dni: dataParse[3],
                        mail: dataParse[0],
                        cantPersonas: dataParse[4]
                    }, ['', undefined]).then(msg => {
                        renderReserva();
                        alert(msg.success)
                    }).catch(msg => alert(msg.error))
                }, CardContent)
                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(Card.getCard())
            }

            const urlVisitaGuiada ='/VisitaGuiadaView';
            const recordList = createRecordlist(urlVisitaGuiada, {headNames: ['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'], 
            keys: {
                primaryKey: 'idVisitaGuiada',
                partialKeys:['fecha', 'hora', 'idioma']
            }, operationElements: [{
                element: Button,
                listenEvent: 'click',
                handlerEvent: ButtonListener
            }]});

            RecordListRoot.appendChild(recordList.getRecordlist());
            document.getElementById(DynamicContentRoot).appendChild(ReservaView);
        },

        "renderDigitalVisit": function(idVisitaDigitalTemplate){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-visitaldigital');

            const VisitaDView = getClonedView(idVisitaDigitalTemplate);
            document.getElementById(DynamicContentRoot).appendChild(VisitaDView);
        },

        "renderAccesibility": function (idAccesibilityTemplate) {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-accesibilidad');

            const AccesibilityView = getClonedView(idAccesibilityTemplate);
            document.getElementById(DynamicContentRoot).appendChild(AccesibilityView);
        },

        "renderLoggin": function(idLogginTemplate){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'access');
            const LogginView = getClonedView(idLogginTemplate);

            LogginView.querySelector('#id-form').addEventListener('submit', event => {
                event.preventDefault()
                const data = new FormData(event.target);
                const dataParse = [...data.values()]
                const body = {
                    username: dataParse[0],
                    password: dataParse[1],
                }
    
                SessionController()
                .createSession(body).then(message=> {
                    /*const MR = new MuseoRender();
                    MR.startUp();
                    Refresh Aplication*/
                    alert(message.success);
                    
                }).catch(message => alert(message.error))    
            })

            document.getElementById(DynamicContentRoot).appendChild(LogginView);
        }

    } 

    const StaticContentRender = {
        "renderNavbar": function () {
            const NavBar = createNavbar ({
                'home': _ => DynamicContentRender.renderHome('guest_view-home'),
                'guest-reserva': _=>  DynamicContentRender.renderReserva('guest_view-reserva'),
                'guest-visitaldigital': _=> DynamicContentRender.renderDigitalVisit('guest_view-visitadigital'),
                'guest-accesibilidad': _=> DynamicContentRender.renderAccesibility('guest_view-accesibilidad'),
                'access': _=> DynamicContentRender.renderLoggin('guest_view-loggin')
            }, document.getElementById('nav-guest'));

            Generator.removeAllElements(StaticContentRoot);
            document.getElementById(StaticContentRoot).appendChild(NavBar.getNavbar());
        }
    } 

    return {
        "startUp": () => {
            StaticContentRender.renderNavbar();
        }
    }
}
