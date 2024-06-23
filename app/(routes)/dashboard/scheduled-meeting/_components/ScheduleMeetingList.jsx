import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck, Clock, Link2, MapPin, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ScheduleMeetingList({ meetingList }) {
  return (
    <Accordion type="single" collapsible>
      {meetingList?.map((list, index) => (
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger> {list.formatedData}</AccordionTrigger>
          <AccordionContent>
            <article className="mt-5 flex flex-col gap-4">
              <h2 className="flex gap-2">
                <Clock /> {list?.duration} Min
              </h2>
              <h2 className="flex gap-2">
                <MapPin /> {list?.location ? list?.location : "Meeting"}
              </h2>
              <h2 className="flex gap-2">
                <CalendarCheck />
                {list.formatedData}
              </h2>

              <h2 className="flex gap-2">
                <Timer /> {list.selectedTime}
              </h2>

              <h2 className="flex gap-2 text-primary">
                <Link2 />
                <Link
                  href={list?.locationUrl ? list?.locationUrl : "#"}
                  target="_blank"
                >
                  {list?.locationUrl}
                </Link>
              </h2>

              <Link href={list?.locationUrl} target="_blank" className="mt-5">
                <Button>Join Now</Button>
              </Link>
            </article>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default ScheduleMeetingList;
