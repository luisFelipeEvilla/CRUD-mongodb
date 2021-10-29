const { MongoClient } = require('mongodb');
const chalk = require('chalk');
const { DB_URL } = require('../config');

const client = new MongoClient(DB_URL)

const dbName = 'biblioteca';

const obtenerConexion = async () => {
    await  client.connect();

    const db = client.db(dbName);
    console.log(`${chalk.green("Conexión exitosa con la base de datos")}`);

    return db;
}

module.exports = obtenerConexion;