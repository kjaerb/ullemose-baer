"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { FirebaseOrder } from "@/validators/orderSchema";
import { useRef, useState } from "react";
import { useSendEmail } from "@/hooks/useSendEmail";
import { render, renderAsync } from "@react-email/render";
import UllemoseDelivery from "@/react-email/emails/ullemose-delivery";
import { cn } from "@/lib/utils";
import { Loading } from "../Loading";

interface SendEmailDialogProps {
  orders: FirebaseOrder[];
}

type EmailResponse = {
  ok: boolean;
  email: string;
};

export function SendEmailDialog({ orders }: SendEmailDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailResponses, setEmailResponses] = useState<EmailResponse[]>([]);

  const closeBtn = useRef<HTMLButtonElement>(null);

  async function sendEmail(order: FirebaseOrder) {
    const response = await useSendEmail({
      api: "/api/sendDeliveryEmail",
      to: order.contactInfo.email,
      html: render(
        <UllemoseDelivery
          order={order}
          orderId={order.id || "Fejl ved hentning af ordre"}
        />
      ),
    });

    return response;
  }

  async function sendEmails() {
    try {
      setIsLoading(true);
      const responses = await Promise.all(
        orders.map((order) => sendEmail(order))
      );

      console.log(responses);

      responses.forEach((response) => {
        const r: EmailResponse = {
          ok: response.status === 200 ? true : false,
          email: response.data.data,
        };

        setEmailResponses((prev) => [...prev, r]);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Send email til kunder</DialogHeader>
        <>
          <p className="mb-4">
            Ved at trykke "Send emails", sender du en mail til alle kunderne
          </p>
          {orders.map((order) => (
            <div key={order.id} className="py-2 px-2 border rounded-md my-1">
              <div className="flex flex-col">
                <div className="flex justify-between ">
                  <p className="">
                    {order.contactInfo.firstName} {order.contactInfo.lastName}
                  </p>
                  <p>{order.contactInfo.email}</p>
                </div>
                <div>
                  {order.fruitOrder.map((fruit, i) => (
                    <div key={order.id + "" + i} className="space-x-2">
                      <span>{fruit.name}</span>
                      <span>{fruit.kg} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div>
              <Loading />
            </div>
          )}
          <div>
            {emailResponses.map((response, i) => (
              <div
                key={response.email + "" + i}
                className={cn(
                  "flex justify-between",
                  response.ok ? "text-green-500" : "text-red-500"
                )}
              >
                <p>{response.email}</p>
                <p>{response.ok ? "Success" : "Fejl"}</p>
              </div>
            ))}
          </div>
        </>
        <DialogFooter>
          <Button ref={closeBtn} disabled={isLoading} variant={"secondary"}>
            <DialogClose>Luk</DialogClose>
          </Button>
          <Button disabled={isLoading} onClick={sendEmails}>
            Send emails
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
