import { Button } from "@/components/ui/Button";
import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";

export const createdAtColumn: ColumnDef<FirebaseOrder> = {
  accessorKey: "createdAt",
  header: ({ column }) => {
    return (
      <Button
        variant={"link"}
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
      >
        Ordre dato
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
  cell: ({ row }) => {
    const date: Timestamp = row.getValue("createdAt");
    return date && date?.toDate ? (
      <p>{date?.toDate()?.toDateString()}</p>
    ) : null;
  },
};
