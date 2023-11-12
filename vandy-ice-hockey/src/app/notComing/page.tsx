"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import "./notComing.css";
import logo from "../img/logo.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

const NotComingPage: React.FC = () => {
    return (
        <div>
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
            Update Profile
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="link-card"
          >
            Sign Out
          </button>
        </div>
          </div>

          <div className="message">
            <p className="big-font">We miss you on the ice.</p>
            <p className="small-font">You can always click on <strong>Update Profile</strong> if you changed your mind.</p>
          </div>
        </div>
    );
};

export default NotComingPage;
