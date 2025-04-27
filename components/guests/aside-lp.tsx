import Image from "next/image";

export default function AsideLP() {
  return (
    <div className="relative w-full min-h-screen">
      <Image
        src="/womenNman.jpeg"
        alt="background-image"
        width={1000}
        height={0}
        className="object-cover -z-10 opacity-40 w-full h-screen"
        priority
      />

      {/* Content */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-full max-w-4xl flex flex-col items-center px-4">
          <div className=" flex flex-col md:flex-row justify-around items-center w-full gap-8 md:gap-0">
            {/* Pengantin Pria */}
            <div className="flex flex-col items-center">
              <Image
                src="/man.jpeg"
                alt="Pengantin Pria"
                width={150}
                height={150}
                className="rounded-full shadow-md h-auto w-auto"
                priority
              />
              <div className="w-64 text-center mt-4">
                <p className="text-lg font-semibold">Fiqri</p>
                <p className="mt-2 text-sm">
                  Putra dari Bapak Muhammad Fauzan dan Ibu Ratna Dewi Kusuma.
                </p>
                <p className="text-sm mt-1">@Fiqri Anies</p>
              </div>
            </div>

            <div className="text-6xl md:text-8xl font-semibold">&</div>

            {/* Pengantin Wanita */}
            <div className="flex flex-col items-center">
              <Image
                src="/women.jpeg"
                alt="Pengantin Wanita"
                width={150}
                height={150}
                className="rounded-full shadow-md h-auto w-auto"
                priority
              />
              <div className="w-64 text-center mt-4">
                <p className="text-lg font-semibold">Meiliza</p>
                <p className="mt-2 text-sm">
                  Putri tercinta dari Bapak Nirwan Iskandar dan Ibu Elivo
                  Nasution.
                </p>
                <p className="text-sm mt-1">@Meiliza</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
