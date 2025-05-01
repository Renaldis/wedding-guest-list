import { $Enums } from "@prisma/client";

export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
};
