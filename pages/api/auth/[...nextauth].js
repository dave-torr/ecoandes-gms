import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import {connectToDatabase} from "./../../../middleware/dbMiddleware"

// New trial for sessions with next-auth package (JWT, bcrypt, & DB)
// https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

export default NextAuth({
    session:{
        jwt: true,
    },
    providers: [
        CredentialsProvider({
        async authorize(credentials, req) {

            console.log(credentials, "credentials")
            const client = await connectToDatabase();

            const usersCollection = client.db("EcoAndesGMS").collection('users');

            const user = await usersCollection.findOne({
            email: credentials.email,
            });

            if (!user) {
            client.close();
            throw new Error('No user found!');
            }

            const isValid = await compare(
            credentials.password,
            user.password
            );

            if (!isValid) {
            client.close();
            throw new Error('Could not log you in!');
            }

            client.close();
            return { 
                email: user.email 
                
                };
        },
        }),
    ],







    // providers:[
    //     CredentialsProvider({
    //         async authorize(credentials, req){
    //             console.log("cucu")

    //             const client = await connectToDatabase()
    //             const db = client.db('v');
    //             const users = await db.collection('users').findOne({email: credentials.email})
    //             if(!users){
    //                 throw new Error("No user found with email")
    //             }

    //             const checkPassword = await compare(credentials.password, users.password)
    //             if(!checkPassword){
    //                 throw new Error("Password doesn't match")
    //             }
    //             return {email: users.email}
    //         }
    //     })
    // ]
})