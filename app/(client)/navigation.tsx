'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';

export default function Navigation() {
  // const path = usePathname();
  return (
    <nav className="fixed bottom-10 left-1/2 z-30 flex h-16 w-[346px] -translate-x-1/2 justify-evenly rounded-[20px] bg-gradient-to-b from-transparent to-white px-2 align-middle shadow-xl backdrop-blur-sm">
      <div className="bg-transparent"></div>
      <ul className="flex max-h-64 items-center gap-[14px]">
        <Link href="/news">
          <li>
            <button className="flex size-12 items-center justify-center rounded-[20px] bg-white">
              <Image src="/images/icon/Icon_Trade.svg" alt="Home" width={16} height={16} />
            </button>
          </li>
        </Link>
        <Link href="/stock">
          <li>
            <button className="flex size-12 items-center justify-center rounded-[20px] bg-white">
              <Image src="/images/icon/Icon_Chart.svg" alt="Stock" width={16} height={16} />
            </button>
          </li>
        </Link>
        <Link href="/">
          <li className="overflow-visible">
            <button className="flex size-20 items-center justify-center overflow-visible rounded-full bg-primary-b200 shadow-2xl">
              <Image src="/images/icon/Icon_Home.svg" alt="Home" width={32} height={32} />
            </button>
          </li>
        </Link>
        <Link href="/chat">
          <li>
            <button className="flex size-12 items-center justify-center overflow-hidden rounded-[20px] bg-white pt-2">
              <Image src="/images/icon/Icon_Suvy.svg" alt="Home" width={48} height={30} />
            </button>
          </li>
        </Link>
        <Link href="/login">
          <li>
            <button className="flex size-12 items-center justify-center rounded-[20px] bg-white">
              <Image src="/images/icon/Icon_Human.svg" alt="Home" width={16} height={16} />
            </button>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
