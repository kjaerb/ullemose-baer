import { useAuthState } from "react-firebase-hooks/auth";
import { AccountMenu } from "../AccountMenu";
import { OrdersTable } from "./OrdersTable";
import { authentication, firestore } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { FirebaseOrder } from "@/validators/orderSchema";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ordersColumns } from "./Columns/Orders/Columns";

interface OrdersProps {}

export function Orders({}: OrdersProps) {
  const [user] = useAuthState(authentication);

  const [orders, setOrders] = useState<FirebaseOrder[]>([]);

  useEffect(() => {
    const docRef = collection(firestore, "orders");
    const queryOrders = query(docRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(queryOrders, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;

        return { id, ...data } as FirebaseOrder;
      });
      setOrders(() => {
        return ordersList;
      });
    });

    return () => unsubscribe();
  }, []);
  return user ? (
    <>
      <div className="flex justify-end items-center flex-wrap">
        <AccountMenu name={user.displayName} />
      </div>
      <OrdersTable columns={ordersColumns} data={orders} />
    </>
  ) : null;
}
