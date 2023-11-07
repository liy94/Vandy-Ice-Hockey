"use client"; // This statement appears to be unrelated to the code and can be removed

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import "./response.css";
import { useRouter } from "next/navigation";
import { fetchAllUsersWithStatus } from "@/utils/apiUtils";
import { User } from "../../types/User";

const ResponsesPage: React.FC = () => {
  const [respondents, setRespondents] = useState<User[]>([]); // Will pull from the backend

  const router = useRouter(); // Access the router for navigation
  useEffect(() => {
    fetchAllUsersWithStatus().then((response) => { 
      if (response.status === 200) {
        setRespondents(response.data)
      }
      // console.log(users)
    });
  }, []);
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
            <strong>{respondent.name}:</strong> {respondent.attendance + ", " + respondent.hasCar + ", " + respondent.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsesPage;
