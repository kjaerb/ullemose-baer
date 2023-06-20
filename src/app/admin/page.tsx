"use client";

import { AccountMenu } from "@/components/AccountMenu";
import { Login } from "@/components/Login";
import { OrdersTable } from "@/components/OrdersTable";
import { firebaseOrdersColumns } from "@/components/Table/Columns/FirebaseOrdersColumns";
import { authentication, firestore } from "@/lib/firebase";
import { FirebaseOrder } from "@/validators/orderSchema";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminPage() {
  const [user] = useAuthState(authentication);

  const [orders, setOrders] = useState<FirebaseOrder[]>([]);

  const getOrders = async () => {
    const q = query(
      collection(firestore, "orders"),
      orderBy("createdAt", "desc")
    );
    const ordersSnapshot = await getDocs(q);
    const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
    setOrders(() => {
      return ordersList as FirebaseOrder[];
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex justify-center flex-col">
      {user ? (
        <>
          <div className="flex justify-end items-center flex-wrap">
            <AccountMenu name={user.displayName} />
          </div>
          <OrdersTable columns={firebaseOrdersColumns} data={orders} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
