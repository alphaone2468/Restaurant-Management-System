const Table = require('../models/Tables.model');

exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) return res.status(404).json({ message: 'Table not found' });
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTable = async (req, res) => {
    try {
        const table = new Table(req.body);
        const savedTable = await table.save();
        res.status(201).json(savedTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTable = async (req, res) => {
    try {
        const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTable) return res.status(404).json({ message: 'Table not found' });
        res.status(200).json(updatedTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTable = async (req, res) => {
    try {
        const deletedTable = await Table.findByIdAndDelete(req.params.id);
        if (!deletedTable) return res.status(404).json({ message: 'Table not found' });
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
