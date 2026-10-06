import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '고등학교 화학 수업 모음집 | K-Chemistry Curriculum & Inquiry Hub',
  description: '고등학교 교사와 학생을 위한 고품격 화학 교육 포털. 학년별/주제별/실험별 큐레이션, 최신 5E 및 개념기반 탐구 모델, 퀴즈 랭킹 및 상호작용 플랫폼',
  keywords: ['고등학교 화학', '화학I', '화학II', '통합과학', '화학실험', '5E 탐구학습', '개념기반 교육과정', '수업자료'],
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
