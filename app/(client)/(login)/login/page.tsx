import Image from 'next/image';
import Link from 'next/link';

export default function StartPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center pb-[136px] pt-40 ">
          <Image src="/logo.svg" alt="logo" width={160} height={160} />
          <div className="text-[32px] font-bold">SUB</div>
        </div>
        <div className="absolute top-3/4">
          <Link href="/login/username">
            <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} className="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
