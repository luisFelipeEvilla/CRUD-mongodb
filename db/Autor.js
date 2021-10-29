const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addAutor = async (nombre) => {
    const db = await getConexionDB();

    const result = await db.collection('Autor').insertOne({ nombre: nombre})

    return result
}

const updateAutor = async (id, nombre) => {
    const db = await getConexionDB();

    const result = await db.collection('Autor').updateOne({_id: ObjectId(id)}, { $set: {nombre: nombre}})

    return result;
}

const deleteAutor = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Autor').deleteOne({ _id: ObjectId(id)})

    return result
}

const getAutores = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Autorea',
            localField: 'nombre',
            foreignField: 'autor',
            as: 'libros'
        }
    }, {
        $project: {
            nombre: 1,
            "libros.libro": 1
        }
    }];

    const autores = await db.collection('Autor').aggregate(query).toArray();

    return autores;
}

const getAutor = async () => {
    
}

module.exports = {
    getAutores,
    addAutor,
    updateAutor,
    deleteAutor
}