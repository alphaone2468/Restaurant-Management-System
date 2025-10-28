const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: '.env' });
require('./config/db');

const chefsRoutes = require('./routes/chefs.routes');
const clientsRoutes = require('./routes/clients.routes');
const itemsRoutes = require('./routes/items.routes');
const ordersRoutes = require('./routes/orders.routes');
const tablesRoutes = require('./routes/tables.routes');
const Chefs = require('./models/Chefs.model');
const Clients = require('./models/Clients.model');
const Orders = require('./models/Orders.model')

app.use(cors());
app.use(express.json());

app.use('/api/chefs', chefsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/tables', tablesRoutes);


app.get("/api/analytics", async (req, res) => {
  try {
    
    const orders = await Orders.find().populate("items.itemId");

    const totalRevenue = orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((sum, item) => {
        const price = item.itemId?.price || 0;
        return sum + price * item.quantity;
      }, 0);
      return total + orderTotal;
    }, 0);

    const data = {
      totalChefs: await Chefs.countDocuments(),
      totalRevenue,
      totalOrders: orders.length,
      totalClients: await Clients.countDocuments(),
    };

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error in analytics" });
  }
});


app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
