import DashboardTable from "@/components/dashboard/dashboard-table";
import StatCard from "@/components/dashboard/features/stat-card";
import { totalGuest } from "@/lib/actions/features/guestStat.actions";
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

  const statData = await totalGuest();

  if (!guests || !totalGuest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-10">
      <StatCard statData={statData} />
      <br />
      <DashboardTable guests={guests} totalPages={totalPages} />
    </div>
  );
}
