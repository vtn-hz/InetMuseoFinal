
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

    const DynamicContentRender = {
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

        "renderFechas": function (idFechasTemplate = 'admin_view-fechas') {
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-fecha');
            const FechasView =  viewService().getClonedView(idFechasTemplate);
            const RecordListRoot = FechasView.querySelector('#recordlist-container');
            
            const cardEditReference = FechasView.querySelector('#edit-card-content-fecha');
            const cardSubmitReference = FechasView.querySelector('#submit-card-content-fecha');

            const CardRoot = FechasView.querySelector('#row-2');

            const ButtonAdd = FechasView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                const CardSubmit = createCard (event => {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    const dataParse = [...data.values()]

                    const dateVisita = new Date(dataParse[0]);
                    const idGuia = dataParse[1];

                    const urlPOSTVisita = '/VisitaGuiadaRegister';
                    FormController()                    
                    .sendForm({url: urlPOSTVisita, method:'POST' }, {
                        fecha:`${dateVisita.getFullYear()}-${(dateVisita.getMonth())+1}-${dateVisita.getDate()}`,
                        hora: `${("0" + dateVisita.getHours()).slice(-2)}:${("0" + dateVisita.getMinutes()).slice(-2)}`,
                        idGuia: parseInt(idGuia),
                        idRecorrido: 1
                    }, ['', undefined]).then(msg => {
                        this.renderFechas();
                        alert(msg.success)
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
                const urlDelExp = '/cambiarEstadoVisitaGuiada';
                FormController()
                .sendForm({url: urlDelExp, method:'PATCH' }, {
                    'idVisitaGuiada': event.target.value
                }, ['', undefined]).then(msg => {
                    this.renderFechas();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }


            const API_ListGuias = '/VisitaGuiadaView';
            const RecordList_Guias = createRecordlist(API_ListGuias, {
                headNames: ['Fecha', 'Hora', 'Idioma', 'Apellido Guia'],
                keys: {primaryKey: 'idVisitaGuiada', partialKeys: ['fecha', 'hora', 'idioma', 'apellido']},
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


            // Push Async Content, and Turn On Event dependencies
            /*Check Out how minimize it*/ 
            const apiUrlGuia = '/ListarGuias';
            consumeAPI (apiUrlGuia, {method: 'GET'}).then(data => {
                Generator.removeAllElements(cardEditReference.content.querySelector('#card-guia'));
                Generator.removeAllElements(cardSubmitReference.content.querySelector('#card-guia'));
                

                data.forEach( ele => {
                    cardEditReference.content.querySelector('#card-guia').appendChild(Generator.makeElement('option', 
                    {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]))

                    cardSubmitReference.content.querySelector('#card-guia').appendChild(Generator.makeElement('option', 
                    {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]))
                })
                
                
                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
            }).catch(_ => {
                ButtonAdd.addEventListener ('click', buttonAddHandler)
                RecordListRoot.appendChild(RecordList_Guias.getRecordlist())
            })

            document.getElementById(DynamicContentRoot).appendChild(FechasView);
        },

        "renderExposiciones": function(idExposicionesTemplate = 'admin_view-exposicion'){
            Generator.removeAllElements(document.getElementById(DynamicContentRoot));
            Manager.setActiveClass(AdminDomainView, 'admin-exposiciones');
            const ExposicionesView =  viewService().getClonedView(idExposicionesTemplate);
            const RecordListRoot = ExposicionesView.querySelector('#recordlist-container');
            
            const cardEditReference = ExposicionesView.querySelector('#edit-card-content-exposicion');
            const cardSubmitReference = ExposicionesView.querySelector('#submit-card-content-exposicion');

            const CardRoot = ExposicionesView.querySelector('#row-2');

            const ButtonAdd = ExposicionesView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                const urlPOSTExpo = '/registrarExposicion' ;
                const CardSubmit = createCard (event => {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    const dataParse = [...data.values()]
                    FormController()
                    .sendForm({url: urlPOSTExpo, method:'POST' }, {
                        'idHabitacion': dataParse[2],
                        'titulo': dataParse[0],
                        'descripcion': dataParse[1]
                    }, ['', undefined]).then(msg => {
                        this.renderExposiciones();
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
                const urlDelExp = '/cambiarEstadoExpo';
                FormController()
                    .sendForm({url: urlDelExp, method:'PATCH' }, {
                        'idExposcion': event.target.value
                    }, ['', undefined]).then(msg => {
                        this.renderExposiciones();
                        alert(msg.success);
                }).catch(msg => alert(msg.error))
            }


            const API_ListExposition = '/listarExposicion';
            const RecordList_Exposicion = createRecordlist(API_ListExposition, {
                headNames: ['Titulo', 'Descripción', 'Sala'],
                keys: {primaryKey: 'idExposcion', partialKeys: ['titulo', 'descripcion', 'identificador']},
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


            // Push Async Content, and Turn On Event dependencies
            /*Check Out how minimize it*/ 
            const apiUrlSalas = '/listarHabitacion';
            consumeAPI (apiUrlSalas, {method: 'GET'}).then(data => {
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
            const RecordListRoot = GuiasView.querySelector('#recordlist-container');
            
            const cardEditReference = GuiasView.querySelector('#edit-card-content-guia');
            const cardSubmitReference = GuiasView.querySelector('#submit-card-content-guia');

            const CardRoot = GuiasView.querySelector('#row-2');

            const ButtonAdd = GuiasView.querySelector('#add-table-button');
            const buttonAddHandler = e => {
                const urlPOSTGuia = '/GuiaRegister' ;
                const CardSubmit = createCard (event => {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    const dataParse = [...data.values()]
                    const idiomas = dataParse.splice(3, dataParse.length);
    
                    FormController().sendForm({url: urlPOSTGuia, method:'POST' }, {
                        'dni': dataParse[2],
                        'nombre': dataParse[0],
                        'apellido': dataParse[1],
                        'IdIdioma': idiomas[0]
                    }, ['', undefined, NaN]).then(msg => {
                        this.renderGuias();
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
                const urlDelGuia = '/cambiarEstadoGuia';
                FormController().sendForm({url: urlDelGuia, method:'POST' }, {
                    idGuia: event.target.value
                }, ['', undefined]).then(msg => {
                    this.renderGuias();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }


            const API_ListGuias = '/ListarGuias';
            const RecordList_Guias = createRecordlist(API_ListGuias, {
                headNames: ['Titulo', 'Descripción', 'Sala'],
                keys: {primaryKey: 'idGuia', partialKeys: ['nombre', 'apellido', 'dni', 'idioma']},
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


            // Push Async Content, and Turn On Event dependencies
            /*Check Out how minimize it*/ 
            const urlIdiomasContent = '/listarIdioma';
            consumeAPI (urlIdiomasContent, {method: 'GET'}).then(data => {
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
