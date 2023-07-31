import { firestore } from "@/lib/firebase";
import { orderNumberGenerator } from "@/lib/orderNumber";
import useLoadingStore from "@/store/loadingStore";
import useOrderStore from "@/store/orderStore";
import { FirebaseOrder, Order, orderSchema } from "@/validators/orderSchema";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

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

export function useGetOrders() {
  const { setOrdersLoading } = useLoadingStore();
  const { year } = useOrderStore();

  const [ordersCollection, ordersLoading, ordersError] = useCollection(
    query(
      collection(firestore, "orders"),
      orderBy("createdAt", "desc"),
      where("createdAt", ">=", new Date(year, 0, 1)),
      where("createdAt", "<=", new Date(year, 11, 31))
    )
  );

  useEffect(() => {
    setOrdersLoading(ordersLoading);
  }, [ordersLoading]);

  if (!ordersCollection) return [];

  return ordersCollection.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;

    return {
      ...data,
      id,
    } as FirebaseOrder;
  });
}
