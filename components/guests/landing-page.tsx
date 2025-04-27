"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import AsideLP from "./aside-lp";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import butterflyAnimation from "@/public/bird_lottie.json";
import HeroSection from "./hero-section";
import MessageSection from "./message-section";
import CoupleSection from "./couple-section";
import VenueSection from "./venue-section";
import FormRSVPSection from "./form-rsvp-section";
import { GuestProp } from "@/types";

export default function LandingPageGuest({ guest }: { guest: GuestProp }) {
  return (
    <div className="grid lg:grid-cols-3 overflow-y-auto">
      <div className="hidden col-span-2 lg:block">
        <AsideLP />
      </div>

      {/* Main Content */}
      <div className="h-screen bg-orange-50 relative overflow-x-hidden overflow-y-auto">
        <Image
          src={"/orn-header-1.webp"}
          alt="orn-header-1"
          width={200}
          height={300}
          className="absolute -left-20 -top-20 2xl:-left-10"
        />
        <Image
          src={"/orn-header-3.webp"}
          alt="orn-header-3"
          width={200}
          height={300}
          className="absolute top-0 -right-18"
        />
        <div className="absolute">
          <Lottie animationData={butterflyAnimation} loop={true} />
        </div>

        {/* Hero Section */}
        <HeroSection />
        {/* Message Section */}
        <MessageSection />
        {/* Couple Section */}
        <CoupleSection />
        {/* Line */}

        <Image
          src={"/line-decorative.png"}
          alt="line-decorative"
          width={1000}
          height={10}
          className="w-full"
        />

        {/* Venue Section */}
        <VenueSection />
        {/* Form RSVP Section */}
        <FormRSVPSection guest={guest} />
      </div>
    </div>
  );
}
