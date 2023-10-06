"use client";

import { useState } from "react";
import "./driver.css"; // Import the CSS file with the styles

const App: React.FC = () => {
  const users = [
    {
      name: "User 1",
      phone: "111-111-1111",
      email: "ex@gmail.com",
    },
    {
      name: "User 2",
      phone: "111-111-1111",
      email: "ex@gmail.com",
    },
    {
      name: "User 3",
      phone: "222-222-2222",
      email: "ex@gmail.com",
    }]

    const location = "<LOCATION>";

  return (
    <div className="app">
      <header className="header">
        <h1>Hello, USER</h1>
        
      </header>
      <div className="container">
        <div className="left-half">
          {/* User information content */}
          <h2> Here is a list of you will be picking up tonight at {location}</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <strong>Name:</strong> {user.name}<br />
                <strong>Phone:</strong> {user.phone}<br/>
                <strong>Email:</strong> {user.email}<br />
              </li>
            ))}
          </ul>
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
