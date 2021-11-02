const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addEdicion = async (edicion) => {

    edicion.libro = ObjectId(edicion.libro);

    const db = await getConexionDB();

    const result = await db.collection('Edicion').insertOne(edicion)

    return result
}

const updateEdicion = async (id, edicion) => {
    const db = await getConexionDB();

    edicion.libro = ObjectId(edicion.libro);

    const result = await db.collection('Edicion').updateOne({ _id: ObjectId(id) }, { $set: { ...edicion } })

    return result;
}

const deleteEdicion = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Edicion').deleteOne({ _id: ObjectId(id) })

    return result
}

const getEdiciones = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Libro',
            localField: 'libro',
            foreignField: '_id',
            as: 'libro'
        },

    }, {
        $unwind: {
            path: '$libro',
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Copia',
            localField: '_id',
            foreignField: 'edicion',
            as: 'copias'
        }
    }];

    const Ediciones = await db.collection('Edicion').aggregate(query).toArray();

    return Ediciones;
}

const getEdicion = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    }, {
        $lookup: {
            from: 'Libro',
            localField: 'libro',
            foreignField: '_id',
            as: 'libro'
        },

    }, {
        $unwind: {
            path: '$libro',
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Copia',
            localField: '_id',
            foreignField: 'edicion',
            as: 'copias'
        }
    }];

    const Ediciones = await db.collection('Edicion').aggregate(query).toArray();

    return Ediciones;
}

module.exports = {
    getEdiciones,
    getEdicion,
    addEdicion,
    updateEdicion,
    deleteEdicion
}