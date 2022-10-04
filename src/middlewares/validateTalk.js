function validateWatchedAt(req, res) {
  const { talk } = req.body;
  if (talk.watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(talk.watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function validateRate(req, res) {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!([1, 2, 3, 4, 5].includes(talk.rate))) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (talk === undefined) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  validateWatchedAt(req, res);
  validateRate(req, res);
  next();
}

module.exports = { validateTalk };