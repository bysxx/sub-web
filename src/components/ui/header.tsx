"use client";
import LogoSVG from "public/logo.svg";
import Image from 'next/image';
import Head from 'next/head';


function Header() {
    return (
      <div className="w-full">
        <div>
          {/* <LogoSVG />  */}
          <Image src={LogoSVG} alt="logo" width={22} />
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