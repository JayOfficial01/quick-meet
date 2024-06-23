"use client";
import React, { useEffect, useState } from "react";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Clock,
  Copy,
  EllipsisVertical,
  MapPin,
  Pen,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    user?.email && getEventList();
    user?.email && getBusinessInfo();
    setEventList([]);
  }, [user, updateList]);

  const getEventList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setEventList((prev) => [...prev, doc.data()]);
    });
  };

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  };

  const deleteMeetingEvent = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event.id)).then(() => {
      toast("Meeting Deleted!");
      getEventList();
      setUpdateList(true);
    });
  };

  const onCopyClickHandler = (event) => {
    const meetingEventUrl =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/" +
      businessInfo.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Copied to Clipboard");
  };

  return (
    <article className="mt-10 grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-10">
      {eventList.length > 0 ? (
        eventList.reverse().map((event, index) => (
          <figure
            key={index}
            className="border shadow-md border-t-8 rounded-lg flex flex-col gap-5 p-5"
            style={{ borderTopColor: event.themeColor }}
          >
            <article className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="outline-none cursor-pointer"
                  asChild
                >
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Pen className="w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => deleteMeetingEvent(event)}
                  >
                    <Trash className="w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </article>

            <h2 className="font-medium text-xl">{event.eventName}</h2>
            <article className="flex justify-between text-gray-500">
              <h2 className="flex gap-2">
                <Clock />
                {event.duration} Min
              </h2>
              <h2 className="flex gap-2">
                <MapPin />
                {event.location}
              </h2>
            </article>
            <hr />

            <article className="flex items-center justify-between">
              <h2
                className="flex gap-2 cursor-pointer text-primary"
                onClick={() => onCopyClickHandler(event)}
              >
                <Copy />
                Copy Link
              </h2>

              <Button
                variant="outline"
                className="border-primary rounded-full text-primary"
              >
                Share
              </Button>
            </article>
          </figure>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </article>
  );
}

export default MeetingEventList;
