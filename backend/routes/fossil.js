const express = require('express');
const router = express.Router();
const fossilController = require('../controllers/fossil');

// Endpoint de un fósil específico
router.get('/:id', fossilController.getFossilById);
// Endpoint del catálogo
router.get('/', fossilController.getAllFossils);

module.exports = router;