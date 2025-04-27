import Image from "next/image";

export default function AsideLP() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/womenNman.jpeg"
          alt="background-image"
          layout="fill"
          objectFit="cover"
          className="-z-10 opacity-40"
        />
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-full max-w-4xl flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-around items-center w-full space-y-4 md:space-y-0">
            {/* Pengantin Pria */}
            <div className="flex flex-col items-center">
              <Image
                src="/man.jpeg"
                alt="Pengantin Pria"
                width={200}
                height={300}
                className="rounded-full shadow-md"
              />
              <p className="mt-2 text-lg font-semibold">Fiqri</p>
            </div>
            <div>
              <span className="text-8xl">&</span>
            </div>
            {/* Pengantin Wanita */}
            <div className="flex flex-col items-center">
              <Image
                src="/women.jpeg"
                alt="Pengantin Wanita"
                width={200}
                height={300}
                className="rounded-full shadow-md"
              />
              <p className="mt-2 text-lg font-semibold">Meiliza</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
