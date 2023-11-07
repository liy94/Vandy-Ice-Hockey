"use client"; 
import styles from "./page.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h2>Vanderbilt Ice Hockey Carpool</h2>
      </div>

      {/* Check if the user is logged in */}
      {session ? (
        <>
          {session.user ? (
      <Link
      href="/registrationForm"
      className={styles.card}
      target="_self"
      rel="noopener noreferrer"
    >
      <h2>Login <span>-&gt;</span></h2>
      <p>Login or register here</p>
    </Link>
          ) : null}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <button className={ styles.submitButton } onClick={() => signIn('google')}>Sign in with Google</button>
        </>
      )}
    </main>
  );
}
