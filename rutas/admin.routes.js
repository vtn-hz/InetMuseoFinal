import express from "express";
import {
    registrarUsuarioAdmin,
    confirmarUsuarioAdmin,
    cambiarEstadoAdmin
 } from "../controllers/admin.controller.js";

const routerA = express.Router();

//POST
//routerA.post('/', );
routerA.post('/registrarUsuarioAdmin', registrarUsuarioAdmin );
routerA.post('/confirmarUsuarioAdmin', confirmarUsuarioAdmin);

//PATCH
//routerA.patch('/', );
routerA.patch('/cambiarEstadoAdmin', cambiarEstadoAdmin);

export default routerA;