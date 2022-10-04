const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funciona
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// START

// GET all speakers
app.get('/talker', async (req, res) => {
  const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  res.status(200).json(data);
});

// GET all speakers
app.get('/talker', async (req, res) => {
  const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  res.status(200).json(data);
});

// END

app.listen(PORT, () => {
  console.log('Online');
});
