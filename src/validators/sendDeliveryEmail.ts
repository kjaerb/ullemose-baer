import { z } from "zod";

const sendDeliveryEmail = z.object({
  to: z.string().email(),
  html: z.string(),
});

type DeliveryEmail = z.infer<typeof sendDeliveryEmail>;

export { sendDeliveryEmail };

export type { DeliveryEmail };
