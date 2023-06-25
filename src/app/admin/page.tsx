"use client";

import { Login } from "@/components/Login";
import { Orders } from "@/components/Table/Orders";
import { authentication } from "@/lib/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminPage() {
  const [user] = useAuthState(authentication);

  return (
    <div className="flex justify-center flex-col">
      {user ? <Orders /> : <Login />}
    </div>
  );
}
