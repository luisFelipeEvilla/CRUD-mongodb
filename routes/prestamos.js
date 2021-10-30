const express = require('express');
const Prestamo = require('../db/Prestamo');

const router = express.Router();

router.get('/', async (req, res) => {
    const prestamos = await Prestamo.getPrestamos();

    res.send(prestamos).status(200);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    console.log(id);

    const prestamo = await Prestamo.getPrestamo(id);

    
    res.send(prestamo).status(200);
});

router.post('/', async (req, res) => {
    const { ...prestamo } = req.body;

    const resultado = await Prestamo.addPrestamo(prestamo)

    res.send(resultado).status(200);
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { ...prestamo } = req.body;

    const resultado = await Prestamo.updatePrestamo(id, prestamo);

    res.send(resultado).status(200);
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params;

    const resultado = await Prestamo.deletePrestamo(id);

    res.send(resultado).status(200);
})


module.exports = router;