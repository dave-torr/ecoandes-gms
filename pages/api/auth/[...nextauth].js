import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;



// New trial for sessions with next-auth package (JWT, bcrypt, & DB)
// Adapted to our use case w/db middleware
// https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

export default NextAuth({

    session:{
        jwt: true,
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials){

                // add db handler here, 
                const client = await MongoClient.connect(
                    MONGODB_URI,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                )

                const db = client.db(MONGODB_DB);

                const users = await db.collection('users')
                    .findOne({email:credentials.email})
                if(!users){
                    throw new Error("No user found with email")
                }

                const checkPassword = await compare(credentials.password, users.password)
                if(!checkPassword){
                    throw new Error("Password doesn't match")
                }
                return {email: users.email}
            }
        })
    ]
})