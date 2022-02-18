const app = require('express')();
const { connectDB, middlewares, sessionConfig } = require('./config');
const authRouter = require('./modules/auth');
const nutritionRouter = require('./modules/nutrition');
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
<<<<<<< HEAD
    nutritionRouter(app);
=======
    filesRouter(app);
>>>>>>> 3219e3a791e31c2e4ead674d506b35d9c81fe68a

    app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`));
  } catch (error) {
    console.error(`Error while trying to start the Server: ${error.message}`);
  }
}

module.exports = start;
