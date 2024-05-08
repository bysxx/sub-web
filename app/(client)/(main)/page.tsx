import StockContainer from './stock-container';

export default function MainPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <h1 className="mb-4 text-5xl font-bold">서브</h1>
      <h2>포트폴리오</h2>
      <div>나의 자산</div>
      <StockContainer />
    </main>
  );
}
