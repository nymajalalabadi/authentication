import Link from 'next/link';
import classes from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/react';

export default function MainNavigation() {
  const { data: session, status } = useSession();

  

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status === 'unauthenticated' && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && status === 'authenticated' && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && status === 'authenticated' && (
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
