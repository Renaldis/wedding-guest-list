import DashboardTable from "@/components/dashboardTable";
import { getPaginatedGuest } from "@/lib/actions/guest.actions";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
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
    <>
      <h1>Ini Nanti Adalah Statistik Kehadiran</h1>
      <br />
      <DashboardTable guests={guests} totalPages={totalPages} />
    </>
  );
}
