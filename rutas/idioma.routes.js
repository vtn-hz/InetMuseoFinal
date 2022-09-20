import express from "express";
import {
    IdiomaRegister,
    listarIdioma,
    cambiarEstadoIdioma
} from "../controllers/idioma.controller.js";

const routerIdioma = express.Router();

//POST
//routerIdioma.post('/', );
routerIdioma.post('/IdiomaRegister', IdiomaRegister );

//PATCH
//routerIdioma.patch('/', );
routerIdioma.patch('/cambiarEstadoIdioma', cambiarEstadoIdioma);

//GET
//routerIdioma.get('/', );
routerIdioma.get('/listarIdioma', listarIdioma);

export default routerIdioma;