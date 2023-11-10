import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import "./notComing.css";
import logo from "../img/logo.png";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { fetchAllUsersWithStatus } from "@/utils/apiUtils";
import { User } from "../../types/User";

const NotComingPage: React.FC = () => {
    // const [respondents, setRespondents] = useState<User[]>([]); // Will pull from the backend
  
   // const router = useRouter(); // Access the router for navigation

    // useEffect(() => {
    //   fetchAllUsersWithStatus().then((response) => { 
    //     if (response.status === 200) {
    //       setRespondents(response.data)
    //     }
    //     // console.log(users)
    //   });
    // }, []);

    return (
        <div>
          <div className="header">
          <Image src={logo} alt="Logo" className="logo" />
        <h1>Vandy Ice Hockey Carpool</h1>
            <div className="links">
              <Link
                href="/registrationForm"
                className="link-card"
                target="_self"
                rel="noopener noreferrer"
              >
                Edit Form
              </Link>

              <Link
                href="/responsesView"
                className="link-card"
                target="_self"
                rel="noopener noreferrer"
              >
                All Responses
              </Link>
            </div>
          </div>

          <div className="message">
            <p className="big-font">We are sorry you can't make practice today</p>
            <p className="small-font">Please remember to fill out the attendance form next week. We're looking forward to seeing you next time!</p>
          </div>
        </div>
    );
};

export default NotComingPage;
