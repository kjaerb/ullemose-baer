import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";

export const createdAtColumn: ColumnDef<FirebaseOrder> = {
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
};
