const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`); // eslint-disable-line no-console
});
