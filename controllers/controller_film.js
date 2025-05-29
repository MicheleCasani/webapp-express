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

const show = (req, res) => {
    // recupero id
    const id = (req.params.id);

    // salvo in una variabile la query da utilizzare
    const moviesql = 'SELECT * FROM movies WHERE id = ?';

    // eseguo la query per mostrare il singolo post
    connection.query(moviesql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Post non trovato' });

        // recupero il post
        const movie = movieResults[0];

        res.json(movie);
    })
}




module.exports = {
    index,
    show
}