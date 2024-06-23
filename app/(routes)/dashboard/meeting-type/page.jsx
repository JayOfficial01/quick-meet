import React from "react";
import { Input } from "@/components/ui/input";
import MeetingEventList from "./_components/MeetingEventList";

function MeetingType() {
  return (
    <article className="p-5">
      <article className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event type</h2>
        <Input placeholder="Search" className="max-w-xs" />
        <hr />
      </article>
      <MeetingEventList />
    </article>
  );
}

export default MeetingType;
