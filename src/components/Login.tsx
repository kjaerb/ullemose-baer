"use client";

import { authentication } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./Button";

export function Login() {
  return (
    <div className='mx-auto'>
      <Button onClick={login}>Login</Button>
    </div>
  );

  async function login() {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(authentication, googleProvider);
  }
}
