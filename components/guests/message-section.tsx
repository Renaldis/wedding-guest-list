"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import butterflyAnimation from "@/public/bird_lottie.json";

export default function MessageSection() {
  return (
    <div className="message-section p-6 text-center">
      <Image
        src={"/orn-header-2.webp"}
        alt="orn-header-2"
        width={50}
        height={50}
        className="absolute -left-0 -mt-40"
      />
      <Image
        src={"/rose-animation.gif"}
        alt="rose-animation"
        width={100}
        height={100}
        className="absolute left-35 -mt-13"
      />
      <Card className="shadow-md">
        <CardContent>
          <p className="md:text-lg italic">
            &#34;Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia
            menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri
            agar kamu merasa tenteram kepadanya.&#34;
          </p>
        </CardContent>
        <CardFooter>
          <p className="mt-4 md:text-lg font-semibold">— Ar Rum Ayat 21</p>
        </CardFooter>
        <div className="absolute w-80 flex justify-center items-center">
          <Lottie
            animationData={butterflyAnimation}
            loop={true}
            className="w-fit"
          />
        </div>
      </Card>
    </div>
  );
}
