import checkSession from '../middleware/checkUser';
import consumeAPI from '../services/api.service';
import MuseoRender, {ElementGenerator, ElementManagement, TemplateProvider} from '../services/render.service.js'

import {SessionController} from '../controller/Session';
import {FormController}  from '../controller/Form';







const Generator = new ElementGenerator();
const Manager = new ElementManagement();
const Template = new TemplateProvider();
const MREnder = new MuseoRender();




export default function AdminViewsController(){
    const preventSessionFail = () => {
        if (checkSession()) {
            return true;
        } 
        
        MREnder.startUp();
        return false;
    }

    

    const setViews = (dependenciesIdNav) => {
        const callViews = Object.values(dependenciesIdNav);
        const idTags = Object.keys(dependenciesIdNav);

        for (let i=0 ; i<idTags.length ; i++) {
            Manager.listenerAdder(idTags[i], 'click', callViews[i])
        }
    }

    
    const renderNav = (dependenciesIdNav) => {
        if (preventSessionFail()) {
            const root =  document.getElementById('nav');
            Generator.removeAllElements(root);
        
            document.getElementById('nav').appendChild(
                Generator.makeElement('ul', {class: 'nav-bar_box'}, [
                    Generator.makeElement('li', {id: 'home', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#home"}, 'HOME')
                    ]),
                    Generator.makeElement('li', {id: 'fecha', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#fecha"}, 'MANEJAR FECHAS')
                    ]),
                    Generator.makeElement('li', {id: 'exposiciones', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', { href:"#exposiciones"}, 'MANEJAR EXPOSICIONES')
                    ]),
                    Generator.makeElement('li', {id: 'guias', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', { href:"#guias"}, 'MANEJAR GUIAS')
                    ]),
                    Generator.makeElement('li', {id: 'salas', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', { href:"#salas"}, 'MANEJAR SALAS')
                    ]),
                    Generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#user"}, 'SALIR')
                    ])
                ])
            )
        
            Manager.classAdder('home', 'nav-bar_icon'); 
            Manager.classAdder('home', 'active'); 
        
            Manager.classAdder('access', 'right'); 
            setViews(dependenciesIdNav)
        }
    }

    
    const renderHome = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            renderNav(getDependencies());
            Manager.setActiveClass(Object.keys(getDependencies()), 'home')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article'}, [
                Generator.makeElement('h1', {class: 'display-5'}, ['Bienvenido denuevo!']),
                Generator.makeElement('p', {}, ['Recuerde que puede administrar los datos de las Visitas Guiadas, como de los Guias. No olvide revisar los dni de los visitantes.'])
            ]));

            Generator.getRoot().appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}))
            document.getElementById('article-content').appendChild(Generator.makeElement('h2', {class: 'display-3'}, ['Listado de Inscriptos']))

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));

            const TableContainer =  
            Template.ContainerRecordList(['Inscripcion', 'Fecha', 'Hora', 'DNI', 'Personas'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/InscripcionView';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'GET'},{
                primaryKey: 'idInscripcion', 
                keys: ['fechaInscripcion', 'fecha', 'hora', 'dni', 'cantPersonas']
            },
            [  /*   Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                    Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])*/
            ]);

            TableContent.then(content => {
                TableContainer.appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        const urlDelExp = '/cambiarEstadoInscripcion';
                            FormController()
                            .sendForm({url: urlDelExp, method:'PATCH' }, {
                                'idInscripcion': event.target.value
                            }, ['', undefined]).then(msg => {
                                renderFechas();
                                alert(msg.success);
                            }).catch(msg => alert(msg.error))
                        })
                });
            })



            const HistoryButton =  Generator.makeElement('button', {class: 'form-edit-xl'}, ['Recuperar un Registro']);
            HistoryButton.addEventListener('click', ()=>{alert('En desarrollo...')})
            document.getElementById('article-content').appendChild(HistoryButton);
        }
    }

    const renderFechas = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'fecha')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Fechas de Visita']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
        

            const TableContainer =  
            Template.ContainerRecordList(['Fecha', 'Hora', 'Idioma', 'Apellido Guia'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/VisitaGuiadaView';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'POST'},{
                primaryKey: 'idVisitaGuiada', 
                keys: ['fecha', 'hora', 'idioma', 'apellido']
            },
            [  Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);


            let selectGuia;
            const cardElement = Template.SubmitCard(
                'row-2', 'Generar Visita',
                [
                    Generator.makeElement("input", {id:'card-fecha', name: 'fecha', type: "datetime-local", class: 'form-date' }),
                    selectGuia = Generator.makeElement("select", {id:'card-guia', name: 'guia', class: "form-select"}, ['Guia']),
                ]
            );

            const apiUrlGuia = '/ListarGuias';
            consumeAPI(apiUrlGuia, {method: 'GET'}).then(data =>{
                if (data.length >= 1) {
                    data.forEach( ele => {
                        selectGuia.appendChild(Generator.makeElement('option', 
                        {class:'', value: `${ele.idGuia}`},  [`${ele.nombre} ${ele.apellido} (${ele.idioma})`]))
                    })
                }else{
                    selectGuia.appendChild(Generator.makeElement('option', 
                        {class:'', value: ''}, [`No tiene guias`]))
                }
            })


            TableContent.then(content => {
                TableContainer.appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        Generator.removeAllElements(document.getElementById('row-2'));
                        const cardEditable = Template.SubmitCard(
                            'row-2', 'Editar Visita',
                            [
                                Generator.makeElement("input", {id:'card-fecha', name: 'fecha', type: "datetime-local", class: 'form-date' }),
                                selectGuia.cloneNode(true),
                            ]
                        );

                        cardEditable.addEventListener('submit',  eventSubmit =>{
                            eventSubmit.preventDefault();
                            alert('En desarrollo...');
                        })

                        document.getElementById('row-2')
                        .appendChild(cardEditable)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        const urlDelExp = '/cambiarEstadoVisitaGuiada';
                            FormController()
                            .sendForm({url: urlDelExp, method:'PATCH' }, {
                                'idVisitaGuiada': event.target.value
                            }, ['', undefined]).then(msg => {
                                renderFechas();
                                alert(msg.success);
                            }).catch(msg => alert(msg.error))
                        })
                });
            })

            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })
     

            const urlPOSTVisita = '/VisitaGuiadaRegister';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                const dateVisita = new Date(dataParse[0]);
                const idGuia = dataParse[1];

                FormController()                    
                .sendForm({url: urlPOSTVisita, method:'POST' }, {
                    fecha:`${dateVisita.getFullYear()}-${(dateVisita.getMonth())+1}-${dateVisita.getDate()}`,
                    hora: `${("0" + dateVisita.getHours()).slice(-2)}:${("0" + dateVisita.getMinutes()).slice(-2)}`,
                    idGuia: parseInt(idGuia),
                    idRecorrido: 1
                }, ['', undefined]).then(msg => {
                    renderFechas();
                    alert(msg.success)
                }).catch(msg => alert(msg.error))
                        
                        
            })

               
            

        }
       
        
    }

    const renderExposiciones = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'exposiciones')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Lista de Exposiciones']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
        
            const TableContainer =  
            Template.ContainerRecordList(['Titulo', 'Descripción', 'Sala'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/listarExposicion';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'GET'},{
                primaryKey: 'idExposcion', 
                keys: ['titulo', 'descripcion', 'identificador']
            },
            [  Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);


            let selectSala;
            const cardElement = Template.SubmitCard(
                'row-2', 'Generar Exposición',
                [
                    Generator.makeElement("input", {id:'card-titulo', name: 'titulo', type: "text", placeholder: 'Nombre Exposicion...',class: 'form-text' }),
                    Generator.makeElement("input", {id:'card-descipcion', name: 'descipcion', type: "text", placeholder: 'Descripcion',class: 'form-text' }),
                    selectSala = Generator.makeElement("select", {id:'card-sala', name: 'sala', class: "form-select"}, ['Sala']),
                ]
            );

            TableContent.then(content => {
                TableContainer.appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        Generator.removeAllElements(document.getElementById('row-2'));
                        const cardEditable = Template.SubmitCard(
                            'row-2', 'Editar Exposición',
                            [
                                Generator.makeElement("input", {id:'card-titulo', name: 'titulo', type: "text", placeholder: 'Nombre Exposicion...',class: 'form-text' }),
                                Generator.makeElement("input", {id:'card-descipcion', name: 'descipcion', type: "text", placeholder: 'Descripcion',class: 'form-text' }),
                                selectSala.cloneNode(true),
                            ]
                        );

                        cardEditable.addEventListener('submit',  eventSubmit =>{
                            eventSubmit.preventDefault();
                            alert('En desarrollo...');
                        })

                        document.getElementById('row-2')
                        .appendChild(cardEditable)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        const urlDelExp = '/cambiarEstadoExpo';
                        FormController()
                            .sendForm({url: urlDelExp, method:'PATCH' }, {
                                'idExposcion': event.target.value
                            }, ['', undefined]).then(msg => {
                                renderExposiciones();
                                alert(msg.success);
                            }).catch(msg => alert(msg.error))
                        })
                })
                
            });
        

    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })

            const apiUrlSalas = '/listarHabitacion';
            consumeAPI(apiUrlSalas, {method: 'GET'}).then(data =>{
                if (data.length >= 1) {
                    data.forEach( ele => {
                        selectSala.appendChild(Generator.makeElement('option', 
                        {class:'', value: `${ele.idHabitacion}`}, [`${ele.identificador}`]))
                    })
                }else{
                    selectSala.appendChild(Generator.makeElement('option', 
                        {class:'', value: ''}, [`No tiene salas en su museo`]))
                }
            })

            const urlPOSTExpo = '/registrarExposicion' ;
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]
                FormController()
                .sendForm({url: urlPOSTExpo, method:'POST' }, {
                    'idHabitacion': dataParse[2],
                    'titulo': dataParse[0],
                    'descripcion': dataParse[1]
                }, ['', undefined]).then(msg => {
                    renderExposiciones();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
               
            })

        }
       
        
    }

    const renderGuias = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'guias')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Lista de Guias']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
    
           
            const TableContainer =  
            Template.ContainerRecordList(['Nombre', 'Apellido', 'DNI', 'Idiomas'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/ListarGuias';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'GET'},{
                primaryKey: 'idGuia', 
                keys: ['nombre', 'apellido', 'dni', 'idioma']
            },
            [  Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);

                  
            let checkContainer;
            const cardElement = Template.SubmitCard(
                'row-2', 'Añadir Guia',
                [
                    Generator.makeElement("input", {id:'card-nombre-guia', name: 'nombre-guia', type: "text", placeholder: 'Nombre...',class: 'form-text-inline' }),
                    Generator.makeElement("input", {id:'card-apellido-guia', name: 'apellido-guia', type: "text", placeholder: 'Apellido...',class: 'form-text-inline' }),
                    Generator.makeElement("input", {id:'card-dni-guia', name: 'dni-guia', type: "number", placeholder: 'DNI',class: 'form-text-full' }),
                    checkContainer=Generator.makeElement("div", {id:'card-idiomas-guia', name: 'idiomas-guia', class: 'container' }),
                ]
            );

            TableContent.then(content => {
                TableContainer.appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                        button.addEventListener('click', event => {
                            Generator.removeAllElements(document.getElementById('row-2'));
                            const cardEditable = Template.SubmitCard(
                                'row-2', 'Editar Guia',
                                [
                                    Generator.makeElement("input", {id:'card-nombre-guia', name: 'nombre-guia', type: "text", placeholder: 'Nombre...',class: 'form-text-inline' }),
                                    Generator.makeElement("input", {id:'card-apellido-guia', name: 'apellido-guia', type: "text", placeholder: 'Apellido...',class: 'form-text-inline' }),
                                    Generator.makeElement("input", {id:'card-dni-guia', name: 'dni-guia', type: "number", placeholder: 'DNI',class: 'form-text-full' }),
                                    checkContainer.cloneNode(true),
                                ]
                            );

                            cardEditable.addEventListener('submit',  eventSubmit =>{
                                eventSubmit.preventDefault();
                                alert('En desarrollo...');
                            })

                            document.getElementById('row-2')
                            .appendChild(cardEditable)
                        })
                });
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
            
                        const urlDelGuia = '/cambiarEstadoGuia';
                        FormController().sendForm({url: urlDelGuia, method:'POST' }, {
                            idGuia: event.target.value
                        }, ['', undefined]).then(msg => {
                            renderGuias();
                            alert(msg.success);
                        }).catch(msg => alert(msg.error))
                    })
                });
            })


       

    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))




            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })



            
            const urlIdiomasContent = '/listarIdioma';
            consumeAPI(urlIdiomasContent, {method: 'GET'})
            .then((data) => {
                   /* console.log(data)
                    console.log(checkContainer);*/
                    data.forEach(x => {
                        checkContainer
                        .appendChild(Generator.makeElement('div', {}, [
                            Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                            Generator.makeElement('label', {for: ''}, [x.idioma])
                        ]))
                    });
                }
            )
            

            const urlPOSTGuia = '/GuiaRegister';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
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
                    renderGuias();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            })

             

        }
    }

    
    const renderSalas = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'salas')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Lista de Salas del Museo']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
        
            

            const apiUrlSalas = '/listarHabitacion';

            const TableContainer = Template.ContainerRecordList(['DESCRIPCION']);
            document.getElementById('row-1').appendChild(TableContainer);

            const TableContent = Template.ContentRecordList({apiUrl: apiUrlSalas, method: 'GET'},  {primaryKey: 'idHabitacion', keys: ['identificador']},
            [ Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);
            
            TableContent.then(content => {
                TableContainer.appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        Generator.removeAllElements(document.getElementById('row-2'));
                        const cardEditable = Template.SubmitCard(
                            'row-2', 'Editar Sala',
                            [
                                Generator.makeElement("input", {id:'card-descripcion', name: 'descipcion', type: "text", placeholder: 'Descripcion de Sala',class: 'form-text' })
                            ]
                        );

                        cardEditable.addEventListener('submit',  eventSubmit =>{
                            eventSubmit.preventDefault();
                            alert('En desarrollo...');
                        })

                        document.getElementById('row-2')
                        .appendChild(cardEditable)
                    })
                });
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        const urlDELSalas = '/cambiarEstadoHabitacion';
                        FormController().sendForm({url: urlDELSalas, method:'PATCH' }, {
                            'idHabitacion': event.target.value,
                        }, []).then(msg => {
                            renderSalas();
                            alert(msg.success);
                        }).catch(msg => alert(msg.error))
                    });
                })
            })



 

            const cardElement = Template.SubmitCard(
                'row-2', 'Agregar Sala',
                [
                    Generator.makeElement("input", {id:'card-descripcion', name: 'descipcion', type: "text", placeholder: 'Descripcion de Sala',class: 'form-text' })
                ]
            );

            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })





            const urlPOSTSalas = '/registrarHabitacion';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                
                FormController().sendForm({url: urlPOSTSalas, method:'POST' }, {
                    'idInstitucion': 1,
                    'identificador': dataParse[0],
                }, ['', undefined]).then(msg => {
                    renderSalas();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            })

        }
       
        
    }


    const logOut = () => {
        SessionController()
        .deleteSession();
        MREnder.startUp();
    }

    const getDependencies = ()=>{
        const dependenciesIdNav = {
            'home': renderHome,
            'fecha': renderFechas, 
            'exposiciones': renderExposiciones,
            'guias': renderGuias,
            'salas': renderSalas,
            'access': logOut
        }

        return dependenciesIdNav;
    }



    return  {
        startUp: function () {
            if (preventSessionFail()) {
                renderHome();
            }
        }
    }
}

