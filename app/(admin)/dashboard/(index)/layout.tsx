import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100">
        <Navbar />

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
