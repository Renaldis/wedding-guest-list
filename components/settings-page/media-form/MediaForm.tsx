"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWeddingStore } from "@/store/useWeddingStore";
import { useEffect, useState } from "react";
import { z } from "zod";

export const mediaSchema = z.object({
  heroImage: z.custom<File>((val) => val instanceof File, {
    message: "Wajib upload gambar",
  }),
  invitationBackground: z.custom<File>((val) => val instanceof File, {
    message: "Wajib upload gambar",
  }),
  closingImage: z.custom<File>((val) => val instanceof File, {
    message: "Wajib upload gambar",
  }),
});

export type MediaFormValues = z.infer<typeof mediaSchema>;

type NextTab = {
  onNextTab: () => void;
};

export default function MediaForm({ onNextTab }: NextTab) {
  const { updateMedia } = useWeddingStore();
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleNext = () => {
    onNextTab();
  };

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      heroImage: undefined,
      invitationBackground: undefined,
      closingImage: undefined,
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof MediaFormValues
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(field, file, { shouldValidate: true });
      setPreviews((prev) => {
        if (prev[field]) {
          URL.revokeObjectURL(prev[field]);
        }
        return {
          ...prev,
          [field]: URL.createObjectURL(file),
        };
      });
    }
  };

  const onSubmit = (data: MediaFormValues) => {
    updateMedia(data);
    handleNext();
    console.log("Data tersimpan di Zustand:", data);
  };

  // Cleanup URL object previews on unmount
  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        {/* Hero Image */}
        <FormField
          control={form.control}
          name="heroImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar Hero Awal</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "heroImage")}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
              {previews.heroImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previews.heroImage}
                  alt="Preview Hero"
                  className="mt-2 w-48 rounded-md"
                />
              )}
            </FormItem>
          )}
        />

        {/* Background Image */}
        <FormField
          control={form.control}
          name="invitationBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar Background Undangan</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "invitationBackground")}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
              {previews.invitationBackground && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previews.invitationBackground}
                  alt="Preview Background"
                  className="mt-2 w-48 rounded-md"
                />
              )}
            </FormItem>
          )}
        />

        {/* Closing Image */}
        <FormField
          control={form.control}
          name="closingImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar Penutup / Akhir</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "closingImage")}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
              {previews.closingImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previews.closingImage}
                  alt="Preview Closing"
                  className="mt-2 w-48 rounded-md"
                />
              )}
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
  );
}
