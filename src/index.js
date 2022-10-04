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
  const arrSpeakers = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  res.status(200).json(arrSpeakers);
});

// GET one speaker
app.get('/talker/:id', async (req, res) => {
  const arrSpeakers = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  const objSpeaker = arrSpeakers.find((speaker) => speaker.id === Number(req.params.id));
  
  if (objSpeaker) return res.status(200).json(objSpeaker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// END

app.listen(PORT, () => {
  console.log('Online');
});
