"use client";

import { Login } from "@/components/Login";
import { OrdersTable } from "@/components/OrdersTable";
import { SignOut } from "@/components/SignOut";
import { firebaseOrdersColumns } from "@/components/Table/Columns/FirebaseOrdersColumns";
import { authentication, firestore } from "@/lib/firebase";
import { FirebaseOrder } from "@/validators/orderSchema";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminPage() {
  const [user] = useAuthState(authentication);

  const [orders, setOrders] = useState<FirebaseOrder[]>([]);
  const ordersRef = collection(firestore, "orders");
  const getOrders = async () => {
    const ordersSnapshot = await getDocs(ordersRef);
    const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
    setOrders(() => {
      return ordersList as FirebaseOrder[];
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='flex justify-center flex-col'>
      {user ? (
        <>
          <div className='flex justify-between items-center'>
            <p>Welcome {user?.displayName}</p>
            <SignOut />
          </div>
          <OrdersTable columns={firebaseOrdersColumns} data={orders} />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
