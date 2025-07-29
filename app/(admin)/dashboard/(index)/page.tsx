import { Suspense } from "react";
import ClientDashboard from "./ClientDashboard";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading dashboard...</div>}>
      <ClientDashboard />
    </Suspense>
  );
}
