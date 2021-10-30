const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addUsuario = async (usuario) => {

    const db = await getConexionDB();

    const result = await db.collection('Usuario').insertOne(usuario)

    return result
}

const updateUsuario = async (id, usuario) => {
    const db = await getConexionDB();

    const result = await db.collection('Usuario').updateOne({_id: ObjectId(id)}, { $set: { ...usuario}})

    return result;
}

const deleteUsuario = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Usuario').deleteOne({ _id: ObjectId(id)})

    return result
}

const getUsuarios = async () => {
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

    const Usuarios = await db.collection('Usuario').find().toArray();

    return Usuarios;
}

const getUsuario = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    },{
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

    const usuario = await db.collection('Usuario').find().toArray();

    return usuario;
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
}