import { Button } from "@/components/ui/button";
import {
  eventDetails,
  eventEndDate,
  eventLocation,
  eventStartDate,
  eventTitle,
} from "@/lib/constants";
import { CalendarDaysIcon } from "lucide-react";
import Link from "next/link";

export default function SaveToCalendarButton() {
  const calendarUrl =
    `https://www.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(eventTitle)}` +
    `&dates=${eventStartDate}/${eventEndDate}` +
    `&details=${encodeURIComponent(eventDetails)}` +
    `&location=${encodeURIComponent(eventLocation)}`;

  return (
    <Link href={calendarUrl} target="_blank" rel="noopener noreferrer">
      <Button className="bg-pink-700 rounded-full cursor-pointer py-2 px-4 flex items-center justify-center mt-4 w-full">
        <CalendarDaysIcon className="w-4 h-4" />
        Simpan Tanggal
      </Button>
    </Link>
  );
}
