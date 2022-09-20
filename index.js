import express from "express";
import cors from "cors";
import routerA from "./rutas/admin.routes.js";
import routerE from "./rutas/exposicion.routes.js";
import routerG from "./rutas/guia.routes.js";
import routerH from "./rutas/habitacion.routes.js";
import routerIdioma from "./rutas/idioma.routes.js";
import routerInscripcion from "./rutas/inscripcion.routes.js";
import routerI from "./rutas/institucion.routes.js";
import routerVG from "./rutas/visita.guiada.routes.js";
import routerV from "./rutas/visitante.routes.js";

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '/static/src/public')))
app.use(express.static(path.join(__dirname, '/static/src/dist')))
app.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.use(routerA);
app.use(routerE);   
app.use(routerG);
app.use(routerH);
app.use(routerIdioma);
app.use(routerInscripcion);
app.use(routerI);
app.use(routerVG);
app.use(routerV);

app.listen(process.env.PORT || 5000, ()=> console.log(' API Server on PORT ' +  (process.env.PORT || 5000)));