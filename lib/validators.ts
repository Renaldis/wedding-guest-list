import { z } from "zod";

export const EditGuestFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Min 3 karakter." })
    .max(50, { message: "Maks 50 karakter." })
    .nonempty({ message: "Nama harus diisi!" }),
  phone: z
    .string()
    .regex(/^08[1-9][0-9]{7,10}$/, { message: "No Telpon Tidak Valid" })
    .nonempty({ message: "wajib isi no telepon!" }),
  isPresent: z.boolean(),
  updatedById: z.string().nullable(),
});
export const EditUserFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Min 3 karakter." })
    .max(50, { message: "Maks 50 karakter." })
    .nonempty({ message: "Nama harus diisi!" }),
  email: z.string().nonempty({ message: "wajib isi no telepon!" }),
  password: z.string(),
});

export type editGuestForm = {
  id: string;
  name: string;
  phone: string;
  isPresent: boolean;
  updatedById: string | null;
};

export const CreateNewGuestSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Min 3 karakter." })
    .max(50, { message: "Maks 50 karakter." })
    .nonempty({ message: "Nama harus diisi!" }),
  phone: z
    .string()
    .regex(/^08[1-9][0-9]{7,10}$/, { message: "No Telpon Tidak Valid" })
    .nonempty({ message: "wajib isi no telepon!" }),
  isPresent: z.boolean(),
  isAttending: z.boolean(),
  updatedById: z.string().nullable(),
});

export type createGuestForm = {
  id: string;
  name: string;
  phone: string;
  isPresent: boolean;
  updatedById: string | null;
};

// sisi tamu
export const formSchemaRSVP = z.object({
  id: z.string(),
  rsvpCode: z.string().nonempty({ message: "Code RSVP harus diisi." }),
  name: z.string().nonempty({ message: "Nama lengkap harus diisi." }),
  phone: z
    .string()
    .regex(/^08[1-9][0-9]{7,10}$/, { message: "No Telpon Tidak Valid" })
    .nonempty({ message: "wajib isi no telepon!" }),
  GuestComment: z.object({
    message: z.string().max(300, { message: "Maksimal 300 karakter" }),
  }),
  isAttending: z.boolean(),
  isRSVPed: z.boolean(),
});

export type editGuestFormByCode = {
  id: string;
  rsvpCode: string;
  name: string;
  phone: string;
  isAttending: boolean;
  GuestComment?: {
    message: string | null;
  };
  isRSVPed: boolean;
};
