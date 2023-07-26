import { cn } from "@/lib/utils";
import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import { BanIcon, CheckIcon } from "lucide-react";

export const hasReceivedEmailColumn: ColumnDef<FirebaseOrder> = {
  accessorKey: "emailsReceived",
  header: () => <div className="flex justify-center">Har fået email</div>,
  cell: ({ row }) => {
    const emailsReceived = row.original.emailsReceived;

    return (
      <div
        className={cn(
          "flex justify-center",
          !emailsReceived || emailsReceived === 0
            ? "text-red-500"
            : "text-green-500"
        )}
      >
        {!emailsReceived || emailsReceived === 0 ? (
          <BanIcon />
        ) : (
          <div className="relative">
            <CheckIcon className="z-10" />
            <p className="text-xs absolute top-0 right-0 translate-x-2 -translate-y-2 text-black bg-white rounded-full border h-4 w-4 flex justify-center items-center">
              {emailsReceived}
            </p>
          </div>
        )}
      </div>
    );
  },
};
