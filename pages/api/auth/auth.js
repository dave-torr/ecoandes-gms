import nextConnect from 'next-connect';
import authMidWare from '../../../middleware/userAuthMiddleware';
import { extractUser } from '../../../utils/auth/userHelper';
import passport from "./../../../utils/auth/passport"

const handler = nextConnect()
handler.use(authMidWare)

// backa nd forth from front end to DB and session.
handler.get(async (req, res) => {
    res.json({ user: extractUser(req) })
});


handler.post(passport.authenticate('local'), (req, res) => {
  // return authenticated user object
  res.json({ user: extractUser(req.user) });
})

// Log out
handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;