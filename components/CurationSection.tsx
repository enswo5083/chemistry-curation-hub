'use client';

import { useState, useMemo } from 'react';
import { INITIAL_MATERIALS } from '@/lib/initialData';
import { LessonMaterial, GradeLevel, MaterialCategory } from '@/lib/types';
import { Search, Heart, ExternalLink, Filter, Sparkles, BookOpen, Beaker, Laptop, Award, Shield } from 'lucide-react';
import MaterialModal from './MaterialModal';

export default function CurationSection() {
  const [materials, setMaterials] = useState<LessonMaterial[]>(INITIAL_MATERIALS);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalMaterial, setActiveModalMaterial] = useState<LessonMaterial | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const gradeOptions: { key: GradeLevel; label: string }[] = [
    { key: 'all', label: '전체 학년' },
    { key: 'integrated', label: '통합과학 (공통)' },
    { key: 'chem1', label: '화학 I (일반선택)' },
    { key: 'chem2', label: '화학 II (진로선택)' },
    { key: 'advanced', label: '고급 화학 (전문교과)' },
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
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm tracking-wide uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Lesson Materials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              학년별 & 주제별 맞춤 화학 수업 자료
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              2022 개정 교육과정 성취기준에 맞춘 검증된 이론 강의노트, 실험 안전 프로토콜 및 인터랙티브 시뮬레이션
            </p>
          </div>

          {/* Neumorphic Search Bar */}
          <div className="relative w-full md:w-80">
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

        {/* Grade Filter Pills (Flat 2.0 / Neumorphism) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {gradeOptions.map((g) => {
            const active = selectedGrade === g.key;
            return (
              <button
                key={g.key}
                onClick={() => setSelectedGrade(g.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30'
                    : 'neu-button text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {g.label}
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
            <p className="text-slate-600 dark:text-slate-400 font-semibold mb-2">검색된 자료가 없습니다</p>
            <p className="text-xs text-slate-400">다른 키워드나 필터 조건을 선택해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => {
              const isLiked = likedIds.has(mat.id);
              return (
                <div
                  key={mat.id}
                  onClick={() => setActiveModalMaterial(mat)}
                  className="neu-card p-6 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                          {mat.grade}
                        </span>
                        <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {mat.category}
                        </span>
                      </div>
                      
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
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">핵심 공식</div>
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

                    <div className="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                      <span>지도안 열기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal View */}
      <MaterialModal
        material={activeModalMaterial}
        onClose={() => setActiveModalMaterial(null)}
      />
    </section>
  );
}
