// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const app = express();
const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.static(`${__dirname}/build`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
