import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import {connectToDatabase} from "./../../../middleware/dbMiddleware"

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
            // console.log(user, "user @ Authorizxe provider")
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
            return {...user}
            },
        }),
    ],

callbacks:{

    async jwt({ token, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (user) {
        token.userType = user.userType
        }
        return token
    },
    async session({ session, token }) {

        if( token ){
            session.user = {
                ...session.user,
                "userType": token.userType
            }
            console.log(session, "Session @ token")
            console.log(token, "token @ token")
        return session  
        }
    }
},

})


// new user call when user doesn't exist!!!