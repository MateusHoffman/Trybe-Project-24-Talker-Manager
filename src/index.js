const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funciona
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// START

// Function to generate token
function tokenRandom(size) {
  let token = '';
  const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i += 1) {
      token += character.charAt(Math.floor(Math.random() * character.length));
  }
  return token;
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
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;
  fs.writeFileSync('src/talker.json', JSON.stringify({ email, password }));

  const token = tokenRandom(16);
  return res.status(200).json({ token });
});

// END

app.listen(PORT, () => {
  console.log('Online');
});
