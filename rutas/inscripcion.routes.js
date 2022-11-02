import router from "../r.js";
import {
    InscripcionCreate,
    InscripcionView,
    cambiarEstadoInscripcion
} from "../controllers/inscripcion.controller.js";

const routerInscripcion = router;

//POST
routerInscripcion.post('InscripcionCreate', InscripcionCreate );


//PATCH
routerInscripcion.patch('cambiarEstadoInscripcion', cambiarEstadoInscripcion);

//GET
//router.get('inscripcionView', InscripcionView );

//export default routerInscripcion;