import Image from 'next/image';
import Link from 'next/link';

import { useUserData } from '../../../src/hooks/useUserData';

export interface INewsProps {
  _id: string;
  title: string;
  description: string;
  userId: string;
  date: string;
}

export default function NewsList({ _id, title, description, userId, date }: INewsProps) {
  const userData = useUserData();
  const profileImgSrc =
    userId === 'adminId' ? '/images/icon/Icon-Profile-teacher.svg' : '/images/icon/Icon-Profile-student.svg';
  const userNickname = userId === 'adminId' ? '선생님' : userData?.nickname || '게스트';
  const timeOnly = date.slice(-8);

  return (
    <Link href={`/news/${_id}`}>
      <li className="flex min-w-47 cursor-pointer justify-between bg-transparent pb-2 pt-4">
        <div className="flex min-w-0">
          <div className="min-w-0 flex-auto">
            <p className="truncate text-sm font-semibold leading-7 text-gray-900">{title}</p>
            <p className="line-clamp-2 text-xs leading-4 text-gray-500">{description}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {timeOnly} | {userNickname}
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
