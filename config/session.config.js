const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MONGODB_URL, NODE_ENV, SESSION_SECRET } = process.env;

function sessionConfig(app) {
  const isProduction = NODE_ENV === 'production';
  const sameSite = isProduction ? 'none' : 'lax';

  app.set('trust proxy', 1);
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URL,
      }),
      cookie: {
        maxAge: 1000 * 24 * 60 * 60 * 365,
        sameSite: sameSite,
        secure: isProduction,
      },
    })
  );
}

module.exports = sessionConfig;
