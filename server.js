// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

const STATIC = path.resolve(__dirname, 'build');
const INDEX = path.resolve(STATIC, 'index.html');

const app = express();
app.use(bodyParser.json());

app.use(express.static(STATIC));

app.get('*', (req, res) => {
  res.sendFile(INDEX);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
