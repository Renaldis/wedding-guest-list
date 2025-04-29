import DashboardTable from "@/components/dashboard-table";
import { getPaginatedGuest } from "@/lib/actions/guest.actions";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string; limit: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = Number(params.limit) || 10;

  const { guests, totalPages } = await getPaginatedGuest({
    page,
    limit,
    sortBy: "name",
    sortOrder: "asc",
    search,
  });

  return (
    <div className="">
      <h1>Ini Nanti Adalah Statistik Kehadiran</h1>
      <br />
      <DashboardTable guests={guests} totalPages={totalPages} />
    </div>
  );
}
