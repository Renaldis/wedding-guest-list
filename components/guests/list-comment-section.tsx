"use client";

import { GuestComment } from "@/types";
import React from "react";

export default function ListCommentSection({
  messages,
}: {
  messages: GuestComment[];
}) {
  return (
    <section className="px-8 py-3 md:py-6 pb-28">
      <div className="h-[450px] bg-gray-200 flex flex-col">
        <div className="bg-pink-700 text-white p-4 rounded-t-md">
          <h3 className="text-center text-lg">Ucapan Selamat</h3>
        </div>

        {/* Kontainer untuk list komentar yang bisa di-scroll */}
        <div className="overflow-y-auto flex-1 p-4 bg-gray-100">
          {/* List komentar */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start">
                {/* Segitiga pointer */}
                <div className="w-0 h-0 border-t-[16px] border-b-[16px] border-r-[16px] border-t-transparent border-b-transparent border-r-white"></div>

                {/* Chat bubble */}
                <div className="p-4 bg-white shadow-md rounded-md ml-0 w-full">
                  <p>
                    <strong>{message.guest?.name}</strong>
                  </p>
                  <p>{message.message}</p>
                  <p className="text-xs text-gray-500">
                    {message.createdAt.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
