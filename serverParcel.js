// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

const STATIC = path.resolve(__dirname, 'build');
const INDEX = path.resolve(STATIC, 'app.html');

const app = express();

app.use(express.static(STATIC));

app.get('*', (req, res) => {
  res.sendFile(INDEX);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
