import Image from "next/image";
import img from "@/public/korean-wedding-crop.jpg";

export default function EndSection() {
  return (
    <div className="relative max-w-md mx-auto">
      <Image
        src={img}
        height={1000}
        width={1000}
        alt="korean-wedding"
        className="w-full opacity-85"
        style={{ filter: "grayscale(0.2)" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  drop-shadow-lg select-none pointer-events-none">
        <h2 className="text-white text-2xl font-semibold">Thankyou</h2>
        <div className="bg-slate-50 opacity-60 px-1">
          <p className="text-sm ">
            Thank you for your prayers and presence at our wedding.
          </p>
        </div>
      </div>
    </div>
  );
}
