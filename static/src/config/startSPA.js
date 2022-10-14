import { GuestController } from '../controller/UI/Guest.js';
import MuseoRender, { ElementGenerator } from '../services/render.service.js';
import { ElementManagement } from '../services/render.service.js';
import createCard from '../widget/card/handler/CardHandler.js'
import createNavbar from '../widget/navbar/handler/NavHandler.js';
import createRecordlist from '../widget/recordlist/handler/RecordListHandler.js';


const Generator = new ElementGenerator ();




window.onload = () => {
    GuestController('root', 'nav').startUp();

   /*MuseoRender ()
    .startUp();
    */
}

/*

  const card = createCard( event => {
        event.preventDefault();
        console.log('HOLAAA')
    }, document.getElementById('card-content'));

    const urlVisitaGuiada ='/VisitaGuiadaView';
    const record = createRecordlist ( urlVisitaGuiada, {
        headNames: ['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'], 
        keys: {
            primaryKey: 'idVisitaGuiada', 
            partialKeys: ['fecha', 'hora', 'idioma']
        },
        operationElements: [  Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme'])  ]
    }) 

    const ArrNav = ['home', 'guest-reserva', 'guest-visitaldigital', 'guest-accesibilidad', 'access']; 
    const Manager = new ElementManagement () ; 

    const nav = createNavbar({
        'home': ()=>{ Manager.setActiveClass(ArrNav, 'home'); console.log('Home')},
        'guest-reserva': ()=>{ Manager.setActiveClass(ArrNav, 'guest-reserva'); console.log('Reserva')},
        'guest-visitaldigital': ()=>{ Manager.setActiveClass(ArrNav, 'guest-visitaldigital'); console.log('Visita Digital')},
        'guest-accesibilidad': ()=>{ Manager.setActiveClass(ArrNav, 'guest-accesibilidad'); console.log('Accesibilidad')},
        'access': ()=>{ Manager.setActiveClass(ArrNav, 'access'); console.log('Access')}
    }, document.getElementById('nav-guest'));


    document.getElementById('root').appendChild(card.getCard())
    document.getElementById('root').appendChild(record.getRecordlist())
    document.getElementById('nav').appendChild(nav.getNavbar())*/ 

