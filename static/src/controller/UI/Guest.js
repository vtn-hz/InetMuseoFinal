import Application from "../../config/Application";
import { ElementGenerator, ElementManagement } from "../../services/render.service"
import viewService from "../../services/view.service";


import createCard from "../../widget/card/handler/CardHandler";
import createNavbar from "../../widget/navbar/handler/NavHandler";
import createRecordlist from "../../widget/recordlist/handler/RecordListHandler";

import { FormController } from "../Form";
import { SessionController } from "../Session";

<<<<<<< HEAD
/*Puntos de Id del NavBar*/ 
=======

>>>>>>> without-express
const GuestDomainView = ['home', 'guest-reserva', 'guest-visitaldigital', 'guest-accesibilidad', 'access'];

export function GuestController( DynamicContentRoot, StaticContentRoot){
    const Generator = new ElementGenerator ();
    const Manager = new ElementManagement ();

<<<<<<< HEAD
    /*Simplify And Segregate Responsabilities...*/
    // Dynamic Content Guest Views
    /*Contenido que cambia entre vistas*/ 
    const DynamicContentRender = {
        // Home de Guest
=======
    const DynamicContentRender = {
>>>>>>> without-express
        "renderHome": function (idHomeTemplate = 'guest_view-home') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'home');

            const HomeView = viewService().getClonedView(idHomeTemplate);
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

<<<<<<< HEAD
        // Reservar una visita
=======
>>>>>>> without-express
        "renderReserva": function (idReservaTemplate = 'guest_view-reserva') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-reserva');

            const ReservaView = viewService().getClonedView(idReservaTemplate);
<<<<<<< HEAD
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
=======
            const RecordListRoot = ReservaView.querySelector('#row-1');
            const CardRoot = ReservaView.querySelector('#row-2');
            const CardContent = ReservaView.querySelector('#card-content-reserva');
            const Button = Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme']);  

      
            const ButtonListener = event  => {
                const Card = createCard( eventForm => {
                    eventForm.preventDefault();
                    //const data = new FormData(event.target);
                     
                    /*No track values ???????*/
                    
                   /*Without formdata alternative*/ 
                    const dataParse = []
                    const Form = eventForm.target;  
                    Form.querySelectorAll('#content-container > input').forEach(element => {
                        dataParse.push(element.value);
                    });
    
    
                    const APIPOST_crearInscripcion ='/InscripcionCreate';
                    FormController().sendForm({url: APIPOST_crearInscripcion, method:'POST' }, {
                        idVisitaGuiada: event.target.value,
                        nombre: dataParse[1],
                        apellido: dataParse[2],
                        dni: dataParse[3],
                        mail: dataParse[0],
                        cantPersonas: dataParse[4]
                    }, ['', undefined]).then(msg => {
                        this.renderReserva();
                        alert(msg.success)
                    }).catch(msg => alert(msg.error))
                }, CardContent)

                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(Card.getCard())
            }

            const urlVisitaGuiada ='/VisitaGuiadaView';
            const recordList = createRecordlist(urlVisitaGuiada, {headNames: ['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'], 
>>>>>>> without-express
            keys: {
                primaryKey: 'idVisitaGuiada',
                partialKeys:['fecha', 'hora', 'idioma']
            }, operationElements: [{
<<<<<<< HEAD
                element: ButtonAdd,
                listenEvent: 'click',
                handlerEvent: ButtonAddListener
=======
                element: Button,
                listenEvent: 'click',
                handlerEvent: ButtonListener
>>>>>>> without-express
            }]});

            RecordListRoot.appendChild(recordList.getRecordlist());
            document.getElementById(DynamicContentRoot).appendChild(ReservaView);
        },

<<<<<<< HEAD
        // Visita Digital
=======
>>>>>>> without-express
        "renderDigitalVisit": function(idVisitaDigitalTemplate = 'guest_view-visitadigital'){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-visitaldigital');

            const VisitaDView = viewService().getClonedView(idVisitaDigitalTemplate);
            document.getElementById(DynamicContentRoot).appendChild(VisitaDView);
        },

<<<<<<< HEAD
        // Accesibilidad del Museo
=======
>>>>>>> without-express
        "renderAccesibility": function (idAccesibilityTemplate = 'guest_view-accesibilidad') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-accesibilidad');

            const AccesibilityView = viewService().getClonedView(idAccesibilityTemplate);
            document.getElementById(DynamicContentRoot).appendChild(AccesibilityView);
        },

<<<<<<< HEAD
        // Loggin de la Admin Account
=======
>>>>>>> without-express
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

<<<<<<< HEAD
    // Static Content Guest Views
    /*Contenido que NO cambia entre vistas*/ 
=======
>>>>>>> without-express
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
