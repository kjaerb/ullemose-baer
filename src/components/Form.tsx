"use client";

import { Button } from "./Button";
import { Input } from "./Input";
import { FruitSelector } from "./FruitSelector";
import { Fruit, fruitNameArray } from "@/validators/fruitSchema";
import { AddMore } from "./AddMore";
import { firestore } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { cn } from "@/lib/cn";
import {
  FormProvider,
  RegisterOptions,
  UseFormRegisterReturn,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, orderSchema } from "@/validators/orderSchema";
import { useState } from "react";

interface FormProps extends React.ComponentProps<"form"> {}

export function Form({ className, ...props }: FormProps) {
  const [orders, setOrders] = useState<Fruit[]>([{ name: "Ribs", kg: 10 }]);

  const methods = useForm<Order>({
    resolver: zodResolver(orderSchema),
  });

  const { register, handleSubmit } = methods;

  const formValues = useWatch({ control: methods.control });

  console.log(formValues);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        {...props}
        className={cn(
          "flex flex-col shadow-md w-full rounded-md border p-4 my-4",
          className
        )}>
        <p className='mx-auto mt-4 text-xl'>Indtast dine informationer</p>
        <div className='grid grid-cols-2'>
          <Input
            {...register("contactInfo.firstName")}
            label='Fornavn'
            autoComplete='given-name'
          />
          <Input
            {...register("contactInfo.lastName")}
            label='Efternavn'
            autoComplete='family-name'
          />
        </div>
        <div className='grid grid-cols-2'>
          <Input
            {...register("contactInfo.email")}
            label='Email'
            type='email'
            autoComplete='email'
          />
          <Input
            {...register("contactInfo.phone")}
            label='Tlf nummer'
            autoComplete='phone'
            type='number'
            inputMode='numeric'
            pattern='[0-9]+'
          />
        </div>
        <p className='mx-auto mt-4'>Vælg bær og mængde.</p>

        {orders.map((_, i) => (
          <FruitSelector
            register={register}
            handleDelete={() => removeOrder(i)}
            canDeleteOrder={orders.length === 1}
            number={i}
            key={i}
          />
        ))}

        {orders.length < fruitNameArray.length && (
          <AddMore className='mx-auto m-2' onClick={addOrder} />
        )}
        <Button aria-label='Send ordre' className='w-1/4 mx-auto' type='submit'>
          Send
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

  function addOrder() {
    const missingName = findFirstMissingName(orders);

    console.log(missingName);

    setOrders((orders) => [...orders, { name: "Ribs", kg: 5 }]);
  }

  function removeOrder(index: number) {
    if (orders.length === 1) return;

    setOrders((orders) => orders.filter((_, i) => i !== index));
  }

  function onSubmit(data: Order) {
    console.log("hello");
    console.log(data);
  }

  // async function handleOrder(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   const parsedOrders = fruitOrderSchema.safeParse(orders);
  //   const parsedInfo = contactInfoSchema.safeParse(contactInfo);
  //   console.log(orders, contactInfo);

  //   if (!parsedOrders.success) {
  //     console.log(parsedOrders.error);
  //     return;
  //   }

  //   if (!parsedInfo.success) {
  //     console.log(parsedInfo.error);
  //     return;
  //   }

  //   const ordersRef = collection(firestore, "orders");

  //   addDoc(ordersRef, { order: orders, contactInfo })
  //     .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // }
}
