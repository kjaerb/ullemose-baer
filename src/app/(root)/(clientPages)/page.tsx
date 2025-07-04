import { Form } from "@/components/Form/Form";
import { Metadata } from "next/types";

const metadata: Metadata = {
  title: "Ullemose bær",
};

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl mx-auto text-center">
        Forudbestil dine solbær og ribs
      </h1>
      <p className="text-center mx-auto">
        Udfyld formen for at blive kontaktet, med information om hvornår vi
        høster, samt afhentningstidspunkt.
      </p>
      <p className="text-center mx-auto">
        Man må gerne lave flere ordre for samme type bær.
      </p>

      <Form />
    </div>
  );
}

export { metadata };
