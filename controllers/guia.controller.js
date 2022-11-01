import conexion from "../db/db.js";

export const GuiaRegister = async(req, res) =>{
    try {
        /************************************************************/
        let IdUsuario= null;
        let IdGuia;
        const [response] = await conexion.query("SELECT  `idUsuario` FROM `usuario` WHERE `dni`=(?)",
        {
            replacements: [req.body.dni],
        })
        IdUsuario = IdUsuario? response[0].idUsuario : null;
            if(IdUsuario == null){
                await conexion.query("INSERT INTO `usuario`(`dni`, `nombre`, `apellido`) VALUES (?,?,?)",
                {
                    replacements: [req.body.dni, req.body.nombre, req.body.apellido],
                })
                .then(function (idUsuario)
                    {
                        IdUsuario = idUsuario[0];
                    }
                );
                await conexion.query("INSERT INTO `guia`(`idUsuario`) VALUES (?)",
                {
                    replacements: [IdUsuario],
                })
                .then(function (idGuia)
                    {
                        IdGuia = idGuia[0];
                    }
                );
            } else {
                await conexion.query("INSERT INTO `guia`(`idUsuario`) VALUES (?)",
                {
                    replacements: [IdUsuario],
                })
                .then(function (idGuia)
                    {
                        IdGuia = idGuia[0];
                    }
                );
            }
        /************************************************************/
        let IdIdioma = req.body.IdIdioma;
        await conexion.query("INSERT INTO `idiomaguia`(`idIdioma`, `idGuia`) VALUES (?,?)",
        {
            replacements: [IdIdioma, IdGuia],
        })
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end("\n");
    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoGuia = async(req, res) =>{
    try{
    var IdGuia = req.body.idGuia;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `guia` WHERE `idGuia`=(?)",
            {
                replacements: [IdGuia],
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
    
    await conexion.query("UPDATE `guia` SET `estado`=(?) WHERE `idGuia`=(?)",
    {
        replacements: [[estado], [IdGuia]],
    });
    res.status(200).json({msg: "State Updated"});
    
    }
    catch (error) {
    console.log(error.message);
    }
}

export const ListarGuias = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT G.idGuia, U.dni, U.nombre, U.apellido, I.idioma FROM `guia` G LEFT OUTER JOIN `usuario` U ON G.idUsuario=U.idUsuario LEFT OUTER JOIN `idiomaguia` IG ON G.idGuia=IG.idGuia LEFT OUTER JOIN `idioma` I ON IG.idIdioma=I.idIdioma WHERE G.estado= 1");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end("\n");
        console.log(JSON.stringify(response, null,1))
    } catch (error) {
        console.log(error.message);
    }
}

