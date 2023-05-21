import { Form } from "@/components/Form";

const metadata = {
  title: "Ullemose bær",
};

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-3xl mx-auto'>Forudbestil dine solbær og ribs</h1>
      <p className='text-center mx-auto'>
        Udfyld formen for at blive kontaktet, med information om hvornår vi
        høster, samt afhentningstidspunkt
      </p>
      <Form />
    </div>
  );
}

export { metadata };
