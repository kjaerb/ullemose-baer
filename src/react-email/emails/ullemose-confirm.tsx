import { Order } from "@/validators/orderSchema";
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
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface UllemoseEmailProps {
  order: Order;
  orderId: string;
}

export default function UllemoseEmail({
  order = {
    contactInfo: {
      firstName: "Placeholder",
      lastName: "placeholder",
      email: "placeholder@placeholder.com",
      phone: "00000000",
    },
    fruitOrder: [{ name: "Solbær", kg: 5 }],
  },
  orderId = "placeholderId",
}: UllemoseEmailProps) {
  const replyEmail = process.env.NEXT_PUBLIC_EMAIL;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Body style={main}>
          <Container style={container}>
            <Img
              src='https://www.ullemose.dk/CustomerData/Files/Templates/1/logo.png'
              alt='Ullemose frugt'
              className='mx-auto'
            />
            <Hr style={hr} />
            <Section style={box}>
              <Heading style={paragraph} className='text-center'>
                Hej {order?.contactInfo.firstName}, Tak for din bestilling
              </Heading>
              <Text style={paragraph}>
                Vi har modtaget din bestilling og vil kontakte dig når vi ved
                hvornår vi høster.
              </Text>
              <Text style={paragraph}>
                Bemærk, da dette er en forudbestilling, kan det ikke garanteres
                at vi har hele din ordre når du henter den. Når vi høster giver
                vi besked om hvor meget der høstes og hvornår det kan hentes.
                Herfra, er det først til mølle princip. Forudbestilling er et
                pejlemærke til os, så vi kan planlægge hvor meget vi skal høste.
              </Text>
            </Section>
            <Hr style={hr} />
            <Section style={box}>
              <Heading style={paragraph} className='text-center'>
                Ordre nummer: {orderId}
              </Heading>

              <Row>
                <Column className='w-1/2'>
                  <Text className='flex justify-center font-bold'>Bær</Text>
                </Column>
                <Column className='w-1/2'>
                  <Text className='flex justify-center font-bold'>Kg</Text>
                </Column>
              </Row>
              {order.fruitOrder.map((fruit, i) => (
                <Row key={i}>
                  <Column className='w-1/2'>
                    <Text className='flex justify-center'>{fruit.name}</Text>
                  </Column>
                  <Column className='w-1/2'>
                    <Text className='flex justify-center'>{fruit.kg} Kg</Text>
                  </Column>
                </Row>
              ))}
            </Section>
            <Hr style={hr} />
            <Section style={box}>
              <Text style={paragraph}>
                Hvis du har nogle spørgsmål til din ordre, er du velkommen til
                at skrive en mail til{" "}
                <Link href={`mailto:${replyEmail}`} className='text-blue-500'>
                  ullemosefrugt@gmail.com
                </Link>
                .
              </Text>
              <Text style={paragraph}>Husk at oplyse dit ordre nummer.</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

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
