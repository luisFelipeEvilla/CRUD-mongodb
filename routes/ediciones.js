const express = require('express');
const Edicion = require('../db/Edicion');
const Copia = require('../db/Copia');

const router = express.Router();

router.get('/', async (req, res) => {
    const ediciones = await Edicion.getEdiciones();

    res.send(ediciones).status(200);
});

router.get('/:id/agregarCopia', async (req, res) => {
    const { id } = req.params;

    const edicion = await Edicion.getEdicion(id);

    res.render('pages/ediciones/agregarCopia.ejs', {
        edicion
    });
});

router.get('/:id/eliminarCopia/:copia', async (req, res) => {
    const { id, copia } = req.params;

    const result = Copia.deleteCopia(copia);

    res.redirect('/ediciones/' + id)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const edicion = await Edicion.getEdicion(id);

    console.log(edicion);

    res.render('pages/ediciones/detalle.ejs', {
        edicion
    });
});

router.post('/:id/copias', async (req, res) => {
    const {id} = req.params;
    const { ...copia } = req.body;

    copia.edicion = id;

    const resultado = await Copia.addCopia(copia)

    res.redirect('/ediciones/' + id)
})

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