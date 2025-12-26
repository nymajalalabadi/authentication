import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from '@/lib/db';

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const db = client.db('authentication');

                const user = await db.collection('users').findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found');
                }

                const passwordsMatch = await verifyPassword(credentials.password, user.password);
                if (!passwordsMatch) {
                    client.close();
                    throw new Error('Invalid password');
                }
                
                client.close();
                return {email: user.email};
            },
        }),
    ],
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        error: '/auth',
        verifyRequest: '/auth',
        newUser: '/auth',
    },
    secret: process.env.NEXTAUTH_SECRET,
}); 