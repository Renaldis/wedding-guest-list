import { formatTanggal } from "@/lib/utils";

export default function GuestMessageList() {
  const guests = [
    {
      id: 1,
      name: "Budi",
      greetingMessage: "Selamat ya",
      createdAt: "2025-04-23T05:50:13.357Z",
    },
    {
      id: 2,
      name: "Bidi",
      greetingMessage: "Selamat ya",
      createdAt: "2025-04-23T05:50:13.357Z",
    },
    {
      id: 3,
      name: "Bede",
      greetingMessage: "Selamat ya",
      createdAt: "2025-04-23T05:50:13.357Z",
    },
  ];
  return (
    <div className="mt-10 mx-8">
      {guests.map((guest) => {
        return (
          <div key={guest.id} className="my-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-black font-medium">{guest.name}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-slate-600">{guest.greetingMessage}</p>
                  <p className="text-slate-400">
                    {formatTanggal(guest.createdAt)}
                  </p>
                </div>
              </div>
              hapus
            </div>
            <hr className="mt-4" />
          </div>
        );
      })}
    </div>
  );
}
