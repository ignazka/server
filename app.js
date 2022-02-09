const app = require('express')();
const { connectDB, middlewares, sessionConfig } = require('./config');
const authRouter = require('./modules/auth');
const taskRouter = require('./modules/task');
const filesRouter = require('./modules/files');
const { PORT } = process.env;

async function start() {
  try {
    await connectDB();
    middlewares(app);
    sessionConfig(app);
    authRouter(app);
    taskRouter(app);
    filesRouter(app);

    app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`));
  } catch (error) {
    console.error(`Error while trying to start the Server: ${error.message}`);
  }
}

module.exports = start;
