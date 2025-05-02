"use client";

import { Users } from "@/types/user";
import { Role } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";
import UserSection from "./components/user-section";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function AdminManagementPage() {
  const { data: users, error } = useSWR("/api/users", fetcher);

  if (!users && !error) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  const handleDelete = (id: string) => {
    console.log("Delete user id:", id);
  };

  const handlePromote = (id: string) => {
    console.log("Promote user id:", id);
  };
  const handleDemote = (id: string) => {
    console.log("Demote user id:", id);
  };

  const admins = users.filter((u: Users) => u.role === Role.ADMIN);
  const resepsionis = users.filter((u: Users) => u.role === Role.RESEPSIONIS);
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Manajemen Admin & Resepsionis
      </h1>
      <UserSection
        title="Admin"
        users={admins}
        onDelete={handleDelete}
        onDemote={handleDemote}
      />
      <UserSection
        title="Resepsionis"
        users={resepsionis}
        onDelete={handleDelete}
        onPromote={handlePromote}
      />
    </div>
  );
}
