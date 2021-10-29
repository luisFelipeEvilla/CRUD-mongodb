const express = require('express');
const Libro = require('../db/Libro');

const router = express.Router();

router.get('/', async (req, res) => {
    const autores = await Libro.getLibros();

    
    res.send(autores).status(200);
});

router.post('/', async (req, res) => {
    const { titulo } = req.body;

    const resultado = await Libro.addLibro(titulo)

    res.send(resultado).status(200);
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { titulo } = req.body;

    const resultado = await Libro.updateLibro(id, titulo);

    res.send(resultado).status(200);
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params;

    const resultado = await Libro.deleteLibro(id);

    res.send(resultado).status(200);
})


module.exports = router;