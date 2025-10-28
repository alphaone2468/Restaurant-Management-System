const Client = require('../models/Clients.model');

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createClient = async (req, res) => {
    try {

        if(!req.body.name){
            return  res.status(400).json({ message: 'Name is required' });
        }
        if(!req.body.contact){
            return  res.status(400).json({ message: 'Contact is required' });
        }
        if(!req.body.address){
            return  res.status(400).json({ message: 'Address is required' });
        }
        
        const client = await Client.findOne({ contact: req.body.contact });
        // console.log("Existing Client:", client);
        if (client) {
            return res.status(200).json({ client:client });
        } else {
            // console.log(req.body);
            const client = new Client(req.body);
            const savedClient = await client.save();
            return res.status(201).json({client:savedClient});
        }
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
