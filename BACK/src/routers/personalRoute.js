const express = require('express');
const rutas = express.Router();

const personalController = require('../controllers/personalControllers');
rutas.get('/personal', personalController.listarPersonal);
rutas.get('/personal/:id', personalController.obtenerPersonal);
rutas.post('/personal',personalController.crearPersonal);
rutas.put('/personal/:id',personalController.editarPersonal);
rutas.delete('/personal/:id',personalController.eliminarPersonal);
module.exports = rutas;