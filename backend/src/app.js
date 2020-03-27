const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');

const routes = require('./routes');

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
