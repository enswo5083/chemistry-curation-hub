'use client';

import { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, INITIAL_RANKINGS } from '@/lib/initialData';
import { Ranking } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import confetti from 'canvas-confetti';
import { Trophy, Award, CheckCircle, XCircle, RotateCcw, Send, Flame, Zap } from 'lucide-react';

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [rankings, setRankings] = useState<Ranking[]>(INITIAL_RANKINGS);
  const [nickname, setNickname] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load rankings from Supabase if configured
  useEffect(() => {
    async function fetchRankings() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase
          .from('rankings')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);
        if (!error && data && data.length > 0) {
          setRankings(data);
        }
      } catch (err) {
        console.warn('Rankings load fallback to initialData:', err);
      }
    }
    fetchRankings();
  }, []);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.answer) {
      setScore((prev) => prev + 20); // 5 questions * 20 = 100 points
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      // Trigger celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
    setHasSubmitted(false);
    setNickname('');
  };

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || hasSubmitted) return;
    setIsSubmitting(true);

    const newEntry: Ranking = {
      id: Date.now(),
      nickname: nickname.trim(),
      score: score,
      played_at: new Date().toISOString(),
    };

    // Try submitting to Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('rankings')
          .insert([
            {
              nickname: newEntry.nickname,
              score: newEntry.score,
              played_at: newEntry.played_at,
            },
          ])
          .select();
        if (!error && data) {
          setRankings((prev) =>
            [...prev, data[0]].sort((a, b) => b.score - a.score).slice(0, 10)
          );
        } else {
          setRankings((prev) =>
            [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
          );
        }
      } catch {
        setRankings((prev) =>
          [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
        );
      }
    } else {
      setRankings((prev) =>
        [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
      );
    }

    setIsSubmitting(false);
    setHasSubmitted(true);
  };

  return (
    <section id="quiz" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Interactive Chemistry Quiz & Leaderboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            도전! 고교 화학 챔피언십 퀴즈
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            핵심 수능 및 교육과정 개념을 5문항 퀴즈로 풀고 명예의 전당 랭킹에 도전해 보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quiz Card (7 cols) */}
          <div className="lg:col-span-7 neu-card p-6 sm:p-8">
            {!isFinished ? (
              <div>
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                  <span>문제 {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
                  <span className="text-violet-600 dark:text-violet-400">현재 점수: {score}점</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Concept badge */}
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 mb-3">
                  단원: {currentQ.concept}
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, optIdx) => {
                    let btnStyle = 'neu-button text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80';
                    if (isAnswered) {
                      if (optIdx === currentQ.answer) {
                        btnStyle = 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30';
                      } else if (optIdx === selectedOption) {
                        btnStyle = 'bg-rose-500 text-white shadow-md shadow-rose-500/30';
                      } else {
                        btnStyle = 'opacity-50 neu-button text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 text-left font-medium rounded-2xl transition-all duration-200 flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && optIdx === currentQ.answer && (
                          <CheckCircle className="w-5 h-5 text-white shrink-0 ml-2" />
                        )}
                        {isAnswered && optIdx === selectedOption && optIdx !== currentQ.answer && (
                          <XCircle className="w-5 h-5 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Answer */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6 animate-fadeIn">
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      개념 해설
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-md transition-all text-sm sm:text-base"
                  >
                    {currentIdx + 1 === QUIZ_QUESTIONS.length ? '최종 결과 확인하기' : '다음 문제로'}
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Finished View */
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-xl shadow-amber-500/20 mb-4 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                  퀴즈 완료!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  고교 화학 탐구 역량 평가 결과
                </p>

                <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 mb-6 max-w-sm mx-auto">
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">
                    최종 획득 점수
                  </div>
                  <div className="text-5xl font-black text-purple-700 dark:text-purple-300 my-2">
                    {score} <span className="text-2xl font-normal">/ 100</span>
                  </div>
                  <p className="text-xs text-purple-600/80 dark:text-purple-400/80">
                    {score >= 80 ? '화학 마스터 등급 달성!' : score >= 60 ? '우수한 탐구 역량입니다!' : '조금만 더 복습해 보세요!'}
                  </p>
                </div>

                {/* Nickname submission for ranking table */}
                {!hasSubmitted ? (
                  <form onSubmit={handleSubmitScore} className="max-w-sm mx-auto mb-6">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 text-left">
                      명예의 전당 랭킹 등록
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={12}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임 입력 (예: 화학천재)"
                        required
                        className="flex-1 px-4 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2.5 rounded-xl font-bold text-white bg-violet-600 hover:bg-violet-500 transition-all text-xs flex items-center gap-1 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        등록
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold max-w-sm mx-auto mb-6 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    랭킹에 성공적으로 등록되었습니다!
                  </div>
                )}

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm neu-button text-slate-700 dark:text-slate-200 hover:text-violet-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  다시 도전하기
                </button>
              </div>
            )}
          </div>

          {/* Rankings Table (5 cols) */}
          <div className="lg:col-span-5 neu-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  실시간 명예의 전당
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                Top 5
              </span>
            </div>

            <div className="space-y-3">
              {rankings.slice(0, 5).map((r, rankIdx) => {
                const isTop3 = rankIdx < 3;
                return (
                  <div
                    key={r.id || rankIdx}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                      rankIdx === 0
                        ? 'bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-transparent border border-amber-300/40 dark:border-amber-700/40'
                        : 'bg-white/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                          rankIdx === 0
                            ? 'bg-amber-400 text-slate-900'
                            : rankIdx === 1
                            ? 'bg-slate-300 text-slate-800'
                            : rankIdx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {rankIdx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {r.nickname}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(r.played_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-extrabold text-base text-violet-600 dark:text-violet-400">
                        {r.score}점
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Supabase `rankings` 테이블과 실시간 동기화
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
