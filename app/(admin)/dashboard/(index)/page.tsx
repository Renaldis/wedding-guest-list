import DashboardTable from "@/components/dashboardTable";
import { getPaginatedGuest } from "@/lib/actions/guest.actions";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { guests, totalPages } = await getPaginatedGuest({
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
  });

  return (
    <>
      <h1>Ini Nanti Adalah Statistik Kehadiran</h1>
      <br />
      <DashboardTable guests={guests} totalPages={totalPages} />
    </>
  );
}
