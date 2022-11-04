import Application from "../../config/Application";
import { ElementGenerator, ElementManagement } from "../../services/render.service"
import viewService from "../../services/view.service";


import createCard from "../../widget/card/handler/CardHandler";
import createNavbar from "../../widget/navbar/handler/NavHandler";
import createRecordlist from "../../widget/recordlist/handler/RecordListHandler";

import { FormController } from "../Form";
import { SessionController } from "../Session";

/*Puntos de Id del NavBar*/ 
const GuestDomainView = ['home', 'guest-reserva', 'guest-visitaldigital', 'guest-accesibilidad', 'access'];

export function GuestController( DynamicContentRoot, StaticContentRoot){
    const Generator = new ElementGenerator ();
    const Manager = new ElementManagement ();

    /*Simplify And Segregate Responsabilities...*/
    // Dynamic Content Guest Views
    /*Contenido que cambia entre vistas*/ 
    const DynamicContentRender = {
        // Home de Guest
        "renderHome": function (idHomeTemplate = 'guest_view-home') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'home');

            const HomeView = viewService().getClonedView(idHomeTemplate);
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

        // Reservar una visita
        "renderReserva": function (idReservaTemplate = 'guest_view-reserva') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-reserva');

            const ReservaView = viewService().getClonedView(idReservaTemplate);
            const CardRoot = ReservaView.querySelector('#row-2');

            // CardHandlerInstance Submit
            const cardSubmitReference = ReservaView.querySelector('#card-content-reserva');
            const cardSubmitHandler = createCard (event => {
                event.preventDefault();
                //const data = new FormData(event.target);
                 
                /*No track values ???????*/
                
               /*Without formdata alternative*/ 
                const dataParse = []
                const Form = event.target;  
                Form.querySelectorAll('#content-container > input').forEach(element => {
                    dataParse.push(element.value);
                });

                console.log({
                    idVisitaGuiada: event.target.getAttribute('idVisitaGuiada'),
                    nombre: dataParse[1],
                    apellido: dataParse[2],
                    dni: dataParse[3],
                    mail: dataParse[0],
                    cantPersonas: dataParse[4]
                })

                const APIPOST_crearInscripcion ='/InscripcionCreate';
                FormController().sendForm({url: APIPOST_crearInscripcion, method:'POST' }, {
                    idVisitaGuiada: event.target.getAttribute('idVisitaGuiada'),
                    nombre: dataParse[1],
                    apellido: dataParse[2],
                    dni: dataParse[3],
                    mail: dataParse[0],
                    cantPersonas: dataParse[4]
                }, ['', undefined]).then(msg => {
                    this.renderReserva();
                    alert(msg.success)
                }).catch(msg => alert(msg.error))
            }, cardSubmitReference);


            const ButtonAdd = Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme']);  
            const ButtonAddListener = event  => {
                Generator.removeAllElements(CardRoot);
                const cardSubmitElement = cardSubmitHandler.getCard();

                cardSubmitElement.setAttribute('idVisitaGuiada', event.target.value);
               // console.log(cardSubmitElement)

                CardRoot.appendChild(cardSubmitElement)
            }
            // RecordlistInstance
            const RecordListRoot = ReservaView.querySelector('#row-1');
            const APIGET_VisitaGuiadaList ='/VisitaGuiadaView';
            const recordList = createRecordlist(APIGET_VisitaGuiadaList, {headNames: ['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'], 
            keys: {
                primaryKey: 'idVisitaGuiada',
                partialKeys:['fecha', 'hora', 'idioma']
            }, operationElements: [{
                element: ButtonAdd,
                listenEvent: 'click',
                handlerEvent: ButtonAddListener
            }]});

            RecordListRoot.appendChild(recordList.getRecordlist());
            document.getElementById(DynamicContentRoot).appendChild(ReservaView);
        },

        // Visita Digital
        "renderDigitalVisit": function(idVisitaDigitalTemplate = 'guest_view-visitadigital'){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-visitaldigital');

            const VisitaDView = viewService().getClonedView(idVisitaDigitalTemplate);
            document.getElementById(DynamicContentRoot).appendChild(VisitaDView);
        },

        // Accesibilidad del Museo
        "renderAccesibility": function (idAccesibilityTemplate = 'guest_view-accesibilidad') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-accesibilidad');

            const AccesibilityView = viewService().getClonedView(idAccesibilityTemplate);
            document.getElementById(DynamicContentRoot).appendChild(AccesibilityView);
        },

        // Loggin de la Admin Account
        "renderLoggin": function(idLogginTemplate = 'guest_view-loggin'){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'access');
            const LogginView = viewService().getClonedView(idLogginTemplate);

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
                    Application.refresh();
                    alert(message.success);
                    
                }).catch(message => alert(message.error))    
            })

            document.getElementById(DynamicContentRoot).appendChild(LogginView);
        }

    } 

    // Static Content Guest Views
    /*Contenido que NO cambia entre vistas*/ 
    const StaticContentRender = {
        "renderNavbar": function (idNavbarGuestTemplate = 'nav-guest') {
            const NavBar = createNavbar ({
                'home': _ => DynamicContentRender.renderHome(),
                'guest-reserva': _=>  DynamicContentRender.renderReserva(),
                'guest-visitaldigital': _=> DynamicContentRender.renderDigitalVisit(),
                'guest-accesibilidad': _=> DynamicContentRender.renderAccesibility(),
                'access': _=> DynamicContentRender.renderLoggin()
            }, document.getElementById(idNavbarGuestTemplate));

            Generator.removeAllElements(document.getElementById(StaticContentRoot));
            document.getElementById(StaticContentRoot).appendChild(NavBar.getNavbar());
        }
    } 

    return {
        "startUp": () => {
            StaticContentRender.renderNavbar();
            DynamicContentRender.renderHome();
        }
    }
}
