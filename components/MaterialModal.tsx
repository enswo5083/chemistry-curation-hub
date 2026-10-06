'use client';

import { useState } from 'react';
import { LessonMaterial } from '@/lib/types';
import { X, Check, Copy, Download, ShieldAlert, Award, BookOpen, Share2, Paperclip, FileText } from 'lucide-react';

interface MaterialModalProps {
  material: LessonMaterial | null;
  onClose: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExtensionBadgeStyle(ext: string): { bg: string; text: string } {
  switch (ext.toLowerCase()) {
    case 'pdf':
      return { bg: 'bg-rose-100 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300' };
    case 'hwp':
    case 'hwpx':
      return { bg: 'bg-sky-100 dark:bg-sky-950/60', text: 'text-sky-700 dark:text-sky-300' };
    case 'ppt':
    case 'pptx':
      return { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-700 dark:text-amber-300' };
    case 'doc':
    case 'docx':
      return { bg: 'bg-indigo-100 dark:bg-indigo-950/60', text: 'text-indigo-700 dark:text-indigo-300' };
    default:
      return { bg: 'bg-purple-100 dark:bg-purple-950/60', text: 'text-purple-700 dark:text-purple-300' };
  }
}

export default function MaterialModal({ material, onClose }: MaterialModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!material) return null;

  const handleCopy = () => {
    const textToCopy = `[고등학교 화학 수업 자료] ${material.title}\n과목: ${material.grade} | 주제: ${material.topic} | 유형: ${material.category}\n\n${material.content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!material.attachedFile) return;
    const { name, dataUrl } = material.attachedFile;
    
    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create a markdown/text download blob with the lesson plan content
      const contentText = `[2022 개정 고등학교 화학 수업 자료]\n제목: ${material.title}\n과목: ${material.grade} | 단원: ${material.topic} | 유형: ${material.category}\n적용 모형: ${material.pedagogyModel || '5E 모형'}\n\n${material.content}`;
      const blob = new Blob([contentText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
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

        {/* 📎 Attached File Banner (If Present) */}
        {material.attachedFile && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-transparent border border-violet-200 dark:border-violet-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <span
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase shrink-0 ${
                  getExtensionBadgeStyle(material.attachedFile.extension).bg
                } ${getExtensionBadgeStyle(material.attachedFile.extension).text}`}
              >
                {material.attachedFile.extension}
              </span>
              <div className="truncate">
                <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>첨부 수업 자료 파일</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {material.attachedFile.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  용량: {formatFileSize(material.attachedFile.size)}
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadFile}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-violet-600 hover:bg-violet-500 shadow-sm hover:shadow transition-all shrink-0"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>다운로드 완료!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>파일 받기 ({material.attachedFile.extension.toUpperCase()})</span>
                </>
              )}
            </button>
          </div>
        )}

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

            {material.attachedFile ? (
              <button
                onClick={handleDownloadFile}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-md shadow-violet-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                첨부파일 다운로드 ({material.attachedFile.extension.toUpperCase()})
              </button>
            ) : (
              <button
                onClick={() => {
                  const blob = new Blob([material.content], { type: 'text/markdown;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `[지도안]_${material.title}.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-md shadow-violet-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                지도안 저장 (.md)
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
