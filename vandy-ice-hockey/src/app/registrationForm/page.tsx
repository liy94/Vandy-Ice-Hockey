"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import "../loadingPage/loading.css";
import { useRouter } from "next/navigation";
import { User } from "../../types/User";
import { useSession } from "next-auth/react";
import { fetchUserWithStatus } from "../../utils/apiUtils";
import Link from "next/link"; // Import Link from Next.js
import vandyLogo from "../img/logo.png";
import Image from "next/image";
import { createOrUpdateUser } from "../../utils/registrationFormUtils";
import { signOut } from "next-auth/react";
import runAlgorithm from "@/utils/carpoolManager";

interface preloadedUser {
  preloaded: User;
}

export default function RegistrationForm() {
  const [userInfo, setData] = useState<User>({
    name: "",
    phone: "",
    email: "",
    attendance: "Yes",
    hasCar: "No",
    numberOfSeats: 0,
    location: "Commons",
    driver: "",
    riders: [],
  });
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (status === "authenticated") {
      const userEmail = session?.user?.email ? session?.user.email : "";
      fetchUserWithStatus(userEmail).then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
        //console.log(response.data);
      });
    }
  }, [status, session]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image src={vandyLogo} alt="Logo" className={styles.vandyLogo} />
        <div className={styles.titleHeader}>
        <h1>Vandy Ice Hockey</h1>
        <h1>Carpool</h1>

        </div>
        <div className={styles.links}>
              <div className={styles.linkCardGrid}>
          <Link
            href="/loadingPage"
            className={styles.linkCard} // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            Home
          </Link>

          <Link
            href="/responsesView"
            className={styles.linkCard} // Use the new class
           target="_self"
            rel="noopener noreferrer"
          >
            All Responses
          </Link>

          <Link
            href="/registrationForm"
            className={styles.linkCard} // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            Update Profile
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={styles.linkCard} // Use the new class
          >
            Sign Out
          </button>
        </div>
        </div>
      </div>

      <h1>Profile</h1>
      <Form preloaded={userInfo} />
    </main>
  );
}

const Form: React.FC<preloadedUser> = ({ preloaded }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState("Yes");
  const [car, setCar] = useState("No");
  const [seats, setSeats] = useState(0);
  const [location, setLocation] = useState("Commons");

  useEffect(() => {
    setName(preloaded.name);
    setEmail(preloaded.email);
    setPhone(preloaded.phone);
    setAttendance(preloaded.attendance);
    setCar(preloaded.hasCar);
    setSeats(preloaded.numberOfSeats);
    setLocation(preloaded.location);
  }, [preloaded]);

  const submitHandler = async (e: any) => {
    const newUser: User = {
      name: name,
      email: email,
      phone: phone,
      attendance: attendance,
      hasCar: car,
      numberOfSeats: seats,
      location: location,
      driver: "",
      riders: [],
    };
    e.preventDefault();
    runAlgorithm();
    await createOrUpdateUser(newUser);
    console.log("form submitted");

    // Redirect user to appropriate page depending on if they are a driver or rider or not going .
    router.push("/loadingPage");
  };

  const getComingWednesday = () => {
    const today = new Date();
    const todayDayOfWeek = today.getDay();
    const daysUntilWednesday = (3 - todayDayOfWeek + 7) % 7;
    const nextWednesday = new Date(today);
    nextWednesday.setDate(today.getDate() + daysUntilWednesday);
    return nextWednesday.toLocaleDateString(); // Format date as a string
  };

  const nextPracticeDate = getComingWednesday();

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

      <label className={styles.formLabel}>
        Attending practice on {nextPracticeDate}?
      </label>
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
              {["Commons", "EBI", "Highland", "Kissam", "Roth", "Zeppos"].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
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
};