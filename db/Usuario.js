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

    const result = await db.collection('Usuario').updateOne({ _id: ObjectId(id) }, { $set: { ...usuario } })

    return result;
}

const deleteUsuario = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Usuario').deleteOne({ _id: ObjectId(id) })

    return result
}

const getUsuarios = async () => {
    const db = await getConexionDB();

    const query = [{$lookup: {
        from: 'Prestamo',
        localField: '_id',
        foreignField: 'usuario',
        as: 'prestamos'
      }}, {$lookup: {
        from: 'Copia',
        localField: 'prestamos.copia',
        foreignField: '_id',
        as: 'copias'
      }}, {$lookup: {
        from: 'Edicion',
        localField: 'copias.edicion',
        foreignField: '_id',
        as: 'ediciones'
      }}, {$lookup: {
        from: 'Libro',
        localField: 'ediciones.libro',
        foreignField: '_id',
        as: 'libros'
      }}];

    const Usuarios = await db.collection('Usuario').aggregate(query).toArray();

    return Usuarios;
}

const getUsuario = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    }, {
        $lookup: {
            from: 'Prestamo',
            localField: '_id',
            foreignField: 'usuario',
            as: 'prestamos'
        }
    }, {
        $lookup: {
            from: 'Copia',
            localField: 'prestamos.copia',
            foreignField: '_id',
            as: 'copias'
        }
    }, {
        $lookup: {
            from: 'Edicion',
            localField: 'copias.edicion',
            foreignField: '_id',
            as: 'ediciones'
        }
    }, {
        $lookup: {
            from: 'Libro',
            localField: 'ediciones.libro',
            foreignField: '_id',
            as: 'libros'
        }
    }];

    const usuario = await db.collection('Usuario').aggregate(query).toArray();

    return usuario;
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
}