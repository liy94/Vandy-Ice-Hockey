"use client";

import { useState } from "react";
import "./rider.css"; // Import the CSS file with the styles
import Link from "next/link";
import images from '../imageLoader';
import Image from 'next/image';



const App: React.FC = () => {
  const location = "zeppos"; // Get this from the backend

  // Define the selected image based on the location
  let selectedImage;
  if (location === "kissam") {
    selectedImage = images.kissam;
  } else if (location === "commons") {
    selectedImage = images.commons;
  }else if(location == "ebi"){
    selectedImage = images.ebi;
  }else if(location == "highland"){
    selectedImage = images.highland;
  } else if (location == "zeppos"){
    selectedImage = images.zeppos;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Hello, USER</h1>
        <div className="links">
          <Link
            href="/registrationForm"
            className="card"
            target="_self"
            rel="noopener noreferrer"
          >
            Edit Form
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="left-half">
          {/* User information content */}
          <h2> Here is your pick up information at {location}</h2>
        </div>
        <div className="right-half">
          {/* Google Maps API */}
          <div className="map-container">
            {/* Add Google Maps API component here */}
            {/* Replace this with your Google Maps component */}
            <h3>{location}</h3>

            <Image src={selectedImage} alt={`not found: ${location}`} width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
