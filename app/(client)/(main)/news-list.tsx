import Link from "next/link";

export default function NewsList() {
  return (
    <Link href="/news/1">
      <li className="flex justify-between min-w-47 bg-transparent pt-4 pb-4 cursor-pointer">
        <div className="flex min-w-0">
          <div className="min-w-0 flex-auto">
            <p className="text-sm truncate font-semibold leading-7 text-gray-900">선생님의 저녁식사</p>
            <p className="text-xs leading-4 text-gray-500 line-clamp-2">선생님은 오늘 저녁에 치킨을 먹을 예정이에요! 오늘은 매콤달콤한 양념이 땡겨요! 느껴진다. 이건바로... 지금까지 이런 맛은 없었다. 이것은 갈비인가, 통닭인가? 딱대 수원왕갈비통닭이여 후훗</p> 
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-12 ml-4 mr-2 flex-none bg-white rounded-[20px] shadow"></div>
          {/* 나중에 <img className="h-12 w-12 ml-4 mr-2 flex-none bg-white rounded-[20px] shadow" src={person.imageUrl} alt="" /> */}
        </div>
      </li>
    </Link>
  );
}
