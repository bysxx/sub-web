import Image from 'next/image';
import Link from 'next/link';

export default function StartPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center pt-40 pb-34">
          <Image src="/logo.svg" alt="logo" width={160} height={160} />
          <div className="text-[32px] font-bold">시작해볼까요?</div>
        </div>
        <div className="absolute top-3/4">
          <Link href="/">
            <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
          </Link>
        </div>
      </div>
    </div>
  );
}