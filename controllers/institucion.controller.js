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
        res.status(201).json({msg:"Museo Registrado"});
    } catch (error) {
        console.log(error.message);
    }
}

export const editarNombreMuseo = async(req, res) =>{
    try {
        await conexion.query("UPDATE `institucion` SET `nombre`= (?)  WHERE 1 ",{  
            replacements: [req.body.nombreInstalaciones],
        });
        res.status(200).json({msg: "Museo Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const MostrarMuseo = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT * FROM `institucion` ");
        res.status(200).json(response);
        console.log(JSON.stringify(response, null,1))
    } catch (error) {
        console.log(error.message);
    }
}