import { connectToDatabase } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !email.includes('@') || !password || password.trim() === '') 
    {
        return res.status(422).json({ message: 'Invalid input - email or password is missing.' });
    }

    if (password.trim().length < 7) {
        return res.status(422).json({ message: 'Invalid input - password should be at least 7 characters long.' });
    }

    const client = await connectToDatabase();
    const db = client.db('authentication');

    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
        res.status(422).json({ message: 'User already exists.' });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({ email: email, password: hashedPassword });

    res.status(201).json({ message: 'Signed up successfully', userId: result.insertedId });
    client.close();
  }
  res.status(200).json({ message: 'Signup successful' });
}
