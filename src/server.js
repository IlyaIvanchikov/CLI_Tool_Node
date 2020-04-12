const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

