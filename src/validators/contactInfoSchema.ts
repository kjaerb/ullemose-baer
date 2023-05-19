import { z } from "zod";

const contactInfoSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email !== "", {
      message: "Indtast en gyldig email",
    }),
  phone: z
    .string()
    .min(8)
    .max(8)
    .refine((phone) => phone !== "", {
      message: "Indtast et gyldigt telefonnummer",
    }),
  firstName: z
    .string()
    .min(2)
    .refine((firstName) => firstName !== "", {
      message: "Fornavn skal minimum have 2 bogstaver",
    }),
  lastName: z
    .string()
    .min(2)
    .refine((lastName) => lastName !== "", {
      message: "Efternavn skal minimum have 2 bogstaver",
    }),
});

type ContactInfo = z.infer<typeof contactInfoSchema>;

export { contactInfoSchema };
export type { ContactInfo };
