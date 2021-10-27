require('dotenv').config()
const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile('./dist/index.html');
})

app.listen(PORT);