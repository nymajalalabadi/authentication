"use client";

import classes from './user-profile.module.css';
import ProfileForm from './profile-form';
import { useSession, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  // Redirect away if NOT auth
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth');
      }else{
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}