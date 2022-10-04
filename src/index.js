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

function tokenRandom(tamanho) {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < tamanho; i += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}

// GET all speakers
app.get('/talker', (req, res) => {
  const arrSpeakers = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  res.status(200).json(arrSpeakers);
});

// GET one speaker
app.get('/talker/:id', (req, res) => {
  const arrSpeakers = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  const objSpeaker = arrSpeakers.find((speaker) => speaker.id === Number(req.params.id));
  
  if (objSpeaker) return res.status(200).json(objSpeaker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// POST login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  fs.writeFileSync('src/talker.json', JSON.stringify({ email, password }));

  const token = tokenRandom(16);
  return res.status(200).json({ token });
});

// END

app.listen(PORT, () => {
  console.log('Online');
});
