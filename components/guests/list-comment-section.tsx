export default function ListCommentSection() {
  const sampleData = [
    { id: 1, user: "User 1", comment: "This is the first comment." },
    { id: 2, user: "User 2", comment: "Great post! Keep it up." },
    { id: 3, user: "User 3", comment: "I totally agree with this." },
    { id: 4, user: "User 4", comment: "Interesting perspective!" },
    {
      id: 5,
      user: "User 5",
      comment: "Looking forward to more posts like this.",
    },
    { id: 6, user: "User 6", comment: "This is so helpful, thanks!" },
    { id: 7, user: "User 7", comment: "I have a few questions about this..." },
    { id: 8, user: "User 8", comment: "Awesome content!" },
    {
      id: 9,
      user: "User 9",
      comment: "Can you share more details about this topic?",
    },
    { id: 10, user: "User 10", comment: "I don't agree with this opinion." },
  ];

  return (
    <section className="px-8 py-6">
      <div className="h-[450px] bg-gray-200 flex flex-col">
        <div className="bg-pink-600 text-white p-4 rounded-t-md">
          <h3 className="text-center text-lg">Ucapan Selamat</h3>
        </div>

        {/* Kontainer untuk list komentar yang bisa di-scroll */}
        <div className="overflow-y-auto flex-1 p-4 bg-gray-100">
          {/* List komentar */}
          <div className="space-y-4">
            {sampleData.map((data) => (
              <div key={data.id} className="p-4 bg-white shadow-md rounded-md">
                <p>
                  <strong>{data.user}:</strong> {data.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
