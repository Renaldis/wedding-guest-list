"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import arrowDownAnimation from "@/public/arrow-down.json";
import CountdownTimer from "./features/countdown-timer";
import { Button } from "../ui/button";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen py-20 2xl:py-30">
      <div className="text-center text-4xl text-pink-700">
        <h1>Fiqri</h1>
        <span>&</span>
        <h1>Meiliza</h1>
        <span className="text-sm">We are getting maried!</span>
      </div>
      <div className="">
        <Lottie
          animationData={arrowDownAnimation}
          loop={true}
          className="w-20 2xl:w-60"
        />
      </div>
      <div className="mt-10 flex flex-col gap-5 2xl:gap-10">
        <CountdownTimer />
        <Button className="bg-pink-700 rounded-full cursor-pointer py-2 px-4 flex items-center justify-center mt-4">
          <CalendarDaysIcon className="w-4 h-4" />
          Simpan Tanggal
        </Button>
      </div>
    </div>
  );
}
