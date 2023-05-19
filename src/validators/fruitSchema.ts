import { z } from "zod";

const fruitSchema = z.object({
  name: z.enum(["Solbær", "Ribs"]),
  kg: z.number().positive().min(5).max(30),
});

const fruitNameArray = fruitSchema.shape.name._def.values;

const fruitOrderSchema = z.array(fruitSchema).min(1);

type FruitOrder = z.infer<typeof fruitOrderSchema>;

type Fruit = z.infer<typeof fruitSchema>;

export { fruitSchema, fruitOrderSchema, fruitNameArray };

export type { FruitOrder, Fruit };
