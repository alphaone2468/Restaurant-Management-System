const express = require('express');
const router = express.Router();
const { getAllChefs, getChefById, createChef, updateChef, deleteChef } = require('../controllers/chefs.controller');

router.get('/', getAllChefs);
router.get('/:id', getChefById);
router.post('/', createChef);
router.put('/:id', updateChef);
router.delete('/:id', deleteChef);

module.exports = router;
