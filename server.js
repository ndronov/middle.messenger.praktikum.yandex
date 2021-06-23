const express = require('express');

const app = express();
const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.static(__dirname + '/build'));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
