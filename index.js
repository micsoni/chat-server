const express = require("express");
const Sse = require("json-sse");
const cors = require("cors");
const app = express();

port = 4000;

const db = {};
db.messages = [];

const corsMiddleware = cors();
const parser = express.json();

const stream = new Sse();

app.use(corsMiddleware);
app.use(parser);

app.get("/stream", (request, response) => {
  stream.updateInit(db.messages);
  stream.init(request, response);
  console.log("hello");
});

app.post("/message", (request, response) => {
  const { text } = request.body;

  db.messages.push(text);

  response.send(text);

  stream.send(text);
  console.log(db);
});

app.listen(port, () => console.log(`Listening on ${port}`));
