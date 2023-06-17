import { z } from "zod";
import { contactInfoSchema } from "./contactInfoSchema";
import { fruitSchema } from "./fruitSchema";

const orderSchema = z.object({
  contactInfo: contactInfoSchema,
  fruitOrder: z.array(fruitSchema),
});

const firebaseOrderSchema = orderSchema.extend({
  orderId: z.number(),
  createdAt: z.unknown(),
});

type Order = z.infer<typeof orderSchema>;

type FirebaseOrder = z.infer<typeof firebaseOrderSchema>;

export { orderSchema, firebaseOrderSchema };

export type { Order, FirebaseOrder };
