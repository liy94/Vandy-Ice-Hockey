"use client"; 

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import LoginButton from "./google/login";
import LogoutButton from "./google/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "884218967366-bdp7ovau82hdbati7a3kfanock9amqak.apps.googleusercontent.com";

export default function Login() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });

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

      <div className="GoogleLogIn">
        <LoginButton />
        <LogoutButton/>
      </div>
    </main>
  );
}
