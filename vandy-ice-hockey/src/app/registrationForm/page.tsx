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
  const [car, setCar] = useState("No");
  const [seats, setSeats] = useState(0);

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
      <label className={styles.formLabel}>Do you have a car?</label>
      <div className={styles.formLabel}>
        <input
          type="radio"
          name="car"
          value="Yes"
          id="yes"
          checked={car === "Yes"}
          onChange={(e) => setCar(e.target.value)}
        />
        <label className={styles.radioLabel} htmlFor="yes">
          Yes
        </label>
      </div>
      <div className={styles.formLabel}>
        <input
          type="radio"
          name="car"
          value="No"
          id="no"
          checked={car === "No"}
          onChange={(e) => setCar(e.target.value)}
        />
        <label className={styles.radioLabel} htmlFor="no">
          No
        </label>
      </div>
      {car === "Yes" ? (
        <div>
          <label className={styles.formLabel}>
            How many passengers can you bring?
          </label>
          <input
            className={styles.formInput}
            type="number"
            required
            value={seats}
            onChange={(e) => setSeats(e.target.valueAsNumber)}
          ></input>
        </div>
      ) : (
        <div></div>
      )}
      <button className={styles.submitButton}>Submit</button>
    </form>
  );
}
