"use client";
import React, { useEffect, useState } from "react";
import { app } from "@/config/FirebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";

function Dashboard() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);

  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLoading(false);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      router.replace("/create-business");
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <MeetingType />;
}

export default Dashboard;
