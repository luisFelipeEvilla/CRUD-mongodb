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

    const result = await db.collection('Edicion').updateOne({_id: ObjectId(id)}, { $set: { ...edicion}})

    return result;
}

const deleteEdicion = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Edicion').deleteOne({ _id: ObjectId(id)})

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
    }];

    const Edicions = await db.collection('Edicion').aggregate(query).toArray();

    return Edicions;
}

const getEdicion = async () => {
    
}

module.exports = {
    getEdiciones,
    addEdicion,
    updateEdicion,
    deleteEdicion
}