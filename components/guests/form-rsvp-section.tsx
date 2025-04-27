"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { GuestProp } from "@/types";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

const formSchemaRSVP = z.object({
  id: z.string(),
  rsvpCode: z.string().nonempty({ message: "Code RSVP harus diisi." }),
  name: z.string().nonempty({ message: "Nama lengkap harus diisi." }),
  phone: z.string().nonempty({ message: "No HP Harus diisi." }),
  greetingMessage: z.string().max(300, { message: "Maksimal 300 karakter" }),
  isAttending: z.boolean(),
});

export default function FormRSVPSection({ guest }: { guest: GuestProp }) {
  const form = useForm<z.infer<typeof formSchemaRSVP>>({
    resolver: zodResolver(formSchemaRSVP),
    defaultValues: {
      id: "",
      name: "",
      rsvpCode: "",
      phone: "",
      greetingMessage: "",
      isAttending: undefined,
    },
  });

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
      });
    }
  }, [guest, form]);

  function onSubmit(values: z.infer<typeof formSchemaRSVP>) {
    console.log(values);
  }

  return (
    <div className="p-6 text-center min-h-screen">
      <h1 className="text-2xl mb-10">RSVP</h1>
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
                    placeholder="Code RSVP"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="Nama" {...field} className="bg-white" />
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
                  <Input placeholder="Nama" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
