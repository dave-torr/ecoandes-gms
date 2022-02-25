import bcrypt from 'bcryptjs';

import nextConnect from 'next-connect';

import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { extractUser } from '../../../utils/auth/userHelper';

import authMidWare from '../../../middleware/userAuthMiddleware';

const handler = nextConnect();

handler.use(authMidWare); 

// CREATE USER IN DB INSTANCE + LOG IN
handler.post(async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email); 
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  if (!password || !name) {
    res.status(400).send('Missing field(s)');
    return;
  }
  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await req.db
    .collection('users')
    .insertOne({ 
        name,
        email, 
        password: hashedPassword, 
        company: req.body.company,
        department: req.body.department,
        companyTitle: req.body.companyTitle,
        clientType: req.body.clientType,
        userType: req.body.userType,
        resArray: [],
        signUpStream: req.body.signUpStream,
      },
      function (error, response){
        if(error){
          console.log("some Error man")
        } else {
          console.log('inserted record', response)
        }
      }
      )


    // update to mongodb does not return document after insertion, need to query it from db, to auth and login
    
    // .then(({ ops }) => ops[0] );


    req.login(user, (err) => {
      if (err) throw err;
    res.status(201).json({
      user: extractUser(user),
    });
  });

});

export default handler;