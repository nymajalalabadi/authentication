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

  async function onChangePassword(data: { newPassword: string, oldPassword: string }) {
    const result = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resultData = await result.json();
    console.log(resultData);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={onChangePassword} />
    </section>
  );
}