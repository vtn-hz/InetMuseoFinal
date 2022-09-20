import express from "express";
import {
    registrarExposicion,
    editarExposicion,
    listarExposicion,
    cambiarEstadoExpo
 } from "../controllers/exposicion.controller.js";

const routerE = express.Router();

//POST
//routerE.post('/', );
routerE.post('/registrarExposicion', registrarExposicion );


//PATCH
//routerE.patch('/', );
routerE.patch('/editarExposicion', editarExposicion);
routerE.patch('/cambiarEstadoExpo', cambiarEstadoExpo);

//GET
//routerE.GET('/', );
routerE.get('/listarExposicion', listarExposicion);

export default routerE;