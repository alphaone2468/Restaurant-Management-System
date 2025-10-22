const express = require('express');
const router = express.Router();
const { getAllTables, getTableById, createTable, updateTable, deleteTable } = require('../controllers/tables.controllers');

router.get('/', getAllTables);
router.get('/:id', getTableById);
router.post('/', createTable);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);

module.exports = router;
