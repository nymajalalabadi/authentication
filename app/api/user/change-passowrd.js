import { connectToDatabase } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { getSession } from 'next-auth/react';

export async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const { oldPassword, newPassword } = await req.json();

  const client = await connectToDatabase();
  const db = client.db('authentication');

  const user = await db.collection('users').findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const passwordsMatch = await verifyPassword(oldPassword, user.password);
  if (!passwordsMatch) {
    return res.status(403).json({ message: 'Invalid password' });
  }

  const hashedPassword = await hashPassword(newPassword);
  await db.collection('users').updateOne(
    { email: session.user.email },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated successfully' });
}