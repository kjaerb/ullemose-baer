"use client";

import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Login } from "@/components/Login";
import { authentication } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminPage() {
  const [user, loading, error] = useAuthState(authentication);

  return (
    <div className="flex justify-center flex-col">
      {loading ? <p>Indlæser</p> : user ? <Dashboard /> : <Login />}
    </div>
  );
}
