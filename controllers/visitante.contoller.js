import conexion from "../db/db.js";

export const VisitanteRegister = async(req, res) =>{
    try {
        /************************************************************/
        let IdUsuario= null;
		let idVisitante;
        const [response] = await conexion.query("SELECT  `idUsuario` FROM `usuario` WHERE `dni`=(?)",
        {
            replacements: [req.body.dni],
        })
        IdUsuario = response.length > 0? response[0].idUsuario : null;
<<<<<<< HEAD
            if(IdUsuario == null){
=======
        console.log("Segundo log:",IdUsuario);
            if(IdUsuario == null || IdUsuario == undefined){
>>>>>>> without-express
                await conexion.query("INSERT INTO `usuario`(`dni`, `nombre`, `apellido`) VALUES (?,?,?)",
                {
                    replacements: [req.body.dni, req.body.nombre, req.body.apellido],
                })
                .then(function (idUsuario)
                    {
                        IdUsuario = idUsuario[0];
                    }
<<<<<<< HEAD
                );
=======
                ).catch( error => {console.log(error)})
>>>>>>> without-express
                idVisitante = await conexion.query("INSERT INTO `visitante`(`idUsuario`, `mail`, `cantPersonas`) VALUES (?,?,?)",
                {
                    replacements: [IdUsuario, req.body.mail, req.body.cantPersonas],
                })
            } else {
                idVisitante = await conexion.query("INSERT INTO `visitante`(`idUsuario`, `mail`, `cantPersonas`) VALUES (?,?,?)",
                {
                    replacements: [IdUsuario, req.body.mail, req.body.cantPersonas],
                })
            }
        /************************************************************/
        return idVisitante;
    } catch (error) {
        console.log(error.message);
    }
}

export const listarVisitante = async(req,res)=>{
    try {
<<<<<<< HEAD
        const [response]= await conexion.query("SELECT V.idVisitante, V.mail, V.cantPersonas, V.estado, U.dni, U.nombre, U.apellido FROM `visitante` V LEFT OUTER JOIN `usuario` U ON V.idUsuario=U.idUsuario");
        res.status(200).json(response);
        console.log(JSON.stringify(response, null,1))
    } catch (error) {
=======
         /************************************************************/
        const [response]= await conexion.query("SELECT V.idVisitante, V.mail, V.cantPersonas, V.estado, U.dni, U.nombre, U.apellido FROM `visitante` V LEFT OUTER JOIN `usuario` U ON V.idUsuario=U.idUsuario");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
         /************************************************************/
    } catch (error) {
        res.writeHead(500);
        res.end();
>>>>>>> without-express
        console.log(error.message);
    }
}

export const cambiarEstadoVisitante = async(req, res) =>{
    try{
    var IdVisitante = req.body.idVisitante;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `visitante` WHERE `idVisitante`=(?)",
            {
                replacements: [IdVisitante],
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
    
    await conexion.query("UPDATE `visitante` SET `estado`=(?) WHERE `idVisitante`=(?) ",
    {
        replacements: [[estado], [IdVisitante]],
    });
<<<<<<< HEAD
    res.status(200).json({msg: "State Updated"});
    
    }
    catch (error) {
    console.log(error.message);
=======
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.end(JSON.stringify({msg: 'Museo updated'}, null,1));
    
    }
    catch (error) {
        res.writeHead(500);
        res.end();
        console.log(error.message);
>>>>>>> without-express
    }
}