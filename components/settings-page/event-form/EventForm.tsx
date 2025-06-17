"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useWeddingStore } from "@/store/useWeddingStore";
import { useEffect } from "react";

const eventDetailSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  startTime: z.string().min(1, "Jam mulai wajib diisi"),
  endTime: z.string().min(1, "Jam berakhir wajib diisi"),
  street: z.string().min(1, "Nama jalan wajib diisi"),
  fullAddress: z.string().min(1, "Alamat lengkap wajib diisi"),
  mapUrl: z.string().url("Masukkan URL yang valid"),
});

const formSchema = z.object({
  events: z.array(eventDetailSchema).min(1, "Minimal 1 acara"),
});

type EventFormValues = z.infer<typeof formSchema>;

type NextTab = {
  onNextTab: () => void;
};
const DEFAULT_EVENT = {
  title: "Akad Nikah",
  date: "2025-07-20",
  startTime: "08:00",
  endTime: "10:00",
  street: "Jl. Kenangan Indah",
  fullAddress: "Jl. Kenangan Indah No. 123, Jakarta Selatan, DKI Jakarta",
  mapUrl: "https://maps.app.goo.gl/examplelink",
};
export default function EventForm({ onNextTab }: NextTab) {
  const { events, updateEvents } = useWeddingStore();

  const handleNext = () => {
    onNextTab();
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      events: events.length
        ? events
        : [
            {
              title: "",
              date: "",
              startTime: "",
              endTime: "",
              street: "",
              fullAddress: "",
              mapUrl: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  const onSubmit = (data: EventFormValues) => {
    updateEvents(data.events);
    handleNext();
    console.log("Disimpan ke store:", data.events);
  };
  useEffect(() => {
    if (!events || events.length === 0) {
      updateEvents([DEFAULT_EVENT]);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border p-4 rounded-md relative grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute right-2 top-2 text-red-500"
            title="Hapus acara"
          >
            <Trash2 size={16} />
          </button>

          <div className="col-span-full">
            <Label htmlFor={`events.${index}.title`} className="mb-2">
              Judul Acara
            </Label>
            <Input
              id={`events.${index}.title`}
              {...register(`events.${index}.title`)}
              placeholder="Contoh: Akad Nikah"
            />
            {errors.events?.[index]?.title && (
              <p className="text-sm text-red-500">
                {errors.events[index]?.title?.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`events.${index}.date`} className="mb-2">
              Tanggal Acara
            </Label>
            <Input
              type="date"
              id={`events.${index}.date`}
              {...register(`events.${index}.date`)}
            />
            {errors.events?.[index]?.date && (
              <p className="text-sm text-red-500">
                {errors.events[index]?.date?.message}
              </p>
            )}
          </div>

          <div className="w-full flex gap-5">
            <div className="flex-1">
              <Label htmlFor={`events.${index}.startTime`} className="mb-2">
                Jam Dimulai
              </Label>
              <Input
                type="time"
                id={`events.${index}.startTime`}
                {...register(`events.${index}.startTime`)}
              />
              {errors.events?.[index]?.startTime && (
                <p className="text-sm text-red-500">
                  {errors.events[index]?.startTime?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor={`events.${index}.endTime`} className="mb-2">
                Jam Berakhir
              </Label>
              <Input
                type="time"
                id={`events.${index}.endTime`}
                {...register(`events.${index}.endTime`)}
              />
              {errors.events?.[index]?.endTime && (
                <p className="text-sm text-red-500">
                  {errors.events[index]?.endTime?.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full">
            <Label htmlFor={`events.${index}.street`} className="mb-2">
              Nama Jalan
            </Label>
            <Input
              id={`events.${index}.street`}
              {...register(`events.${index}.street`)}
              placeholder="Jl. Kebon Jeruk Raya"
            />
            {errors.events?.[index]?.street && (
              <p className="text-sm text-red-500">
                {errors.events[index]?.street?.message}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <Label htmlFor={`events.${index}.fullAddress`} className="mb-2">
              Alamat Lengkap
            </Label>
            <Textarea
              id={`events.${index}.fullAddress`}
              rows={3}
              {...register(`events.${index}.fullAddress`)}
              placeholder="Jl. Kebon Jeruk Raya No. 17, Jakarta Barat, DKI Jakarta"
            />
            {errors.events?.[index]?.fullAddress && (
              <p className="text-sm text-red-500">
                {errors.events[index]?.fullAddress?.message}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <Label htmlFor={`events.${index}.mapUrl`} className="mb-2">
              Link Google Maps
            </Label>
            <Input
              id={`events.${index}.mapUrl`}
              {...register(`events.${index}.mapUrl`)}
              placeholder="https://maps.app.goo.gl/..."
            />
            {errors.events?.[index]?.mapUrl && (
              <p className="text-sm text-red-500">
                {errors.events[index]?.mapUrl?.message}
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              title: "",
              date: "",
              startTime: "",
              endTime: "",
              street: "",
              fullAddress: "",
              mapUrl: "",
            })
          }
        >
          + Tambah Acara
        </Button>

        <Button type="submit">Simpan Semua Acara</Button>
      </div>
    </form>
  );
}
