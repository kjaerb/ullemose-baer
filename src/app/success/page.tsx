import { Success } from "@/components/svg/Success";

export default function SuccessPage() {
  return (
    <div className='flex flex-col items-center justify-center text-center px-2'>
      <Success />
      <h1 className='font-bold text-2xl'>Tak for din forudbestilling</h1>
      <p>
        Vi kontakter dig med ydeligere information, når vi ved hvornår vi
        høster.
      </p>
      <p className='mt-4'>
        Pågrund af skiftene forhold, kan vi ikke garantere at alle får deres
        ordre. Vi gør vores bedste for at nå i mål ordre.
      </p>
    </div>
  );
}
