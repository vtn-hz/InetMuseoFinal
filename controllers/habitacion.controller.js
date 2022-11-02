import conexion from "../db/db.js";

export const registrarHabitacion = async(req,res)=>{
    try {
        var idInstitucioin=0;
        const [response] = await conexion.query("SELECT `idInstitucion` FROM `institucion` WHERE 1");

        idInstitucioin= response[0].idInstitucion;

        await conexion.query("INSERT INTO `habitacion`( `idInstitucion`, `identificador`) VALUES (?,?)",{
            replacements:[idInstitucioin, req.body.identificador],
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
    } catch (error) {
        console.log(error.message);
    }
}

export const editarHabitacion = async(req, res) =>{
    try {
        await conexion.query("UPDATE `habitacion` SET `identificador`=(?) WHERE `idHabitacion`=(?)",{  
            replacements: [[req.body.identificador],[req.params.idHabitacion]],
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoHabitacion = async(req, res) =>{
    try{
    var IdHabitacion = req.body.idHabitacion;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `habitacion` WHERE `idHabitacion`=(?)",
            {
                replacements: [IdHabitacion],
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
    
    await conexion.query("UPDATE `habitacion` SET `estado`=(?) WHERE `idHabitacion`=(?) ",
    {
        replacements: [[estado], [IdHabitacion]],
    });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.end(JSON.stringify({msg: 'State changed'}, null,1));
    
    }
    catch (error) {
    console.log(error.message);
    }
}

export const listarHabitacion = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT `idHabitacion`, `idInstitucion`, `identificador` FROM `habitacion`  WHERE `estado` <> 0");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
    } catch (error) {
        console.log(error.message);
    }
}