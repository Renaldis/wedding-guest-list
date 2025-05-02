import { UserForm, Users } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/custom-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EditUserFormSchema } from "@/lib/validators";
import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";

type Props = {
  title: string;
  users: Users[];
  onDelete: (id: string) => void;
  onPromote?: (id: string) => void;
  onDemote?: (id: string) => void;
};

export default function UserSection({
  title,
  users,
  onDelete,
  onPromote,
  onDemote,
}: Props) {
  const form = useForm<z.infer<typeof EditUserFormSchema>>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleEdit = () => {
    setOpenForm(true);
  };

  const onSubmit = async (data: UserForm) => {
    console.log(data);
  };

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
                <div className="space-x-2 flex flex-col gap-2">
                  <PencilSquareIcon
                    onClick={handleEdit}
                    className="w-6 h-6 cursor-pointer"
                  />

                  <TrashIcon
                    onClick={() => onDelete(user.id)}
                    className="w-6 h-6 cursor-pointer text-red-600"
                  />
                  {user.role === "ADMIN" && onDemote && (
                    <UserMinusIcon
                      onClick={() => onDemote(user.id)}
                      className="w-6 h-6 cursor-pointer text-yellow-600"
                    />
                  )}
                  {user.role === "RESEPSIONIS" && onPromote && (
                    <UserPlusIcon
                      onClick={() => onPromote(user.id)}
                      className="w-6 h-6 cursor-pointer text-blue-600"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <CustomDialog
        open={openForm}
        onClose={setOpenForm}
        title="Edit Profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Tamu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="No Hp" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              onClick={() => setOpenForm(false)}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CustomDialog>
    </div>
  );
}
