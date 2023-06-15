import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <div className='my-4 pb-4 border-b border-b-gray-500'>
        <Link href='/admin'>
          <Image
            src={"/logo.png"}
            alt={"Ullemose frugt"}
            width={768}
            height={300}
            className='lg:px-16 md:px-10 sm:px-2'
          />
        </Link>
      </div>
    </header>
  );
}
