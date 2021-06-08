const mysql = require('mysql');
const objectConnection = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "1234",
    "database": "sistema_tickets"
}

const miConec = mysql.createConnection(objectConnection);
miConec.connect((err)=>{
    if(err){
        console.log("HA OCURRIDO UN PROBLEMA",err);
    }else {
        console.log("ACCEDISTE CORRECTAMENTE A LA BD!");
    }
});
module.exports = miConec;