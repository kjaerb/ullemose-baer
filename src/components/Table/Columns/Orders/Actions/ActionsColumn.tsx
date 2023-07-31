import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ChangeOrderAction } from "./ChangeOrderAction";
import { DeleteOrderAction } from "./DeleteOrderAction";

export const actionsColumn: ColumnDef<FirebaseOrder> = {
  id: "actions",
  cell: ({ row }) => {
    const order = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ChangeOrderAction order={order} />
          <DeleteOrderAction order={order} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
