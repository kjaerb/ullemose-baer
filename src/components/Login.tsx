"use client";

import { authentication } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./ui/Button";

export function Login() {
  return (
    <div className="mx-auto">
      <Button onClick={login}>Login</Button>
    </div>
  );

  async function login() {
    try {
      signInWithPopup(authentication, new GoogleAuthProvider());
    } catch (error) {
      console.error(error);
    }
  }
}
