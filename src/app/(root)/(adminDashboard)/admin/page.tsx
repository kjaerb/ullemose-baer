"use client";

import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Login } from "@/components/Login";
import { authentication } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminPage() {
  const user = useAuthState(authentication);

  return (
    <div className="flex justify-center flex-col">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}
