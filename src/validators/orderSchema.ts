import { z } from "zod";
import { contactInfoSchema } from "./contactInfoSchema";
import { fruitSchema } from "./fruitSchema";
import { Timestamp } from "firebase/firestore";

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
  createdAt: z.custom<Timestamp | Date>(),
  id: z.string().optional(),
  emailsReceived: z.number().default(0).optional(),
  emailsReference: z.array(z.string()).default([]).optional(),
});

type Order = z.infer<typeof orderSchema>;

type FirebaseOrder = z.infer<typeof firebaseOrderSchema>;

export { orderSchema, firebaseOrderSchema };

export type { Order, FirebaseOrder };
