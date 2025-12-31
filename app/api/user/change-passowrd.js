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

  const email = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const db = client.db('authentication');

  const user = await db.collection('users').findOne({ email: email });

  if (!user) {
    client.close();
    return res.status(404).json({ message: 'User not found' });
  }

  const passwordsMatch = await verifyPassword(oldPassword, user.password);
  
  if (!passwordsMatch) {
    client.close();
    return res.status(403).json({ message: 'Invalid password' });
  }

  const hashedPassword = await hashPassword(newPassword);

  await db.collection('users').updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated successfully' });
}