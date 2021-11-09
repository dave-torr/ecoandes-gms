import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

export function sessionMiddleware(req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });

  return session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
  })(req, res, next);
}