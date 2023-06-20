import { Input } from "postcss";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Order } from "@/validators/orderSchema";

interface TermsAndConditionsProps {
  form: UseFormReturn<Order>;
}

export function TermsAndConditions({ form }: TermsAndConditionsProps) {
  return (
    <FormField
      control={form.control}
      name="termsAccepted"
      render={({ field }) => (
        <FormItem className="px-2 flex flex-col items-center">
          <FormControl>
            <div className="flex items-center space-x-2 mx-auto mt-4">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Dialog>
                <DialogTrigger className="hover:underline transition-all duration-200">
                  Accepter vilkår og betingelser
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Vilkår og betingelser</DialogTitle>
                    <DialogDescription>
                      Hvis der er fejl på ordren, eller kunden gerne vil ændre
                      sin bestilling, kan du gøre det her.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
