"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/useWeddingStore";
import { useEffect } from "react";

const parentsSchema = z.object({
  groomFather: z.string().min(1, "Wajib diisi"),
  groomMother: z.string().min(1, "Wajib diisi"),
  brideFather: z.string().min(1, "Wajib diisi"),
  brideMother: z.string().min(1, "Wajib diisi"),
});

type ParentsFormData = z.infer<typeof parentsSchema>;

type NextTab = {
  onNextTab: () => void;
};

export default function ParentsForm({ onNextTab }: NextTab) {
  const { parents, updateParents } = useWeddingStore();

  const handleNext = () => {
    onNextTab();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentsFormData>({
    resolver: zodResolver(parentsSchema),
    defaultValues: parents,
  });

  const onSubmit = (data: ParentsFormData) => {
    updateParents(data);
    handleNext();
    console.log("Parents Data Saved:", data);
  };

  useEffect(() => {
    // Cek apakah sudah ada data, jika belum set default
    if (!parents.groomFather && !parents.groomFather) {
      updateParents({
        groomFather: "Renaldi Saputra",
        groomMother: "Amellia",
        brideFather: "Renaldi Saputra",
        brideMother: "Amellia",
      });
    }
  }, []);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Ayah Mempelai Pria */}
      <div>
        <Label htmlFor="groomFather" className="mb-2">
          Nama Ayah Mempelai Pria
        </Label>
        <Input
          id="groomFather"
          {...register("groomFather")}
          placeholder="Contoh: Bapak Ahmad"
        />
        {errors.groomFather && (
          <p className="text-sm text-red-500">{errors.groomFather.message}</p>
        )}
      </div>

      {/* Ibu Mempelai Pria */}
      <div>
        <Label htmlFor="groomMother" className="mb-2">
          Nama Ibu Mempelai Pria
        </Label>
        <Input
          id="groomMother"
          {...register("groomMother")}
          placeholder="Contoh: Ibu Siti"
        />
        {errors.groomMother && (
          <p className="text-sm text-red-500">{errors.groomMother.message}</p>
        )}
      </div>

      {/* Ayah Mempelai Wanita */}
      <div>
        <Label htmlFor="brideFather" className="mb-2">
          Nama Ayah Mempelai Wanita
        </Label>
        <Input
          id="brideFather"
          {...register("brideFather")}
          placeholder="Contoh: Bapak Joko"
        />
        {errors.brideFather && (
          <p className="text-sm text-red-500">{errors.brideFather.message}</p>
        )}
      </div>

      {/* Ibu Mempelai Wanita */}
      <div>
        <Label htmlFor="brideMother" className="mb-2">
          Nama Ibu Mempelai Wanita
        </Label>
        <Input
          id="brideMother"
          {...register("brideMother")}
          placeholder="Contoh: Ibu Dewi"
        />
        {errors.brideMother && (
          <p className="text-sm text-red-500">{errors.brideMother.message}</p>
        )}
      </div>
      <div className="w-full">
        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </div>
    </form>
  );
}
