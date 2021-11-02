const express = require('express');
const autor = require('../db/Autor');
const Libro = require ('../db/Libro')

const router = express.Router();



router.get('/', async (req, res) => {
    const autores = await autor.getAutores();
    console.log("abri")
    
    res.render('pages/autores/index.ejs', {
        autores
    });
});


router.get('/agregar', async (req, res) => {
    
    const autores = await autor.getAutores();

    res.render('pages/autores/agregar', {
        autores
    })
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const autores = await autor.getAutor(id);
    
    res.render('pages/autores/detalle.ejs', {
        autores
    })
});

router.get('/:id/actualizar', async (req, res) => {
    console.log("a")
    const { id } = req.params;

    const autores = await autor.getAutor(id);

    res.render('pages/autores/actualizar.ejs', {
        autores
    })
});

router.get('/:id/eliminar', async(req,res) => {
    console.log("aaa")
    const { id } = req.params;

    const resultado = await autor.deleteAutor(id);

    res.redirect('/autores');
})

router.post('/:id/libros', async (req, res) => {
    const { id } = req.params;
    const { libro } = req.body;

    console.log(libro)
    console.log(id)

    const resultado = await autor.addLibro(id, libro)

    res.redirect('/autores/' + id)
})

router.get('/:id/eliminarLibro/:libro', async (req, res) => {
    const { id, libro } = req.params;

    const resultado = await autor.deleteLibro(id, libro);

    res.redirect('/autores/' + id)
});

router.get('/:id/agregarLibro', async (req, res) => {
    console.log("aquitoy")
    const { id } = req.params;

    const autores = await autor.getAutor(id);
    const libros = await Libro.getLibros();

    res.render('pages/autores/agregarLibro.ejs', {
        autores,
        libros
    })
});

router.post('/', async (req, res) => {
    const { nombre } = req.body;

    const resultado = await autor.addAutor(nombre)

    res.redirect('/autores')
})

router.post('/:id/actualizar', async(req,res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    const resultado = await autor.updateAutor(id, nombre);

    res.redirect('/autores')
})





router.delete('/:id/libros/:libro', async (req, res) => {
    const { id, libro} = req.params;

    console.log(id, " ", libro);

    const resultado = await autor.deleteLibro(id, libro)

    res.send(resultado).status(200);
})


module.exports = router;