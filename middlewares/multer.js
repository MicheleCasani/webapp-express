// importiamo multer
const multer = require('multer');

// dichiarare una variabile di configurazione del file storage
const storage = multer.diskStorage({
    destination: './public/img/', // cartella di destinazione dei file che sono le copertine dei libri
    filename: (req, file, cb) => { // metodo che definisce il nome del file. req lo conosciamo, file è l'oggetto file che stiamo uploadando, cb funzione di callback che deve essere eseguita successivamente alla definizione del nome del file per poter andare avanti ( null è l'errore)

        // definizione del nome del file che andiamo ad uploadare
        const uniqueName = `${Date.now()}-${file.originalname}`;

        console.log(uniqueName);
        // cb(null, uniqueName);
    }
});

// dichiaro la variabile upload che contiene l'istanza di multer a cui ho passato un oggetto copntenente storage
const upload = multer({ storage });

module.exports = upload;