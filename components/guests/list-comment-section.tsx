"use client";

import { GuestPropClient } from "@/types";

export default function ListCommentSection({
  messages,
}: {
  messages: GuestPropClient[];
}) {
  return (
    <section className="px-8 py-3 md:py-6 pb-28">
      <div className="h-[450px] bg-gray-200 flex flex-col">
        <div className="bg-pink-600 text-white p-4 rounded-t-md">
          <h3 className="text-center text-lg">Ucapan Selamat</h3>
        </div>

        {/* Kontainer untuk list komentar yang bisa di-scroll */}
        <div className="overflow-y-auto flex-1 p-4 bg-gray-100">
          {/* List komentar */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-4 bg-white shadow-md rounded-md"
              >
                <p>
                  <strong>{message.name}:</strong> {message.greetingMessage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
