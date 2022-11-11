import { ElementGenerator, ElementManagement } from "../../helpers/render.helper"



import getAccesibilidadControl from "../../control/guest/__accesibilidad/accesibilidadcontrol.provider";
import getHomeControl from "../../control/guest/__home/homecontrol.provider";
import getReservaControl from "../../control/guest/__reserva/reservacontrol.provider";
import getVisitadigitalControl from "../../control/guest/__visitadigital/visitadigitalcontrol.provider";
import getLoginControl from "../../control/guest/__login/logincontrol.provider";




import createNavbar from "../../custom/widget/navbar/NavbarWidget.provider";





/*Puntos de Id del NavBar*/ 
const GuestDomainView = ['home', 'guest-reserva', 'guest-visitaldigital', 'guest-accesibilidad', 'access'];

// Helper to create & manage content (Help to create HTMLElement and Set It)
const Generator =  ElementGenerator ();
const Manager =  ElementManagement ();

export function GuestController( DynamicContentRoot, StaticContentRoot){

    /*Simplify And Segregate Responsabilities...*/
    // Dynamic Content Guest Views
    /*Contenido que cambia entre vistas*/ 
    const DynamicContentRender = {
        // Home de Guest
        "renderHome": function() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'home');

            const HomeView = getHomeControl();
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

        // Reservar una visita
        "renderReserva": function() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-reserva');
  
            const ReservaView = getReservaControl();
            document.getElementById(DynamicContentRoot).appendChild(ReservaView);
        },

        // Visita Digital
        "renderDigitalVisit": function(){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-visitaldigital');

            const VisitaDView = getVisitadigitalControl();
            document.getElementById(DynamicContentRoot).appendChild(VisitaDView);
        },

        // Accesibilidad del Museo
        "renderAccesibility": function() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'guest-accesibilidad');

            const AccesibilityView = getAccesibilidadControl();
            document.getElementById(DynamicContentRoot).appendChild(AccesibilityView);
        },

        // Login de la Admin Account
        "renderLogin": function(){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(GuestDomainView, 'access');
            
            const LoginView = getLoginControl();
            document.getElementById(DynamicContentRoot).appendChild(LoginView);
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
                'access': _=> DynamicContentRender.renderLogin()
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
