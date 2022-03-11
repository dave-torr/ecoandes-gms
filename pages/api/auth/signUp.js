
import {database} from "./../../../middleware/dbMiddleware"
import nextConnect from 'next-connect';

const handler = nextConnect();

// New trial for sessions with next-auth package (JWT, bcrypt, & DB)
// Adapted to our use case w/db middleware
// https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

handler.use(database)
handler.post(async (req, res) =>{
    const { name, password } = req.body;
    if (!email || !email.includes('@') || !password) {
        res.status(422).json({ message: 'Invalid Data' });
        return;
    }
    if ((await req.db.collection('users')
        .countDocuments({ email })) > 0) {
        res.status(403).send('The email has already been used.');
    return;
  }

    console.log("One")
  const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "HashedPassword")

  let aUser = { 
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
      }
  const user = await req.db
    .collection('users')
    .insertOne({...aUser})
    user && console.log( user, "User Created")
    res.status(201).json(user)
})

export default handler;