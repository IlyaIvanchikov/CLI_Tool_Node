const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const mongoose = require('mongoose');
const User = require('./resources/users/user.model');
process
  .on('uncaughtException', error => {
    logger.error(`captured error: ${error.message}`);
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  });

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'user_login2', password: 'pass' })
];

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
    users.forEach(user => user.save());
    cb();
  });
};

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
