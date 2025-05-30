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
    // recupero id
    const id = parseInt(req.params.id);

    // salvo in una variabile la query da utilizzare
    const movieSql = `SELECT M.*,ROUND(AVG(R.VOTE)) AS voto_medio
     FROM movies M 
     JOIN reviews R ON R.movie_id = M.id
      WHERE M.id=?`

    const reviewSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?
    `;

    // eseguo la query per mostrare la singola review
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Post non trovato' });

        // recupero il film
        const movie = movieResults[0];

        // eseguo la query per mostrare le review
        connection.query(reviewSql, [id], (err, reviewResults) => {

            // Aggiungo le recensioni al film
            movie.reviews = reviewResults;


            res.json(movie);
        });
    });
};




module.exports = {
    index,
    show
}

