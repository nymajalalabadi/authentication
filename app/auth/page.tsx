"use client";

import AuthForm from '@/components/auth/auth-form';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [status, router]);

  // Show loading while checking authentication status
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // If not authenticated, show the auth form
  return <AuthForm />;
}