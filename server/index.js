const app = require('express')();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get("/stream", (req,res) => {
  res.setHeader("Content-Type", "text/event-stream");

  let count = 1;
  let intervalId = setInterval(() => {
    res.write("data: " + count + "\n\n");
    count++;
    if(count > 100) {
      clearInterval(intervalId);
      res.end();
    }
  }, 500);
})

app.listen(8080)
console.log('Server running at http://localhost:8080/');