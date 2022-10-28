
import Application from "../../config/Application";
import consumeAPI from "../../services/api.service";

import { ElementGenerator, ElementManagement } from "../../services/render.service"
import viewService from "../../services/view.service";




import createCard from "../../widget/card/handler/CardHandler";
import createNavbar from "../../widget/navbar/handler/NavHandler";
import createRecordlist from "../../widget/recordlist/handler/RecordListHandler";

import { FormController } from "../Form";
import { SessionController } from "../Session";



const AdminDomainView = ['home', 'admin-fecha', 'admin-exposiciones', 'admin-guias', 'admin-salas', 'access'];


export function AdminController( DynamicContentRoot, StaticContentRoot){
    const Generator = new ElementGenerator ();
    const Manager = new ElementManagement ();
    /*Simplify And Segregate Responsabilities*/
    const DynamicContentRender = {
        // Home View
        "renderHome": function (idHomeTemplate = 'admin_view-home') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'home');
            const HomeView = viewService().getClonedView(idHomeTemplate);
            const RecordListRoot = HomeView.querySelector('#row-1');

            const API_ListInscripcion = '/InscripcionView';
            const RecordList_Incripcion = createRecordlist(API_ListInscripcion, {
                headNames: ['Inscripcion', 'Fecha', 'Hora', 'DNI', 'Personas'],
                keys: {primaryKey: 'idInscripcion', partialKeys: ['fechaInscripcion', 'fecha', 'hora', 'dni', 'cantPersonas']},
                operationElements: []
            });

            RecordListRoot.appendChild(RecordList_Incripcion.getRecordlist())
            document.getElementById(DynamicContentRoot).appendChild(HomeView);
        },

        // Fechas View
        "renderFechas": function (idFechasTemplate = 'admin_view-fechas') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-fecha');

            const FechasView =  viewService().getClonedView(idFechasTemplate);
            const cardRoot = FechasView.querySelector('#row-2');
            
            // CardHandlerInstance Edit
            const cardEditReference = FechasView.querySelector('#edit-card-content-fecha');
            const cardEditHandler = createCard ( event => {
                event.preventDefault();
                alert('En desarrollo...');
            }, cardEditReference) 

            // CardHandlerInstance Submit
            const cardSubmitReference = FechasView.querySelector('#submit-card-content-fecha');
            const cardSubmitHandler = createCard ( event => {
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                const dateVisita = new Date(dataParse[0]);
                const idGuia = dataParse[1];

                const APIPOST_Visita = '/VisitaGuiadaRegister';
                FormController()                    
                .sendForm({url: APIPOST_Visita, method:'POST' }, {
                    fecha:`${dateVisita.getFullYear()}-${(dateVisita.getMonth())+1}-${dateVisita.getDate()}`,
                    hora: `${("0" + dateVisita.getHours()).slice(-2)}:${("0" + dateVisita.getMinutes()).slice(-2)}`,
                    idGuia: parseInt(idGuia),
                    idRecorrido: 1
                }, ['', undefined, null]).then(msg => {
                    this.renderFechas();
                    alert(msg.success)
                }).catch(msg => alert(msg.error))
            }, cardSubmitReference)

           

 
            const RecordListRoot = FechasView.querySelector('#recordlist-container');
            const APIGET_ListVisitaGuiada = '/VisitaGuiadaView';
            const RecordList_Guias = createRecordlist(APIGET_ListVisitaGuiada, {
                headNames: ['Fecha', 'Hora', 'Idioma', 'Apellido Guia'],
                keys: {primaryKey: 'idVisitaGuiada', partialKeys: ['fecha', 'hora', 'idioma', 'apellido']},
                operationElements: [{
                    element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                    listenEvent: 'click',

                    handlerEvent: event => {
                        Generator.removeAllElements(cardRoot);
                        cardRoot.appendChild(cardEditHandler.getCard())
                    }
                }, {
                    element: Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']),
                    listenEvent: 'click',

                    handlerEvent: event => {
                        const URLPATCH_DeleteVisitaGuiada = '/cambiarEstadoVisitaGuiada';
                        FormController()
                        .sendForm({url: URLPATCH_DeleteVisitaGuiada, method:'PATCH' }, {
                            'idVisitaGuiada': event.target.value
                        }, ['', undefined, null]).then(msg => {
                            this.renderFechas();
                            alert(msg.success);
                        }).catch(msg => alert(msg.error))
                    }
                }]
            });

            
            const ButtonAdd = FechasView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                Generator.removeAllElements(cardRoot);
                cardRoot.appendChild(cardSubmitHandler.getCard())
            }


            // Push Async Content, and Turn On Event dependencies
            /*Check Out how minimize it*/ 
            const APIGET_ListGuias = '/ListarGuias';
            consumeAPI (APIGET_ListGuias, {method: 'GET'}).then(data => {
                cardEditHandler.removeContent('card-guia');
                cardSubmitHandler.removeContent('card-guia');
                
                
              /*  data.forEach( ele => {
                    cardEditHandler.pushContent('card-guia', 
                    Generator.makeElement('option', {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]));


                    cardSubmitHandler.pushContent('card-guia', 
                    Generator.makeElement('option', {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]));
                })*/
                
                console.log(cardEditHandler.getCard())

                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
            }).catch(_ => {
                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
            })

            document.getElementById(DynamicContentRoot).appendChild(FechasView);
        },

        // Fechas Exposiciones
        "renderExposiciones": function(idExposicionesTemplate = 'admin_view-exposicion'){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-exposiciones');

            const ExposicionesView =  viewService().getClonedView(idExposicionesTemplate);
            const CardRoot = ExposicionesView.querySelector('#row-2');
            
          

            const cardEditReference = ExposicionesView.querySelector('#edit-card-content-exposicion');
            const cardEditHandler = createCard ( event => {
                event.preventDefault();
                alert('En desarrollo...');
            }, cardEditReference) 


            const cardSubmitReference = ExposicionesView.querySelector('#submit-card-content-exposicion');
            const cardSubmitHandler = createCard (event => {
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()];
                const APIPOST_addExposicion = '/registrarExposicion' ;
                FormController()
                .sendForm({url: APIPOST_addExposicion, method:'POST' }, {
                    'idHabitacion': dataParse[2],
                    'titulo': dataParse[0],
                    'descripcion': dataParse[1]
                }, ['', undefined]).then(msg => {
                    this.renderExposiciones();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }, cardSubmitReference)

 

            const RecordListRoot = ExposicionesView.querySelector('#recordlist-container');
            const APIGET_listarExposition = '/listarExposicion';
            const RecordList_Exposicion = createRecordlist(APIGET_listarExposition, {
                headNames: ['Titulo', 'Descripción', 'Sala'],
                keys: {primaryKey: 'idExposcion', partialKeys: ['titulo', 'descripcion', 'identificador']},
                operationElements: [{
                    element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                    listenEvent: 'click',

                    handlerEvent: event => {
                        Generator.removeAllElements(CardRoot);
                        CardRoot.appendChild(cardEditHandler.getCard())
                    }

                }, {
                    element: Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']),
                    listenEvent: 'click',

                    handlerEvent: event => {
                        const APIPATCH_deleteExpocicion = '/cambiarEstadoExpo';
                        FormController()
                            .sendForm({url: APIPATCH_deleteExpocicion, method:'PATCH' }, {
                                'idExposcion': event.target.value
                            }, ['', undefined]).then(msg => {
                                this.renderExposiciones();
                                alert(msg.success);
                        }).catch(msg => alert(msg.error))
                    }
                }]
            });

                      
            const ButtonAdd = ExposicionesView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(cardSubmitHandler.getCard())
            }

            // Push Async Content, and Turn On Event dependencies
            /*Check Out how minimize it*/ 
            
            const APIGET_listarHabitaciones = '/listarHabitacion';
            consumeAPI (APIGET_listarHabitaciones, {method: 'GET'}).then(data => {
                Generator.removeAllElements(cardEditReference.content.querySelector('#card-sala'));
                Generator.removeAllElements(cardSubmitReference.content.querySelector('#card-sala'));

                
                data.forEach( ele => {
                    cardEditReference.content.querySelector('#card-sala').appendChild(Generator.makeElement('option', 
                    {class:'', value: `${ele.idHabitacion}`}, [`${ele.identificador}`]))

                    cardSubmitReference.content.querySelector('#card-sala').appendChild(Generator.makeElement('option', 
                    {class:'', value: `${ele.idHabitacion}`}, [`${ele.identificador}`]))
                })
                

                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Exposicion.getRecordlist())
            }).catch(_ => {
                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Exposicion.getRecordlist())
            })

            document.getElementById(DynamicContentRoot).appendChild(ExposicionesView);
        },

        "renderGuias": function (idGuiasTemplate = 'admin_view-guias') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-guias');


            const GuiasView =  viewService().getClonedView(idGuiasTemplate);
            const CardRoot = GuiasView.querySelector('#row-2');
            const RecordListRoot = GuiasView.querySelector('#recordlist-container');
            
            const cardEditReference = GuiasView.querySelector('#edit-card-content-guia');
            const cardEditHandler = createCard ( event => {
                event.preventDefault();
                alert('En desarrollo...');
            }, cardEditReference);

            const cardSubmitReference = GuiasView.querySelector('#submit-card-content-guia');
            const cardSubmitHandler = createCard (event => {
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]
                const idiomas = dataParse.splice(3, dataParse.length);

      
                const APIPOST_GuiaRegister = '/GuiaRegister' ;
                FormController().sendForm({url: APIPOST_GuiaRegister, method:'POST' }, {
                    'dni': dataParse[2],
                    'nombre': dataParse[0],
                    'apellido': dataParse[1],
                    'IdIdioma': idiomas[0]
                }, ['', undefined, NaN]).then(msg => {
                    this.renderGuias();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }, cardSubmitReference)

            



            const APIGET_ListGuias = '/ListarGuias' ;
            const RecordList_Guias = createRecordlist(APIGET_ListGuias, {
                headNames: ['Titulo', 'Descripción', 'Sala'],
                keys: {primaryKey: 'idGuia', partialKeys: ['nombre', 'apellido', 'dni', 'idioma']},
                operationElements: [{
                    element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                    listenEvent: 'click',
                    handlerEvent: event => {
                        Generator.removeAllElements(CardRoot);
                        CardRoot.appendChild(cardEditHandler.getCard())
                    }
                    
                }, {
                    element: Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']),
                    listenEvent: 'click',
                    handlerEvent: event => {
                        const APIDEL_DeleteGuia = '/cambiarEstadoGuia';
                        FormController().sendForm({url: APIDEL_DeleteGuia, method:'POST' }, {
                            idGuia: event.target.value
                        }, ['', undefined]).then(msg => {
                            this.renderGuias();
                            alert(msg.success);
                        }).catch(msg => alert(msg.error))
                    }
                }]
            });

            
            const ButtonAdd = GuiasView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(cardSubmitHandler.getCard())
            }


            // Push Async Content, and Turn On Event dependencies
            /*Check Out how minimize it*/ 
            const APIGET_ListIdiomas = '/listarIdioma';
            consumeAPI (APIGET_ListIdiomas, {method: 'GET'}).then(data => {
                data.forEach(x => {
                    cardEditReference.content.querySelector('#card-idiomas-guia')
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                        Generator.makeElement('label', {for: ''}, [x.idioma])
                    ]))

                    cardSubmitReference.content.querySelector('#card-idiomas-guia')
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                        Generator.makeElement('label', {for: ''}, [x.idioma])
                    ]))
                });



                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
            }).catch(_ => {
                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
            })

            document.getElementById(DynamicContentRoot).appendChild(GuiasView);

        },

        "renderSalas": function(idSalasTemplate = 'admin_view-salas'){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-salas');
            const SalasView = viewService().getClonedView(idSalasTemplate);
            const RecordListRoot = SalasView.querySelector('#recordlist-container');
            
            const cardEditReference = SalasView.querySelector('#edit-card-content-sala');
            const cardSubmitReference = SalasView.querySelector('#submit-card-content-sala');

            const CardRoot = SalasView.querySelector('#row-2');

            const ButtonAdd = SalasView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                const urlPOSTSalas = '/registrarHabitacion';
                const CardSubmit = createCard (event => {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    const dataParse = [...data.values()]
    
                    
                    FormController().sendForm({url: urlPOSTSalas, method:'POST' }, {
                        'idInstitucion': 1,
                        'identificador': dataParse[0],
                    }, ['', undefined]).then(msg => {
                        this.renderSalas();
                        alert(msg.success);
                    }).catch(msg => alert(msg.error))
                }, cardSubmitReference)

                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(CardSubmit.getCard())
            }

            const ButtonEdit = Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']);
            const ButtonDelete = Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']);
           
            const buttonEditHandler = event => {
                const CardEditable = createCard(eventSubmit => {
                    eventSubmit.preventDefault();
                    alert('En desarrollo...');
                }, cardEditReference)

                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(CardEditable.getCard())
            }

            const buttonDeleteHandler = event => {
                const urlDELSalas = '/cambiarEstadoHabitacion';
                FormController().sendForm({url: urlDELSalas, method:'PATCH' }, {
                    'idHabitacion': event.target.value,
                }, []).then(msg => {
                    this.renderSalas();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }


            const apiUrlSalas = '/listarHabitacion';
            const RecordList_Guias = createRecordlist(apiUrlSalas, {
                headNames: ['DESCRIPCION'],
                keys: {primaryKey: 'idHabitacion', partialKeys: ['identificador']},
                operationElements: [{
                    element: ButtonEdit,
                    listenEvent: 'click',
                    handlerEvent: buttonEditHandler
                }, {
                    element: ButtonDelete,
                    listenEvent: 'click',
                    handlerEvent: buttonDeleteHandler
                }]
            });

            ButtonAdd.addEventListener ('click', buttonAddHandler)
            RecordListRoot.appendChild(RecordList_Guias.getRecordlist())

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

    function logOut () {
        SessionController()
        .deleteSession();
        Application.refresh();
    }

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
