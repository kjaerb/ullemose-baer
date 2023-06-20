import { firestore } from "@/lib/firebase";
import { orderNumberGenerator } from "@/lib/orderNumber";
import { FirebaseOrder, Order, orderSchema } from "@/validators/orderSchema";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function useAddOrderToFirebase(order: Order) {
  const ordersRef = collection(firestore, "orders");

  const parsedOrder = orderSchema.safeParse(order);

  if (!parsedOrder.success) {
    console.error(parsedOrder.error);
    throw new Error("Order is not valid");
  }

  const newOrder: FirebaseOrder = {
    ...parsedOrder.data,
    createdAt: serverTimestamp(),
    orderId: orderNumberGenerator(),
  };

  const doc = await addDoc(ordersRef, newOrder);

  return { doc, newOrder };
}
