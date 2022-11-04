import conexion from "../db/db.js";

export const registrarExposicion = async(req,res)=>{
    try {
        await conexion.query("INSERT INTO `exposicion`( `idHabitacion`, `titulo`, `descripcion`) VALUES (?,?,?)",{
            replacements:[ req.body.idHabitacion, req.body.titulo, req.body.descripcion ],
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify({msg: 'Exposicion Registrada'}, null,1));
    } catch (error) {
        res.writeHead(500);
        res.end();
        console.log(error.message);
    }
}

export const editarExposicion = async(req, res) =>{
    try {
        let IdExposcion = req.params.idExposicion;
        console.log(req.params);
        console.log(IdExposcion);
        await conexion.query("UPDATE `exposicion` SET `idHabitacion`=(?),`titulo`=(?),`descripcion`=(?) WHERE `idExposcion`=(?)",{  
            replacements: [req.body.idHabitacion, req.body.titulo, req.body.descripcion, IdExposcion],
        });
        await conexion.query("INSERT INTO `modificareliminar`( `idAdministrador`, `idExposicion`) VALUES (?,?)",{
            replacements:[req.body.idAdministrador, IdExposcion],
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify({msg: 'Exposicion Editada'}, null,1));
    } catch (error) {
        res.writeHead(500);
        res.end();
        console.log(error.message);
    }
}

export const listarExposicion = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT E.idExposcion, H.identificador,E.titulo,E.descripcion,E.estado  FROM `exposicion` E Left OUTER JOIN `habitacion` H ON E.idHabitacion=H.idHabitacion WHERE E.estado <> 0");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
    } catch (error) {
        res.writeHead(500);
        res.end();
        console.log(error.message);
    }
}

export const cambiarEstadoExpo = async(req, res) =>{
    try{
    var IdExposcion = req.body.idExposcion;

    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT `estado` FROM `exposicion` WHERE `idExposcion`=(?)",
            {
                replacements: [IdExposcion],
            });
            estado = response[0].estado;
            if(estado == 0){
                estado = 1;
            } else {
                estado = 0;
            }
        } catch (error) {
            console.log(error.message);
        }
        /************************************************************/
    
    await conexion.query("UPDATE `exposicion` SET `estado`=(?) WHERE `idExposcion`=(?) ",
    {
        replacements: [[estado], [IdExposcion]],
    });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify({msg: 'Exposicion Eliminada'}, null,1));
    }
    catch (error) {
        res.writeHead(500);
        res.end();
        console.log(error.message);
    }
}