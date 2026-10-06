import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '고등학교 화학 수업 모음집 | 2022 개정 화학·물질과 에너지·화학 반응의 세계',
  description: '고등학교 교사와 학생을 위한 2022 개정 화학 교육 포털. 통합과학, 화학, 물질과 에너지, 화학 반응의 세계 교과별 큐레이션, 자료 올리기 및 탐구 플랫폼',
  keywords: ['고등학교 화학', '화학', '물질과 에너지', '화학 반응의 세계', '통합과학', '화학실험', '5E 탐구학습', '개념기반 교육과정', '수업자료'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased min-h-screen relative selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
