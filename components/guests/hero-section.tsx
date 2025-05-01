"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import arrowDownAnimation from "@/public/arrow-down.json";
import CountdownTimer from "./features/countdown-timer";

import SaveToCalendarButton from "./features/saveToCalendarButton";

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
          className="w-50 2xl:w-70"
        />
      </div>
      <div className="mt-10 flex flex-col gap-5 2xl:gap-10">
        <CountdownTimer />
        <SaveToCalendarButton />
      </div>
    </div>
  );
}
