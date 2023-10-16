"use client"; 

import { useState } from "react";
import "./rider.css"; // Import the CSS file with the styles
import Link from "next/link";
import images from '../imageLoader';
import Image from 'next/image';

// Define a React functional component named App
const App: React.FC = () => {

  const driver = [
    {
      name: "Driver ex 1",
      phone: "111-111-1111",
      email: "ex@gmail.com",
    }
  ];
  const location = "zeppos"; // Get this from the backend

  // Define the selected image based on the location
  let selectedImage;
  if (location === "kissam") {
    selectedImage = images.kissam;
  } else if (location === "commons") {
    selectedImage = images.commons;
  } else if (location === "ebi") {
    selectedImage = images.ebi;
  } else if (location === "highland") {
    selectedImage = images.highland;
  } else if (location === "zeppos") {
    selectedImage = images.zeppos;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Hello, USER</h1>
        <div className="links">
          {/* link to edit form button */}
          <Link
            href="/registrationForm"
            className="card"
            target="_self"
            rel="noopener noreferrer"
          >
            Edit Form
          </Link>
          {/* Link to all responses button */}
          <Link
            href="/responsesView"
            className="card"
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
          <h2> Here is your pick up information at {location}</h2>
          <h3>Look for {driver[0].name}</h3>
          <p>Your driver is {driver[0].name} and you can contact them at {driver[0].phone}</p>
        </div>
        <div className="right-half">
          <div className="map-container">
            <h3>{location}</h3>
          {/* link to google maps website with the correct location inputted  */}
            <a href={`https://www.google.com/maps?q=${encodeURIComponent(location + " nashville tn")}`} target="_blank">
              <Image src={selectedImage} alt={`not found: ${location}`} width={500} height={500} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
