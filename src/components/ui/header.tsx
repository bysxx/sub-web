'use client';

import Image from 'next/image';

function Header() {
  return (
    <div className="w-full">
      <div className="flex gap-1">
        {/* <LogoSVG />  */}
        <Image src="/logo.svg" alt="logo" width={22} height={22} />
        <h1 className="text-[22px] font-bold">SUB</h1>
      </div>
    </div>
    // <div className="bg-gray-100 min-h-screen">
    // <Head>
    // <LogoSVG />
    //   <title>SUB</title>
    // </Head>
    // </div>
  );
}

export default Header;
