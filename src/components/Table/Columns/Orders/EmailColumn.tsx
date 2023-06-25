import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const emailColumn: ColumnDef<FirebaseOrder> = {
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
};
