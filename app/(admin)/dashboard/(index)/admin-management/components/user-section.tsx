import { Users } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  users: Users[];
  onDelete: (id: string) => void;
  onPromote?: (id: string) => void;
};

export default function UserSection({
  title,
  users,
  onDelete,
  onPromote,
}: Props) {
  return (
    <div className="space-y-4 mb-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => {
          return (
            <Card className="shadow-md flex-1/2" key={user.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm mt-1">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {user.role}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  {user.role === "RESEPSIONIS" && onPromote && (
                    <Button
                      variant="outline"
                      onClick={() => onPromote(user.id)}
                      className="cursor-pointer"
                    >
                      Jadikan Admin
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(user.id)}
                    className="cursor-pointer"
                  >
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
