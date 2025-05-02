import { mutate } from "swr";
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
import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

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

  const [user, setUsers] = useState<Users>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);

  const handleEdit = async (id: string) => {
    const user = await axios.get(`/api/users/${id}`);

    setUsers(user.data);
    setOpenForm(true);
  };

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: UserForm) => {
    try {
      const response = await axios.patch(`/api/users/${data.id}`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      mutate("/api/users");
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }

    setOpenForm(false);
    setIsOpenPassword(false);
  };

  useEffect(() => {
    if (!openForm) {
      setIsOpenPassword(false);
    }
  }, [openForm]);
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
                    onClick={() => handleEdit(user.id)}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isOpenPassword ? (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <p
                className="text-sm text-red-600 cursor-pointer hover:text-red-800"
                onClick={() => setIsOpenPassword(true)}
              >
                Change Password?
              </p>
            )}

            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </CustomDialog>
    </div>
  );
}
