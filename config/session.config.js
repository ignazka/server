const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MONGODB_URL, NODE_ENV, SESSION_SECRET } = process.env;

function sessionConfig(app) {
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: MONGODB_URL,
      }),
      cookie: {
        maxAge: 1000 * 24 * 60 * 60 * 365,
        sameSite: false,
        secure: NODE_ENV === 'production',
      },
    })
  );
}

module.exports = sessionConfig;
