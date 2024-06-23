"use client";
import { app } from "@/config/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";

function SharedmeetingEvent({ params }) {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    params && getMeetingBusinessAndEventDetails();
  }, [params]);

  const getMeetingBusinessAndEventDetails = async () => {
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", params?.business)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, "MeetingEvent", params?.meetingEventId);
    const result = await getDoc(docRef);
    setEventInfo(result.data());
  };

  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={eventInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
}

export default SharedmeetingEvent;
