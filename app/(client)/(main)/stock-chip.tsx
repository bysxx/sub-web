export default function StockCard() {
  return (
    <li className="relative min-w-47 rounded-[20px] bg-[#FF9508]/20 p-4">
      <div className="absolute right-4 top-4 rounded-xl bg-secondary-r100 px-2 py-1 text-[10px] text-white">2.5%</div>
      <div className="flex justify-start">
        <div className="rounded-xl bg-[#FF9508] p-3">
          <div className="size-6"></div>
        </div>
      </div>
      <div className="mt-2 text-[12px] text-secondary-d300">선생님 몸무게</div>
      <div className="mt-1 align-bottom text-[20px] text-secondary-d400">
        56,000<span className="text-[12px]"> 미소</span>
      </div>
    </li>
  );
}
