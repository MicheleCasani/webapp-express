// importare express
const express = require('express');

// importo il router 
const router = express.Router();

// importo il controller
const movieController = require("../controllers/controller_film")

// creo le rotte 

// index
router.get('/', movieController.index);
//show 
// router.get('/:id', movieController.show);


// esportazione router
module.exports = router;