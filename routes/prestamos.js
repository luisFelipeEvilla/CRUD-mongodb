const express = require('express');
const Prestamo = require('../db/Prestamo');
const Usuario = require('../db/Usuario');
const Copia = require('../db/Copia');

const router = express.Router();

router.get('/', async (req, res) => {
    const prestamos = await Prestamo.getPrestamos();

    res.render('pages/prestamos/index.ejs', {
        prestamos
    });
});

router.get('/agregar', async (req, res) => {
    const prestamos = await Prestamo.getPrestamos();
    const usuarios = await Usuario.getUsuarios();
    const copias = await Copia.getCopias();

    res.render('pages/prestamos/agregar.ejs', {
        prestamos,
        usuarios,
        copias
    });
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const prestamo = await Prestamo.getPrestamo(id);

    res.render('pages/prestamos/detalle.ejs', {
        prestamo
    })
});

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;

    const prestamo = await Prestamo.getPrestamo(id);
    const usuarios = await Usuario.getUsuarios();
    const copias = await Copia.getCopias();

    res.render('pages/prestamos/actualizar.ejs', {
        prestamo,
        usuarios,
        copias
    });
});

router.get('/:id/eliminar', async (req, res) => {
    const { id } = req.params;
    
    const resultado = await Prestamo.deletePrestamo(id);
    
    res.redirect('/prestamos');
});

router.post('/', async (req, res) => {
    const { ...prestamo } = req.body;

    const resultado = await Prestamo.addPrestamo(prestamo)

    res.redirect('/prestamos')
})

router.post('/:id', async (req, res) => {
    const {id} = req.params;
    const { ...prestamo } = req.body;

    const resultado = await Prestamo.updatePrestamo(id, prestamo)

    res.redirect('/prestamos')
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