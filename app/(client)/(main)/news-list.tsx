import Image from 'next/image';
import Link from 'next/link';

export interface INewsProps {
  nickname: string;
  hint: {
    _id: string;
    title: string;
    description: string;
    userId: string;
    date: string;
  };
}

export default function NewsList({ nickname, hint }: INewsProps) {
  const profileImgSrc =
    hint.userId === 'adminId' ? '/images/icon/Icon-Profile-teacher.svg' : '/images/icon/Icon-Profile-student.svg';
  const timeOnly = hint.date?.slice(-13, -8);

  return (
    <Link href={`/news/${hint._id}`}>
      <li className="flex min-w-47 cursor-pointer justify-between bg-transparent pb-2 pt-4">
        <div className="flex min-w-0">
          <div className="min-w-0 flex-auto">
            <p className="truncate text-sm font-semibold leading-7 text-gray-900">{hint.title}</p>
            <p className="line-clamp-2 text-xs leading-4 text-gray-500">{hint.description}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {timeOnly} | {nickname}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-4 mr-2 flex size-12 justify-center rounded-[12px] bg-white shadow">
            <Image src={profileImgSrc} alt="profileimg" width={35} height={35} />
          </div>
        </div>
      </li>
    </Link>
  );
}
