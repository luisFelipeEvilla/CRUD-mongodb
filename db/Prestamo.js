const getConexionDB = require('../db/index');
const { ObjectId } = require('mongodb');

const addPrestamo = async (prestamo) => {
    const db = await getConexionDB();

    prestamo.fecha_devolucion = new Date(prestamo.fecha_devolucion).toISOString();
    prestamo.fecha_prestamo = new Date(prestamo.fecha_prestamo).toISOString();
    prestamo.usuario = ObjectId(prestamo.usuario);
    prestamo.copia = ObjectId(prestamo.copia)

    const result = await db.collection('Prestamo').insertOne({ ...prestamo })

    return result
}

const updatePrestamo = async (id, prestamo) => {
    const db = await getConexionDB();

    const result = await db.collection('Prestamo').updateOne({ _id: ObjectId(id) }, { $set: { ...prestamo } })

    return result;
}

const deletePrestamo = async (id) => {
    const db = await getConexionDB();

    id = ObjectId(id)

    const result = await db.collection('Prestamo').deleteOne({ _id: id })

    return result
}

const getPrestamos = async () => {
    const db = await getConexionDB();

    const query = [{
        $lookup: {
            from: 'Usuario',
            localField: 'usuario',
            foreignField: '_id',
            as: 'usuario'
        }
    }, {
        $unwind: {
            path: "$usuario",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Copia',
            localField: 'copia',
            foreignField: '_id',
            as: 'copia'
        }
    }, {
        $unwind: {
            path: "$copia",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Edicion',
            localField: 'copia.edicion',
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
            path: '$libro',
            preserveNullAndEmptyArrays: true
        }
    }];

    const prestamos = await db.collection('Prestamo').aggregate(query).toArray();

    return prestamos;
}

const getPrestamo = async (id) => {
    const db = await getConexionDB();

    const query = [{
        $match: {
            _id: ObjectId(id)
        }
    },{
        $lookup: {
            from: 'Usuario',
            localField: 'usuario',
            foreignField: '_id',
            as: 'usuario'
        }
    }, {
        $unwind: {
            path: "$usuario",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Copia',
            localField: 'copia',
            foreignField: '_id',
            as: 'copia'
        }
    }, {
        $unwind: {
            path: "$copia",
            preserveNullAndEmptyArrays: true
        }
    }, {
        $lookup: {
            from: 'Edicion',
            localField: 'copia.edicion',
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
            path: '$libro',
            preserveNullAndEmptyArrays: true
        }
    }];

    const prestamos = await db.collection('Prestamo').aggregate(query).toArray();

    return prestamos;
}

module.exports = {
    getPrestamos,
    getPrestamo,
    addPrestamo,
    updatePrestamo,
    deletePrestamo,
}