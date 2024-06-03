import Image from 'next/image';
import Link from 'next/link';

export interface INewsProps {
  id: string;
  title: string;
  description: string;
  writer: string;
  time: string /* 백엔드에서 안옴 */;
}

export default function NewsList({ id, title, description, writer, time }: INewsProps) {
  const profileImgSrc =
    writer === '선생님' ? '/images/icon/Icon-Profile-teacher.svg' : '/images/icon/Icon-Profile-student.svg';

  return (
    <Link href={`/news/${id}`}>
      <li className="flex min-w-47 cursor-pointer justify-between bg-transparent pb-2 pt-4">
        <div className="flex min-w-0">
          <div className="min-w-0 flex-auto">
            <p className="truncate text-sm font-semibold leading-7 text-gray-900">{title}</p>
            <p className="line-clamp-2 text-xs leading-4 text-gray-500">{description}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {time} | {writer}
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
