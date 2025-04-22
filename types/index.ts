export type FormLogin = {
  email: string;
  password: string;
};

type Role = {
  admin: "Admin";
  resepsionis: "Resepsionis";
};

export type FormRegister = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type GuestProp = {
  id: string;
  name: string;
  phone: string | null;
  rsvpCode: string;
  isRSVPed: boolean;
  isAttending: boolean | null;
  isPresent: boolean;
  greetingMessage: string | null;
  updatedById: string | null;
  updatedAt: Date;
  createdAt: Date;
};
