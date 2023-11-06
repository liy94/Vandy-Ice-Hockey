"use client"; // This statement appears to be unrelated to the code and can be removed

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import "./response.css";
import { useRouter } from "next/navigation";
import { fetchAllUsersWithStatus } from "@/utils/apiUtils";

const ResponsesPage: React.FC = () => {
  // const respondents = [
  //   { name: "User 1", response: "Option A" },
  //   { name: "User 2", response: "Option B" },
  //   { name: "User 3", response: "Option C" },
  //   // WIll pull from the backend 
  // ];

  const [respondents, setRespondents] = React.useState([]);


  const router = useRouter(); // Access the router for navigation

  
  return (
    <div className="responses-page">
      <div className="top-bar">
        <button className="home-button" onClick={() => router.back()}>
          Home
        </button>
      </div>
      <h1>Responses to the Poll</h1>
      <ul className="response-list">
        {respondents.map((respondent, index) => (
          <li key={index}>
            <strong>{respondent.name}:</strong> {respondent.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsesPage;
