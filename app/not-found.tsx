"use client";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="/error.jpg"
        width={200}
        height={100}
        alt={`${APP_NAME} logo`}
        priority={true}
      />

      <h1 className="text-3xl font-bold mb-4">Not Found</h1>
      <p className="text-destructive">Could not find requested page</p>
      <Button
        variant={"outline"}
        className="mt-4 ml-2 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        Back To Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
