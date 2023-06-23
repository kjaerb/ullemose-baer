"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Form as FormProvider } from "@/components/ui/Form";
import { useFieldArray, useForm } from "react-hook-form";
import { Order, orderSchema } from "@/validators/orderSchema";
import { FruitSelector } from "./FruitSelector";
import { TermsAndConditions } from "./TermsAndConditions";
import { NameFormFields } from "./NameFormFields";
import { ContactFormFields } from "./ContactFormFields";
import { AddMore } from "../AddMore";
import { Fruit, fruitNameArray } from "@/validators/fruitSchema";
import { useAddOrderToFirebase } from "@/hooks/useOrders";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { render } from "@react-email/render";
import UllemoseEmail from "@/react-email/emails/ullemose-confirm";
import { Loading } from "../Loading";
import { useSendEmail } from "@/hooks/useSendEmail";

export function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      fruitOrder: [{ name: "Solbær", kg: 5 }],
    },
  });

  const { control } = form;

  const {
    fields: orders,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "fruitOrder",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col shadow-md w-full rounded-md border p-4 my-4"
      >
        <NameFormFields form={form} />
        <ContactFormFields form={form} />

        <div className="mx-auto flex flex-col items-center">
          <h2 className="text-xl font-semibold">Frugtbestilling</h2>
          <p className="text-sm">
            Du kan godt lave flere bestillinger på samme bær
          </p>
        </div>

        {orders.map((order, i) => (
          <FruitSelector
            key={order.id}
            form={form}
            fruitName={`fruitOrder.${i}.name`}
            kgName={`fruitOrder.${i}.kg`}
            handleDelete={() => removeOrder(i)}
            canDeleteOrder={orders.length === 1}
          ></FruitSelector>
        ))}

        <div className="mx-auto">
          <AddMore className="mx-auto cursor-pointer" onClick={addOrder} />
        </div>

        <div className="mx-auto">
          <TermsAndConditions form={form} />
        </div>
        <Button
          variant="green"
          type="submit"
          className="mx-2"
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : "Send"}
        </Button>
      </form>
    </FormProvider>
  );

  function findFirstMissingName(orders: Fruit[]) {
    const existingNames = orders.map((order) => order.name);

    for (let name of fruitNameArray) {
      if (!existingNames.includes(name)) {
        return name;
      }
    }

    return null;
  }

  function removeOrder(index: number) {
    if (orders.length === 1) return;

    remove(index);
  }

  async function addOrder() {
    const missingName = findFirstMissingName(orders);

    append({ name: missingName ? missingName : "Solbær", kg: 5 });
  }

  async function onSubmit(data: Order) {
    try {
      setIsLoading(true);

      const addedOrder = await useAddOrderToFirebase(data);

      const response = await useSendEmail({
        to: addedOrder.newOrder.contactInfo.email,
        html: render(
          <UllemoseEmail
            order={addedOrder.newOrder}
            orderId={addedOrder.newOrder.orderId.toString()}
          />
        ),
      });

      if (response.status === 200) {
        router.push("/success");
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  }
}
