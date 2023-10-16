import React from "react";
import Link from "next/link"; // Import Link from Next.js
import "./response.css";

const ResponsesPage: React.FC = () => {
  const respondents = [
    { name: "User 1", response: "Option A" },
    { name: "User 2", response: "Option B" },
    { name: "User 3", response: "Option C" },
    // Add more respondents as needed
  ];

  return (
    <div className="responses-page">
      <div className="top-bar">
      <Link
            href="/homePage"
            className="home-button"
            target="_self"
            rel="noopener noreferrer"
          >
            Home 
          </Link>
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
