"use client";

import { useState, useEffect } from "react";
import "./rider.css"; // Import the CSS file with the styles
import "../loadingPage/loading.css";
import Link from "next/link";
import images from "../imageLoader";
import Image from "next/image";
import logo from "../img/logo.png";
import { User } from "../../types/User";
import { fetchUserWithStatus } from "../../utils/apiUtils";
import { useSession, signOut } from "next-auth/react";

// Define a React functional component named App
const App: React.FC = () => {
  const [driver, setDriver] = useState<User[]>([
    {
      name: "",
      phone: "",
      email: "",
      attendance: "Yes",
      hasCar: "No",
      numberOfSeats: 0,
      location: "Commons",
      driver: "",
      riders: [],
    },
  ]);
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
          //console.log(response.data);
          fetchUserWithStatus(response.data.driver).then((response) => {
            if (response.status === 200) {
              setDriver([response.data]);
            }
          });
        }
        // console.log(users)
      });
    }
  }, [status, session]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  //TODO change to const once test entries in database reset
  let location = userInfo.location;
  let mapSearchText = "Vanderbilt Nashville TN";
  

  // Define the selected image based on the location
let selectedImage;
if (location === "Kissam") {
  selectedImage = images.kissam;
  mapSearchText = "Kissam Vanderbilt Nashville TN";
} else if (location === "Commons") {
  selectedImage = images.commons;
  mapSearchText = "Hank Ingram House Vanderbilt Nashville TN";
} else if (location === "EBI") {
  selectedImage = images.ebi;
  mapSearchText = "E. Bronson Ingram College Vanderbilt Nashville TN";
} else if (location === "Highland") {
  selectedImage = images.highland;
  mapSearchText = "Morgan House Vanderbilt Nashville TN";
} else if (location === "Zeppos") {
  selectedImage = images.zeppos;
  mapSearchText = "Zeppos Vanderbilt Nashville TN";
}
  //TODO delete this case once test entries in database reset, fixed issue with no default value for location
  else if (location === "") {
    selectedImage = images.commons;
    location = "Commons";
  }

  return (
    <div className="app">
      <div className="header">
        <Image src={logo} alt="Logo" className="logo" />
        <div className="title-container">
        <h1>Vandy Ice Hockey</h1>
        <h1>Carpool</h1>
        </div>

        <div className="links">
        <div className="link-card-grid">

          <Link
            href="/loadingPage"
            className="card" // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            Home
          </Link>

          <Link
            href="/responsesView"
            className="card" // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            All Responses
          </Link>

          <Link
            href="/registrationForm"
            className="card" // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            Update Profile
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="card"
          >
            Sign Out
          </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="left-half">
          {/* User information content */}
          <h2> Here is your pick up information at {location}</h2>
          <h3>Look for {driver[0].name}</h3>
          <p>
            Your driver is {driver[0].name} and you can contact them at{" "}
            {driver[0].phone}
          </p>
        </div>
        <div className="right-half">
          <div className="map-container">
            <h3>{location}</h3>
            {/* link to google maps website with the correct location inputted  */}
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(
                mapSearchText
              )}`}
              target="_blank"
            >
              <Image
                src={`${selectedImage}`}
                alt={`not found: ${location}`}
                width={500}
                height={500}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
