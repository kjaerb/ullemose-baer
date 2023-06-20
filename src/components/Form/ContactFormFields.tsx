import { Order } from "@/validators/orderSchema";
import { FormInputField } from "./FormInputField";
import { UseFormReturn } from "react-hook-form";

interface ContactFormFieldsProps {
  form: UseFormReturn<Order>;
}

export function ContactFormFields({ form }: ContactFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <FormInputField
        form={form}
        name="contactInfo.email"
        label="Email"
        inputAutoComplete="email"
        inputPlaceholder="Email"
      />
      <FormInputField
        form={form}
        name="contactInfo.phone"
        label="Tlf. nummer"
        inputAutoComplete="phone"
        inputPlaceholder="Tlf. nummer"
      />
    </div>
  );
}
