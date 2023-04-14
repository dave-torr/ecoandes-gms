
import {connectToDatabase} from "./../../../middleware/dbMiddleware"
import bcrypt from "bcryptjs"

// New trial for sessions with next-auth package (JWT, bcrypt, & DB)
// Adapted to our use case w/db middleware
// https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

async function handler(req, res){
  if(req.method !== 'POST'){
    return
  }
  const reqData= JSON.parse(req.body)
  const { email, password } = reqData;

  if(!email || !email.includes('@') || !password) {
      res.status(422).json({ message: 'Invalid Data' });
      return;
  }

  const client = await connectToDatabase();
  const db = client.db('EcoAndesGMS');
  const existingUser = await db.collection('users').findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let aUser = { 
        name: reqData.name,
        email: reqData.email, 
        password: hashedPassword, 
        company: reqData.company,
        department: reqData.department,
        companyTitle: reqData.companyTitle,
        clientType: reqData.clientType,
        userType: reqData.userType,
        resArray: [],
        signUpStream: reqData.signUpStream,
        active: true
      }

  const user = await db.collection('users')
    .insertOne({...aUser})
    user && console.log( user, "User Created")
    res.status(201).json({ message: 'Created user!' })
    client.close();
}

export default handler;