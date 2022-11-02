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

/*
router.post('lol', (req, res)=>{
    let payloadStr = JSON.stringify(req.body);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);

    res.write(payloadStr);
    res.end("\n");
})

router.get('socialismo/fernando', (req, res)=>{
  let payload = {
    socialismo: "socialismo fernando",
  };
  let payloadStr = JSON.stringify(payload);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);

  res.write(payloadStr);
  res.end("\n");
})
*/