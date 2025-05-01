import AddNewGuestForm from "@/components/dashboard/add-new-guest-form";

export const metadata = {
  title: "Tambah Tamu Baru",
};

export default function AddNewGuestPage() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-center text-xl font-medium">Tambah Tamu Baru</h1>
      <AddNewGuestForm />
    </div>
  );
}
