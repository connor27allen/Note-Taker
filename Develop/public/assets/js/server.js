const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

const api_routes = require('./routes/api_routes');

const path = require('path');

app.use(express.json());

app.use(express.static('./public'));

app.use('/api', api_routes);

app.get('*', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  app.listen(PORT, () => {
    console.log('Server started on port', PORT);
  });