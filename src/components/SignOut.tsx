"use client";

import { authentication } from "@/lib/firebase";
import { Button } from "./ui/Button";

export function SignOut() {
  return (
    authentication.currentUser && (
      <Button className="w-full" onClick={signOut}>
        Log ud
      </Button>
    )
  );

  async function signOut() {
    authentication.signOut();
  }
}
