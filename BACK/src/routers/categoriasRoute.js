const express = require('express');
const rutas = express.Router();

const categoriasController = require('../controllers/categoriasControllers');
rutas.get('/categorias', categoriasController.listarCategoria);
rutas.get('/categorias/:id', categoriasController.obtenerUnaCategoria);
rutas.post('/categorias',categoriasController.crearCategoria);
rutas.put('/categorias/:id',categoriasController.editarCategoria);
rutas.delete('/categorias/:id',categoriasController.eliminarCategoria);
module.exports = rutas;