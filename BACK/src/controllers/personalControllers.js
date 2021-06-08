const connection = require('../config/connection');

function listarPersonal(req,res)
{
    if(connection){
        let sql = 'select * from personal';
        connection.query(sql,(err,personal)=>{
            if(err){
                res.json(err);
            }else{
                res.json(personal);
            }
        })
    }
}
function obtenerPersonal(req,res){
    if(connection){
        const {id} = req.params;
        let sql = `select * from personal where id= ${connection.escape(id)}`;
        connection.query(sql, (err, personal) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(personal === undefined || personal.length == 0)
                {
                    mensaje1 = "Persona no encontrada";
                }
                

                res.json({data: personal[0], mensaje: mensaje1});
            }
        })
    }

}

function crearPersonal(req,res){
    if(connection){
        const personal = req.body;
        if(!personal.nombre){
            return res.status(400).send({error:true, mensaje:"El nombre de la categoria es obligatorio!"})
        }
        if(!personal.apellidos){
            return res.status(400).send({error:true, mensaje:"Los apellidos del personal son obligatorios!"})
        }
        if(personal.nombre && personal.nombre.length > 50){
            return res.status(400).send({error:true, mensaje:"El nombre debe de ser de 50 caracteres!"})
        }
        if(personal.apellidos && personal.apellidos.length > 80){
            return res.status(400).send({error:true, mensaje:"Los apellidos debe de ser de 80 caracteres!"})
        }
        if(personal.telefono && personal.telefono.length !== 10){
            return res.status(400).send({error:true, mensaje:"El telefono debe de ser de 10 caracteres!"})
        }
        let sql = 'insert into personal set ?';
        connection.query(sql,[personal],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                res.json({error:false, data: rows, mensaje:"Se agrego correctamente el personal!"})
            }
        })
    }
}
function editarPersonal(req, res){
    if(connection){
        const { id } = req.params;
        const personal = req.body;
        let sql = 'update personal set ? where id = ?';
        connection.query(sql, [personal,id],(err,rows)=> {
            if(err){
                res.json(err);
            } else{
                let mensaje = "";
               if(rows.changedRows ===0)
                mensaje = "La información es la misma"
               else
                mensaje = "Personal modificado con exito!"
                res.json({error:false,data: rows,mensaje:mensaje})
            }
        })
    }
}
function eliminarPersonal(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'delete from personal where id = ?';
        connection.query(sql,[id],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows ===0){
                    mensaje = "Personal no encontrado"
                }else{
                    mensaje = "Personal eliminado con exito"
                }
                res.json({error:false,data:rows,mensaje})
            }
        })
    }

}
module.exports ={
    listarPersonal,
    obtenerPersonal,
    crearPersonal,
    editarPersonal,
    eliminarPersonal
}