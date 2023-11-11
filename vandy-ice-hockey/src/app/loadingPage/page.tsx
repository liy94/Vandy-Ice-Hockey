"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { checkIfUserExists } from "@/utils/loadingPage";
import "./loading.css";

const loadingPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email ? session?.user.email : "";

  useEffect(() => {
    // Perform a database check here
    let dataExists;

    const fetchUser = async () => {
      dataExists = await checkIfUserExists(email);
    };

    fetchUser();

    if (dataExists) {
      router.push("/driverView");
    } else {
      router.push("/registrationForm");
    }
  }, []);

  return <div className="loading">Loading...</div>;
};

export default loadingPage;
