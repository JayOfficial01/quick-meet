"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

function TimeDateSelection({
  timeSlots,
  setSelectedTime,
  selectedTime,
  date,
  handleDateChange,
  enaleTimeSlot,
  prevBooking,
}) {
  const checkTimeSlot = (time) => {
    return (
      prevBooking &&
      prevBooking.filter((item) => item.selectedTime == time).length > 0
    );
  };

  return (
    <article className="md:col-span-2 md:flex md:flex-row flex-col px-4">
      <article className="flex flex-col items-center">
        <h2 className="font-bold text-lg">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => handleDateChange(date)}
          className="rounded-md border mt-5"
          disabled={(date) => date <= new Date()}
        />
      </article>

      <article
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: "400px" }}
      >
        {timeSlots.map((time, index) => (
          <Button
            variant="outline"
            disabled={!enaleTimeSlot || checkTimeSlot(time)}
            onClick={() => setSelectedTime(time)}
            className={`border-primary text-primary ${
              time == selectedTime && "bg-primary text-white"
            }`}
            key={index}
          >
            {time}
          </Button>
        ))}
      </article>
    </article>
  );
}

export default TimeDateSelection;
