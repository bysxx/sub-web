import '@styles/global.css';

import Navigation from './navigation';

export const metadata = {
  title: '어린이 모의투자 플랫폼​ - SUB',
  description: '생성형 AI를 활용한 어린이 모의투자 플랫폼​',
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
