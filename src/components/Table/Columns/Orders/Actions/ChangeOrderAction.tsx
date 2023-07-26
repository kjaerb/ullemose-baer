import { AddMore } from "@/components/AddMore";
import { ContactFormFields } from "@/components/Form/ContactFormFields";
import { FruitSelector } from "@/components/Form/FruitSelector";
import { NameFormFields } from "@/components/Form/NameFormFields";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Form as FormProvider } from "@/components/ui/Form";
import { firestore } from "@/lib/firebase";
import { FirebaseOrder, Order, orderSchema } from "@/validators/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";

interface ChangeOrderActionProps {
  order: FirebaseOrder;
}

export function ChangeOrderAction({ order }: ChangeOrderActionProps) {
  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      contactInfo: order?.contactInfo,
      fruitOrder: order?.fruitOrder,
      termsAccepted: order?.termsAccepted,
    },
  });

  const {
    fields: orders,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "fruitOrder",
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function updateOrder(data: Order) {
    try {
      setIsLoading(true);
      const docRef = doc(firestore, "orders", order.id ?? "");

      await updateDoc(docRef, data);
      closeButtonRef.current?.click();
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="flex justify-center w-full px-4 py-2 hover:border rounded-md hover:bg-gray-100 transition-all duration-200 text-sm">
        Ændre ordre
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ændre {order.contactInfo.email}&apos;s ordre
          </DialogTitle>
          <div>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(updateOrder)}
                className="space-y-8 flex flex-col w-full p-4 my-4"
              >
                <NameFormFields form={form} />
                <ContactFormFields form={form} />
                <p className="text-center">Bestilling</p>
                {orders.map((order, i) => (
                  <FruitSelector
                    key={order.id}
                    id={i}
                    form={form}
                    fruitName={`fruitOrder.${i}.name`}
                    kgName={`fruitOrder.${i}.kg`}
                    remove={remove}
                    canDelete={orders.length === 1}
                  />
                ))}
                <div className="mx-auto">
                  <AddMore
                    className="mx-auto cursor-pointer"
                    orders={orders}
                    append={append}
                  />
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button
                      ref={closeButtonRef}
                      variant="secondary"
                      type="button"
                    >
                      Annuller
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading /> : "Gem"}
                  </Button>
                </DialogFooter>
              </form>
            </FormProvider>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
