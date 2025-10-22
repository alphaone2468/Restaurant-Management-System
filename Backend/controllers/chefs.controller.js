const Chef = require('../models/Chefs.model');

exports.getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find().populate('ordersAssigned');
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChefById = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id).populate('ordersAssigned');
        if (!chef) return res.status(404).json({ message: 'Chef not found' });
        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createChef = async (req, res) => {
    try {
        const chef = new Chef(req.body);
        const savedChef = await chef.save();
        res.status(201).json(savedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateChef = async (req, res) => {
    try {
        const updatedChef = await Chef.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedChef) return res.status(404).json({ message: 'Chef not found' });
        res.status(200).json(updatedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteChef = async (req, res) => {
    try {
        const deletedChef = await Chef.findByIdAndDelete(req.params.id);
        if (!deletedChef) return res.status(404).json({ message: 'Chef not found' });
        res.status(200).json({ message: 'Chef deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
