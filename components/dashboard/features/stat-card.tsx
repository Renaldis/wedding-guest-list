import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  UserGroupIcon,
  DocumentCheckIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/solid";

type StatData = {
  totalGuest: number;
  totalConfirmRSVP: number;
  totalPresent: number;
  totalNotPresent: number;
  totalAttending: number;
};

export default function StatCard({ statData }: { statData: StatData }) {
  const data = [
    {
      icon: UserGroupIcon,
      title: "Jumlah Tamu",
      value: statData.totalGuest,
      bg_color: "bg-sky-200",
    },
    {
      icon: DocumentCheckIcon,
      title: "Konfirmasi Kehadiran",
      value: statData.totalConfirmRSVP,
      bg_color: "bg-yellow-100",
    },
    {
      icon: HandThumbUpIcon,
      title: "Tamu Hadir",
      value: statData.totalPresent,
      bg_color: "bg-green-200",
    },
    {
      icon: HandThumbDownIcon,
      title: "Tamu Belum Hadir",
      value: statData.totalNotPresent,
      bg_color: "bg-red-200",
    },
  ];
  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className={`shadow-lg rounded-lg relative pt-10 ${item.bg_color}`}
              >
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                </div>

                <CardHeader className="text-center">
                  <p className="text-sm font-semibold text-gray-800 mt-3">
                    {item.title}
                  </p>
                </CardHeader>

                <CardContent className="flex justify-center items-center">
                  <p className="font-medium text-xl text-gray-900">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500">No Data</div>
      )}
    </>
  );
}
