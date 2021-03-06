const { MongoClient } = require('mongodb')
const { DB_URL } = require('../config');
const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addCopia = async (Copia) => {

    Copia.edicion = ObjectId(Copia.edicion);

    const db = await getConexionDB();

    const result = await db.collection('Copia').insertOne(Copia)

    return result
}

const updateCopia = async (id, Copia) => {
    const db = await getConexionDB();

    const result = await db.collection('Copia').updateOne({ _id: ObjectId(id) }, { $set: { ...Copia } })

    return result;
}

const deleteCopia = async (id) => {
    const db = await getConexionDB();

    const result = await db.collection('Copia').deleteOne({ _id: ObjectId(id) })

    return result
}

const getCopias = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Edicion',
            localField: 'edicion',
            foreignField: '_id',
            as: 'edicion'
        }
    }, {
        $unwind: {
            path: "$edicion",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Libro',
            localField: 'edicion.libro',
            foreignField: '_id',
            as: 'libro'
        }
    }, {
        $unwind: {
            path: "$libro",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Autorea',
            localField: 'libro._id',
            foreignField: 'libro',
            as: 'autorea'
        }
    }, {
        $lookup: {
            from: 'Autor',
            localField: 'autorea.autor',
            foreignField: '_id',
            as: 'autor'
        }
    }, {
        $unwind: {
            path: "$autor",
            preserveNullAndEmptyArrays: true
        }
    }];

    const Copias = await db.collection('Copia').aggregate(query).toArray();

    return Copias;
}

const getCopia = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    },
    {
        $lookup: {
            from: 'Edicion',
            localField: 'edicion',
            foreignField: '_id',
            as: 'edicion'
        }
    }, {
        $unwind: {
            path: "$edicion",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Libro',
            localField: 'edicion.libro',
            foreignField: '_id',
            as: 'libro'
        }
    }, {
        $unwind: {
            path: "$libro",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Autorea',
            localField: 'libro._id',
            foreignField: 'libro',
            as: 'autorea'
        }
    }, {
        $lookup: {
            from: 'Autor',
            localField: 'autorea.autor',
            foreignField: '_id',
            as: 'autor'
        }
    }, {
        $unwind: {
            path: "$autor",
            preserveNullAndEmptyArrays: true
        }
    }];

    const autor = await db.collection('Copia').aggregate(query).toArray();

    return autor;
}

module.exports = {
    getCopias,
    getCopia,
    addCopia,
    updateCopia,
    deleteCopia
}