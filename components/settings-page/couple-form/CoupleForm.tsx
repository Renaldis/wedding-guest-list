"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/useWeddingStore";

const coupleSchema = z.object({
  groomName: z.string().min(1, "Wajib diisi"),
  brideName: z.string().min(1, "Wajib diisi"),
  groomInstagram: z
    .string()
    .url("Format URL tidak valid")
    .optional()
    .or(z.literal("")),
  brideInstagram: z
    .string()
    .url("Format URL tidak valid")
    .optional()
    .or(z.literal("")),
  groomPhoto: z.any().optional(),
  bridePhoto: z.any().optional(),
});

type CoupleFormData = z.infer<typeof coupleSchema>;
type CoupleFormProps = {
  onNextTab?: () => void;
};

export default function CoupleForm({ onNextTab }: CoupleFormProps) {
  const { couple, updateCouple } = useWeddingStore();
  const [groomPreview, setGroomPreview] = useState<string | null>(null);
  const [bridePreview, setBridePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CoupleFormData>({
    resolver: zodResolver(coupleSchema),
    defaultValues: couple,
  });

  const handleNext = () => {
    onNextTab?.();
  };

  const onSubmit = (data: CoupleFormData) => {
    updateCouple({
      ...data,
      groomPhoto: data.groomPhoto?.[0] || null,
      bridePhoto: data.bridePhoto?.[0] || null,
    });
    handleNext();
    console.log("Couple Data Saved:", data);
  };

  // File preview handler
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  useEffect(() => {
    // Cek apakah sudah ada data, jika belum set default
    if (!couple.groomName && !couple.brideName) {
      updateCouple({
        groomName: "Renaldi Saputra",
        brideName: "Amellia",
        groomInstagram: "https://www.instagram.com/renaldiisptr/",
        brideInstagram: "https://www.instagram.com/_ameliarni/",
        groomPhoto: new File([], "groom.jpg"),
        bridePhoto: new File([], "bride.jpg"),
      });
    }
  }, []);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Nama Mempelai Pria */}
      <div>
        <Label htmlFor="groomName" className="mb-1">
          Nama Mempelai Pria
        </Label>
        <Input
          id="groomName"
          {...register("groomName")}
          placeholder="Contoh: Renaldi Saputra"
        />
        {errors.groomName && (
          <p className="text-sm text-red-500">{errors.groomName.message}</p>
        )}
      </div>

      {/* Nama Mempelai Wanita */}
      <div>
        <Label htmlFor="brideName" className="mb-1">
          Nama Mempelai Wanita
        </Label>
        <Input
          id="brideName"
          {...register("brideName")}
          placeholder="Contoh: Ayu Lestari"
        />
        {errors.brideName && (
          <p className="text-sm text-red-500">{errors.brideName.message}</p>
        )}
      </div>

      {/* Instagram Pria */}
      <div>
        <Label htmlFor="groomInstagram" className="mb-1">
          Instagram Pria
        </Label>
        <Input
          id="groomInstagram"
          {...register("groomInstagram")}
          placeholder="https://instagram.com/username"
        />
        {errors.groomInstagram && (
          <p className="text-sm text-red-500">
            {errors.groomInstagram.message}
          </p>
        )}
      </div>

      {/* Instagram Wanita */}
      <div>
        <Label htmlFor="brideInstagram" className="mb-1">
          Instagram Wanita
        </Label>
        <Input
          id="brideInstagram"
          {...register("brideInstagram")}
          placeholder="https://instagram.com/username"
        />
        {errors.brideInstagram && (
          <p className="text-sm text-red-500">
            {errors.brideInstagram.message}
          </p>
        )}
      </div>

      {/* Foto Hero Pria */}
      <div>
        <Label htmlFor="groomPhoto" className="mb-1">
          Foto Hero Pria
        </Label>
        <Input
          id="groomPhoto"
          type="file"
          accept="image/*"
          {...register("groomPhoto")}
          onChange={(e) => {
            handleFileChange(e, setGroomPreview);
            register("groomPhoto").onChange(e);
          }}
        />
        {groomPreview && (
          <Image
            src={groomPreview}
            alt="Preview Foto Pria"
            width={200}
            height={200}
            className="mt-2 rounded-md object-cover"
          />
        )}
      </div>

      {/* Foto Hero Wanita */}
      <div>
        <Label htmlFor="bridePhoto" className="mb-1">
          Foto Hero Wanita
        </Label>
        <Input
          id="bridePhoto"
          type="file"
          accept="image/*"
          {...register("bridePhoto")}
          onChange={(e) => {
            handleFileChange(e, setBridePreview);
            register("bridePhoto").onChange(e);
          }}
        />
        {bridePreview && (
          <Image
            src={bridePreview}
            alt="Preview Foto Wanita"
            width={200}
            height={200}
            className="mt-2 rounded-md object-cover"
          />
        )}
      </div>

      <div className="md:col-span-2">
        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </div>
    </form>
  );
}
