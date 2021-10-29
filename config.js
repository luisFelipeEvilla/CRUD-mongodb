require('dotenv').config();

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL || 'localhost:4848'

module.exports = {
    PORT,
    DB_URL
}