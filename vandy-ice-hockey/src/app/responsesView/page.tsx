"use client"; // This statement appears to be unrelated to the code and can be removed

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import logo from "../img/logo.png";
import Image from "next/image";
import "./response.css";
import { useRouter } from "next/navigation";
import { fetchAllUsersWithStatus } from "@/utils/apiUtils";
import { User } from "../../types/User";
import { signOut } from "next-auth/react";

const ResponsesPage: React.FC = () => {
  const [respondents, setRespondents] = useState<User[]>([]); // Will pull from the backend

  const router = useRouter(); // Access the router for navigation
  useEffect(() => {
    fetchAllUsersWithStatus().then((response) => {
      if (response.status === 200) {
        setRespondents(response.data);
      }
      // console.log(users)
    });
  }, []);
  return (
    <div className="responses-page">
      <div className="header">
        <Image src={logo} alt="Logo" className="logo" />
        <h1>Vandy Ice Hockey Carpool</h1>
        <div className="links">
          <Link
            href="/loadingPage"
            className="link-card" // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            Home
          </Link>

          <Link
            href="/responsesView"
            className="link-card" // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            All Responses
          </Link>

          <Link
            href="/registrationForm"
            className="link-card" // Use the new class
            target="_self"
            rel="noopener noreferrer"
          >
            Edit Form
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="link-card"
          >
            Sign Out
          </button>
        </div>
      </div>

      <h1>Responses to the Poll</h1>
      <ul className="response-list">
        {respondents.map((respondent, index) => (
          <li key={index}>
            <strong>{respondent.name}</strong>
            <span>{respondent.attendance === "Yes" ? "" : "Absent"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsesPage;
