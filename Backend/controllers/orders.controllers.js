const Order = require('../models/Orders.model');
const Table = require('../models/Tables.model');
const Chef = require('../models/Chefs.model');

exports.getAllOrders = async (req, res) => {
    try {
        let orders = await Order.find().populate('items.itemId').lean();
        const tables = await Table.find().lean();
        const tableIds = tables.map((table) => table._id.toString());
        console.log(tableIds);
        orders = orders.map(order => {
            if(order.orderType === "Dine In"){
                const tableNumber = tableIds.indexOf(order.tableId.toString());
                console.log("🚀 ~ tableNumber:", tableNumber);
                return {...order, tableNumber: tableNumber+1 };
            }
            return order;
        })
        

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.itemId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        if(!req.body.orderType){
            return res.status(400).json({ message: 'Order type is required' });
        }
        if(!req.body.items || (req.body.items && req.body.items.length === 0)){
            return res.status(400).json({ message: 'At least one item is required' });
        }
        if(!req.body.orderedBy){
            return res.status(400).json({ message: 'Ordered by is required' });
        }
        if(!req.body.capacity){
            return res.status(400).json({ message: 'Capacity is required' });
        }

        // let tableId = '68f920c417e88d4f4d175ca2';

        const table = await Table.findOne({avaliableSeats: {$gte : req.body.capacity } });
        if(!table){
            return res.status(400).json({ message: 'No table available for the given capacity' });
        }
        table.avaliableSeats -= req.body.capacity;
        await table.save();

        const ordersCount = await Order.find({});

        const data = {
            orderNumber: ordersCount.length + 101,
            orderType: req.body.orderType,
            items: req.body.items,
            tableId: table._id,
            orderedBy: req.body.orderedBy,
            cookingInstructions: (req.body.cookingInstructions) ? req.body.cookingInstructions : "",
        }

        const order = new Order(data);
        const savedOrder = await order.save();

        const chefs = await Chef.find({}).lean();

        chefs.sort((a,b)=>a.ordersAssigned.length-b.ordersAssigned.length);

        await Chef.updateOne({_id: chefs[0]._id}, {$push: {ordersAssigned: savedOrder._id}});



        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
