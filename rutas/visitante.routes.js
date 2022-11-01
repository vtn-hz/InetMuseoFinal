import express from "express";
import {
    VisitanteRegister,
    listarVisitante,
    cambiarEstadoVisitante
 } from "../controllers/visitante.contoller.js";

const routerV = express.Router();

//POST
//routerV.post('/', );
routerV.post('/VisitanteRegister', VisitanteRegister );

//GET
//routerV.get('/', );
routerV.get('/listarVisitante',listarVisitante );

//PATCH
//routerV.patch('/', );
routerV.patch('/cambiarEstadoVisitante',cambiarEstadoVisitante );

export default routerV;