"use client";
import { LogoSVG } from 'src/assets/CommonIcons';
import Image from 'next/image';

// 윤성님 수정코드
function Header() {
  return (
    <div className="w-full">
      <div className="flex gap-1">
        {/* <LogoSVG />  */}
        <Image src="/logo.svg" alt="logo" width={22} height={22} />
        <h1 className="text-[22px] font-bold">SUB</h1>
      </div>
    </div>
  );
}

// 이전 코드.. 색상이 빠져서 나와요ㅠ
// function Header() {
//   return (
//     <div className="w-full">
//       <div className="flex items-center">
//         <LogoSVG /> 
//         <Image src="/logo.svg" alt="logo" width={22} height={22} />
//         <div className="text-[22px] font-bold ml-1.5">SUB</div>
//       </div>
//     </div>
//   );
// }

export default Header;
