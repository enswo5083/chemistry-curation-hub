import { Sparkles, Compass, Flame, ArrowRight, ShieldCheck, Zap, BookOpen } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Aurora Ambient Mesh Background Elements */}
      <div className="aurora-blob-1" />
      <div className="aurora-blob-2" />
      <div className="aurora-blob-3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        {/* Flat 2.0 Pill Badge with Aurora Outline */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-purple-200/80 dark:border-purple-800/50 shadow-sm backdrop-blur-md mb-6 hover:scale-105 transition-transform duration-300">
          <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-ping" />
          <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-violet-700 to-cyan-600 dark:from-violet-300 dark:to-cyan-300 bg-clip-text text-transparent">
            2022 개정 교육과정 & 최신 탐구 교수학습 모형 완벽 탑재
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          미래를 탐구하는 분자의 세계, <br />
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-300 dark:to-cyan-300 bg-clip-text text-transparent">
            고등학교 화학 수업의 모든 것
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          통합과학 화학 영역부터 화학 I·II, 고급 화학까지 학년별·주제별 개념 이론,
          실험실 안전 매뉴얼, <span className="font-semibold text-purple-600 dark:text-purple-400">5E 순환학습 모형 및 개념기반 탐구</span> 교수학습 지도안을
          한눈에 큐레이션하는 대한민국 교사·학생을 위한 전문 플랫폼입니다.
        </p>

        {/* Neumorphic & Modern Gradient Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#curation"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/30 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            수업 자료 탐색하기
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>

          <a
            href="#quiz"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-slate-800 dark:text-slate-100 neu-card hover:-translate-y-1 transition-all duration-300"
          >
            <Flame className="w-5 h-5 text-amber-500 animate-bounce" />
            화학 챔피언십 퀴즈 풀기
          </a>
        </div>

        {/* Stat Highlights Cards with Soft Neumorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="neu-card p-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">커리큘럼</span>
              <Compass className="w-5 h-5 text-violet-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">4개 교과</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">통합과학·화학I·II·고급화학</p>
          </div>

          <div className="neu-card p-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">자료 아카이브</span>
              <BookOpen className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">100% 검증</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">이론, 실험, 시뮬레이션</p>
          </div>

          <div className="neu-card p-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">탐구 안전 등급</span>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">MSDS 준수</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">실험 안전 매뉴얼 제공</p>
          </div>

          <div className="neu-card p-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">인프라 통일</span>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">서울 리전</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Vercel icn1 + Supabase</p>
          </div>
        </div>

      </div>
    </section>
  );
}
