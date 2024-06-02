import Image from 'next/image';
import Link from 'next/link';

function SuvyChat() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[270px] break-keep rounded-[28px] rounded-bl-none bg-[#EEE] px-7 py-3 text-[#505050]">
        어어! 해! 화이팅! 이따 연락해 예시 문장입니당. 아무것도하기싫어 예시 문장입니당. 아무것도하기싫어 예시
        문장입니당. 아무것도하기싫어 예시 문장입니당. 아무것도하기싫?
      </div>
    </div>
  );
}

function PlayerChat() {
  return (
    <div className="flex justify-end">
      <div className="max-w-[270px] break-keep rounded-[28px] rounded-tr-none bg-primary-b200 px-7 py-3 text-white">
        어어! 해! 화이팅! 이따 연락해 예시 문장입니당. 아무것도하기싫어 예시 문장입니당. 아무것도하기싫어 예시
        문장입니당. 아무것도하기싫어 예시 문장입니당. 아무것도하기싫?
      </div>
    </div>
  );
}

export default function MainPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex w-full items-center gap-4 bg-white px-6 py-3 shadow-md">
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.99259 10.0039L11.4569 2.22855C11.6444 2.03651 11.6399 1.71942 11.4479 1.52292L10.1131 0.156316C9.92116 -0.040188 9.60866 -0.044654 9.42116 0.147384L0.305089 9.64212C0.206874 9.74038 0.162231 9.87436 0.17116 10.0039C0.166696 10.1379 0.211339 10.2674 0.305089 10.3656L9.42116 19.8648C9.60866 20.0569 9.92116 20.0524 10.1131 19.8559L11.4479 18.4893C11.6399 18.2928 11.6444 17.9757 11.4569 17.7837L3.99259 10.0039Z"
              fill="#596874"
            />
          </svg>
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/images/suvy.png" alt="suvy" width={32} height={36} />
          <div className="flex flex-col gap-1">
            <div className="text-[20px] font-bold text-primary-b200">SUVY</div>
            <div className="text-[16px] font-semibold text-[#53CC5F] before:mr-0.5 before:content-['•']">온라인</div>
          </div>
        </div>
      </header>
      <main className="relative w-full px-8 pt-8">
        <div className="flex min-h-screen w-full flex-col gap-9">
          <SuvyChat />
          <PlayerChat />
        </div>

        <div className="sticky bottom-9 w-full rounded-[26px] px-6 py-5 shadow-lg">
          <input placeholder="메세지를 입력하세요." className="w-full"></input>
          <button className="absolute right-6 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 8.57143L4.57143 10.2857L5.14286 16L8 12L12 16L16 0L0 8.57143ZM11.3821 13.7643L7.99999 10.2857L12.5714 4.00003L5.71427 9.49289L2.76427 8.38575L14.2643 2.22503L11.3821 13.7643Z"
                fill="#5396F1"
              />
            </svg>
          </button>
        </div>
      </main>
    </>
  );
}
