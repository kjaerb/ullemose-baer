import { z } from "zod";

const contactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(8).max(8),
  firsName: z.string().min(2),
  lastName: z.string().min(2),
});

type ContactInfo = z.infer<typeof contactInfoSchema>;

export { contactInfoSchema };
export type { ContactInfo };
