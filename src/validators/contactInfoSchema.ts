import { z } from "zod";

const danishPhoneNumberRegex = /^(?:\+45|0045|0)?(\d{8})$/;

const contactInfoSchema = z.object({
  email: z.string().email("Ugyldig email"),
  phone: z.string().refine((value) => danishPhoneNumberRegex.test(value), {
    message: "Ugyldigt telefonnummer",
  }),
  firstName: z
    .string()
    .min(2, "Dit fornavn skal være mindst 2 bogstaver langt"),
  lastName: z
    .string()
    .min(2, "Dit efternavn skal være mindst 2 bogstaver langt"),
});

type ContactInfo = z.infer<typeof contactInfoSchema>;

export { contactInfoSchema };
export type { ContactInfo };
