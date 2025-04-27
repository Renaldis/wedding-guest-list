"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import LocIcon from "@/public/location-lordicon.gif";
import Image from "next/image";

export default function VenueSection() {
  const venues = [
    {
      title: "Akad Nikah",
      date: "21 Januari 2026",
      time: "09:30 - 11:00",
      place: "The St. Regis Jakarta",
      address:
        "Jalan Haji R. Rasuna Said 4, Setia Budi, Kecamatan Setiabudi Kota Jakarta Selatan",
      icon: LocIcon,
    },
    {
      title: "Resepsi Pernikahan",
      date: "21 Januari 2026",
      time: "12:00 - 14:30 WIB",
      place: "The St. Regis Jakarta",
      address:
        "Jalan Haji R. Rasuna Said 4, Setia Budi, Kecamatan Setiabudi Kota Jakarta Selatan",
      icon: LocIcon,
    },
  ];

  return (
    <div className="p-6 text-center min-h-screen">
      <h1 className="text-2xl mb-15">Acara</h1>
      <div className="flex flex-col gap-10">
        {venues.map((venue, idx) => {
          return (
            <Card className="shadow-lg relative" key={idx}>
              <CardHeader className="mt-12">
                <CardTitle className="font-bold">{venue.title}</CardTitle>
                <CardDescription className="text-lg">
                  {venue.date}
                </CardDescription>
                <CardDescription>{venue.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{venue.place}</p>
                <p className="text-sm">{venue.address}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant={"outline"}
                  className="rounded-full text-slate-700 border-slate-700 cursor-pointer"
                >
                  Lokasi
                </Button>
              </CardFooter>

              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-16 h-16 shadow-lg rounded-full flex justify-center items-center">
                <Image src={LocIcon} alt="Loc-Icon" width={50} height={50} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
