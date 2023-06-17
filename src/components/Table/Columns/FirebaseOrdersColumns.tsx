import { FirebaseOrder, Order } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";

export const firebaseOrdersColumns: ColumnDef<FirebaseOrder>[] = [
  {
    id: "name",
    header: "Navn",
    accessorKey: "name",
    accessorFn: (order) =>
      `${order.contactInfo.firstName} ${order.contactInfo.lastName}`,
    cell: (info) => info.getValue(),
  },
  {
    id: "email",
    header: "Kontakt information",
    cell: ({ row }) => {
      const org = row.original;
      return (
        <div>
          <Link href={`${org.contactInfo.email}`}>{org.contactInfo.email}</Link>
          <p>{org.contactInfo.phone}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "fruitOrder",
    header: "Bestilling",
    cell: ({ row }) => {
      const order: Order["fruitOrder"] = row.getValue("fruitOrder");

      return (
        <div>
          {order.map((fruit, i) => {
            return (
              <p key={fruit.name + i}>
                {fruit.name}: {fruit.kg} kg
              </p>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center hover:bg-gray-100 px-2 py-2 rounded-md transition-colors duration-200"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Ordre dato
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const date: Timestamp = row.getValue("createdAt");
      return date && date?.toDate ? (
        <p>{date?.toDate()?.toDateString()}</p>
      ) : null;
    },
  },
  {
    accessorKey: "orderId",
    header: "Ordre nummer",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
