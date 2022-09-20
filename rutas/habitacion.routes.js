import express from "express";
import {
    registrarHabitacion,
    editarHabitacion,
    cambiarEstadoHabitacion,
    listarHabitacion
 } from "../controllers/habitacion.controller.js";

 const routerH = express.Router();


//GET
//routerH.get('/', )
routerH.get('/listarHabitacion',listarHabitacion)

//POST
//routerH.post('/', );
routerH.post('/registrarHabitacion', registrarHabitacion );

//PATCH
//routerA.patch('/', );
routerH.patch('/editarHabitacion', editarHabitacion);
routerH.patch('/cambiarEstadoHabitacion', cambiarEstadoHabitacion);

export default routerH;