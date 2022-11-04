import conexion from "../db/db.js";

export const registrarInstitucion = async(req,res)=>{
    try {
        let idInstitucion;
        await conexion.query("INSERT INTO `institucion`( `nombre`, `Mapainstalaciones`) VALUES (?,?)",{
            replacements:[req.body.nombreInstalaciones, req.body.Mapainstalaciones],
        })
        .then(function (idInstitucion)
            {
                idInstitucion = idInstitucion[0];
            }
        );
        /************************************************************/
        await conexion.query("INSERT INTO `recorrido`( `idInstitucion`) VALUES (?)",{
            replacements:[idInstitucion],
        })
        /************************************************************/
        await conexion.query("INSERT INTO `inscriptor`( `idInstitucion`) VALUES (?)",{
            replacements:[idInstitucion],
        }) 
        /************************************************************/
<<<<<<< HEAD
        res.status(201).json({msg:"Museo Registrado"});
    } catch (error) {
=======
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({msg: 'Museo Registrado'}, null,1));
    } catch (error) {
        res.writeHead(500);
        res.end();
>>>>>>> without-express
        console.log(error.message);
    }
}

export const editarNombreMuseo = async(req, res) =>{
    try {
        await conexion.query("UPDATE `institucion` SET `nombre`= (?)  WHERE 1 ",{  
            replacements: [req.body.nombreInstalaciones],
        });
<<<<<<< HEAD
        res.status(200).json({msg: "Museo Updated"});
    } catch (error) {
=======
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({msg: "Museo Updated"}, null,1));
    } catch (error) {
        res.writeHead(500);
        res.end();
>>>>>>> without-express
        console.log(error.message);
    }
}

export const MostrarMuseo = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT * FROM `institucion` ");
<<<<<<< HEAD
        res.status(200).json(response);
        console.log(JSON.stringify(response, null,1))
    } catch (error) {
=======
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
    } catch (error) {
        res.writeHead(500);
        res.end();
>>>>>>> without-express
        console.log(error.message);
    }
}