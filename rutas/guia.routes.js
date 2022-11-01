import express from "express";
import {
    GuiaRegister,
    cambiarEstadoGuia,
    ListarGuias,
} from "../controllers/guia.controller.js";

const routerG = express.Router();

//POST
//routerG.post('/', );
routerG.post('/GuiaRegister', GuiaRegister);

//PATCH
//routerG.patch('/', );
routerG.post('/cambiarEstadoGuia', cambiarEstadoGuia);

//GET
//routerG.get('/', );
routerG.get('/ListarGuias', ListarGuias);


export default routerG;