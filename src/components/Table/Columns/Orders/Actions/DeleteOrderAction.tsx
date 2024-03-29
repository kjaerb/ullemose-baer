import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { firestore } from "@/lib/firebase";
import { FirebaseOrder } from "@/validators/orderSchema";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface DeleteOrderActionProps {
  order: FirebaseOrder;
}

export function DeleteOrderAction({ order }: DeleteOrderActionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function handleDeleteOrder() {
    try {
      setIsLoading(true);
      if (!order.id) throw new Error("Order id is undefined");
      const docRef = doc(firestore, `orders/${order.id}`);
      deleteDoc(docRef);
    } catch (ex) {
      toast({
        variant: "default",
        title: "Der skete en fejl",
        description: "Ordren blev ikke slettet",
      });
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="border-none flex text-red-500 w-full hover:text-red-600 hover:bg-red-200"
      >
        <Button className="mx-auto" variant="outline">
          Slet ordre
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
          <AlertDialogDescription>
            Denne handling kan ikke fortrydes. Ordren vil blive slettet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuller</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={handleDeleteOrder}
            className="bg-red-500"
          >
            {isLoading ? <Loading /> : "Slet ordre"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
