"use client";

import { useSearchParams } from "next/navigation";
import DashboardTable from "@/components/dashboard/dashboard-table";
import StatCard from "@/components/dashboard/features/stat-card";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ClientDashboard() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const {
    data: guestData,
    error: guestError,
    isLoading: guestLoading,
  } = useSWR(
    `/api/guest?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`,
    fetcher
  );

  const {
    data: statData,
    error: statError,
    isLoading: statLoading,
  } = useSWR(`/api/stat`, fetcher);

  if (guestLoading || statLoading) return <div className="p-4">Loading...</div>;
  if (guestError || statError)
    return <div className="p-4 text-red-500">Failed to load data.</div>;

  const guests = guestData.guests;
  const totalPages = guestData.totalPages;
  return (
    <div className="pb-10">
      <StatCard statData={statData} />
      <br />
      <DashboardTable guests={guests} totalPages={totalPages} />
    </div>
  );
}
