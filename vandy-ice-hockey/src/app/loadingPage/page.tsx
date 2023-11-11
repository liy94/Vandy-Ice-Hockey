"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { checkIfUserExists } from "@/utils/loadingPage";
import "./loading.css";

const loadingPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const email = session?.user?.email ? session?.user.email : "";
      let dataExists;

      const fetchUser = async () => {
        dataExists = await checkIfUserExists(email);

        if (dataExists) {
          router.push("/driverView");
        } else {
          router.push("/registrationForm");
        }
      };

      fetchUser();
    }
  }, [status, session]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  return <div className="loading">Loading...</div>;
};

export default loadingPage;
