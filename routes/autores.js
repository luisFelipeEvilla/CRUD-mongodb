const express = require('express');
const autor = require('../db/Autor');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const autores = await autor.getAutor(id);
    
    res.send(autores).status(200);
});

router.get('/', async (req, res) => {
    const autores = await autor.getAutores();

    
    res.send(autores).status(200);
});

router.post('/:id/libros', async (req, res) => {
    const { id } = req.params;
    const { libro } = req.body;

    const resultado = await autor.addLibro(id, libro)

    res.send(resultado).status(200);
})

router.post('/', async (req, res) => {
    const { nombre } = req.body;

    const resultado = await autor.addAutor(nombre)

    res.send(resultado).status(200);
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    const resultado = await autor.updateAutor(id, nombre);

    res.send(resultado).status(200);
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params;

    const resultado = await autor.deleteAutor(id);

    res.send(resultado).status(200);
})

router.delete('/:id/libros/:libro', async (req, res) => {
    const { id, libro} = req.params;

    console.log(id, " ", libro);

    const resultado = await autor.deleteLibro(id, libro)

    res.send(resultado).status(200);
})


module.exports = router;