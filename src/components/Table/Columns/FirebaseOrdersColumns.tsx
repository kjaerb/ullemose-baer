import { FirebaseOrder, Order } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

export const firebaseOrdersColumns: ColumnDef<FirebaseOrder>[] = [
  {
    header: "Navn",
    cell: ({ row }) => {
      const org = row.original;
      return (
        <p>
          {org.contactInfo.firstName} {org.contactInfo.lastName}
        </p>
      );
    },
  },
  {
    header: "Kontakt information",
    cell: ({ row }) => {
      const org = row.original;
      return (
        <div>
          <Link href={`mailto:${org.contactInfo.email}`}>
            {org.contactInfo.email}
          </Link>
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
    header: "Ordre dato",
    cell: ({ row }) => {
      const date: Timestamp = row.getValue("createdAt");
      return <p>{date.toDate().toDateString()}</p>;
    },
  },
  {
    accessorKey: "orderId",
    header: "Ordre nummer",
  },
];
