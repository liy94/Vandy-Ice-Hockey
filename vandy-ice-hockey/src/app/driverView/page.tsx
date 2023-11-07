"use client";

import { useState, useEffect } from "react";
import "./driver.css"; // Import the CSS file with the styles
import Link from "next/link";
import images from "../imageLoader";
import Image from "next/image";
import { User } from "../../types/User";
import { fetchUserWithStatus } from  "../../utils/apiUtils";
import { fetchAndAdd } from "../../utils/driverViewUtils";
// Define a React functional component named App
const App: React.FC = () => {
  // Define user information (will fetch from database)
  // const users = [
  //   {
  //     name: "User 1",
  //     phone: "111-111-1111",
  //     email: "ex@gmail.com",
  //   },
  //   {
  //     name: "User 2",
  //     phone: "111-111-1111",
  //     email: "ex@gmail.com",
  //   },
  //   {
  //     name: "User 3",
  //     phone: "222-222-2222",
  //     email: "ex@gmail.com",
  //   },
  // ];
  const [riderEmails, setRiderEmails] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])
  const userEmail = "jane.doe@example.com" // TODO: get this from session storage
  useEffect(() => {
    const fetchRiderEmails = async () => {
      fetchUserWithStatus(userEmail).then((response : any) => { 
        if (response.status === 200) {
          setRiderEmails(response.data.riders);
        }
        else {
          console.error('failed to fetch RiderIds')
        }
      });
    }
    fetchRiderEmails();
  }, []);

  useEffect(() => {
    if (riderEmails.length === 0) {
      return;
    }
    const fetchRiders = async () => {
      const riderFetchPromises = riderEmails.map(async (riderEmail) => {
        const response = await fetchUserWithStatus(riderEmail);
        const rider : User = await response.data;
        return rider;
      })

      const riders = await Promise.all(riderFetchPromises);
      setUsers(riders);
    }
    fetchRiders();
  }, [riderEmails]);

  const locations = ["commons", "kissam"]; // Get this from the backend
  const location = locations[1]; // Temporary array to get rid of comparison error

  // Define the selected image based on the location
  let selectedImage;
  if (location === "kissam") {
    selectedImage = images.kissam;
  } else if (location === "commons") {
    selectedImage = images.commons;
  } else if (location == "ebi") {
    selectedImage = images.ebi;
  } else if (location == "highland") {
    selectedImage = images.highland;
  } else if (location == "zeppos") {
    selectedImage = images.zeppos;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Hello, USER</h1>
        <div className="links">
    <Link
      href="/registrationForm"
      className="link-card" // Use the new class
      target="_self"
      rel="noopener noreferrer"
    >
      Edit Form
    </Link>

    <Link
      href="/responsesView"
      className="link-card" // Use the new class
      target="_self"
      rel="noopener noreferrer"
    >
      All Responses
    </Link>
  </div>
</div>
      <div className="container">
        <div className="left-half">
          {/* User information content */}
          <h2>
            {" "}
            Here is a list of you will be picking up tonight at {location}
          </h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <strong>Name:</strong> {user.name}
                <br />
                <strong>Phone:</strong> {user.phone}
                <br />
                <strong>Email:</strong> {user.email}
                <br />
              </li>
            ))}
          </ul>
        </div>
        <div className="right-half">
          {/* Google Maps API */}
          <div className="map-container">
            <h3>{location}</h3>
            {/* link to google maps website with the correct location inputted  */}
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(
                location + " Nashville, TN"
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
