import Countdown from "react-countdown";

export default function CountdownTimer() {
  return (
    <Countdown
      date={new Date("2025-08-28T00:00:00")}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <span className="text-xl font-semibold text-green-600">
              Acara Dimulai!
            </span>
          );
        }

        const timeItems = [
          { label: "Hari", value: days },
          { label: "Jam", value: hours },
          { label: "Menit", value: minutes },
          { label: "Detik", value: seconds },
        ];

        return (
          <div className="flex justify-center gap-4 mt-4">
            {timeItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-pink-100 text-pink-800 rounded-t-full w-20 h-20 flex flex-col items-center justify-center shadow-sm"
              >
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
