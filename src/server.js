const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const mongoose = require('mongoose');
process
  .on('uncaughtException', error => {
    logger.error(`captured error: ${error.message}`);
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  });


const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("We're connected!");
    await db.dropDatabase();
    cb();
  });
};

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
