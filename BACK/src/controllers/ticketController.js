const connection = require('../config/connection');

function listarTickets(req,res)
{
    if(connection){
        let sql = 'select * from vista_tickets';
        connection.query(sql,(err,tickets)=>{
            if(err){
                res.json(err);
            }else{
                res.json(tickets);
            }
        })
    }
}
function obtenerUnTickets(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'select * from tickets where id= ? '
        connection.query(sql,[id],(err,ticket)=>{
            if(err){
                res.json(err);
            }else{
                let mensaje ="";
                if(ticket === undefined || ticket.length ===0)
                mensaje = "ticket no encontrado!"
                res.json({data: ticket, mensaje:mensaje})
            }

        })
    }
}

function crearTickets(req,res){
    if(connection){
        const ticket = req.body;
        if(!ticket.nombre){
            return res.status(400).send({error:true, mensaje:"El nombre del ticket es obligatorio!"})
        }
        if(!ticket.prioridad){
            return res.status(400).send({error:true, mensaje:"La prioridad del ticket es obligatoria!"})
        }
        if(!ticket.personalid){
            return res.status(400).send({error:true, mensaje:"El personal del ticket es obligatorio!"})
        }
        if(!ticket.categoriaid){
            return res.status(400).send({error:true, mensaje:"La categoria del ticket es obligatoria!"})
        }
        if(ticket.nombre && ticket.nombre.length > 50){
            return res.status(400).send({error:true, mensaje:"El nombre debe de ser de 50 caracteres!"})
        }
        if(ticket.descripcion && ticket.descripcion.length > 100){
            return res.status(400).send({error:true, mensaje:"La descripcion debe de ser de 100 caracteres!"})
        }
        let sql = 'insert into ticket set ?';
        connection.query(sql,[ticket],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                res.json({error:false, data: rows, mensaje:"Se agrego correctamente la ticket"})
            }
        })
    }
}
function editarTickets(req, res){
    if(connection){
        const { id } = req.params;
        const ticket = req.body;
        let sql = 'update tickets set ? where id = ?';
        connection.query(sql, [ticket,id],(err,rows)=> {
            if(err){
                res.json(err);
            } else{
                let mensaje = "";
               if(rows.changedRows ===0)
                mensaje = "La información es la misma"
               else
                mensaje = "Ticket modificada con exito!"
                res.json({error:false,data: rows,mensaje:mensaje})
            }
        })
    }
}



function eliminarTickets(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'delete from tickets where id = ?';
        connection.query(sql,[id],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows ===0){
                    mensaje = "Ticket no encontrada"
                }else{
                    mensaje = "Ticket eliminado con exito"
                }
                res.json({error:false,data:rows,mensaje})
            }
        })
    }

}
module.exports ={
    listarTickets,
    obtenerUnTickets,
    crearTickets,
    editarTickets,
    eliminarTickets
}