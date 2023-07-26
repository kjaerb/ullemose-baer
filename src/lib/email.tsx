import UllemoseCustomDelivery from "@/react-email/emails/ullemose-custom-delivery";
import UllemoseDelivery from "@/react-email/emails/ullemose-delivery";
import { FirebaseOrder } from "@/validators/orderSchema";

type UllemoseDeliveryProps = {
  delivery: "delivery";
  solbaerDeliveryDay: string;
  ribsDeliveryDay: string;
};

type CustomDeliveryProps = {
  delivery: "custom-delivery";
  text: string;
};

type EmailTemplateProps = {
  order: FirebaseOrder;
} & (CustomDeliveryProps | UllemoseDeliveryProps);

export function getEmailTemplate(props: EmailTemplateProps) {
  const { order, delivery } = props;

  switch (delivery) {
    case "delivery":
      return (
        <UllemoseDelivery
          order={order}
          solbaerDeliveryDay={props.solbaerDeliveryDay}
          ribsDeliveryDay={props.ribsDeliveryDay}
        />
      );
    case "custom-delivery":
      return <UllemoseCustomDelivery order={order} text={props.text} />;
    default:
      return <></>;
  }
}
