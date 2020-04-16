const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');

process
  .on('uncaughtException', error => {
    logger.error(`captured error: ${error.message}`);
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
