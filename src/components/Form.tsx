"use client";

import clsx from "clsx";
import { Button } from "./Button";
import { Input } from "./Input";
import { FruitSelector } from "./FruitSelector";
import { useState } from "react";
import { Fruit, fruitOrderSchema } from "@/validators/fruitSchema";
import { AddMore } from "./AddMore";
import { firestore } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ContactInfo, contactInfoSchema } from "@/validators/contactInfoSchema";

interface FormProps extends React.ComponentProps<"form"> {}

export function Form({ ...props }: FormProps) {
  const [orders, setOrders] = useState<Fruit[]>([{ name: "Solbær", kg: 5 }]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firsName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  return (
    <form
      onSubmit={handleOrder}
      {...props}
      className={clsx([
        "flex flex-col shadow-md w-full rounded-md border p-4 my-4",
        props.className,
      ])}>
      <p className='mx-auto mt-4 text-xl'>Indtast dine informationer</p>
      <div className='grid grid-cols-2'>
        <Input
          label='Fornavn'
          autoComplete='given-name'
          value={contactInfo.firsName}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, firsName: e.target.value })
          }
        />
        <Input
          label='Efternavn'
          autoComplete='family-name'
          value={contactInfo.lastName}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, lastName: e.target.value })
          }
        />
      </div>
      <div className='grid grid-cols-2'>
        <Input
          label='Email'
          type='email'
          autoComplete='email'
          value={contactInfo.email}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
        />
        <Input
          label='Tlf nummer'
          autoComplete='phone'
          type='number'
          inputMode='numeric'
          pattern='[0-9]+'
          value={contactInfo.phone}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, phone: e.target.value })
          }
        />
      </div>
      <p className='mx-auto mt-4'>Vælg bær og mængde.</p>
      {orders.map((order, i) => (
        <FruitSelector
          order={order}
          handleSelectChange={handleSelectChange}
          index={i}
          key={i}
        />
      ))}
      {orders.length < 2 && <AddMore onClick={addOrder} />}
      <Button className='w-1/4'>Send</Button>
    </form>
  );

  function handleSelectChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) {
    const { name, value } = e.target;

    const updatedOrders = orders.map((order, i) =>
      i === index
        ? name === "kg"
          ? { ...order, [name]: Number(value) }
          : { ...order, [name]: value }
        : order
    );

    setOrders(updatedOrders);
  }

  function addOrder() {
    setOrders((orders) => [...orders, { name: "Ribs", kg: 5 }]);
  }

  async function handleOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedOrders = fruitOrderSchema.safeParse(orders);
    const parsedInfo = contactInfoSchema.safeParse(contactInfo);
    console.log(orders, contactInfo);

    if (!parsedOrders.success) {
      console.log(parsedOrders.error);
      return;
    }

    if (!parsedInfo.success) {
      console.log(parsedInfo.error);
      return;
    }

    const ordersRef = collection(firestore, "orders");

    addDoc(ordersRef, { order: orders, contactInfo })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}
