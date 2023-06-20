import { Order } from "@/validators/orderSchema";
import { FormInputField } from "./FormInputField";
import { UseFormReturn } from "react-hook-form";

interface NameFormFieldsProps {
  form: UseFormReturn<Order>;
}

export function NameFormFields({ form }: NameFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <FormInputField
        form={form}
        name="contactInfo.firstName"
        label="Fornavn"
        inputAutoComplete="given-name"
        inputPlaceholder="Fornavn"
      />
      <FormInputField
        form={form}
        name="contactInfo.lastName"
        label="Efternavn"
        inputAutoComplete="family-name"
        inputPlaceholder="Efternavn"
      />
    </div>
  );
}
