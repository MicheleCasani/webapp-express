// importo mysql 
const mysql = require('../data/db.js');
// importo connection
const connection = require('../data/db.js');

// index
const index = (req, res) => {

    // salvo in una variabile la query da utilizzare
    const sql = 'SELECT * FROM movies';

    // eseguo la query per mostrare i post
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    })
};


module.exports = {
    index,
}