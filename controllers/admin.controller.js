import conexion from "../db/db.js";

export const registrarUsuarioAdmin = async(req, res) =>{
    try {
        /************************************************************/
        let IdUsuario= null;
        const [response] = await conexion.query("SELECT `idUsuario` FROM `usuario` WHERE `dni`=(?)",
        {
            replacements: [req.body.dni],
        })
        console.log("Primer log:", IdUsuario);
        IdUsuario = response[0];
        console.log("Segundo log:",IdUsuario);
            if(IdUsuario == null || IdUsuario == undefined){
                await conexion.query("INSERT INTO `usuario`(`dni`, `nombre`, `apellido`) VALUES (?,?,?)",
                {
                    replacements: [req.body.dni, req.body.nombre, req.body.apellido],
                })
                .then(function (idUsuario)
                    {
                        console.log(idUsuario)
                        IdUsuario = idUsuario[0];
                    }
                ).catch( error => {console.log(error)})
                await conexion.query("INSERT INTO `administrador`(`idUsuario`, `username`, `password`) VALUES (?,?,?)",
                {
                    replacements: [IdUsuario, req.body.username, req.body.password],
                })
            } else {
                await conexion.query("INSERT INTO `administrador`(`idUsuario`, `username`, `password`) VALUES (?,?,?)",
                {
                    replacements: [IdUsuario, req.body.username, req.body.password],
                })
            }
        /************************************************************/
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end("\n");
    } catch (error) {
        console.log(error.message);
    }
}

export const confirmarUsuarioAdmin = async(req, res) =>{
    try {
        const [response]= await conexion.query("SELECT  `token` FROM `administrador` WHERE `username`=(?) AND `password`=(?)",
        {
            replacements: [[req.body.username],[req.body.password]],
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end("\n");
        console.log(JSON.stringify(response, null,1))

    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoAdmin = async(req, res) =>{
    try{
    var IdAdministrador = req.body.idAdministrador;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `administrador` WHERE `idAdministrador`=(?)",
            {
                replacements: [IdAdministrador],
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
    
    await conexion.query("UPDATE `administrador` SET `estado`=(?) WHERE `idAdministrador`=(?)",
    {
        replacements: [[estado], [IdAdministrador]],
    });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.end("\n");
    
    }
    catch (error) {
    console.log(error.message);
    }
}