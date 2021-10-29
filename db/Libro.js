const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addLibro = async (titulo) => {
    const db = await getConexionDB();

    const result = await db.collection('Libro').insertOne({ titulo: titulo})

    return result
}

const updateLibro = async (id, titulo) => {
    const db = await getConexionDB();

    const result = await db.collection('Libro').updateOne({_id: ObjectId(id)}, { $set: {titulo: titulo}})

    return result;
}

const deleteLibro = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Libro').deleteOne({ _id: ObjectId(id)})

    return result
}

const getLibros = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Autorea',
            localField: 'titulo',
            foreignField: 'libro',
            as: 'autores'
        }
    }, {
        $project: {
            titulo: 1,
            "autores.autor": 1
        }
    }];

    const libros = await db.collection('Libro').aggregate(query).toArray();

    return libros;
}

const getLibro = async () => {
    
}

module.exports = {
    getLibros,
    addLibro,
    updateLibro,
    deleteLibro
}