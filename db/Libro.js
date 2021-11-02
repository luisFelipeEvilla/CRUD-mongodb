const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addLibro = async (titulo) => {
    const db = await getConexionDB();

    const result = await db.collection('Libro').insertOne({ titulo: titulo })

    return result
}

const updateLibro = async (id, titulo) => {
    const db = await getConexionDB();

    const result = await db.collection('Libro').updateOne({ _id: ObjectId(id) }, { $set: { titulo: titulo } })

    return result;
}

const deleteLibro = async (id) => {
    const db = await getConexionDB();

    id = ObjectId(id)

    const result = await db.collection('Libro').deleteOne({ _id: id })

    db.collection('Autorea').deleteMany({ libro: id })

    return result
}

const getLibros = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Autorea',
            localField: '_id',
            foreignField: 'libro',
            as: 'autoreas'
        }
    }, {
        $lookup: {
            from: 'Autor',
            localField: 'autoreas.autor',
            foreignField: '_id',
            as: 'autores'
        }
    }, {
        $project: {
            _id: 1,
            titulo: 1,
            autores: 1
        }
    }];

    const libros = await db.collection('Libro').aggregate(query).toArray();

    return libros;
}

const getLibro = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    }, {
        $lookup: {
            from: 'Autorea',
            localField: '_id',
            foreignField: 'libro',
            as: 'autoreas'
        }
    }, {
        $lookup: {
            from: 'Autor',
            localField: 'autoreas.autor',
            foreignField: '_id',
            as: 'autores'
        }
    }, {
        $project: {
            _id: 1,
            titulo: 1,
            autores: 1
        }
    }];

    const libros = await db.collection('Libro').aggregate(query).toArray();

    return libros;
}

const addAutor = async (idAutor, idLibro) => {
    const db = await getConexionDB();

    idAutor = ObjectId(idAutor.trim());
    idLibro = ObjectId(idLibro.trim());

    const result = await db.collection('Autorea').insertOne({ autor: idAutor, libro: idLibro })

    return result
}

const deleteAutor = async (idAutor, idLibro) => {
    const db = await getConexionDB();

    idAutor = ObjectId(idAutor);
    idLibro = ObjectId(idLibro);

    const result = await db.collection('Autorea').deleteMany({ autor: idAutor, libro: idLibro })

    return result
}

module.exports = {
    getLibros,
    getLibro,
    addLibro,
    updateLibro,
    deleteLibro,
    addAutor,
    deleteAutor
}