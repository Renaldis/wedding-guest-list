"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import LandingPageGuest from "@/components/guests/landing-page";
import { GuestComment, GuestPropClient } from "@/types";

export default function HomeClient({
  guest,
  messages,
}: {
  guest: GuestPropClient;
  messages: GuestComment[];
}) {
  const [isOpenLP, setIsOpenLP] = useState<boolean>(false);

  return (
    <>
      {!isOpenLP ? (
        <div className="relative w-full h-full">
          <Image
            src={"/old-tree-bg-art2.jpg"}
            alt="old-tree-bg-art2"
            fill
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative text-2xl bg-white w-80 min-h-80 md:w-[60%] md:h-[60%] 2xl:w-[40%] 2xl:h-[40%] rounded-4xl flex flex-col md:flex-row justify-around p-4">
              <div className="flex justify-center items-center mb-4 md:mb-0 md:flex-1/3 md:-ml-32">
                <Image
                  src="/korean-wedding-crop.jpg"
                  alt="korean-wedding"
                  width={400}
                  height={200}
                  className="rounded-md shadow-md"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center items-center space-y-2 text-center md:flex-1/2">
                {guest.id.trim() !== "" ? (
                  <div className="mb-4">
                    <p className="text-lg">Dear</p>
                    <p className="text-2xl font-semibold">{guest.name}</p>
                  </div>
                ) : null}

                <p className="text-sm">We Invite You To the Wedding of</p>
                <h1 className="text-3xl font-bold">Fiqri & Meiliza</h1>
                <p className="text-sm">21 Januari 2026</p>
                <Button
                  className="bg-pink-700 rounded-full cursor-pointer py-2 px-4 flex items-center justify-center mt-4"
                  onClick={() => setIsOpenLP(true)}
                >
                  Buka Undangan <InboxArrowDownIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LandingPageGuest guest={guest} messages={messages} />
      )}
    </>
  );
}
