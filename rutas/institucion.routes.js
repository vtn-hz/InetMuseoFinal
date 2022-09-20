import express from "express";
import {
    registrarInstitucion,
    editarNombreMuseo,
    MostrarMuseo
 } from "../controllers/institucion.controller.js";

const routerI = express.Router();

//GET
//routerI.get('/', );
routerI.get('/MostrarMuseo', MostrarMuseo);

//POST
//routerI.post('/', );
routerI.post('/registrarInstitucion/', registrarInstitucion );

//PATCH
//routerI.patch('/', );
routerI.patch('/editarNombreMuseo', editarNombreMuseo);

export default routerI;