const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/anagrams', require('./routes/anagram'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/favorites', require('./routes/favorites'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
