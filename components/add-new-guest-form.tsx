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
import { CreateNewGuestSchema } from "@/lib/validators";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useEffect, useState, useTransition } from "react";
import { createGuest } from "@/lib/actions/guest.actions";
import Cookies from "js-cookie";

export default function AddNewGuestForm() {
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

  const form = useForm<z.infer<typeof CreateNewGuestSchema>>({
    resolver: zodResolver(CreateNewGuestSchema),
    defaultValues: {
      id: "",
      name: "",
      phone: "",
      isPresent: false,
      isAttending: false,
      updatedById: userId,
    },
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof CreateNewGuestSchema>) {
    startTransition(async () => {
      try {
        await createGuest({ ...values, updatedById: userId });

        alert("Tamu berhasil ditambahkan!");
        form.reset();
      } catch (err) {
        alert("Terjadi kesalahan saat submit.");
        console.error(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Nama Tamu" {...field} />
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
              <FormLabel>No. Hp</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan No. Hp Tamu" {...field} />
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "Mengirim..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
