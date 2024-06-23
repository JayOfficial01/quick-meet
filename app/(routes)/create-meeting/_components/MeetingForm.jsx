"use client";
import React, { useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/_utlils/LocationOption";
import Image from "next/image";
import Link from "next/link";
import ThemeOptions from "@/app/_utlils/ThemeOptions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { app } from "@/config/FirebaseConfig";
import { useRouter } from "next/navigation";

function MeetingForm({ setFormValue }) {
  const [themeColor, setThemeColor] = useState("");
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [location, setLocation] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    setFormValue({
      themeColor: themeColor,
      eventName: eventName,
      duration: duration,
      location: location,
      locationUrl: locationUrl,
    });
  }, [themeColor, eventName, duration, location, locationUrl]);

  const createMeeting = async () => {
    const id = Date.now().toString();
    setLoading(true);

    await setDoc(doc(db, "MeetingEvent", id), {
      //db, collection Name, document name
      id: id,
      themeColor: themeColor,
      eventName: eventName,
      duration: duration,
      location: location,
      locationUrl: locationUrl,
      businessId: doc(db, "Business", user?.email),
      createdBy: user?.email,
    }).then(() => {
      toast("New meeting event created!");
      router.replace("/dashboard/meeting-type");
      setLoading(false);
    });
  };

  return (
    <article className="p-8">
      <Link href="/dashboard">
        <h2 className="flex gap-2">
          <ChevronLeft />
          Cancel
        </h2>
      </Link>
      <article>
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </article>

      <article className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event "
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
        />

        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <article className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <article
              className={`border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-primary ${
                location == option.name && "bg-blue-100 border-primary"
              }`}
              key={index}
              onClick={() => setLocation(option.name)}
            >
              <Image
                src={option.icon}
                alt={option.name}
                width={30}
                height={30}
              />
              <h2 className="">{option.name}</h2>
            </article>
          ))}
        </article>

        {location && (
          <>
            <h2 className="font-bold">Add {location} Url *</h2>
            <Input
              placeholder="Add Url"
              onChange={(e) => setLocationUrl(e.target.value)}
              value={locationUrl}
            />
          </>
        )}

        <h2 className="font-bold">Select Theme Color</h2>
        <article className="flex justify-evenly mt-2">
          {ThemeOptions.map((theme, index) => (
            <article
              key={index}
              className={`h-7 w-7 rounded-full cursor-pointer ${
                themeColor == theme && "border-2 border-black"
              }`}
              style={{ background: theme }}
              onClick={() => setThemeColor(theme)}
            ></article>
          ))}
        </article>
      </article>

      <Button
        className="w-full mt-9"
        disabled={
          !(eventName && duration && location && locationUrl) && !loading
        }
        onClick={createMeeting}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create
      </Button>
    </article>
  );
}

export default MeetingForm;
