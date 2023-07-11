import { z } from "zod";
import { contactInfoSchema } from "./contactInfoSchema";
import { fruitSchema } from "./fruitSchema";
import { Timestamp, serverTimestamp } from "firebase/firestore";

const orderSchema = z.object({
  contactInfo: contactInfoSchema,
  fruitOrder: z.array(fruitSchema),
  termsAccepted: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Du skal acceptere betingelserne",
    }),
});

const firebaseOrderSchema = orderSchema.extend({
  orderId: z.number(),
  createdAt: z.custom<Timestamp>(),
  id: z.string().optional(),
});

type Order = z.infer<typeof orderSchema>;

type FirebaseOrder = z.infer<typeof firebaseOrderSchema>;

export { orderSchema, firebaseOrderSchema };

export type { Order, FirebaseOrder };
