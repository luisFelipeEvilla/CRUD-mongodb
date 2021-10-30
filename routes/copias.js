const express = require('express');
const Copia = require('../db/Copia');

const router = express.Router();

router.get('/', async (req, res) => {
    const copias = await Copia.getCopias();

    
    res.send(copias).status(200);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    console.log(id);

    const copia = await Copia.getCopia(id);

    
    res.send(copia).status(200);
});

router.post('/', async (req, res) => {
    const { ...copia } = req.body;

    console.log(copia);

    const resultado = await Copia.addCopia(copia)

    res.send(resultado).status(200);
})

router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { ...copia } = req.body;

    const resultado = await Copia.updateCopia(id, copia);

    res.send(resultado).status(200);
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params;

    const resultado = await Copia.deleteCopia(id);

    res.send(resultado).status(200);
})


module.exports = router;