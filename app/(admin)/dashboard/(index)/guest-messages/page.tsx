import GuestMessageList from "@/components/dashboard/guest-message-list";
import { guestsMessage } from "@/lib/actions/guestComment.actions";

export const metadata = {
  title: "Ucapan Selamat",
};

export default async function GuestMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string; limit: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = Number(params.limit) || 10;

  const { guests, totalPages } = await guestsMessage({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "asc",
    search,
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-center text-xl font-medium">
        Daftar List Ucapan Selamat Para Tamu
      </h1>
      <GuestMessageList guests={guests} totalPages={totalPages} />
    </div>
  );
}
