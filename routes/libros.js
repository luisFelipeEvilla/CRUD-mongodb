const express = require('express');
const Libro = require('../db/Libro');

const router = express.Router();

router.get('/', async (req, res) => {
    const libros = await Libro.getLibros();

    
    res.send(libros).status(200);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const libro = await Libro.getLibro(id);
    
    res.send(libro).status(200);
});

router.post('/:id/autores', async (req, res) => {
    const { id } = req.params;
    const { autor } = req.body;

    const resultado = await Libro.addAutor(autor, id)

    res.send(resultado).status(200);
})

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