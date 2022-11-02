import conexion from "../db/db.js";
 

//----------------------------------------------------------------
// Insert comun
export const registrar = async(req,res)=>{
    try {
        await conexion.query("INSERT INTO ``( ``, ``) VALUES (?,?)",{
            replacements:[req.body, req.body],
        });
        res.writeHead(200);
        res.end(JSON.stringify({msg:"+"}, null,1));

    } catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------
// Insert con tabla de conexion 
export const registrarConTablaDeConexion = async(req, res) =>{
    try {
        /************************************************************/
        let Id;
        await conexion.query("INSERT INTO  ( , ) VALUES (?,?)",
        {
            replacements: [req.body, req.body],
        })
        .then(function (id)
            {
                Id = id[0];
            }
        );
        /************************************************************/
        let ID = req.body;
        await conexion.query("INSERT INTO `` (, ) VALUES (?,?)",
        {
            replacements: [Id, ID],
        })
        res.writeHead(200);
        res.end(JSON.stringify({msg:"+"}, null,1));
        /************************************************************/
    } catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------
// Get All
export const listar = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT * FROM ");
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
    } catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------
// GetById
export const getById = async(req, res) =>{
    try {
        const [response]= await conexion.query("SELECT * FROM WHERE ",
        {
            replacements: [req.params],
        });
        res.writeHead(200);
        res.end(JSON.stringify(response, null,1));
        console.log(JSON.stringify(response, null,1))

    } catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------
// Editar
export const edit = async(req, res) =>{
    try {
        await conexion.query("UPDATE  SET  WHERE ",{  
            replacements: [[req.body],[req.body],[req.params]],
        });

        res.writeHead(200);
        res.end(JSON.stringify({msg: "Categoria Updated"}, null,1));
    } catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------
// Cambiar de estado / baja yalta logica
export const cambiarEstado = async(req, res) =>{
    try{
    var id = req.params;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  FROM  WHERE  = (?)",
            {
                replacements: [id],
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
    
    await conexion.query("UPDATE  SET  WHERE ",
    {
        replacements: [[estado], [id]],
    });

    res.writeHead(200);
    res.end(JSON.stringify({msg: "State Updated"}, null,1));

    }
    catch (error) {
    console.log(error.message);
    }
}
//----------------------------------------------------------------
