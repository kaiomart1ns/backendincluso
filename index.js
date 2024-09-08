// index.js
const express = require('express');
const bodyParser = require('body-parser');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', eventoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
