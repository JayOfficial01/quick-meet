"use Client";
import React, { useEffect, useState } from "react";
import Logo from "@/app/_components/Logo";
import { Clock, Link2, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function PreviewMeeting({ formValue }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    formValue?.duration && createTimeSlot(formValue?.duration);
  }, [formValue]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60;
    const endTime = 22 * 60;
    const totalSlots = (endTime - startTime) / interval;

    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
  };

  return (
    <article
      className="p-5 py-10 shadow-lg m-5 border-t-8"
      style={{ borderTopColor: formValue?.themeColor }}
    >
      <Logo />

      <article className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <article className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-2xl">
            {formValue?.eventName ? formValue.eventName : "Meeting Name"}
          </h2>
          <article className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {formValue?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {formValue?.location ? formValue?.location : "Meeting"}
            </h2>
            {formValue?.locationUrl && (
              <Link
                href={formValue?.locationUrl ? formValue?.locationUrl : "#"}
                className="flex gap-2 text-primary"
              >
                <Link2 /> {formValue?.locationUrl}
              </Link>
            )}
          </article>
        </article>
        <article className="md:col-span-2 flex md:flex-row flex-col px-4">
          <article className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
              disabled={(date) => date <= new Date()}
            />
          </article>

          <article
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: "400px" }}
          >
            {timeSlots.map((slot, index) => (
              <Button
                variant="outline"
                className="border-primary text-primary"
                key={index}
              >
                {slot}
              </Button>
            ))}
          </article>
        </article>
      </article>
    </article>
  );
}

export default PreviewMeeting;
