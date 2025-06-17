"use client";

import { useState } from "react";
import ClosingForm from "@/components/settings-page/closing-form/ClosingForm";
import CoupleForm from "@/components/settings-page/couple-form/CoupleForm";
import EventForm from "@/components/settings-page/event-form/EventForm";
import MediaForm from "@/components/settings-page/media-form/MediaForm";
import ParentsForm from "@/components/settings-page/parents-form/ParentsForm";
import VerseForm from "@/components/settings-page/verse-form/VerseForm";
import SubmitWeddingForm from "@/components/settings-page/SubmitWeddingForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeddingStore } from "@/store/useWeddingStore";

export default function WeddingTabs() {
  const [activeTab, setActiveTab] = useState("couple");
  const { couple } = useWeddingStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-md shadow p-3 text-center w-full max-w-5xl mx-auto">
        <h2 className="text-xl font-bold">Pengaturan Halaman Undangan</h2>
      </div>
      <Tabs
        defaultValue="couple"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-5"
      >
        <div className="bg-white rounded-md shadow p-3 w-full max-w-5xl mx-auto mb-20 md:mb-5 lg:mb-5 xl:mb-0">
          <TabsList className="flex flex-wrap w-full gap-2 justify-center">
            <TabsTrigger value="couple">Data Pasangan</TabsTrigger>
            <TabsTrigger value="parents">Data Orang Tua</TabsTrigger>
            <TabsTrigger value="verse">Ayat / Kata Pembuka</TabsTrigger>
            <TabsTrigger value="event">Detail Acara</TabsTrigger>
            <TabsTrigger value="media">Media / Gambar Tema</TabsTrigger>
            <TabsTrigger value="closing">Ucapan Penutup</TabsTrigger>
          </TabsList>
        </div>
        <div className="bg-white rounded-md shadow p-3 w-full max-w-5xl mx-auto">
          <TabsContent value="couple">
            <CoupleForm onNextTab={() => setActiveTab("parents")} />
          </TabsContent>
          <TabsContent value="parents">
            <ParentsForm onNextTab={() => setActiveTab("verse")} />
          </TabsContent>
          <TabsContent value="verse">
            <VerseForm onNextTab={() => setActiveTab("event")} />
          </TabsContent>
          <TabsContent value="event">
            <EventForm onNextTab={() => setActiveTab("media")} />
          </TabsContent>
          <TabsContent value="media">
            <MediaForm onNextTab={() => setActiveTab("closing")} />
          </TabsContent>
          <TabsContent value="closing">
            <ClosingForm />
          </TabsContent>
        </div>
      </Tabs>
      {/* Kondisi untuk menampilkan tombol Submit */}
      {activeTab === "closing" && (
        <div className="w-full flex">
          <SubmitWeddingForm />
        </div>
      )}
    </div>
  );
}
