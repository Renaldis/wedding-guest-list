import { Guest, User } from "@prisma/client";

export type LogWithRelation = {
  id: string;
  action: string;
  createdAt: Date;
  user: User | null;
  guest: Guest | null;
};
