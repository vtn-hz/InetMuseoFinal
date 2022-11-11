import Application from "../../config/Application";

import { ElementGenerator, ElementManagement } from "../../helpers/render.helper"
import { SessionController } from "../Session";

import safeGetAdminHomeControl from "../../control/admin/__home/homecontrol.provider";
import safeGetExposicionControl from "../../control/admin/__exposiciones/exposicioncontrol.provider";
import safeGetFechasControl from "../../control/admin/__fechas/fechascontrol.provider";
import safeGetGuiasControl from "../../control/admin/__guias/guiascontrol.provider";
import safeGetSalasControl from "../../control/admin/__salas/salasview.provider";


import createNavbar from "../../custom/widget/navbar/NavbarWidget.provider";




/*Puntos de Id del NavBar*/ 
const AdminDomainView = ['home', 'admin-fecha', 'admin-exposiciones', 'admin-guias', 'admin-salas', 'access'];

// Helper to create & manage content (Help to create HTMLElement and Set It)
const Generator =  ElementGenerator ();
const Manager =  ElementManagement ();


export function AdminController( DynamicContentRoot, StaticContentRoot){
    /*Simplify And Segregate Responsabilities*/
    // Dynamic Content Admin Views
    /*Contenido que cambia entre vistas*/ 
    const DynamicContentRender = {
        // Home View
        "renderHome": function() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'home');
           
            const HomeView = safeGetAdminHomeControl ();
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

        // Fechas View
        "renderFechas": function() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-fecha');

            const FechasView = safeGetFechasControl ();
            document.getElementById(DynamicContentRoot).appendChild(FechasView);
        },

        // Fechas Exposiciones
        "renderExposiciones": function(){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-exposiciones');

            const ExposicionesView = safeGetExposicionControl (); 
            document.getElementById(DynamicContentRoot).appendChild(ExposicionesView);
        },

        // Guias del Museo 
        "renderGuias": function() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-guias');

            const GuiasView = safeGetGuiasControl ();
            document.getElementById(DynamicContentRoot).appendChild(GuiasView);
        },

        // Salas del Museo 
        "renderSalas": function(){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-salas');

            
            const SalasView = safeGetSalasControl ();
            document.getElementById(DynamicContentRoot).appendChild(SalasView);
        }
    } 

    
    function preventSessionFail () {
        const SESSION_FAIL = false;
        const SESSION_SUCCESS = true;

        try{
            if (SessionController().checkSession()) {
                return SESSION_SUCCESS;
            }  throw SESSION_FAIL;
        }catch(SESSION_FAIL){
            Application.refresh();
            return SESSION_FAIL;
        }
    }

    // Loggout Museo Admin Account
    function logOut () {
        SessionController()
        .deleteSession();
        Application.refresh();
    }


    // Static Content Admin Views
    /*Contenido que NO cambia entre vistas*/ 
    const StaticContentRender = {
        "renderNavbar": function ( idNavbarAdminTemplate = 'nav-admin') {
            const NavBar = createNavbar ({
                'home': _ => preventSessionFail()? DynamicContentRender.renderHome() : _=>{},
                'admin-fecha': _=>  preventSessionFail()? DynamicContentRender.renderFechas() : _=>{},
                'admin-exposiciones': _=> preventSessionFail()? DynamicContentRender.renderExposiciones() : _=>{},
                'admin-guias': _=> preventSessionFail()? DynamicContentRender.renderGuias() : _=>{},
                'admin-salas': _=> preventSessionFail()? DynamicContentRender.renderSalas() : _=>{},
                'access': _=> logOut()
            }, document.getElementById(idNavbarAdminTemplate));

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
