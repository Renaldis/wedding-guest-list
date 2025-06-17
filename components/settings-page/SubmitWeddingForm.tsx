"use client";

import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/useWeddingStore";
import { useState } from "react";
import axios from "axios";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

export default function SubmitWeddingForm() {
  const { couple, parents, verse, events, media, closing } = useWeddingStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]); // ⬅️ Menyimpan error validasi

  const validateFormData = () => {
    const validationErrors: string[] = [];

    // Couple
    if (!couple.groomName.trim() || !couple.brideName.trim()) {
      validationErrors.push("Nama mempelai pria dan wanita wajib diisi.");
    }

    // Parents
    if (
      !parents.groomFather.trim() ||
      !parents.groomMother.trim() ||
      !parents.brideFather.trim() ||
      !parents.brideMother.trim()
    ) {
      validationErrors.push(
        "Nama lengkap ayah dan ibu dari kedua mempelai wajib diisi."
      );
    }

    // Verse
    if (!verse.verseText.trim() || !verse.verseSource.trim()) {
      validationErrors.push("Teks dan sumber ayat wajib diisi.");
    }

    // Events
    if (events.length === 0) {
      validationErrors.push("Minimal satu acara harus ditambahkan.");
    } else {
      events.forEach((event, index) => {
        if (
          !event.title.trim() ||
          !event.date.trim() ||
          !event.startTime.trim() ||
          !event.endTime.trim() ||
          !event.street.trim() ||
          !event.fullAddress.trim()
        ) {
          validationErrors.push(
            `Semua field acara ke-${index + 1} wajib diisi.`
          );
        }
      });
    }

    // Media
    if (!media.heroImage) {
      validationErrors.push("Hero image wajib dipilih.");
    }

    // Closing
    if (!closing.closingTitle.trim() || !closing.closingMessage.trim()) {
      validationErrors.push("Judul dan pesan penutup wajib diisi.");
    }

    return validationErrors;
  };

  const handleSubmit = async () => {
    setErrors([]);
    setSuccess(false);
    const validationErrors = validateFormData();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // 1. Upload semua file ke Cloudinary
      const [
        groomPhotoUrl,
        bridePhotoUrl,
        heroImageUrl,
        invitationBgUrl,
        closingImageUrl,
      ] = await Promise.all([
        couple.groomPhoto ? uploadToCloudinary(couple.groomPhoto) : null,
        couple.bridePhoto ? uploadToCloudinary(couple.bridePhoto) : null,
        media.heroImage ? uploadToCloudinary(media.heroImage) : null,
        media.invitationBackground
          ? uploadToCloudinary(media.invitationBackground)
          : null,
        media.closingImage ? uploadToCloudinary(media.closingImage) : null,
      ]);

      const payload = {
        couple: {
          ...couple,
          groomPhoto: groomPhotoUrl,
          bridePhoto: bridePhotoUrl,
        },
        parents,
        verse,
        events,
        media: {
          ...media,
          heroImage: heroImageUrl,
          invitationBackground: invitationBgUrl,
          closingImage: closingImageUrl,
        },
        closing,
      };

      console.log(payload);
      const res = await axios.post("/api/wedding", payload);
      if (res.status === 200) {
        setSuccess(true);
        console.log("Data berhasil dikirim ke backend:", payload);
      }
    } catch (err) {
      console.error("Gagal mengirim data:", err);
      setErrors(["Terjadi kesalahan saat mengirim data."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600"
      >
        {loading ? "Menyimpan..." : "Submit Semua Data"}
      </Button>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-2 space-y-1 mb-5">
          {errors.map((err, i) => (
            <p key={i}>⚠️ {err}</p>
          ))}
        </div>
      )}

      {success && (
        <p className="text-green-600 mt-2">✅ Data berhasil dikirim!</p>
      )}
    </div>
  );
}
