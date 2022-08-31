const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/ecommerce-imobiliaria'));

app.get('/*', function(req,res) {
  res.sendFile(__dirname + '/dist/ecommerce-imobiliaria/index.html');

});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
