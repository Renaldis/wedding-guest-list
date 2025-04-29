import Countdown from "react-countdown";

export default function CountdownTimer() {
  return (
    <Countdown
      date={new Date("2025-05-28T00:00:00")}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>Acara Dimulai!</span>;
        } else {
          return (
            <div className="flex gap-5 text-center">
              <div className="flex-col">
                <p>{days}</p>
                <p>Hari</p>
              </div>
              <div className="flex-col">
                <p>{hours}</p>
                <p>Jam</p>
              </div>
              <div className="flex-col">
                <p>{minutes}</p>
                <p>Menit</p>
              </div>
              <div className="flex-col">
                <p>{seconds}</p>
                <p>Detik</p>
              </div>
            </div>
          );
        }
      }}
    />
  );
}
