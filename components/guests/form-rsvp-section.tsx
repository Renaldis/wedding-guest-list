"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GuestPropClient } from "@/types";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { formSchemaRSVP } from "@/lib/validators";
import { editGuestByCode } from "@/lib/actions/guest.actions";

export default function FormRSVPSection({ guest }: { guest: GuestPropClient }) {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [maksChar, setMaksChar] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchemaRSVP>>({
    resolver: zodResolver(formSchemaRSVP),
    defaultValues: {
      id: "",
      name: "",
      rsvpCode: "",
      phone: "",
      greetingMessage: "",
      isAttending: undefined,
      isRSVPed: false,
    },
  });
  const { formState } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (guest) {
      form.reset({
        id: guest.id || "",
        name: guest.name || "",
        rsvpCode: guest.rsvpCode || "",
        phone: guest.phone || "",
        greetingMessage: guest.greetingMessage || "",
        isAttending:
          guest.isAttending !== null && guest.isAttending !== undefined
            ? guest.isAttending
            : undefined,
        isRSVPed: guest.isRSVPed || false,
      });
      setIsSubmitted(guest.isRSVPed);
    }
    if (guest.rsvpCode) {
      setIsDisabled(true);
    }
  }, [guest, form]);

  async function onSubmit(values: z.infer<typeof formSchemaRSVP>) {
    try {
      await editGuestByCode(values);
      setIsSubmitted(true);
      alert("success");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError(String(error));
    }
  }

  return (
    <div className="p-6 text-center min-h-screen">
      <h1 className="text-2xl mb-5">RSVP</h1>
      <div className="mb-6 text-sm text-gray-600">
        <p>
          <strong>Perhatian:</strong> Anda hanya dapat mengonfirmasi kehadiran
          sekali. Setelah melakukan konfirmasi, Anda tidak dapat mengubah
          pilihan kehadiran Anda. Pastikan informasi yang Anda isi sudah benar
          sebelum menekan tombol konfirmasi.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="rsvpCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code RSVP Anda</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Code RSVP yang sudah diberikan"
                    {...field}
                    className="bg-white"
                    disabled={isSubmitted || isDisabled}
                  />
                </FormControl>
                <FormMessage className="m-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nama"
                    {...field}
                    className="bg-white"
                    disabled={isSubmitted}
                  />
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
                <FormLabel>No HP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="No HP"
                    {...field}
                    className="bg-white"
                    disabled={isSubmitted}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAttending"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Kehadiran</FormLabel>
                <FormControl>
                  <Select
                    value={
                      field.value === undefined
                        ? ""
                        : field.value
                        ? "true"
                        : "false"
                    }
                    onValueChange={(val) => field.onChange(val === "true")}
                    disabled={isSubmitted}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Pilih konfirmasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Hadir</SelectItem>
                      <SelectItem value="false">Tidak Hadir</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="greetingMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ucapan Selamat</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Berikan Ucapan Selamat Anda"
                    {...field}
                    className="bg-white"
                    disabled={isSubmitted}
                    onChange={(e) => {
                      field.onChange(e);
                      setMaksChar(e.target.value.length);
                    }}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-gray-500 block text-start">
                  Huruf yang tersisa : {300 - maksChar} Karakter
                </p>
              </FormItem>
            )}
          />
          {error && <p className="text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitted}
          >
            {isSubmitting ? "Konfirmasi..." : "Konfirmasi"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
