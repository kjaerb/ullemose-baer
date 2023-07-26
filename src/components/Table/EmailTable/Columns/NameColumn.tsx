import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";

export const nameColumn: ColumnDef<FirebaseOrder> = {
  id: "name",
  header: "Navn",
  accessorKey: "name",
  accessorFn: (order) =>
    `${order.contactInfo.firstName} ${order.contactInfo.lastName}`,
  cell: ({ row }) => {
    const original = row.original;

    const fname = original.contactInfo.firstName;
    const lname = original.contactInfo.lastName;
    const email = original.contactInfo.email;

    return (
      <div>
        <p>
          {fname} {lname}
        </p>
        <p>{email}</p>
      </div>
    );
  },
};
