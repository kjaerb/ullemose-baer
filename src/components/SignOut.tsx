"use client";

import { authentication } from "@/lib/firebase";
import { Button } from "./Button";

export function SignOut() {
  return (
    authentication.currentUser && <Button onClick={signOut}>Log ud</Button>
  );

  async function signOut() {
    authentication.signOut();
  }
}
