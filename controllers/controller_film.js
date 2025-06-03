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

        const movies = results.map((movie) => {
            const obj = {
                ...movie,
                image: req.imagePath + movie.image
            }

            return obj
        })

        res.json(movies);
    })
};

const show = (req, res) => {
    // Recupero ID
    const id = parseInt(req.params.id);

    // Query per il film e il voto medio
    const movieSql = `SELECT M.*, ROUND(AVG(R.VOTE)) AS voto_medio
                      FROM movies M
                      JOIN reviews R ON R.movie_id = M.id
                      WHERE M.id=?`;

    // Query per le recensioni
    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`;

    // Eseguo la query per il film
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Film non trovato' });

        // Recupero il film corretto
        const movie = movieResults[0];

        // Controllo se `req.imagePath` è definito
        movie.image = req.imagePath ? req.imagePath + movie.image : `http://localhost:3000/images/${movie.image}`;

        console.log("Percorso immagine:", movie.image); // Debug

        // Eseguo la query per mostrare le recensioni
        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            movie.reviews = reviewResults;
            res.json(movie);
        });
    });
};




module.exports = {
    index,
    show
}

