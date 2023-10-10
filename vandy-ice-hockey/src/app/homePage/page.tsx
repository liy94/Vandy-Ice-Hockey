"use client";

import "./homePage.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="app">
      <header className="header">
        <h1>Hello, USER</h1>
      </header>
      <div className="container">
        <Link
          href="/driverView"
          className="button"
          target="_self"
          rel="noopener noreferrer"
        >
          Driver
        </Link>
        <Link
          href="/riderView"
          className="button"
          target="_self"
          rel="noopener noreferrer"
        >
          Rider
        </Link>
      </div>
      <div className="container2">
        <Link
          href="/weeklyForm"
          className="button"
          target="_self"
          rel="noopener noreferrer"
        >
          Weekly Form
        </Link>
      </div>
    </div>
  );
}
