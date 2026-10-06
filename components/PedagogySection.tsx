'use client';

import { useState } from 'react';
import { PEDAGOGY_THEORIES } from '@/lib/initialData';
import { Brain, Sparkles, Compass, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

export default function PedagogySection() {
  const [selectedTheoryIndex, setSelectedTheoryIndex] = useState(0);
  const activeTheory = PEDAGOGY_THEORIES[selectedTheoryIndex];

  return (
    <section id="pedagogy" className="py-16 md:py-24 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>Modern Pedagogical Frameworks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            미래형 고교 화학 수업을 위한 최신 교수학습 이론
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            학생 참여 중심 탐구부터 에듀테크·AI 융합 수업, 2022 개정 역량 평가까지 현장 교사를 위한 과학과 핵심 교수 모델을 집대성했습니다.
          </p>
        </div>

        {/* Interactive Theory Tabs / Selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {PEDAGOGY_THEORIES.map((theory, idx) => {
            const isSelected = selectedTheoryIndex === idx;
            return (
              <button
                key={theory.id}
                onClick={() => setSelectedTheoryIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'neu-card ring-2 ring-violet-500 shadow-lg shadow-violet-500/20'
                    : 'bg-white/40 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {theory.tag}
                  </span>
                  {isSelected && <Sparkles className="w-4 h-4 text-violet-500 animate-spin" />}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1 mb-1">
                  {theory.title.split(' (')[0]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {theory.founder}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Theory Detail Box with Neumorphic Layering */}
        <div className="neu-card p-6 sm:p-10 border border-white/60 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-violet-600 text-white shadow-sm">
                  {activeTheory.tag}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  창안: {activeTheory.founder}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                {activeTheory.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                {activeTheory.summary}
              </p>

              <div className="p-4 rounded-2xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 mb-6">
                <h4 className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> 화학 수업 적용 시사점
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  화학 현상의 거시적 관찰(실험 결과)과 미시적 표상(원자/분자 모델), 상징적 표상(화학 반응식) 사이의 괴리를 극복하고 학생들이 스스로 일반화 명제를 형성하도록 돕습니다.
                </p>
              </div>
            </div>

            {/* Right Steps Pipeline */}
            <div className="w-full lg:w-96 shrink-0 bg-slate-50/80 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-violet-500" />
                단계별 실행 프로토콜 (Execution Steps)
              </h4>

              <div className="space-y-3">
                {activeTheory.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white text-xs font-black shrink-0 mt-0.5">
                      {sIdx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
