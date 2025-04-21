import { z } from "zod";

export const EditGuestFormSchema = z.object({
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
});

export type editGuestForm = {
  name: string;
  phone: string;
  isPresent: boolean;
};
