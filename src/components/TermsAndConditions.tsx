import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

interface TermsAndConditionsProps {}

export function TermsAndConditions({}: TermsAndConditionsProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <Checkbox
        id="terms"
        checked={isChecked}
        onCheckedChange={() => setIsChecked(!isChecked)}
      />
      <Dialog>
        <DialogTrigger className="hover:underline transition-all duration-200">
          Accepter term og vilkår
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vilkår og betingelser</DialogTitle>
            <DialogDescription>
              Hvis der er fejl på ordren, eller kunden gerne vil ændre sin
              bestilling, kan du gøre det her.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
