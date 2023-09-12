const express = require('express');
const app = express();
const personsRouter = require('./persons/persons.route');

app.use(express.json());

app.use('/api', personsRouter);

module.exports = app;