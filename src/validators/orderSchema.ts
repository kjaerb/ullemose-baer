import { z } from "zod";
import { contactInfoSchema } from "./contactInfoSchema";
import { fruitSchema } from "./fruitSchema";

const orderSchema = z.object({
  contactInfo: contactInfoSchema,
  fruitOrder: z.array(fruitSchema),
});

type Order = z.infer<typeof orderSchema>;

export { orderSchema };

export type { Order };
