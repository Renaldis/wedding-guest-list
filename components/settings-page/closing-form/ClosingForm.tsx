"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/useWeddingStore";

import { useEffect } from "react";

// Schema validasi
const closingSchema = z.object({
  closingTitle: z.string().min(1, "Judul penutup wajib diisi"),
  closingMessage: z.string().min(1, "Deskripsi penutup wajib diisi"),
});

type ClosingFormValues = z.infer<typeof closingSchema>;

export default function ClosingForm() {
  const { closing, updateClosing } = useWeddingStore();

  const form = useForm<ClosingFormValues>({
    resolver: zodResolver(closingSchema),
    defaultValues: {
      closingTitle: "",
      closingMessage: "",
    },
  });

  const onSubmit = (values: ClosingFormValues) => {
    updateClosing(values); // simpan ke zustand
    console.log("Data closing disimpan:", values);
  };
  useEffect(() => {
    if (!closing.closingTitle && !closing.closingMessage) {
      const defaultData = {
        closingTitle: "Thank You",
        closingMessage: "Thank you for your prayers and presence.",
      };
      updateClosing(defaultData);
      form.reset(defaultData); // reset form dengan data default
    } else {
      form.reset(closing); // pastikan form sinkron dengan store saat mount
    }
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          {/* Judul Penutup */}
          <FormField
            control={form.control}
            name="closingTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Penutup</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Terima Kasih" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Deskripsi Penutup */}
          <FormField
            control={form.control}
            name="closingMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Penutup</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contoh: Kami mengucapkan terima kasih atas doa dan restunya."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full grid md:grid-cols-2">
            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
