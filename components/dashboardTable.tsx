"use client";

import { type GuestProp } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "./ui/input";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Button } from "./ui/button";
import CustomDialog from "./customDialog";

import { EditGuestFormSchema, editGuestForm } from "@/lib/validators";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { deleteGuest, editGuest } from "@/lib/actions/guest.actions";
import Cookies from "js-cookie";

export default function DashboardTable({
  guests,
  totalPages,
}: {
  guests: GuestProp[];
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.userId || "ID-RESEPSIONIS");
      } catch {
        setUserId("RESEPSIONIS");
      }
    }
  }, []);

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [openForm, setOpenForm] = useState(false);

  const [guest, setGuest] = useState<editGuestForm | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<string>("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        params.set("search", searchValue);
        params.set("page", "1");
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, router, searchParams]);

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  const form = useForm<z.infer<typeof EditGuestFormSchema>>({
    resolver: zodResolver(EditGuestFormSchema),
    defaultValues: {
      id: "",
      name: "",
      phone: "",
      isPresent: false,
    },
  });

  const onSubmit = async (data: editGuestForm) => {
    try {
      const result = await editGuest(data);
      console.log("Berhasil update:", result);

      router.refresh();
    } catch (error) {
      console.error("Gagal update:", error);
    }
  };

  const handleEdit = async (id: string) => {
    const res = await fetch(`/api/guest/${id}`);
    const data = await res.json();
    setGuest(data);
    setOpenForm(true);
  };

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    setIsOpenDelete(true);
    setSelectedGuest(id);
  };

  const confirmDelete = async () => {
    if (selectedGuest) {
      await deleteGuest(selectedGuest);
      router.refresh();
      setIsOpenDelete(false);
    }
  };

  useEffect(() => {
    if (guest) {
      form.reset({
        id: guest.id,
        name: guest.name,
        isPresent: guest.isPresent,
        phone: guest.phone,
        updatedById: userId,
      });
    }
  }, [guest, form, userId]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-5 mt-2 mb-5">
        <h1 className="text-lg font-semibold">Daftar Tamu</h1>
        <Input
          className="w-40"
          placeholder="Cari nama tamu..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="ml-2 text-sm text-red-500 cursor-pointer"
          >
            Reset
          </button>
        )}
        <div className="flex items-center gap-4 justify-end">
          <label htmlFor="limit" className="text-sm">
            Tampilkan:
          </label>
          <select
            id="limit"
            className="border border-gray-300 rounded px-2 py-1"
            defaultValue={10}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-sm">data per halaman</span>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="w-[80px]">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>No. HP</TableHead>
            <TableHead>Status RSVP</TableHead>
            <TableHead>konfirmasi kehadiran</TableHead>
            <TableHead>Status Hadir di Acara</TableHead>
            <TableHead>Ditambahkan</TableHead>
            <TableHead>Diperbarui</TableHead>
            <TableHead>Diupdate Oleh</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest, index) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">
                {(currentPage - 1) * limit + index + 1}
              </TableCell>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.phone}</TableCell>
              <TableCell>
                {guest.isRSVPed ? "Sudah RSVP" : "Belum RSVP"}
              </TableCell>
              <TableCell>
                {guest.isAttending === true
                  ? "Akan Hadir"
                  : guest.isAttending === false
                  ? "Tidak Hadir"
                  : "Belum Konfirmasi"}
              </TableCell>
              <TableCell>{guest.isPresent ? "Hadir" : "Belum Hadir"}</TableCell>
              <TableCell>
                {format(new Date(guest.createdAt), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell>
                {format(new Date(guest.updatedAt), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell>{guest.updatedById || "-"}</TableCell>
              <TableCell className="flex">
                <PencilSquareIcon
                  className="text-blue-600 cursor-pointer w-6 h-6 hover:text-blue-800"
                  onClick={() => handleEdit(guest.id)}
                />
                <TrashIcon
                  className="text-red-600 cursor-pointer w-6 h-6 hover:text-red-800"
                  onClick={() => handleDelete(guest.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: String(Math.max(currentPage - 1, 1)),
              }).toString()}`}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?${new URLSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: pageNum.toString(),
                  }).toString()}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: String(Math.min(currentPage + 1, totalPages)),
              }).toString()}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <CustomDialog
        open={isOpenDelete}
        onClose={setIsOpenDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this guest? This action cannot be undone."
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpenDelete(false)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        }
      />

      <CustomDialog
        open={openForm}
        onClose={setOpenForm}
        title="Edit Profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Tamu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="No Hp" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="isPresent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hadir?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "true" : "false"}
                      onValueChange={(val) => field.onChange(val === "true")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="hadir" />
                        <Label htmlFor="hadir">Hadir</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="tidak-hadir" />
                        <Label htmlFor="tidak-hadir">Belum hadir</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              onClick={() => setOpenForm(false)}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CustomDialog>
    </div>
  );
}
