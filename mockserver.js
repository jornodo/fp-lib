const express = require('express');
const app = express();
const port = 3000;

app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  console.log(`GET /people/${id}`);
  res.json({ message: `Resource ${id}`, id });
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});