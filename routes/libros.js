const express = require('express');
const Libro = require('../db/Libro');
const Autor = require('../db/Autor');

const router = express.Router();

router.get('/', async (req, res) => {
    const libros = await Libro.getLibros();
    
    res.render('pages/libros/index.ejs', {
        libros
    })
});

router.get('/agregar', async (req, res) => {
    const libros = await Libro.getLibros();
    
    res.render('pages/libros/agregar', {
        libros
    })
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    console.log(id);
    const libro = await Libro.getLibro(id);
    
    res.render('pages/libros/detalle.ejs', {
        libro
    })
});

router.get('/:id/eliminar', async (req, res) => {
    const { id } = req.params;

    const resultado = await Libro.deleteLibro(id);

    res.redirect('/libros')
});

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;

    const libro = await Libro.getLibro(id);

    res.render('pages/libros/actualizar.ejs', {
        libro
    })
});

router.get('/:id/agregarAutor', async (req, res) => {
    const { id } = req.params;

    const libro = await Libro.getLibro(id);
    const autores = await Autor.getAutores();

    res.render('pages/libros/agregarAutor.ejs', {
        libro,
        autores
    })
});

router.get('/:id/eliminarAutor/:autor', async (req, res) => {
    const { id, autor } = req.params;

    const resultado = await Libro.deleteAutor(autor, id);

    res.redirect('/libros/' + id)
});

router.post('/:id/autores', async (req, res) => {
    const { id } = req.params;
    const { autor } = req.body;

    const resultado = await Libro.addAutor(autor, id)

    res.redirect('/libros/' + id)
})

router.post('/', async (req, res) => {
    const { titulo } = req.body;

    const resultado = await Libro.addLibro(titulo)

    res.redirect('/libros')
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