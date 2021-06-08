const express = require('express');
const rutas = express.Router();

const ticketsController = require('../controllers/ticketController');
rutas.get('/ticket', ticketsController.listarTickets);
rutas.get('/ticket/:id', ticketsController.obtenerUnTickets);
rutas.post('/ticket',ticketsController.crearTickets);
rutas.put('/ticket/:id',ticketsController.editarTickets);
rutas.delete('/ticket/:id',ticketsController.eliminarTickets);
module.exports = rutas;