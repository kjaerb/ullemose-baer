"use client";

import { Profile } from "@/components/Dashboard/Profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { authentication } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOut } from "@/components/SignOut";
import { Button } from "../ui/Button";

interface NavProps {}

export function Nav({}: NavProps) {
  const [user] = useAuthState(authentication);

  return (
    <nav className="w-screen border-b shadow-md py-2 px-4 sm:px-10 mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Profile />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-bold">
              <div className="flex flex-col">
                <span>{user?.displayName}</span>
                <span className="text-xs">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
