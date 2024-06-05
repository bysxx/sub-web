import '@styles/global.css';

import Navigation from './navigation';

export const metadata = {
  title: 'SUB',
  description: '어린이 모의투자 서비스',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto max-w-xl leading-tight shadow-md">{children}</div>
        <Navigation />
      </body>
    </html>
  );
}
