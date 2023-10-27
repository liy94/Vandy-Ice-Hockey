"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "../../utils/formUtils";

export default function RegistrationForm() {
  return (
    <main className={styles.main}>
      <h1>Registration</h1>
      <Form />
    </main>
  );
}

function Form() {
  const router = useRouter();

  //Todo try to fetch their data from the database, if they've filled out the form before
  //fill in with their existing values

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState("Yes");
  const [car, setCar] = useState("No");
  const [seats, setSeats] = useState(0);
  const [location, setLocation] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    createUser(name, email, phone, attendance, location, car === "Yes", seats);
    console.log("form submitted");

    // Redirect user to appropriate page depending on if they are a driver or rider.
    if (car === "Yes") {
      router.push("/driverView");
    } else {
      router.push("/riderView");
    }
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
      
      <label className={styles.formLabel}>Are you coming to practice?</label>
<div className={styles.formLabel}>
  <input
    type="radio"
    name="attendance"
    value="Yes"
    id="yes-attendance"
    checked={attendance === "Yes"}
    onChange={(e) => setAttendance(e.target.value)}
  />
  <label className={styles.radioLabel} htmlFor="yes-attendance">
    Yes
  </label>
</div>
<div className={styles.formLabel}>
  <input
    type="radio"
    name="attendance"
    value="No"
    id="no-attendance"
    checked={attendance === "No"}
    onChange={(e) => {
      setAttendance(e.target.value);
      setCar("No"); // Set car to "No" if attendance is set to "No"
      setLocation(""); // Clear the location if attendance is set to "No"
    }}
  />
  <label className={styles.radioLabel} htmlFor="no-attendance">
    No
  </label>
</div>

{attendance === "Yes" ? (
  <div>
    <label className={styles.formLabel}>
      Where are you leaving from?
      <select
  className={styles.formInput}
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  {['Commons', 'EBI', 'Highland', 'Kissam', 'Roth', 'Zeppos'].map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
    </label>

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
    {/* Only ask how many seats their car has if they selected that they are a driver */}
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
        />
      </div>
    ) : null}
  </div>
) : null}



      <button className={styles.submitButton}>Submit</button>
    </form>
  );
}
