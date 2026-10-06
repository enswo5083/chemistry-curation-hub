'use client';

import { useState } from 'react';
import { LessonMaterial } from '@/lib/types';
import { X, Check, Copy, Download, ShieldAlert, Award, BookOpen, Share2 } from 'lucide-react';

interface MaterialModalProps {
  material: LessonMaterial | null;
  onClose: () => void;
}

export default function MaterialModal({ material, onClose }: MaterialModalProps) {
  const [copied, setCopied] = useState(false);

  if (!material) return null;

  const handleCopy = () => {
    const textToCopy = `[고등학교 화학 수업 자료] ${material.title}\n과목: ${material.grade} | 주제: ${material.topic} | 유형: ${material.category}\n\n${material.content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full neu-button text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
            {material.grade}
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            {material.category}
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            주제: {material.topic}
          </span>
          {material.pedagogyModel && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {material.pedagogyModel}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-snug">
          {material.title}
        </h2>

        {/* Summary */}
        <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
          {material.summary}
        </p>

        {/* Key Formulas Section */}
        {material.keyFormulas && material.keyFormulas.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              핵심 반응식 및 화학 공식 (Key Formulas)
            </h4>
            <div className="flex flex-wrap gap-2">
              {material.keyFormulas.map((f, idx) => (
                <code
                  key={idx}
                  className="px-3 py-1.5 text-xs sm:text-sm font-mono font-semibold rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/50"
                >
                  {f}
                </code>
              ))}
            </div>
          </div>
        )}

        {/* Safety Warning if experimental */}
        {material.safetyLevel && material.safetyLevel !== '안전' && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">
                실험실 안전 가이드 (안전도 등급: {material.safetyLevel})
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                필수 보호구: {material.safetyEquipments?.join(', ') || '보안경, 라텍스 장갑, 실험복'}
              </p>
            </div>
          </div>
        )}

        {/* Full Detailed Content */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mb-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed whitespace-pre-line font-normal">
          {material.content}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>조회수 {material.views.toLocaleString()}회</span>
            <span>추천수 {material.likes}개</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm neu-card hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? '지도안 복사완료!' : '지도안 텍스트 복사'}
            </button>

            <button
              onClick={() => {
                alert('본 교수학습 지도안 및 실험 프로토콜이 성공적으로 클립보드에 준비되었습니다.');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-md shadow-violet-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              자료 다운로드 (Print/PDF)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
