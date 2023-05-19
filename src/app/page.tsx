import { Form } from "@/components/Form";
import { Input } from "@/components/Input";

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-xl mx-auto'>Bestil dine bær</h1>
      <Form />
    </div>
  );
}
