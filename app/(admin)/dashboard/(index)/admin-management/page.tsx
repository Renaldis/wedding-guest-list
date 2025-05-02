"use client";

import { Users } from "@/types/user";
import { Role } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";
import UserSection from "./components/user-section";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function AdminManagementPage() {
  const { data: users, error, mutate } = useSWR("/api/users", fetcher);

  if (!users && !error) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  // Handle Delete User
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      mutate();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // Handle Promote User
  const handlePromote = async (id: string) => {
    try {
      await axios.patch(`/api/users/${id}/promote`);
      mutate();
      alert("User promoted to Admin");
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user");
    }
  };

  // Handle Demote User
  const handleDemote = async (id: string) => {
    try {
      await axios.patch(`/api/users/${id}/demote`);
      mutate();
      alert("User demoted to Resepsionis");
    } catch (error) {
      console.error("Error demoting user:", error);
      alert("Failed to demote user");
    }
  };

  const admins = users.filter((u: Users) => u.role === Role.ADMIN);
  const resepsionis = users.filter((u: Users) => u.role === Role.RESEPSIONIS);
  return (
    <div className="pb-10">
      {/* <h1 className="text-2xl font-bold mb-8 text-center">
        Manajemen Admin & Resepsionis
      </h1> */}
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
