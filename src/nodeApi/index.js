const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Banco de Dados conectado com sucesso!');
}, error => {
  console.log('Erro de Banco de Dados: ' + error);
});

const applicantRoute = require('./routes/applicant.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cors());

// Diretório estático
app.use(express.static(path.join(__dirname, '../dist/easyTalents')));

// API root
app.use('/api', applicantRoute)

// porta
const port = process.env.port || 3000;
app.listen(port, ()=>{
  console.log('Escutando a porta: ' + port);
});

// rota base
app.get('/', (req, res) => {
  res.send('Destino inválido');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/easyTalents/index.html'));
});


// 404 Handler
app.use((req, res, next) => {
  // next(createError(404));
  res.send('404: Page not Found', 404);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

 