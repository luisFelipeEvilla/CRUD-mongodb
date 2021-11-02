const express = require('express');
const Usuario = require('../db/Usuario');

const router = express.Router();

router.get('/', async (req, res) => {
    const usuarios = await Usuario.getUsuarios();

    
    res.render('pages/usuarios/index.ejs', {
        usuarios
    });
});

router.get('/agregar', async (req, res) => {
    
    res.render('pages/usuarios/agregar.ejs');
});

router.get('/:id/eliminar', async (req, res) => {
    const { id } = req.params;

    const resultado = await Usuario.deleteUsuario(id);

    res.redirect('/usuarios')
});

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.getUsuario(id)

    res.render('pages/usuarios/actualizar.ejs', {
        usuario
    })
});

router.post('/:id/actualizar', async(req,res) => {
    const { id } = req.params;
    const { ...usuario } = req.body;

    const resultado = await Usuario.updateUsuario(id, usuario);

    res.redirect('/usuarios')
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { ...usuario } = req.body;

    const resultado = await Usuario.updateUsuario(id, usuario);

    res.redirect('/usuarios')
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.getUsuario(id);

    
    res.send(usuario).status(200);
});

router.post('/', async (req, res) => {
    const { ...usuario } = req.body;

    const resultado = await Usuario.addUsuario(usuario)

    res.redirect('/usuarios')
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