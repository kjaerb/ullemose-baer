"use client";

import { Button } from "./Button";
import { Input } from "./Input";
import { FruitSelector } from "./FruitSelector";
import { Fruit, fruitNameArray } from "@/validators/fruitSchema";
import { AddMore } from "./AddMore";
import { firestore } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { cn } from "@/lib/cn";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, orderSchema } from "@/validators/orderSchema";
import { useRouter } from "next/navigation";

interface FormProps extends React.ComponentProps<"form"> {}

export function Form({ className, ...props }: FormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fruitOrder: [{ name: "Solbær", kg: 5 }],
    },
  });

  const {
    fields: orders,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "fruitOrder",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      {...props}
      className={cn(
        "flex flex-col shadow-md w-full rounded-md border p-4 my-4",
        className
      )}>
      <p className='mx-auto mt-4 text-xl'>Indtast dine informationer</p>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <Input
          {...register("contactInfo.firstName")}
          error={errors.contactInfo?.firstName}
          label='Fornavn'
          autoComplete='given-name'
        />
        <Input
          {...register("contactInfo.lastName")}
          error={errors.contactInfo?.lastName}
          label='Efternavn'
          autoComplete='family-name'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <Input
          {...register("contactInfo.email")}
          error={errors.contactInfo?.email}
          label='Email'
          type='email'
          autoComplete='email'
        />
        <Input
          {...register("contactInfo.phone")}
          error={errors.contactInfo?.phone}
          label='Tlf nummer'
          autoComplete='phone'
          type='number'
          inputMode='numeric'
          pattern='[0-9]+'
        />
      </div>
      <p className='mx-auto mt-4'>Vælg bær og mængde.</p>

      {orders.map((order, i) => (
        <FruitSelector
          register={register}
          errors={{
            error1: errors.fruitOrder?.[i]?.name,
            error2: errors.fruitOrder?.[i]?.kg,
          }}
          handleDelete={() => removeOrder(i)}
          canDeleteOrder={orders.length === 1}
          number={i}
          key={order.id}
        />
      ))}

      {orders.length < fruitNameArray.length && (
        <div className='mx-auto'>
          <AddMore className='mx-auto m-2' onClick={addOrder} />
        </div>
      )}
      <Button aria-label='Send ordre' className='w-1/4 mx-auto' type='submit'>
        Send
      </Button>
    </form>
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

    append({ name: missingName ? missingName : "Solbær", kg: 5 });
  }

  function removeOrder(index: number) {
    if (orders.length === 1) return;

    remove(index);
  }

  function onSubmit(data: Order) {
    const parsedOrders = orderSchema.safeParse(data);

    if (!parsedOrders.success) {
      console.log(parsedOrders.error);
      return;
    }

    const ordersRef = collection(firestore, "orders");

    addDoc(ordersRef, { ...parsedOrders.data, createdAt: Date.now() })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        router.push("/success");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}