// importare express
const express = require('express');

// importo il middleware multer
const upload = require('../middlewares/multer');

// importo il router 
const router = express.Router();

// importo il controller
const movieController = require("../controllers/controller_film")

// creo le rotte 

// index
router.get('/', movieController.index);
//show 
router.get('/:id', movieController.show);

// store
// router.post('/', upload.single('image'), movieController.store);

// store review
router.post('/:id/reviews', (req, res, next) => {
    console.log("Router Body:", req.body);
    next();
}, movieController.storeReviews);


// esportazione router
module.exports = router;