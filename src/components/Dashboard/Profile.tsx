"use client";

import { authentication } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { initialsAvatar } from "@/lib/dicebear";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  const [user] = useAuthState(authentication);

  if (!user || !user.displayName) return null;

  return (
    <Avatar className={cn("cursor-pointer")}>
      <AvatarImage
        src={
          user?.photoURL
            ? user.photoURL
            : initialsAvatar(user?.displayName || "User")
        }
        alt={user?.displayName || "User Avatar"}
      />
      <AvatarFallback>{user?.displayName}</AvatarFallback>
    </Avatar>
  );
}
