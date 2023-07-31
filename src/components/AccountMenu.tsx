import { FC } from "react";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { SignOut } from "./SignOut";

interface AccountMenuProps {
  name: string | null;
}

export function AccountMenu({ name }: AccountMenuProps) {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger className="border shadow-md rounded-md">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <>
            <span className="sr-only">Open menu</span>
            <Menu className="h-4 w-4" />
          </>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
