const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');
const autorea = require('./Autorea');

const addAutor = async (nombre) => {
    const db = await getConexionDB();

    const result = await db.collection('Autor').insertOne({ nombre: nombre })

    return result
}

const updateAutor = async (id, nombre) => {
    const db = await getConexionDB();

    const result = await db.collection('Autor').updateOne({ _id: ObjectId(id) }, { $set: { nombre: nombre } })

    return result;
}

const deleteAutor = async (id) => {
    const db = await getConexionDB();

    id = ObjectId(id);

    const result = await db.collection('Autor').deleteOne({ _id: id})

    db.collection('Autorea').deleteMany({autor: id})

    return result
}

const getAutores = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Autorea',
            localField: '_id',
            foreignField: 'autor',
            as: 'autoreas'
        }
    }, {
        $lookup: {
            from: 'Libro',
            localField: 'autoreas.libro',
            foreignField: '_id',
            as: 'libros'
        }
    }, {
        $project: {
            _id: 1,
            nombre: 1,
            libros: 1
        }
    }];

    const autores = await db.collection('Autor').aggregate(query).toArray();

    return autores;
}

const getAutor = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    },
    {
        $lookup: {
            from: 'Autorea',
            localField: '_id',
            foreignField: 'autor',
            as: 'autoreas'
        }
    }, {
        $lookup: {
            from: 'Libro',
            localField: 'autoreas.libro',
            foreignField: '_id',
            as: 'libros'
        }
    }, {
        $project: {
            _id: 1,
            nombre: 1,
            libros: 1
        }
    }];

    const autor = await db.collection('Autor').aggregate(query).toArray();

    return autor;
}

const addLibro = async (idAutor, idLibro) => {
    const db = await getConexionDB();

    idAutor = ObjectId(idAutor);
    idLibro = ObjectId(idLibro);

    const result = await db.collection('Autorea').insertOne({ autor: idAutor, libro: idLibro })

    return result
}

const deleteLibro = async (idAutor, idLibro) => {
    const db = await getConexionDB();

    idAutor = ObjectId(idAutor);
    idLibro = ObjectId(idLibro);

    const result = await db.collection('Autorea').deleteMany({ autor: idAutor, libro: idLibro})

    return result
}

module.exports = {
    getAutores,
    getAutor,
    addAutor,
    updateAutor,
    deleteAutor,
    addLibro,
    deleteLibro
}