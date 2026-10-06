'use client';

import { useState, useMemo, useEffect } from 'react';
import { INITIAL_MATERIALS } from '@/lib/initialData';
import { LessonMaterial, GradeLevel, MaterialCategory } from '@/lib/types';
import { getMaterialsFromStorage, saveMaterialToStorage, deleteMaterialFromStorage } from '@/lib/storage';
import { getIsAdminSession } from '@/lib/adminAuth';
import { Search, Heart, ExternalLink, Filter, Sparkles, BookOpen, Beaker, Laptop, Award, Shield, Upload, PlusCircle, CheckCircle2, Paperclip, Edit3, Trash2, Lock, ShieldCheck } from 'lucide-react';
import MaterialModal from './MaterialModal';
import UploadMaterialModal from './UploadMaterialModal';
import AdminLoginModal from './AdminLoginModal';
import confetti from 'canvas-confetti';

export default function CurationSection() {
  const [materials, setMaterials] = useState<LessonMaterial[]>(INITIAL_MATERIALS);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Teacher Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Modals state
  const [activeModalMaterial, setActiveModalMaterial] = useState<LessonMaterial | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<LessonMaterial | null>(null);

  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen to admin session
  useEffect(() => {
    setIsAdmin(getIsAdminSession());
    const handleAuthChange = () => {
      setIsAdmin(getIsAdminSession());
    };
    window.addEventListener('admin-session-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('admin-session-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Load persistent user materials from IndexedDB/LocalStorage on mount
  useEffect(() => {
    async function loadSavedMaterials() {
      try {
        const saved = await getMaterialsFromStorage();
        if (saved && saved.length > 0) {
          const savedMap = new Map<string, LessonMaterial>();
          saved.forEach((m) => savedMap.set(m.id, m));
          
          const mergedInitial = INITIAL_MATERIALS.map((init) =>
            savedMap.has(init.id) ? savedMap.get(init.id)! : init
          );

          const newCreations = saved.filter(
            (s) => !INITIAL_MATERIALS.some((init) => init.id === s.id)
          );

          setMaterials([...newCreations, ...mergedInitial]);
        }
      } catch (err) {
        console.warn('Error loading materials from storage:', err);
      }
    }
    loadSavedMaterials();
  }, []);

  const gradeOptions: { key: GradeLevel; label: string; badge: string }[] = [
    { key: 'all', label: '전체 과목', badge: '전체' },
    { key: 'integrated', label: '통합과학', badge: '공통' },
    { key: 'chem', label: '화학', badge: '일반선택' },
    { key: 'matter_energy', label: '물질과 에너지', badge: '진로선택' },
    { key: 'reaction_world', label: '화학 반응의 세계', badge: '진로선택' },
  ];

  const categoryOptions: { key: MaterialCategory; label: string; icon: any }[] = [
    { key: 'all', label: '전체 유형', icon: Filter },
    { key: 'theory', label: '이론 & 개념', icon: BookOpen },
    { key: 'experiment', label: '탐구 실험', icon: Beaker },
    { key: 'simulation', label: '가상 시뮬레이션', icon: Laptop },
    { key: 'pedagogy', label: '교수학습 모형', icon: Award },
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchGrade = selectedGrade === 'all' || item.gradeKey === selectedGrade;
      const matchCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchCategory && matchSearch;
    });
  }, [materials, selectedGrade, selectedCategory, searchQuery]);

  // Handle adding new material
  const handleAddMaterial = async (newMat: LessonMaterial) => {
    const updated = [newMat, ...materials];
    setMaterials(updated);

    await saveMaterialToStorage(newMat);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    setToastMessage(`"${newMat.title}" 자료가 성공적으로 등록 및 저장되었습니다!`);
    setTimeout(() => setToastMessage(null), 3500);

    setSelectedGrade(newMat.gradeKey);
  };

  // Handle updating existing material
  const handleUpdateMaterial = async (updatedMat: LessonMaterial) => {
    const updated = materials.map((m) => (m.id === updatedMat.id ? updatedMat : m));
    setMaterials(updated);

    await saveMaterialToStorage(updatedMat);

    if (activeModalMaterial?.id === updatedMat.id) {
      setActiveModalMaterial(updatedMat);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    setToastMessage(`"${updatedMat.title}" 자료가 성공적으로 수정되어 다시 게시되었습니다!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenEdit = (mat: LessonMaterial, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setActiveModalMaterial(null);
    setEditingMaterial(mat);
    setIsUploadModalOpen(true);
  };

  const handleOpenUploadNew = () => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingMaterial(null);
    setIsUploadModalOpen(true);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      const isAlready = next.has(id);
      if (isAlready) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setMaterials((curr) =>
        curr.map((m) => (m.id === id ? { ...m, likes: m.likes + (isAlready ? -1 : 1) } : m))
      );
      return next;
    });
  };

  return (
    <section id="curation" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 right-4 sm:right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 font-semibold text-sm animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Status Notice Banner */}
        {isAdmin && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-transparent border border-amber-300 dark:border-amber-700/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
              <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>👑 교사 관리자 모드 활성화 중: 선생님 본인만 신규 자료 등록 및 기존 자료 수정이 가능합니다.</span>
            </div>
          </div>
        )}

        {/* Section Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm tracking-wide uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>2022 Revised Curriculum Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              2022 개정 화학 수업 자료 큐레이션
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              <strong>통합과학</strong>, <strong>화학</strong>, <strong>물질과 에너지</strong>, <strong>화학 반응의 세계</strong> 교과별 검증된 강의노트, 실험 안전 프로토콜 및 인터랙티브 탐구 지도안
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Direct Upload Button (Admin controlled) */}
            <button
              onClick={handleOpenUploadNew}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all shrink-0 hover:-translate-y-0.5 ${
                isAdmin
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-violet-500/25'
                  : 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-slate-900/20'
              }`}
            >
              {isAdmin ? <Upload className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-400" />}
              <span>{isAdmin ? '자료 올리기' : '자료 올리기 (교사 전용)'}</span>
            </button>

            {/* Neumorphic Search Bar */}
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="단원, 화학식, 실험 검색..."
                className="w-full pl-11 pr-4 py-3 neu-input text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
          </div>
        </div>

        {/* 2022 개정 교과목 Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {gradeOptions.map((g) => {
            const active = selectedGrade === g.key;
            return (
              <button
                key={g.key}
                onClick={() => setSelectedGrade(g.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30'
                    : 'neu-button text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                <span>{g.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  active 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {g.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categoryOptions.map((c) => {
            const active = selectedCategory === c.key;
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  active
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                    : 'bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="neu-card p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
            <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2">선택한 조건의 자료가 없습니다</p>
            <p className="text-xs text-slate-400 mb-6">선생님께서 첫 번째 수업 자료를 직접 등록해 보세요!</p>
            <button
              onClick={handleOpenUploadNew}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 shadow-md"
            >
              <Upload className="w-3.5 h-3.5" />
              지금 자료 올리기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => {
              const isLiked = likedIds.has(mat.id);
              return (
                <div
                  key={mat.id}
                  onClick={() => setActiveModalMaterial(mat)}
                  className="neu-card p-6 flex flex-col justify-between cursor-pointer group relative"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60">
                          {mat.grade}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {mat.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {mat.attachedFile && (
                          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                            <Paperclip className="w-3 h-3" />
                            {mat.attachedFile.extension.toUpperCase()}
                          </span>
                        )}
                        {mat.safetyLevel && (
                          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            mat.safetyLevel === '안전'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : mat.safetyLevel === '주의'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                          }`}>
                            <Shield className="w-3 h-3" />
                            {mat.safetyLevel}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Topic */}
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                      {mat.topic}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 mb-2.5">
                      {mat.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {mat.summary}
                    </p>

                    {/* Formulas snippet */}
                    {mat.keyFormulas && mat.keyFormulas.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 mb-4">
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">핵심 공식 / 반응식</div>
                        <div className="font-mono text-xs text-purple-700 dark:text-purple-300 truncate">
                          {mat.keyFormulas[0]}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
                    <button
                      onClick={(e) => handleLike(mat.id, e)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                        isLiked
                          ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                          : 'text-slate-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                      <span>{mat.likes}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* ✏️ Direct Edit Action on Card (Only active for admin, or prompts login) */}
                      {isAdmin ? (
                        <button
                          onClick={(e) => handleOpenEdit(mat, e)}
                          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors"
                          title="자료 수정 및 다시 올리기"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </button>
                      ) : null}

                      <div className="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                        <span>지도안 열기</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal View for Details */}
      <MaterialModal
        material={activeModalMaterial}
        onClose={() => setActiveModalMaterial(null)}
        onEdit={isAdmin ? handleOpenEdit : undefined}
      />

      {/* Upload & Edit Material Modal */}
      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setEditingMaterial(null);
        }}
        onAddMaterial={handleAddMaterial}
        onUpdateMaterial={handleUpdateMaterial}
        initialMaterial={editingMaterial}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          window.dispatchEvent(new Event('admin-session-change'));
        }}
      />
    </section>
  );
}
