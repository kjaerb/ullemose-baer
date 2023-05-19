import { z } from "zod";

const fruitSchema = z.object({
  name: z.enum(["-", "Solbær", "Ribs"]),
  kg: z.number().positive().min(5).max(30),
});

const fruitOrderSchema = z.array(fruitSchema).min(1).max(2);

type FruitOrder = z.infer<typeof fruitOrderSchema>;

type Fruit = z.infer<typeof fruitSchema>;

export { fruitSchema, fruitOrderSchema };

export type { FruitOrder, Fruit };
