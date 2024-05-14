import NewsList from "app/(client)/(main)/news-list";

export default function NewsExpandPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
    <div className="w-full mt-8 ">
      <h1 className="text-[22px] font-bold mb-4">오늘의 소식</h1>
      <ul role="list" className="mt-4 flex flex-col w-full overflow-x-hidden scrollbar-hide divide-y divide-[#D0DCE5]">
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
      </ul>
    </div>
    </main>
  );
}