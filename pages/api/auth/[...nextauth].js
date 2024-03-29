import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import {connectToDatabase} from "./../../../middleware/dbMiddleware"

// https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

export default NextAuth({
    session:{
        // defines sesh to be stored as JWT.
        strategy: "jwt"
    },
    providers: [
        // self hosted auth, with mongodb lookup & hashing/unhashing of passwords.
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
            return {...user}
            },
        }),
    ],

//////////////////////////
//////////////////////////
// passing on user object to session:
//////////////////////////

    callbacks:{
        async jwt({ token, user }) {
            if (user) {
            token.department = user.department
            token.profilePic = user.profilePic
            token.hierarchy = user.hierarchy
            token.companyTitle = user.companyTitle
            token.userType = user.userType
            token.phono = user.phono
            }
            return token
        },
        async session({ session, token }) {
            // if other elems of user Data are needed on front end add them here
            if( token ){
                session.user = {
                    ...session.user,
                    "profilePic": token.profilePic,
                    "userType": token.userType,
                    "hierarchy": token.hierarchy,
                    "department": token.department,
                    "companyTitle": token.companyTitle,
                    "phono": token.phono,
                }
            return session  
            }
        }
    },
////////////////////////////////
////////////////////////////////
})