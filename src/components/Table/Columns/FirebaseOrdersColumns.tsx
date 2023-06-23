import { FirebaseOrder, Order, orderSchema } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      const info = row.original;

      const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<Order>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
          contactInfo: {
            firstName: info?.contactInfo?.firstName,
            lastName: info?.contactInfo?.lastName,
            email: info?.contactInfo?.email,
            phone: info?.contactInfo?.phone,
          },
          fruitOrder: info?.fruitOrder,
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger className="flex justify-center w-full px-4 py-2 hover:border rounded-md hover:bg-gray-100 transition-all duration-200 text-sm">
                Ændre ordre
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Ændre {info.contactInfo.email}&apos;s ordre
                  </DialogTitle>
                  <DialogDescription>
                    Hvis der er fejl på ordren, eller kunden gerne vil ændre sin
                    bestilling, kan du gøre det her.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-green-500 hover:bg-green-500"
                      >
                        Gem
                      </Button>
                    </DialogFooter>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger
                asChild
                className="border-none flex text-red-500 w-full hover:text-red-600 hover:bg-red-200"
              >
                <Button className="mx-auto" variant="outline">
                  Slet ordre
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Denne handling kan ikke fortrydes. Ordren vil blive slettet.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuller</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500">
                    Fortsæt
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
