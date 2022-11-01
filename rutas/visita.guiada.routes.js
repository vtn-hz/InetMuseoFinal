import express from "express";
import {
    VisitaGuiadaRegister,
    VisitaGuiadaView,
    cambiarEstadoVisitaGuiada
} from "../controllers/visita.guiada.controller.js";

const routerVG = express.Router();

//POST
//routerVG.post('/', );
routerVG.post('/VisitaGuiadaRegister', VisitaGuiadaRegister );

//PATCH
//routerVG.patch('/', );
routerVG.patch('/cambiarEstadoVisitaGuiada',cambiarEstadoVisitaGuiada );


//GET
//routerVG.get('/', );	
routerVG.get('/VisitaGuiadaView', VisitaGuiadaView );



export default routerVG;