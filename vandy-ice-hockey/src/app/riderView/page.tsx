"use client";

import { useState } from "react";
import "./rider.css"; // Import the CSS file with the styles
import Link from "next/link";

const App: React.FC = () => {
  const location = "<LOCATION>";

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
            <p>Google Maps API Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
