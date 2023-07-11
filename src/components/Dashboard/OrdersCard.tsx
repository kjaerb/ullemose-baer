import { FirebaseOrder } from "@/validators/orderSchema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { initialsAvatar } from "@/lib/dicebear";

interface OrdersCardProps {
  order: FirebaseOrder;
}

export function OrdersCard({
  order: {
    contactInfo: { firstName, lastName, email },
    fruitOrder,
  },
}: OrdersCardProps) {
  const name = `${firstName} ${lastName}`;

  const totalKilos = fruitOrder.reduce((a, b) => a + b.kg, 0);

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src={initialsAvatar(name)}
            alt="Forbruger billede"
            className="p-1 rounded-full"
          />
          <AvatarFallback>Bruger</AvatarFallback>
        </Avatar>
        <div className="flex flex-col pl-2">
          <span className="truncate">{name}</span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
      </div>
      <div className="pl-8">
        <span className="text-xl truncate">{totalKilos * 20} kr.</span>
      </div>
    </div>
  );
}
