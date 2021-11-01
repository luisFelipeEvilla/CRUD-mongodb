const express = require('express');
const chalk = require('chalk');
const { PORT } = require('./config');
const autores = require('./routes/autores');
const libros = require('./routes/libros');
const ediciones = require('./routes/ediciones');
const copias = require('./routes/copias');
const usuarios = require('./routes/usuarios');
const prestamos = require('./routes/prestamos');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/autores',autores);
app.use('/libros', libros);
app.use('/ediciones', ediciones);
app.use('/copias', copias);
app.use('/usuarios', usuarios);
app.use('/prestamos', prestamos);

app.get('/', (req,res) => {
    res.render('pages/home');
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`El servidor se encuentra corriendo en el puerto ${chalk.green(PORT)}`);
    }
})