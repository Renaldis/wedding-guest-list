"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/useWeddingStore";
import { useEffect } from "react";

const verseSchema = z.object({
  verseText: z.string().min(1, "Judul wajib diisi"),
  verseSource: z.string().min(1, "Isi ayat wajib diisi"),
});

type VerseFormData = z.infer<typeof verseSchema>;

type NextTab = {
  onNextTab: () => void;
};

export default function VerseForm({ onNextTab }: NextTab) {
  const { verse, updateVerse } = useWeddingStore();

  const handleNext = () => {
    onNextTab();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerseFormData>({
    resolver: zodResolver(verseSchema),
    defaultValues: verse,
  });

  const onSubmit = (data: VerseFormData) => {
    updateVerse(data);
    handleNext();
    console.log("Verse Data Saved:", data);
  };
  useEffect(() => {
    // Cek apakah sudah ada data, jika belum set default
    if (!verse.verseText && !verse.verseSource) {
      updateVerse({
        verseText:
          "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
        verseSource: "Q.S Ar-Rum · Ayat 21",
      });
    }
  }, []);
  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Judul Ayat atau Kata Pembuka */}
      <div>
        <Label htmlFor="verseSource" className="mb-2">
          Judul Ayat / Kata Pembuka
        </Label>
        <Input
          id="verseSource"
          {...register("verseSource")}
          placeholder="Contoh: QS. Ar-Rum: 21"
        />
        {errors.verseSource && (
          <p className="text-sm text-red-500">{errors.verseSource.message}</p>
        )}
      </div>

      {/* Isi Ayat atau Kata */}
      <div>
        <Label htmlFor="verseText" className="mb-2">
          Isi Ayat / Kata Pembuka
        </Label>
        <Textarea
          id="verseText"
          {...register("verseText")}
          placeholder="Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri ..."
          rows={4}
        />
        {errors.verseText && (
          <p className="text-sm text-red-500">{errors.verseText.message}</p>
        )}
      </div>

      <div className="w-full grid md:grid-cols-2">
        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </div>
    </form>
  );
}
