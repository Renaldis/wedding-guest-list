import GuestMessageList from "@/components/guest-message-list";

export const metadata = {
  title: "Ucapan Selamat",
};

export default function GuestMessagesPage() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-center text-xl font-medium">
        Daftar List Ucapan Selamat Para Tamu
      </h1>
      <GuestMessageList />
    </div>
  );
}
