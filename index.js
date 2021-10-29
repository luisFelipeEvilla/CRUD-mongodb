const express = require('express');
const chalk = require('chalk');
const { PORT } = require('./config');
const autores = require('./routes/autores');
const libros = require('./routes/libros');
const ediciones = require('./routes/ediciones');
const copias = require('./routes/copias');
const usuarios = require('./routes/usuarios');

const app = express();

app.use(express.json());
app.use('/autores',autores);
app.use('/libros', libros);
app.use('/ediciones', ediciones);
app.use('/copias', copias);
app.use('/usuarios', usuarios);

app.get('/', (req,res) => {
    res.send("Hello world").status(200);
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`El servidor se encuentra corriendo en el puerto ${chalk.green(PORT)}`);
    }
})