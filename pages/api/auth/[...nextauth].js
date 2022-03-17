import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import {connectToDatabase} from "./../../../middleware/dbMiddleware"
import { MongoCursorInUseError } from 'mongodb';

// https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

export default NextAuth({
    session:{
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
        async authorize(credentials) {

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
                    name: user.name,
                    email: user.email,
                    company: user.company,
                    department: user.department,
                    clientType: user.clientType,
                    userType: user.userType
                    }
            },
        }),
    ],

callbacks:{
    // async jwt({ token, user }){
    //     if(user){
    //         token.user = {
    //                 ...user,
    //                 company: user.company,
    //                 department: user.department,
    //                 clientType: user.clientType,
    //                 userType: user.userType
    //             } 
    //         console.log(token, "@ Token")
    //         return token;
    //         }
    //     },
        
    async session({ session, token, user }){
        console.log(session, "session @ session")
        console.log(token, "token @ session")
        console.log(user, "user @ session")
        return session
    },
}
})