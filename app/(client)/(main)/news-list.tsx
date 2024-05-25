import Link from "next/link";
import Image from "next/image";

interface INewsProps {
  id: number;
  title: string;
  description: string;
  writer: string;
  time: string;
}

export default function NewsList({ id, title, description, writer, time }: INewsProps) {
  const profileImgSrc = writer === "선생님"
    ? "/images/icon/Icon-Profile-teacher.svg"
    : "/images/icon/Icon-Profile-student.svg";

  return (
    <Link href={`/news/${id}`}>
      <li className="flex justify-between min-w-47 bg-transparent pt-4 pb-2 cursor-pointer">
        <div className="flex min-w-0">
          <div className="min-w-0 flex-auto">
            <p className="text-sm truncate font-semibold leading-7 text-gray-900">{title}</p>
            <p className="text-xs leading-4 text-gray-500 line-clamp-2">{description}</p> 
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{time} | {writer}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-12 ml-4 mr-2 flex justify-center bg-white rounded-[12px] shadow">
            <Image src={profileImgSrc} alt="profileimg" width={35} height={35} />
          </div>
        </div>
      </li>
    </Link>
  );
}
