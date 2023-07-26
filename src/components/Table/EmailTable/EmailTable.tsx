"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FirebaseOrder } from "@/validators/orderSchema";
import { useSendEmail } from "@/hooks/useSendEmail";
import { useToast } from "@/hooks/useToast";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { firestore } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import emailStore from "@/store/emailStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { getEmailTemplate } from "@/lib/email";
import { render } from "@react-email/components";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface EmailTableProps<TValue> {
  columns: ColumnDef<FirebaseOrder, TValue>[];
  data: FirebaseOrder[];
}

export function EmailTable<TValue>({ columns, data }: EmailTableProps<TValue>) {
  const { toast } = useToast();
  const { ribsDeliveryDay, solbaerDeliveryDay, emailVariant, emailText } =
    emailStore();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [nameFilters, setNameFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<{
    [key: number]: boolean;
  }>({});
  const [sendEmailDisabled, setSendEmailDisabled] = useState<boolean>(true);
  const closeEmailBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (emailVariant === "delivery") {
      if (!ribsDeliveryDay || !solbaerDeliveryDay) {
        setSendEmailDisabled(true);
      } else {
        setSendEmailDisabled(false);
      }
    } else if (emailVariant === "custom-delivery") {
      if (!emailText) {
        setSendEmailDisabled(true);
      } else {
        setSendEmailDisabled(false);
      }
    }
  }, [ribsDeliveryDay, solbaerDeliveryDay, emailText]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setNameFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters: nameFilters,
      rowSelection,
    },
  });

  async function sendEmail(order: FirebaseOrder) {
    const email = getEmailTemplate({
      order,
      delivery: emailVariant,
      text: emailText,
      solbaerDeliveryDay,
      ribsDeliveryDay,
    });

    const orderRef = doc(firestore, `orders/${order.id}`);
    const emailsRef = collection(firestore, "emails");

    try {
      const emailDoc = await addDoc(emailsRef, {
        text: render(email),
        orderId: order.id || "",
        sentAt: serverTimestamp(),
      });
      await updateDoc(orderRef, {
        emailsReceived: increment(1),
        emailsReference: arrayUnion(emailDoc.id),
      });
      await useSendEmail({
        api: "/api/sendDeliveryEmail",
        to: order.contactInfo.email,
        html: render(email),
      });

      toast({
        title: "Email sent",
        description: "Email sent to " + order.contactInfo.email,
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      await updateDoc(orderRef, { ...order, emailsReceived: increment(-1) });

      toast({
        title: "Fejl ved afsendelse af email",
        description: "Email blev ikke sendt til " + order.contactInfo.email,
        variant: "destructive",
      });
    }
  }

  async function sendEmails(orders: FirebaseOrder[]) {
    try {
      await Promise.all(orders.map((order) => sendEmail(order)));

      toast({
        title: "Emails sent",
        description: "Emails sent to " + orders.length + " people",
        variant: "success",
      });
      closeEmailBtn.current?.click();
    } catch (e) {
      console.error(e);
      toast({
        title: "Fejl ved afsendelse af emails",
        description: "Emails blev ikke sendt",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-4">
        <div>
          <Input
            placeholder="Filter navn..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm px-4 py-2 shadow-md border rounded-md"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={sendEmailDisabled}>Send emails</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              Send email til {Object.values(rowSelection).length} personer
            </DialogHeader>
            <div>
              <ScrollArea className="h-[15rem] border rounded-md p-2">
                {Object.keys(rowSelection).map((key) => {
                  const o = data[key as unknown as number];

                  return (
                    <div key={key} className="my-2">
                      {o.contactInfo.email}
                    </div>
                  );
                })}
              </ScrollArea>
            </div>
            <DialogFooter className="space-x-4">
              <DialogClose asChild>
                <Button ref={closeEmailBtn} variant={"outline"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={sendEmailDisabled}
                onClick={() =>
                  sendEmails(
                    Object.keys(rowSelection).map(
                      (key) => data[key as unknown as number]
                    )
                  )
                }
              >
                Send emails
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border shadow-md w-full mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={headerGroup.id + "" + i}>
                {headerGroup.headers.map((header, j) => (
                  <TableHead key={header.id + "" + i + "" + j}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row, i) => (
                  <TableRow
                    key={row.id + "" + i}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, j) => (
                      <TableCell key={cell.id + "" + i + "" + j}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        disabled={sendEmailDisabled}
                        variant={"link"}
                        onClick={() => sendEmail(row.original)}
                        className={cn(
                          sendEmailDisabled ? "cursor-not-allowed" : ""
                        )}
                      >
                        Send email
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
