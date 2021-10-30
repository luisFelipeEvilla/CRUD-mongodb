const express = require('express');
const Edicion = require('../db/Edicion');

const router = express.Router();

router.get('/', async (req, res) => {
    const ediciones = await Edicion.getEdiciones();

    res.send(ediciones).status(200);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const edicion = await Edicion.getEdicion(id);

    res.send(edicion).status(200);
});

router.post('/', async (req, res) => {
    const { ...edicion } = req.body;

    const resultado = await Edicion.addEdicion(edicion)

    res.send(resultado).status(200);
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { ...edicion } = req.body;

    const resultado = await Edicion.updateEdicion(id, edicion);

    res.send(resultado).status(200);
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params;

    const resultado = await Edicion.deleteEdicion(id);

    res.send(resultado).status(200);
})


module.exports = router;