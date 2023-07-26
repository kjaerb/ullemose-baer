import emailStore from "@/store/emailStore";
import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

export const setEmailColumn: ColumnDef<FirebaseOrder> = {
  accessorKey: "email",
  header: "Vis email",
  cell: ({ row }) => {
    const original = row.original;
    const { setEmailOrder } = emailStore();

    return (
      <div>
        <ArrowRight
          className="cursor-pointer"
          onClick={() => setEmailOrder(original)}
        />
      </div>
    );
  },
};
