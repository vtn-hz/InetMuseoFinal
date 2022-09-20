import MuseoRender, {ElementGenerator, ElementManagement, TemplateProvider} from '../services/render.service.js'
import { createSession } from '../controller/Session.js'


import { sendForm } from '../controller/Form.js';



const Template = new TemplateProvider();
const Generator = new ElementGenerator();
const Manager = new ElementManagement();


export default function GuestViewsController(){
    const setViews = (dependenciesIdNav) => {
        const callViews = Object.values(dependenciesIdNav);
        const idTags = Object.keys(dependenciesIdNav);

        for (let i=0 ; i<idTags.length ; i++) {
            Manager.listenerAdder(idTags[i], 'click',callViews[i])
        }
    }

    const renderNav = (dependenciesIdNav) => {
        const root =  document.getElementById('nav');

        Generator.removeAllElements(root);

        document.getElementById('nav').appendChild(
            Generator.makeElement('ul', {class: 'nav-bar_box'}, [
                Generator.makeElement('li', {id: 'home', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#home"}, 'HOME')
                ]),
                Generator.makeElement('li', {id: 'reserva', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#reserva"}, 'HACER UNA RESERVA')
                ]),
                Generator.makeElement('li', {id: 'visitadigital', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#visitadigital"}, 'VISITA DIGITAL')
                ]),
                Generator.makeElement('li', {id: 'accesibilidad', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#accesibilidad"}, 'ACCESIBILIDAD')
                ]),
                Generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#user"}, 'ACCEDER')
                ])
            ])
        )

        
        Manager.classAdder('home', 'nav-bar_icon'); 
        Manager.classAdder('home', 'active'); 

        Manager.classAdder('access', 'right');
        
        setViews(dependenciesIdNav);
    }



    const renderHome = () => {
        renderNav(getDependencies());   

  


        Generator.removeAllElements(Generator.getRoot());
        Manager.setActiveClass(Object.keys(getDependencies()), 'home');
        

        Generator.getRoot()
        .appendChild(Generator.makeElement('aside'));

        Generator.getRoot()
        .appendChild(Generator.makeElement('article', {id: 'article-index', class: 'article'}, [
            Generator.makeElement('section', {class: 'first-section-content'}, [
                Generator.makeElement('h1', {class: 'display-5'}, ['Bienvenidx, visitantx!']),
            ]), 
            Generator.makeElement('section', {id: 'home', class: 'section-content'}, 
                [`Bienvenidos al museo de la TEC 2, donde encontrara las mejores obras de la epoca de la hummanidad
                . Podra registrarse a una de nuestras visitas guiadas donde uno de nuestros guias en el idioma que usted
                prefiera podra contarle la historias de nuestras obras como de la de nuestro museo. Antes de asisir puede
                ver nuestra visita Guiada Digital para hacerse una idea de las obras que podra encontrar. ¿Le gusta el renacentismo? 
                ¿Le gusta el classismo o las obra de Leonardo Davinci? Todo esto y mas podra verlo en nuestro museo. Los esperamos!!!!!!`]
                ),

                
            Generator.makeElement('section', {id:'map-section-content', class: 'section-content'}, [
                Generator.makeElement('h1', {}, ['Mapa de las Instalaciones']),
                
                Generator.makeElement('div', {class: 'container'}, [
                    Generator.makeElement('div', {class: 'img__mapmuseo'}),
                    Generator.makeElement('div', {}, [
                        `Aqui a nuestra derecha podra ver un mapa de nuestras instalaciones, La primera habitacion se trata sobre la epoca clasista, una epoca que viene en el arte despues barroco, donde los
                        artistas quieran volver a un estilo artistico y musical mas apegado a epocas anteriores, por esto el nombre de esta se la considera clasisismo. En la segunda habitacion es dedicada a la Gioconda
                        y las obras de Leonardo Davinci. Pero no contaremos mas, preferimos que usted vea por su propia cuenta las demas Exposiciones!!!`
                    ])
                ])
                
            ]),
        ]));

        Generator.getRoot().appendChild(Generator.makeElement('footer', {class: 'footer-default'}, ['Un proyecto para el INET 2022']))
    }

    const renderLoggin = () => {
        Generator.removeAllElements(Generator.getRoot());
    


        Manager.setActiveClass(Object.keys(getDependencies()), 'access');
        
    
    
        Generator.getRoot()
        .appendChild(Generator.makeElement("form", { id:'id-form', class: 'form-container-user', action: "", method: 'POST'}, [
            Generator.makeElement("input", {placeholder: 'Nombre...', id:'user', name: 'username', class: "form-text-user", type: "text"}),
            Generator.makeElement("input", {placeholder: 'Contraseña...', id:'pass', name: 'password', class: "form-pass-user", type: "password"}),
            Generator.makeElement("input", {value: 'INGRESAR', class: "form-submit-user", type: "submit"})
        ]))
    
    
        Manager.listenerAdder('id-form', 'submit', event => {
            event.preventDefault()
            const body = {
                username: document.getElementById('user').value,
                password: document.getElementById('pass').value,
            }

            createSession(body).then(message=> {
                const MR = new MuseoRender();
                MR.startUp();
                alert(message.success);
                
            }).catch(message => alert(message.error))
  
    
            /*Use Middleware*/ 
        })
        /*Generator.getRoot()
        .appendChild(Generator.("div", {class: "form-container"}, [
            ,
            Generator.makeElemmakeElementent("input", {class: "form-password", type: "password"})
        ]))
    */}  
    
    
    

    const renderReserva = () => {
        Manager.setActiveClass(Object.keys(getDependencies()), 'reserva');
        

        Generator.removeAllElements(Generator.getRoot());

        const root = Generator.makeElement('article', {class: 'article'}); 
        
        Generator.getRoot()
        .appendChild(root)


        root
        .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Fechas de Eventos']));

        root
        .appendChild(Generator.makeElement('div', {class: 'container'}, [
            Generator.makeElement('div', {id: 'row-1', class: 'row'}),
            Generator.makeElement('div', {id: 'row-2', class: 'row'})
        ]));

        const TableContainer =  
        Template.ContainerRecordList(['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'])
        document.getElementById('row-1').appendChild(TableContainer)

        const urlVisitaGuiada ='/VisitaGuiadaView';
        const TableContent = Template.ContentRecordList({apiUrl: urlVisitaGuiada, method: 'POST'},{
            primaryKey: 'idVisitaGuiada', 
            keys: ['fecha', 'hora', 'idioma']
        },
        [  Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme'])  ]);

        TableContent.then(content => {
            TableContainer.appendChild(content)
        
            const allSubscribeButtons =  document.querySelectorAll("#pop-table-button");
            allSubscribeButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const cardElement = Template.SubmitCard(
                        'row-2', 'Subscribirse a Visita Guiada',
                        [
                            Generator.makeElement("input", {id:'card-nombre', name: 'nombre', placeholder: 'Email', class: "form-text-full", type: "email"}),
                            Generator.makeElement("input", {id:'card-nombre', name: 'nombre', placeholder: 'Nombre...', class: "form-text-inline", type: "text"}),
                            Generator.makeElement("input", {id:'card-apellido', name: 'apellido', placeholder: 'Apellido...', class: "form-text-inline", type: "text"}),
                            Generator.makeElement("input", {id:'card-dni', name: 'dni', placeholder: 'DNI',  class: "form-text-full", type: "number"}),
                            Generator.makeElement("input", {id:'card-cantidad', name: 'cantidad', placeholder: 'Cant. Personas',  class: "form-text-inline", type: "number"}),
                            
                        ]
                    );
                        
                    let child;
                    if (child = document.getElementById('row-2').lastChild) {
                        document.getElementById('row-2').removeChild(child)
                    }document.getElementById('row-2').appendChild(cardElement);

                        
                    cardElement.addEventListener('submit', eventFom => {
                        eventFom.preventDefault();
                        const data = new FormData(eventFom.target);
                        const dataParse = [...data.values()]
        


                        const urlPOSTVisita ='/InscripcionCreate';
                        sendForm({url: urlPOSTVisita, method:'POST' }, {
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
                    })

                });
            })
        })

    }

    const renderDigitalVisit = () => {
        Manager.setActiveClass(Object.keys(getDependencies()), 'visitadigital');
        

        /**/ 

        Generator.removeAllElements(Generator.getRoot());
        const root = Generator.makeElement('article', {class: 'article'},
        [
            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', { class: 'content-card'},[
                    Generator.makeElement('h1', {class: 'title-content'}, ['La Gioconda']),
                    Generator.makeElement('p', {class: 'content'}, ['El retrato de Lisa Gherardini, esposa de Francesco del Giocondo, ​ más conocido como La Gioconda o Monna Lisa, es una obra pictórica del polímata renacentista italiano Leonardo da Vinci.'])
                ]),
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-1'}),
                ])
            ]),

            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-2'}),
                ]),

                Generator.makeElement('div', {class: 'content-card'}, [
                    Generator.makeElement('h1',  {class: 'title-content'}, ['La noche estrellada']),
                    Generator.makeElement('p', {class: 'content'}, ['La noche estrellada es un óleo sobre lienzo del pintor postimpresionista neerlandés Vincent van Gogh. Pintado en junio de 1889, representa la vista desde la ventana orientada al este de su habitación de asilo en Saint-Rémy-de-Provence, justo antes del amanecer, con la adición de un pueblo imaginario.​​​'])
                ])
            ]),

            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', {class: 'content-card'}, [
                    Generator.makeElement('h1', {class: 'title-content'}, ['La última cena']),
                    Generator.makeElement('p', {class: 'content'}, ['La última cena es una pintura mural original de Leonardo da Vinci ejecutada entre 1495 y 1498.​​ Se encuentra en la pared sobre la que se pintó originalmente, en el refectorio del convento dominico de Santa Maria delle Grazie, en Milán, ​ declarado Patrimonio de la Humanidad por la Unesco en 1980.'])
                ]),
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-3'}),
                ])
            ]),

            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-4'}),
                ]),
                Generator.makeElement('div', {class: 'content-card'}, [
                    Generator.makeElement('h1', {class: 'title-content'}, ['Desnudo bajando una escalera nº2']),
                    Generator.makeElement('p', {class: 'content'}, ['Desnudo bajando una escalera nº2 es una pintura de 1912 por Marcel Duchamp. El trabajo es considerado como un clásico modernista y se ha convertido en uno de los más famosos de su tiempo.'])
                ]),
            ])

        ]); 

        Generator.getRoot().appendChild(root);
    }

    const renderAccesibility = () => {
        Generator.removeAllElements(Generator.getRoot());
        Manager.setActiveClass(Object.keys(getDependencies()), 'accesibilidad');

        Generator.getRoot()
        .appendChild(
            Generator.makeElement('article', {class: 'article'}, [
                Generator.makeElement('section', {class: 'section-content'}, [
                    Generator.makeElement('h1', {class: 'display-5'}, ['Accesibilidad en Museos'])
                ]),

                Generator.makeElement('section', {class: 'section-content'}, [
                    Generator.makeElement('p', {class:'content'}, 
                    ['La Guía de Accesibilidad en Museos permite evaluar y proyectar la accesibilidad en distintos tipos de instituciones patrimoniales y culturales, mediante la presentación de herramientas de acceso tecnologicas.'])
                ]),


                Generator.makeElement('div', {class: 'container'}, [

                    Generator.makeElement('div', {class: 'col'}, [
                        Generator.makeElement('h2', {class: 'title-content'}, ['Discapacidad Visual']),
                        Generator.makeElement('div', {class: 'icon-blind'}),
                    Generator.makeElement('p', {class:'top-content'}, ['Los problemas de visión son los más comunes en personas adultas. Problemas tales como, vista corta (miopía), hipermetropía, astigmatismo y presbicia e incluso la ceguera completa pueden llegar a aparecer.  Estos problemas provocan dificultad para disfrutar las muestras de los museos. Por esa razon somos el primer museo de mar de plata que tiene funcionalidades para personas con dificultades visuales en todos sus niveles.'])
                    ]),

                    Generator.makeElement('div', {class: 'col'}, [
                        
                    ]),
                ]),


                Generator.makeElement('div', {class: 'container'}, [
                    Generator.makeElement('div', {class: 'col'}, [
                        Generator.makeElement('h2', {class: 'title-content'}, ['Discapacidad Motriz']),
                        Generator.makeElement('div', {class: 'icon-chair'}),
                        Generator.makeElement('p', {class: 'top-content'}, ['Nuestro museo se encuentra completamente acoplado para personas con discapacidades motriz, queremos que el arte pueda llegar a todos y todas, no importa su condicion. Porque el arte es una parte importante del ser humano y como seres humanos tenemos que tener el derecho de contemplar y conocer.'])
                    ]),

                    Generator.makeElement('div', {class: 'col'}, [
                      
                    ]),
                ])
            ])
        )
    }

    const getDependencies = ()=>{
        const dependenciesIdNav = {
            'home': renderHome,
            'access': renderLoggin, 
            'reserva': renderReserva,
            'visitadigital': renderDigitalVisit,
            'accesibilidad': renderAccesibility
        }

        return dependenciesIdNav;
    }

    return {
        startUp: function () {
            renderHome();
        }
    }

}
