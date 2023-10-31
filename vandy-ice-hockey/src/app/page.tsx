"use client"; 

import styles from "./page.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h2>Vanderbilt Ice Hockey Carpool</h2>
      </div>

      {/* todo if first time logging in direct to registration form, else go to home page */}
      <Link
        href="/registrationForm"
        className={styles.card}
        target="_self"
        rel="noopener noreferrer"
      >
        <h2>
          Login <span>-&gt;</span>
        </h2>
        <p>Login or register here</p>
      </Link>
    </main>
  );
}
