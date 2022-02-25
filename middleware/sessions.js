import session from 'express-session';
import MongoStore from 'connect-mongo';

// const MongoStore = connectMongo(session);

export function sessionMiddleware(req, res, next) {
  // const mongoStore = new MongoStore({
  //   client: req.dbClient,
  //   stringify: false,
  // });

  return session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      client: req.dbClient,
      stringify: false,
    }),
    resave: false,
    saveUninitialized: false,
  })(req, res, next);
}