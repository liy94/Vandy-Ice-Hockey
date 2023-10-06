import "./homePage.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="main">
      <div>
        <button className="button">Driver</button>
        <button className="button">Passenger</button>
      </div>
    </main>
  );
}
