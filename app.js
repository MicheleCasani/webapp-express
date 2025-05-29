// importo express
const express = require('express');
const app = express()
const port = 3000;

// rotta base
app.get("/", (req, res) => {
    console.log("server del mio blog")
    res.send("benvenuto nel blog")
});

// dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
});