import { FirebaseOrder } from "@/validators/orderSchema";
import { render } from "@react-email/render";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "@/components/ui/TextArea";
import { Input } from "@/components/ui/input";
import { EmailTable } from "@/components/Table/EmailTable/EmailTable";
import { emailColumns } from "@/components/Table/EmailTable/Columns/Columns";
import { Checkbox } from "@/components/ui/Checkbox";
import emailStore from "@/store/emailStore";
import { getEmailTemplate } from "@/lib/email";
import { cn } from "@/lib/utils";

interface SendEmailProps {
  orders: FirebaseOrder[];
}

type EmailTypes = "delivery" | "custom-delivery";

export function SendEmail({ orders }: SendEmailProps) {
  const {
    emailVariant,
    setEmailVariant,
    setEmailJSXText,
    emailOrder,
    solbaerDeliveryDay,
    setSolbaerDeliveryDay,
    ribsDeliveryDay,
    setRibsDeliveryDay,
    emailText,
    setEmailText,
  } = emailStore();
  const [onlySolbaer, setOnlySolbaer] = useState<boolean>(false);
  const [activeOrders, setActiveOrders] = useState<FirebaseOrder[]>(orders);
  const emailTableRef = useRef<HTMLDivElement>(null);
  const [emailFixed, setEmailFixed] = useState<boolean>(false);

  const emailTemplate = useMemo<JSX.Element>(
    () =>
      getEmailTemplate({
        order: emailOrder as FirebaseOrder,
        delivery: emailVariant,
        text: emailText,
        solbaerDeliveryDay,
        ribsDeliveryDay,
      }),

    [emailOrder, emailText, emailVariant, solbaerDeliveryDay, ribsDeliveryDay]
  );

  useEffect(() => {
    setEmailJSXText(render(emailTemplate));
  }, [emailTemplate]);

  useEffect(() => {
    if (onlySolbaer) {
      setActiveOrders(() => {
        return orders.filter((order) =>
          order.fruitOrder.every((fruit) => fruit.name === "Solbær")
        );
      });
    } else {
      setActiveOrders(() => {
        return orders;
      });
    }
  }, [onlySolbaer, orders]);

  useEffect(() => {
    function handleScroll() {
      const emailTableRect = emailTableRef.current?.getBoundingClientRect();
      if (!emailTableRect) return;

      if (emailTableRect.top <= 0) {
        setEmailFixed(() => true);
      } else {
        setEmailFixed(() => false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-12 md:space-y-0">
      <div>
        <p className="text-center mb-2">Vælg hvem emailen skal sendes til</p>
        <div className="h-full border rounded-md p-4" ref={emailTableRef}>
          <div className="flex items-center mb-2 space-x-2">
            <Checkbox
              checked={onlySolbaer}
              onCheckedChange={() => setOnlySolbaer(() => !onlySolbaer)}
            />
            <p>Hvis kun solbær bestillinger</p>
          </div>
          <Select
            value={emailVariant}
            defaultValue="delivery"
            onValueChange={(e) => setEmailVariant(e as EmailTypes)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Email" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery">Levering</SelectItem>
              <SelectItem value="custom-delivery">
                Levering med fritekst
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="my-4">
            {emailVariant === "custom-delivery" && (
              <Textarea
                placeholder="Indsæt tekst til email her"
                className="mb-2"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
              />
            )}
            {emailVariant === "delivery" && (
              <div className="grid grid-cols-2 space-x-8 mb-4">
                <div>
                  <p>Dato for solbær</p>
                  <Input
                    type="date"
                    value={solbaerDeliveryDay}
                    onChange={(e) => setSolbaerDeliveryDay(e.target.value)}
                  />
                </div>
                <div>
                  <p>Dato for og ribs</p>
                  <Input
                    type="date"
                    value={ribsDeliveryDay}
                    onChange={(e) => setRibsDeliveryDay(e.target.value)}
                  />
                </div>
              </div>
            )}
            <EmailTable data={activeOrders} columns={emailColumns} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-center mb-2">Forhåndsvis email</p>
        <div
          className={cn(
            "border p-2 rounded-md",
            emailFixed && "relative md:fixed md:top-0"
          )}
          dangerouslySetInnerHTML={{
            __html: render(emailTemplate),
          }}
        />
      </div>
    </div>
  );
}
