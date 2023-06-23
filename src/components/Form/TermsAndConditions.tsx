import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";
import { UseFormReturn } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/Checkbox";
import { TermsAndConditionsText } from "../TermsAndConditionsText";
import { ScrollArea } from "../ui/scroll-area";

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
                      <TermsAndConditionsText />
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
