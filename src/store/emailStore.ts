import { FirebaseOrder } from "@/validators/orderSchema";
import { serverTimestamp } from "firebase/firestore";
import { create } from "zustand";

type EmailVariant = "delivery" | "custom-delivery";

interface EmailStore {
  emailVariant: EmailVariant;
  setEmailVariant: (email: EmailVariant) => void;
  emailOrder: FirebaseOrder;
  setEmailOrder: (emailOrder: FirebaseOrder) => void;
  emailJSXText: string;
  setEmailJSXText: (emailJSXText: string) => void;
  solbaerDeliveryDay: string;
  setSolbaerDeliveryDay: (solbaerDeliveryDay: string) => void;
  ribsDeliveryDay: string;
  setRibsDeliveryDay: (ribsDeliveryDay: string) => void;
  emailText: string;
  setEmailText: (emailText: string) => void;
}

const emailStore = create<EmailStore>((set) => ({
  emailVariant: "delivery",
  setEmailVariant: (emailVariant: EmailVariant) => set({ emailVariant }),
  emailOrder: {
    contactInfo: {
      firstName: "Placeholder",
      lastName: "placeholder",
      email: "placeholder@placeholder.com",
      phone: "00000000",
    },
    fruitOrder: [
      { name: "Solbær", kg: 5 },
      { name: "Ribs", kg: 5 },
    ],
    termsAccepted: false,
    createdAt: serverTimestamp(),
    orderId: 0,
    id: "",
    emailsReceived: 0,
    emailsReference: [],
  },
  setEmailOrder: (emailOrder: FirebaseOrder) => set({ emailOrder }),
  emailJSXText: "",
  setEmailJSXText: (emailJSXText: string) => set({ emailJSXText }),
  solbaerDeliveryDay: "",
  setSolbaerDeliveryDay: (solbaerDeliveryDay: string) =>
    set({ solbaerDeliveryDay }),
  ribsDeliveryDay: "",
  setRibsDeliveryDay: (ribsDeliveryDay: string) => set({ ribsDeliveryDay }),
  emailText: "",
  setEmailText: (emailText: string) => set({ emailText }),
}));

export default emailStore;
