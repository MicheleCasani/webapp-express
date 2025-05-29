// importo express
const express = require('express');
const app = express()

console.log(process.env.SERVER_PORT)
const port = 3000;

// middleware per il parsing delle richiesta in formato json
app.use(express.json());

// middlewares di errore
const notFound = require("./middlewares/notFound")
const handleErrors = require("./middlewares/handleErrors")

// middleware pe settare le immagini
const imagePathMiddleware = require("./middlewares/imagePath")

app.use(imagePathMiddleware);

// importo il router
const movieRouter = require("./router/router_film")

// rotta base
app.get("/", (req, res) => {
    console.log("server del mio blog")
    res.send("benvenuto nel blog")
});

// utilizzo le rotte definite nel router
app.use("/movies", movieRouter)

// error 500
app.use(handleErrors);
// 404 not found
app.use(notFound);

// dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
});