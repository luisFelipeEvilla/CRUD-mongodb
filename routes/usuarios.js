const express = require('express');
const Usuario = require('../db/Usuario');

const router = express.Router();

router.get('/', async (req, res) => {
    const usuarios = await Usuario.getUsuarios();

    
    res.send(usuarios).status(200);
});

router.post('/', async (req, res) => {
    const { ...usuario } = req.body;

    const resultado = await Usuario.addUsuario(usuario)

    res.send(resultado).status(200);
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { ...usuario } = req.body;

    const resultado = await Usuario.updateUsuario(id, usuario);

    res.send(resultado).status(200);
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params;

    const resultado = await Usuario.deleteUsuario(id);

    res.send(resultado).status(200);
})


module.exports = router;