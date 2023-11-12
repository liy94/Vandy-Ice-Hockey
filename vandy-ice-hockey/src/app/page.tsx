"use client"; 
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is logged in, redirect to the loadingPage
    if (session) {
      router.push('/loadingPage');
    }
  }, [session]);

  // If the user is not logged in, show the sign in button
  if (!session) {
    return (
      <main className={styles.main}>
        <div className={styles.title}>
          <h2>Vanderbilt Ice Hockey Carpool</h2>
        </div>
        <button className={styles.submitButton} onClick={() => signIn('google')}>
          Sign in with Google
        </button>
      </main>
    );
  }

  // While checking the session status, you can render a loading indicator or return null
  return null;
}
