"use client";

import { useState } from "react";
import styles from "../page.module.css";

export default function RegistrationForm() {
  return (
    <main className={styles.main}>
      <h1>Registration</h1>
      <Form />
    </main>
  );
}

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form className={styles.registration} onSubmit={submitHandler}>
      <label className={styles.formLabel}>Name:</label>
      <input
        className={styles.formInput}
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label className={styles.formLabel}>Email:</label>
      <input
        className={styles.formInput}
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label className={styles.formLabel}>Phone:</label>
      <input
        className={styles.formInput}
        type="text"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      ></input>
      <button className={styles.submitButton}>Submit</button>
    </form>
  );
}
