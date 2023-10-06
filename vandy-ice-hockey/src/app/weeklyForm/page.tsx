"use client";

import { useState } from "react";
import styles from "../page.module.css";

export default function RegistrationForm() {
  return (
    <main className={styles.main}>
      <h1>Weekly Form</h1>
      <Form />
    </main>
  );
}

function Form() {
  const [attending, setAttending] = useState("No");
  const [car, setCar] = useState("No");
  const [seats, setSeats] = useState(0);
  const [location, setLocation] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form className={styles.registration} onSubmit={submitHandler}>
      <label className={styles.formLabel}>
        Are you attending practice this week?
      </label>
      <div className={styles.formLabel}>
        <input
          type="radio"
          name="attending"
          value="Yes"
          id="attending"
          checked={attending === "Yes"}
          onChange={(e) => setAttending(e.target.value)}
        />
        <label className={styles.radioLabel} htmlFor="attending">
          Yes
        </label>
      </div>
      <div className={styles.formLabel}>
        <input
          type="radio"
          name="attending"
          value="No"
          id="notAttending"
          checked={attending === "No"}
          onChange={(e) => setAttending(e.target.value)}
        />
        <label className={styles.radioLabel} htmlFor="notAttending">
          No
        </label>
      </div>

      <div>
        <label className={styles.formLabel}>
          Where are you leaving from?
          <select
            className={styles.formInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="commons">Commons</option>
            <option value="ebi">EBI</option>
            <option value="zeppos">Zeppos</option>
            <option value="roth">Roth</option>
            <option value="kissam">Kissam</option>
            <option value="highland">Highland</option>
          </select>
        </label>
      </div>

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
