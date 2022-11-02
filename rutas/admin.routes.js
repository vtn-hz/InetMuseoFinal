import router from "../Server.js";

import {
    registrarUsuarioAdmin,
    confirmarUsuarioAdmin,
    cambiarEstadoAdmin
 } from "../controllers/admin.controller.js";


//POST
router.post('registrarUsuarioAdmin', registrarUsuarioAdmin );
router.post('confirmarUsuarioAdmin', confirmarUsuarioAdmin);

//PATCH
router.patch('cambiarEstadoAdmin', cambiarEstadoAdmin);