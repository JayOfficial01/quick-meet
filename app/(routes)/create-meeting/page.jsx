"use client";
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";

function CreateMeeting() {
  const [formValue, setFormValue] = useState(null);

  return (
    <main className="grid grid-cols-1 md:grid-cols-3">
      <article className="shadow-md border h-screen">
        <MeetingForm setFormValue={setFormValue} />
      </article>
      <article className="md:col-span-2">
        <PreviewMeeting formValue={formValue} />
      </article>
    </main>
  );
}

export default CreateMeeting;
