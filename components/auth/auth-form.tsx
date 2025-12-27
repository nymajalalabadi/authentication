"use client";

import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

async function createUser(email: string, password: string) {
  const result = await fetch('/api/auth/singup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  
  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;



    if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password,
        });

        if (!result?.error) {
          // set session cookie
          router.push('/profile');
        }
        console.log(result);
      } 
    else {
      try {
        const data = await createUser(email, password);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}