
import Application from "../../config/Application";
import consumeAPI from "../../services/api.service";

import { ElementGenerator, ElementManagement } from "../../services/render.service"
import viewService from "../../services/view.service";


import safeGetExposicionView from "../../view/admin/__exposiciones/exposicionview.provider";
import safeGetFechasView from "../../view/admin/__fechas/fechasview.provider";
import safeGetGuiasView from "../../view/admin/__guias/guiasview.provider";
import safeGetAdminHomeView from "../../view/admin/__home/homeview.provider";
import safeGetSalasView from "../../view/admin/__salas/salasview.provider";




import createCard from "../../widget/card/handler/CardHandler";
import createNavbar from "../../widget/navbar/handler/NavHandler";
import createRecordlist from "../../widget/recordlist/handler/RecordListHandler";

import { FormController } from "../Form";
import { SessionController } from "../Session";


/*Puntos de Id del NavBar*/ 
const AdminDomainView = ['home', 'admin-fecha', 'admin-exposiciones', 'admin-guias', 'admin-salas', 'access'];


export function AdminController( DynamicContentRoot, StaticContentRoot){
    const Generator = new ElementGenerator ();
    const Manager = new ElementManagement ();
    /*Simplify And Segregate Responsabilities*/
    // Dynamic Content Admin Views
    /*Contenido que cambia entre vistas*/ 
    const DynamicContentRender = {
        // Home View
        "renderHome": function renderHome() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'home');
           
            const HomeView = safeGetAdminHomeView( renderHome );
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

        // Fechas View
        "renderFechas": function renderFechas() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-fecha');

            const FechasView = safeGetFechasView( renderFechas );
            document.getElementById(DynamicContentRoot).appendChild(FechasView);
        },

        // Fechas Exposiciones
        "renderExposiciones": function renderExposiciones(){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-exposiciones');

            const ExposicionesView = safeGetExposicionView ( renderExposiciones ) 
            document.getElementById(DynamicContentRoot).appendChild(ExposicionesView);
        },

        // Guias del Museo 
        "renderGuias": function renderGuias() {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-guias');

            const GuiasView = safeGetGuiasView( renderGuias );
            document.getElementById(DynamicContentRoot).appendChild(GuiasView);
        },

        // Salas del Museo 
        "renderSalas": function renderSalas(){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-salas');

            
            const SalasView = safeGetSalasView( renderSalas );
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
