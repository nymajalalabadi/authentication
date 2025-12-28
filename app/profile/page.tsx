"use client";

import UserProfile from '@/components/profile/user-profile';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return <UserProfile />;
}