"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import daysList from "@/app/_utlils/DaysList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function Availability() {
  const [days, setDays] = useState(
    {
      Sunday: false,
    },
    {
      Monday: false,
    },
    {
      Tuesday: false,
    },
    {
      Wednesday: false,
    },
    {
      Thursday: false,
    },
    {
      Friday: false,
    },
    {
      Saturday: false,
    }
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(false);

  const handleDays = (day, value) => {
    setDays({ ...days, [day]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    const docRef = doc(db, "Business", user?.email);

    await updateDoc(docRef, {
      availableDays: days,
      startTime: startTime,
      endTime: endTime,
    }).then((res) => {
      setLoading(false);
      toast("Business Update!");
    });
  };

  useEffect(() => {
    user && getData();
  }, [user]);

  const getData = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();

    setDays(result.availableDays);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  };

  return (
    <article className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />

      <article>
        <h2 className="font-bold">Availablity Days</h2>
        <article className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {daysList.map((item, index) => (
            <article key={index}>
              <label className="cursor-pointer flex items-center gap-2">
                <Checkbox
                  checked={days ? days[item.day] : false}
                  onCheckedChange={(e) => handleDays(item.day, e)}
                />
                {item.day}
              </label>
            </article>
          ))}
        </article>

        <h2 className="mt-10 font-bold">Availabilty Time</h2>
        <article className="flex items-center gap-5 my-2">
          <article>
            <h2>Start Time</h2>
            <Input
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
            />
          </article>

          <article>
            <h2>End Time</h2>
            <Input
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime}
            />
          </article>
        </article>

        <Button
          className="mt-5"
          onClick={handleSave}
          disabled={!(endTime && startTime && days)}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </article>
    </article>
  );
}

export default Availability;
