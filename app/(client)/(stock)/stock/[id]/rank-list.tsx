import Image from 'next/image';

interface INewsProps {
  userId: string;
  username: string;
  rank: number;
  howmuch: number;
}

export default function RankList({ userId, username, rank, howmuch }: INewsProps) {
  const profileImgSrc =
    username === '선생님' ? '/images/icon/Icon-Profile-teacher.svg' : '/images/icon/Icon-Profile-student.svg';

  return (
    <li className="flex min-w-47 cursor-pointer justify-between bg-transparent pb-2 pt-4">
      <div className="flex min-w-0">
        <div className="flex items-center text-center	font-semibold text-secondary-d300">{rank}</div>
        <div className="flex items-center">
          <div className="ml-4 mr-2 flex size-12 justify-center rounded-[12px] bg-white shadow">
            <Image src={profileImgSrc} alt="profileimg" width={32} height={32} />
          </div>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="truncate text-sm font-semibold leading-7 text-gray-900">
            {username}_{userId}
          </p>
          <p className="line-clamp-2 text-xs leading-4 text-gray-500">{howmuch.toLocaleString('ko-KR')} 서브</p>
        </div>
      </div>
      {/* <div className="flex items-center">
        <div className="ml-4 mr-2 flex size-12 justify-center rounded-[12px] bg-white shadow">
          <Image src={profileImgSrc} alt="profileimg" width={35} height={35} />
        </div>
      </div> */}
    </li>
  );
}
