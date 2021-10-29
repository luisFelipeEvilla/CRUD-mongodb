const express = require('express');
const autor = require('../db/Autor');

const router = express.Router();

router.get('/', async (req, res) => {
    const autores = await autor.getAutores();

    
    res.send(autores).status(200);
});

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


module.exports = router;