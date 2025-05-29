// Importo mysql2
const mysql = require('mysql2');

// Configurazioni MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Connessione al database
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione a MySQL:', err.message);
        return;
    }
    console.log('Connesso a MySQL');
});

// Esporto la connessione
module.exports = connection;