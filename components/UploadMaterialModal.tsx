'use client';

import { useState, useRef } from 'react';
import { LessonMaterial, GradeLevel, MaterialCategory, AttachedFile } from '@/lib/types';
import { X, Upload, Sparkles, Check, AlertCircle, ShieldAlert, Award, FileUp, Paperclip, FileText, Trash2 } from 'lucide-react';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (material: LessonMaterial) => void;
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

export default function UploadMaterialModal({
  isOpen,
  onClose,
  onAddMaterial,
}: UploadMaterialModalProps) {
  const [grade, setGrade] = useState<'통합과학' | '화학' | '물질과 에너지' | '화학 반응의 세계'>('화학');
  const [category, setCategory] = useState<'이론' | '실험' | '시뮬레이션' | '교수학습'>('이론');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [difficulty, setDifficulty] = useState<'기초' | '기본' | '심화'>('기본');
  const [formulas, setFormulas] = useState('');
  const [safetyLevel, setSafetyLevel] = useState<'안전' | '주의' | '경고'>('안전');
  const [safetyEquipments, setSafetyEquipments] = useState('');
  const [pedagogyModel, setPedagogyModel] = useState('5E 순환학습 모형');
  const [content, setContent] = useState('');
  
  // Attached File State (Optional)
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessFile = (selected: File) => {
    const ext = selected.name.split('.').pop()?.toLowerCase() || 'file';
    
    // Read file as Data URL for instant client-side download capability
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedFile({
        name: selected.name,
        size: selected.size,
        extension: ext,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(selected);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      handleProcessFile(selected);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected) {
      handleProcessFile(selected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim() || !summary.trim()) return;

    let gradeKey: GradeLevel = 'chem';
    if (grade === '통합과학') gradeKey = 'integrated';
    else if (grade === '화학') gradeKey = 'chem';
    else if (grade === '물질과 에너지') gradeKey = 'matter_energy';
    else if (grade === '화학 반응의 세계') gradeKey = 'reaction_world';

    let categoryKey: MaterialCategory = 'theory';
    if (category === '이론') categoryKey = 'theory';
    else if (category === '실험') categoryKey = 'experiment';
    else if (category === '시뮬레이션') categoryKey = 'simulation';
    else if (category === '교수학습') categoryKey = 'pedagogy';

    const parsedFormulas = formulas
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const parsedEquipments = safetyEquipments
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newMat: LessonMaterial = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      grade,
      gradeKey,
      topic: topic.trim(),
      category,
      categoryKey,
      summary: summary.trim(),
      difficulty,
      keyFormulas: parsedFormulas.length > 0 ? parsedFormulas : ['화학 반응식 등록'],
      safetyLevel,
      safetyEquipments: parsedEquipments.length > 0 ? parsedEquipments : ['보안경 착용'],
      pedagogyModel,
      views: 1,
      likes: 0,
      attachedFile: attachedFile || undefined,
      content: content.trim() || `### 1. 학습 목표\n- ${topic}의 핵심 개념을 탐구하고 설명할 수 있다.\n\n### 2. 주요 내용\n${summary}`,
    };

    onAddMaterial(newMat);
    onClose();

    // Reset fields
    setTitle('');
    setTopic('');
    setSummary('');
    setFormulas('');
    setSafetyEquipments('');
    setContent('');
    setAttachedFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 border border-white/60 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full neu-button text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Upload className="w-4 h-4" />
          <span>2022 개정 화학 수업 자료 등록</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
          신규 수업 자료 올리기
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          선생님의 귀중한 화학 수업 지도안, 탐구 실험 가이드 및 파일(PDF, PPT, HWP, HWPX 등)을 전국 교사와 학생에게 공유해 보세요.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 과목 & 자료 유형 (2022 개정 교육과정 기준) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                2022 개정 과목 <span className="text-rose-500">*</span>
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3.5 py-2.5 neu-input text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="통합과학">통합과학 (공통과목)</option>
                <option value="화학">화학 (일반선택과목)</option>
                <option value="물질과 에너지">물질과 에너지 (진로선택과목)</option>
                <option value="화학 반응의 세계">화학 반응의 세계 (진로선택과목)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                자료 유형 <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 neu-input text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="이론">이론 & 개념 강의노트</option>
                <option value="실험">탐구 실험 가이드</option>
                <option value="시뮬레이션">가상 시뮬레이션</option>
                <option value="교수학습">교수학습 모형 및 루브릭</option>
              </select>
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              자료 제목 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="예: [활동지 포함] 물질과 에너지 이상 기체 상태 방정식 MBL 압력 실험"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 neu-input text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* 단원 / 핵심 주제 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                단원 및 핵심 주제 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 기체의 압력·부피와 온도"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 neu-input text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                난이도
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3.5 py-2.5 neu-input text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="기초">기초 (입문 및 도입)</option>
                <option value="기본">기본 (표준 성취수준)</option>
                <option value="심화">심화 (수능/탐구 확장)</option>
              </select>
            </div>
          </div>

          {/* ==================================================== */}
          {/* 📎 파일 첨부 영역 (PDF, PPT, PPTX, HWP, HWPX 등 지원) */}
          {/* ==================================================== */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-violet-500" />
                <span>수업 자료 파일 첨부</span>
                <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">(선택 사항)</span>
              </label>
              <span className="text-[11px] text-slate-400">PDF, PPT, HWP, HWPX 등 지원</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.zip,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />

            {!attachedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
                  isDragging
                    ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-950/40'
                    : 'border-slate-300 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 bg-slate-50/60 dark:bg-slate-800/40'
                }`}
              >
                <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 mb-2 group-hover:scale-110 transition-transform">
                  <FileUp className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  클릭하여 파일을 선택하거나 여기로 드래그하세요
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  지원 형식: <strong>PDF, PPT/PPTX, HWP/HWPX, Word</strong> 등 (최대 30MB)
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-800/60 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase shrink-0 ${
                      getExtensionBadgeStyle(attachedFile.extension).bg
                    } ${getExtensionBadgeStyle(attachedFile.extension).text}`}
                  >
                    {attachedFile.extension}
                  </span>
                  <div className="truncate">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {attachedFile.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      파일 크기: {formatFileSize(attachedFile.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0 ml-2"
                  title="첨부 파일 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* 핵심 화학식 & 적용 교수학습 모형 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                핵심 화학식 및 반응식 (쉼표로 구분)
              </label>
              <input
                type="text"
                placeholder="예: P·V = n·R·T, ΔH < 0"
                value={formulas}
                onChange={(e) => setFormulas(e.target.value)}
                className="w-full px-4 py-2.5 neu-input text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                적용 교수학습 모형
              </label>
              <select
                value={pedagogyModel}
                onChange={(e) => setPedagogyModel(e.target.value)}
                className="w-full px-3.5 py-2.5 neu-input text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="개념기반 탐구학습 (Concept-Based Inquiry)">개념기반 탐구학습</option>
                <option value="5E 순환학습 모형 (BSCS 5E)">5E 순환학습 모형</option>
                <option value="생성형 AI 융합 화학 탐구">생성형 AI 융합 화학 탐구</option>
                <option value="플립드 러닝 (Flipped Learning)">플립드 러닝</option>
                <option value="과정중심 평가 성취 루브릭">과정중심 평가 성취 루브릭</option>
              </select>
            </div>
          </div>

          {/* 실험 안전 등급 및 보호구 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                실험 안전 등급
              </label>
              <select
                value={safetyLevel}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3.5 py-2.5 neu-input text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="안전">안전 (일반 이론/가상 실험)</option>
                <option value="주의">주의 (시약 취급 및 가열 포함)</option>
                <option value="경고">경고 (강산/강염기/유독가스 주의)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                필수 안전 보호구 (쉼표 구분)
              </label>
              <input
                type="text"
                placeholder="예: 보안경 필수, 라텍스 장갑, 환기 후드"
                value={safetyEquipments}
                onChange={(e) => setSafetyEquipments(e.target.value)}
                className="w-full px-4 py-2.5 neu-input text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* 한 줄 요약 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              자료 요약 설명 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="자료의 핵심 내용과 수업 활용 포인트를 1~2문장으로 요약해 주세요."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-2.5 neu-input text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* 상세 수업 지도안 / 본문 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              상세 수업 지도안 / 실험 프로토콜 본문
            </label>
            <textarea
              rows={4}
              placeholder="학습 목표, 단계별 수업 전개 과정, 실험 순서, 오개념 교정 팁 등을 자유롭게 작성하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 neu-input text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200/80 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-md shadow-violet-500/25 transition-all"
            >
              <Upload className="w-4 h-4" />
              자료 등록하기
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
