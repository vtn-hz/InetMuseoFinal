import express from "express";
import {
    InscripcionCreate,
    InscripcionView,
    cambiarEstadoInscripcion
} from "../controllers/inscripcion.controller.js";

const routerInscripcion = express.Router();

//POST
//routerInscripcion.post('/', );
routerInscripcion.post('/InscripcionCreate', InscripcionCreate );


//PATCH
//routerInscripcion.patch('/', );
routerInscripcion.patch('/cambiarEstadoInscripcion', cambiarEstadoInscripcion);

//GET
//routerInscripcion.get('/', );
routerInscripcion.get('/InscripcionView', InscripcionView );

export default routerInscripcion;