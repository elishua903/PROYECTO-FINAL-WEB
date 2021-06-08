const connection = require('../config/connection');

function listarCategoria(req,res)
{
    if(connection){
        let sql = 'select * from categorias';
        connection.query(sql,(err,categorias)=>{
            if(err){
                res.json(err);
            }else{
                res.json(categorias);
            }
        })
    }
}

function obtenerUnaCategoria(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'select * from categorias where id= ? '
        connection.query(sql,[id],(err,categorias)=>{
            if(err){
                res.json(err);
            }else{
                let mensaje ="";
                if(categorias === undefined || categorias.length ===0)
                mensaje = "categoria no encontrada!"
                res.json({data: categorias, mensaje:mensaje})
            }

        })
    }
}

function crearCategoria(req,res){
    if(connection){
        const categorias = req.body;
        if(!categorias.nombre){
            return res.status(400).send({error:true, mensaje:"El nombre de la categoria es obligatorio!"})
        }
        if(categorias.nombre && categorias.nombre.length > 50){
            return res.status(400).send({error:true, mensaje:"El nombre debe de ser de 50 caracteres!"})
        }
       
        let sql = 'insert into categorias set ?';
        connection.query(sql,[categorias],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                res.json({error:false, data: rows, mensaje:"Se agrego correctamente la categoria!"})
            }
        })
    }
}
function editarCategoria(req, res){
    if(connection){
        const { id } = req.params;
        const categorias = req.body;
        let sql = 'update categorias set ? where id = ?';
        connection.query(sql, [categorias,id],(err,rows)=> {
            if(err){
                res.json(err);
            } else{
                let mensaje = "";
               if(rows.changedRows ===0)
                mensaje = "La información es la misma"
               else
                mensaje = "Categoria modificada con exito!"
                res.json({error:false,data: rows,mensaje:mensaje})
            }
        })
    }
}
function eliminarCategoria(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'delete from categorias where id = ?';
        connection.query(sql,[id],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows ===0){
                    mensaje = "Categoria no encontrada"
                }else{
                    mensaje = "Categoria eliminada con exito"
                }
                res.json({error:false,data:rows,mensaje})
            }
        })
    }

}
module.exports ={
    listarCategoria,
    obtenerUnaCategoria,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
}