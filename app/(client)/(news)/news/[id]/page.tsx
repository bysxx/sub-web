// export default async function NewsDetailPage({ params: { id }, }: { params: { id: string }; }) {
//   const news = await db.news.findFirst({
//     where: {id: Number(id)},
//   });
//   return <NewsDetail news={news} />;
// }
export default function NewsDetailPage() {
  return <h1>오늘의 소식 페이지 뉴스 중 하나</h1>
}