const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())

//CONFIGURACION
app.set('port',process.env.PORT || 3000)

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

//BD
require('./config/connection');

//RUTAS
app.use(require('./routers/ticketRoute'));
app.use(require('./routers/categoriasRoute'));
app.use(require('./routers/personalRoute'));

//LEVANTAR AL SERVIVOR
app.listen(app.get('port'), (error)=>{
    if(error){
        console.log("HA OCURRIDO UN ERROR: ",error);
    }else {
        console.log("SERVIDOR EN PUERTO: ",app.get('port'));
    }
})