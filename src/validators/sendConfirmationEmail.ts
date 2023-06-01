import { z } from "zod";

const sendConfirmationEmailSchema = z.object({
  to: z.string().email(),
  html: z.string(),
});

type ConfirmationEmail = z.infer<typeof sendConfirmationEmailSchema>;

export { sendConfirmationEmailSchema };

export type { ConfirmationEmail };
