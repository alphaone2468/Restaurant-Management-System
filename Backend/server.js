const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express server running on port 5000' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
