import { z } from "zod";

const fruitSchema = z.object({
  name: z.enum(["Solbær", "Ribs"]),
  kg: z
    .number()
    .positive()
    .min(5, "Du må minimum forudbestille 5kg")
    .max(30, "Du kan maks forudbestille 30kg"),
});

const fruitNameArray = fruitSchema.shape.name._def.values;

const fruitOrderSchema = z.array(fruitSchema).min(1);

type FruitOrder = z.infer<typeof fruitOrderSchema>;

type Fruit = z.infer<typeof fruitSchema>;

export { fruitSchema, fruitOrderSchema, fruitNameArray };

export type { FruitOrder, Fruit };
