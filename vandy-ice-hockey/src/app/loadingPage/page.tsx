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
      let user;

      const fetchUser = async () => {
        user = await checkIfUserExists(email);
        console.log("user:", user);
        if (user) {
          if (user.attendance === "Yes") {
            if (user.hasCar === "Yes") {
              router.push("/driverView");
            } else {
              router.push("/riderView");
            }
          } else {
            router.push("/notComing");
          }
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
