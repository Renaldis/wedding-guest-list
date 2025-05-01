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
  isPresent?: boolean;
  GuestComment?: {
    message: string | null;
  };
  updatedById?: string | null;
  updatedAt: Date;
  createdAt: Date;
};

export type GuestPropClient = {
  id: string;
  name: string;
  phone: string | null;
  rsvpCode: string;
  GuestComment?: {
    message: string | null;
  };
  isRSVPed: boolean;
  isAttending: boolean | null;
  isPresent?: boolean;
  updatedById?: string | null;
};

export type GuestComment = {
  id: string;
  message: string | null;
  createdAt: Date;
  updatedAt: Date;
  guest?: {
    name: string;
  } | null;
};
