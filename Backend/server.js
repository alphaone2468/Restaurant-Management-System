require('dotenv').config({ path: './Backend/.env' });
require('./config/db');

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const chefsRoutes = require('./routes/chefs.routes');
const clientsRoutes = require('./routes/clients.routes');
const itemsRoutes = require('./routes/items.routes');
const ordersRoutes = require('./routes/orders.routes');
const tablesRoutes = require('./routes/tables.routes');

app.use('/api/chefs', chefsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/tables', tablesRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
