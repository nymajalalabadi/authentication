import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
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
                return { email: user.email, id: user._id.toString() };
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
