
console.log('Hello from main.js');

let sse = new EventSource('http://localhost:8080/stream/666');

sse.onmessage = (event) => {
  console.log(event.data);
}

