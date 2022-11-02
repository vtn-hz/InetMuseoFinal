import Router from "./Router.js";

import {
    registrarUsuarioAdmin,
    confirmarUsuarioAdmin,
    cambiarEstadoAdmin
 } from "../controllers/admin.controller.js";


const routerA = Router();

//POST
routerA.post('registrarUsuarioAdmin', registrarUsuarioAdmin );
routerA.post('confirmarUsuarioAdmin', confirmarUsuarioAdmin);

//PATCH
routerA.patch('cambiarEstadoAdmin', cambiarEstadoAdmin);

export default routerA;