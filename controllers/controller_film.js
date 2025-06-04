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

// // store
// const store = (req, res, next) => {
//     const { title, author, abstract, } = req.body

//     // 
//     const sql = "INSERT INTO movies (title, author,abstract,image)VALUE (?,?,?,?)";

//     const imageName = req.file.filename;

//     // eseguo la query
//     connection.query(sql, [title, author, abstract, imageName], (err, result) => {
//         // se c'è un errore mi viene catturato e esegue direttamente la prossima istruzione
//         if (err) return next('Errore caricamento nuovo libro');

//         res.status(201).json({
//             status: 'success',
//             message: "Film inserito correttamente"
//         })
//     });
// }

// store review
const storeReviews = (req, res, next) => {

    console.log("Request Body:", req.body);

    // recupero il parametro id
    const { id } = req.params

    const { text, vote, name } = req.body

    // preparo la query
    const sql = "INSERT INTO reviews (text, vote, name, movie_id) VALUES (?, ?, ?, ?)";

    // eseguo la query
    connection.query(sql, [text, vote, name, id], (err, result) => {
        if (err) { return res.status(500).json({ error: 'Database query error' }) };

        res.status(201).json({
            status: 'success',
            message: "Film inserito correttamente", id: result.insertId
        })
    })


}

module.exports = {
    index,
    show,
    storeReviews
}

