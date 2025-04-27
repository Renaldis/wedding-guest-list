import Image from "next/image";

export default function CoupleSection() {
  return (
    <div className="h-screen space-y-10 mt-16 md:hidden">
      {/* Man */}
      <div className="flex flex-col items-center">
        <Image
          src={"/man.jpeg"}
          alt="man"
          width={200}
          height={200}
          className="rounded-t-full"
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

      <div className="text-2xl font-semibold text-center">&</div>

      {/* Women */}
      <div className="flex flex-col items-center">
        <Image
          src="/women.jpeg"
          alt="Pengantin Wanita"
          width={200}
          height={200}
          className="rounded-t-full"
          priority
        />
        <div className="w-64 text-center mt-4">
          <p className="text-lg font-semibold">Meiliza</p>
          <p className="mt-2 text-sm">
            Putri tercinta dari Bapak Nirwan Iskandar dan Ibu Elivo Nasution.
          </p>
          <p className="text-sm mt-1">@Meiliza</p>
        </div>
      </div>
    </div>
  );
}
