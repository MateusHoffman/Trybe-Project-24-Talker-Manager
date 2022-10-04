const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');
const { validateAuthentication } = require('./middlewares/validateAuthentication');
const { validateName } = require('./middlewares/validateName');
const { validateAge } = require('./middlewares/validateAge');
const { validateTalk } = require('./middlewares/validateTalk');

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
app.get('/talker', (req, res) => {
  const arrTalkers = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  res.status(200).json(arrTalkers);
});

// GET one talker
app.get('/talker/:id', (req, res) => {
  const arrTalkers = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  const objTalker = arrTalkers.find((talker) => talker.id === Number(req.params.id));
  
  if (objTalker) return res.status(200).json(objTalker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// POST /login
app.post('/login', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

// POST /talker
app.post('/talker',
  validateAuthentication, validateName, validateAge, validateTalk,
  (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(fs.readFileSync('src/talker.json'));

  const addNewTalker = { id: talkers.length + 1, name, age, talk };

  talkers.push(addNewTalker);
  fs.writeFileSync('src/talker.json', JSON.stringify(talkers));
  res.status(201).json(addNewTalker);
});

// PUT /talker/:id
app.put('/talker/:id',
  validateAuthentication,
  validateName, validateAge, validateTalk,
  (req, res) => {
  const id = Number(req.params.id);
  const talkers = JSON.parse(fs.readFileSync('src/talker.json'));
  
  talkers.filter((e) => e.id !== id);
  const update = { id, ...req.body };

  talkers.push(update);
  fs.writeFileSync('src/talker.json', JSON.stringify(talkers));

  console.log(talkers);
  res.status(200).json(update);
});

// END

app.listen(PORT, () => {
  console.log('Online');
});
