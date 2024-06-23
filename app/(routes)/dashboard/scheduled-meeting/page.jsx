"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleMeetingList from "./_components/ScheduleMeetingList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { format } from "date-fns";

function ScheduledMeeting() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    user && getScheduledMeetings();
  }, [user]);

  const getScheduledMeetings = async () => {
    setMeetingList([]);

    const q = query(
      collection(db, "ScheduledMeetings"),
      where("businessEmail", "==", user?.email)
    );

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setMeetingList((prev) => [...prev, doc.data()]);
    });
  };

  const filterMeetingList = (type) => {
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item.formatedTimeStamp >= format(new Date(), "t")
      );
    } else {
      return meetingList.filter(
        (item) => item.formatedTimeStamp < format(new Date(), "t")
      );
    }
  };

  return (
    <article className="p-10">
      <h2 className="font-bold text-2xl">ScheduledMeeting</h2>
      <hr className="my-5" />

      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduleMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduleMeetingList meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </article>
  );
}

export default ScheduledMeeting;
