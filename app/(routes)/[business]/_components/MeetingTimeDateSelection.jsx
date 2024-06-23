"use Client";
import React, { useEffect, useState } from "react";
import Logo from "@/app/_components/Logo";
import {
  CalendarCheck,
  Clock,
  Link2,
  MapPin,
  Timer,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import TimeDateSelection from "./TimeDateSelection";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { toast } from "sonner";
import Plunk from "@plunk/node";
import Email from "@/emails";
import { render } from "@react-email/render";
import { useRouter } from "next/navigation";

function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [enaleTimeSlot, setEnabledTimeSlot] = useState(false);
  const [prevBooking, setPrevBooking] = useState("");

  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

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

  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");

    if (businessInfo?.availableDays?.[day]) {
      setEnabledTimeSlot(true);
      getPrevEventBooking(date);
    } else {
      setEnabledTimeSlot(false);
    }
  };

  const handleScheduleEvent = async () => {
    setLoading(true);

    const docId = Date.now().toString();

    await setDoc(doc(db, "ScheduledMeetings", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      formatedData: format(date, "PPP"),
      formatedTimeStamp: format(date, "t"),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userInfo.name,
      userEmail: userInfo.email,
      userNote: userInfo.note,
    }).then(() => {
      toast("Meeting Scheduled successfuly");

      setUserInfo({
        name: "",
        email: "",
        note: "",
      });
      sendEmail(userInfo.name);
    });
  };

  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };

  const sendEmail = (user) => {
    const emailHtml = render(
      <Email
        businessName={businessInfo.businessName}
        date={format(date, "PPP").toString()}
        duration={eventInfo.duration}
        meetingTime={selectedTime}
        meetingUrl={eventInfo.locationUrl}
        userFirstName={user}
      />
    );

    plunk.emails
      .send({
        to: userInfo.email,
        subject: "Meeting Schedul Details",
        body: emailHtml,
      })
      .then((res) => {
        router.replace("/confirmation");
        setLoading(false);
      });
  };

  return (
    <article
      className="p-5 py-10 shadow-lg mt-10 border-t-8 max-w-5xl m-auto"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Logo />

      <article className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <article className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName ? eventInfo.eventName : "Meeting Name"}
          </h2>
          <article className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {eventInfo?.location ? eventInfo?.location : "Meeting"}
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck /> {format(date, "PPP")}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer /> {selectedTime}
              </h2>
            )}
            {eventInfo?.locationUrl && (
              <h2 className="flex gap-2 text-primary">
                <Link2 /> {eventInfo?.locationUrl}
              </h2>
            )}
          </article>
        </article>
        {step == 1 ? (
          <TimeDateSelection
            timeSlots={timeSlots}
            businessInfo={businessInfo}
            setSelectedTime={setSelectedTime}
            date={date}
            setDate={setDate}
            selectedTime={selectedTime}
            handleDateChange={handleDateChange}
            enaleTimeSlot={enaleTimeSlot}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo setUserInfo={setUserInfo} userInfo={userInfo} />
        )}
      </article>

      <article className="flex justify-end gap-2 pt-10">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}

        {step == 1 ? (
          <Button
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userInfo.name || !userInfo.email || loading}
            onClick={handleScheduleEvent}
          >
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Schedule
          </Button>
        )}
      </article>
    </article>
  );
}

export default MeetingTimeDateSelection;
