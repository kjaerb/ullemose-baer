import { FirebaseOrder, Order } from "@/validators/orderSchema";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { serverTimestamp } from "firebase/firestore";
import * as React from "react";

interface UllemoseEmailProps {
  order: FirebaseOrder;
  solbaerDeliveryDay: string;
  ribsDeliveryDay: string;
}

export default function UllemoseDelivery({
  order = {
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
  solbaerDeliveryDay = "",
  ribsDeliveryDay = "",
}: UllemoseEmailProps) {
  const replyEmail = process.env.NEXT_PUBLIC_EMAIL;

  function getDeliveryDate(): string {
    const hasRibs = order.fruitOrder.filter((fruit) => fruit.name === "Ribs");

    if (hasRibs.length > 0) {
      return ribsDeliveryDay;
    } else {
      return solbaerDeliveryDay;
    }
  }

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.ullemose.dk/CustomerData/Files/Templates/1/logo.png"
            alt="Ullemose frugt"
            className="mx-auto"
          />
          <Hr style={hr} />
          <Section style={box}>
            <Heading style={paragraph} className="text-center">
              Hej {order?.contactInfo.firstName}
            </Heading>
            <Text style={paragraph}>
              Vi gør klar til høst og du kan snart hente din ordre
            </Text>
            <Text style={paragraph}>
              Der er to afhentningsdage, alt efter hvilke bær du har bestilt.
              Solbær kan hentes d. 27. Juli og ribs kan hentes d. 28. Juli.
              Afhentningen er i vores gårdbutik på Hovvej 7, 5883 Oure.
            </Text>
            <Text style={paragraph}>
              Afhentnings dato:{" "}
              {new Date(getDeliveryDate()).toLocaleDateString("da-DK", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
          </Section>
          <Hr style={hr} />
          <Section style={box}>
            <Heading style={paragraph} className="text-center">
              Ordre nummer: {order.orderId}
            </Heading>

            <Row>
              <Column style={halfWidth}>
                <Text style={flexCenterBold}>Bær</Text>
              </Column>
              <Column style={halfWidth}>
                <Text style={flexCenterBold}>Kg</Text>
              </Column>
            </Row>
            {order.fruitOrder.map((fruit, i) => (
              <Row key={i}>
                <Column style={halfWidth}>
                  <Text style={noWrap}>{fruit.name}</Text>
                </Column>
                <Column style={halfWidth}>
                  <Text style={noWrap}>{fruit.kg} Kg</Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={hr} />
          <Section style={box}>
            <Text style={paragraph}>
              Hvis du har nogle spørgsmål til din ordre, er du velkommen til at
              skrive en mail til{" "}
              <Link href={`mailto:${replyEmail}`} style={bluetext}>
                ullemosefrugt@gmail.com
              </Link>
              .
            </Text>
            <Text style={paragraph}>Husk at oplyse dit ordre nummer.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bluetext = {
  color: "blue",
};

const halfWidth = {
  width: "50%",
};

const flexCenterBold = {
  display: "flex",
  fontWeight: "bold",
  textWrap: "nowrap",
  justifyContent: "center",
};

const noWrap = {
  textWrap: "nowrap",
  display: "flex",
  justifyContent: "center",
};

const flexCenter = {
  display: "flex",
  justifyContent: "center",
};

const flexCenterNoWrap = {};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
