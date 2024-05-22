const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware para analisar o corpo da solicitação JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Array de códigos
let codes = ['1A', '1B', '1C', '1D'];

// Iterar sobre os códigos para criar um endpoint para cada um
codes.forEach(code => {
  createSSEEndpoint(code);
});

// Função para criar um endpoint SSE
function createSSEEndpoint(code) {
  app.get(`/stream/${code}`, (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");

    let count = 1;
    let intervalId = setInterval(() => {
      // Aqui você pode enviar informações diferentes para cada código
      res.write(`data: ${code} - ${count}\n\n`);
      count++;
      if(count > 100) {
        clearInterval(intervalId);
        res.end();
      }
    }, 500);
  });
}

// Endpoint para adicionar um novo código
app.post('/addCode', (req, res) => {
  const newCode = req.body.code;
  codes.push(newCode);
  createSSEEndpoint(newCode);
  res.send(`Code ${newCode} added successfully.`);
});

app.listen(8080)
console.log('Server running at http://localhost:8080/');