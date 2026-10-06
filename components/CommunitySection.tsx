'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/lib/types';
import { INITIAL_POSTS } from '@/lib/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MessageSquare, Plus, Heart, User, Clock, Send, X, Sparkles } from 'lucide-react';

export default function CommunitySection() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number | string>>(new Set());

  // Fetch posts from Supabase if configured
  useEffect(() => {
    async function fetchPosts() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setPosts(data);
        }
      } catch (err) {
        console.warn('Posts fetch fallback:', err);
      }
    }
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) return;
    setIsSubmitting(true);

    const postToInsert: Post = {
      id: Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      author: newAuthor.trim(),
      created_at: new Date().toISOString(),
      likes: 0,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('posts')
          .insert([
            {
              title: postToInsert.title,
              content: postToInsert.content,
              author: postToInsert.author,
              created_at: postToInsert.created_at,
              likes: 0,
            },
          ])
          .select();
        if (!error && data) {
          setPosts([data[0], ...posts]);
        } else {
          setPosts([postToInsert, ...posts]);
        }
      } catch {
        setPosts([postToInsert, ...posts]);
      }
    } else {
      setPosts([postToInsert, ...posts]);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    setNewTitle('');
    setNewAuthor('');
    setNewContent('');
  };

  const handleLikePost = async (id: number | string) => {
    const isLiked = likedPosts.has(id);
    const delta = isLiked ? -1 : 1;

    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (isLiked) next.delete(id);
      else next.add(id);
      return next;
    });

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: Math.max(0, p.likes + delta) } : p))
    );

    if (isSupabaseConfigured && supabase) {
      try {
        const target = posts.find((p) => p.id === id);
        if (target) {
          await supabase
            .from('posts')
            .update({ likes: Math.max(0, target.likes + delta) })
            .eq('id', id);
        }
      } catch (err) {
        console.warn('Like update err:', err);
      }
    }
  };

  return (
    <section id="community" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-sm tracking-wide uppercase mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Teacher & Student Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              수업 자료 나눔 & 질문 커뮤니티
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              전국 화학 교사들의 수업 팁, 마이크로스케일 실험 노하우 및 학생들의 탐구 질문을 실시간으로 나눕니다.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 shadow-md shadow-rose-500/20 hover:-translate-y-0.5 transition-all self-start md:self-auto shrink-0"
          >
            <Plus className="w-5 h-5" />
            새 글 작성하기
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const isLiked = likedPosts.has(post.id);
            return (
              <div
                key={post.id}
                className="neu-card p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                      <User className="w-3.5 h-3.5 text-purple-500" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-6">
                    {post.content}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">자료 공유글</span>
                  
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isLiked
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                    <span>좋아요 {post.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* New Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full neu-button text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              화학 수업 나눔 / 질문 글쓰기
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  작성자 닉네임 (소속)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 경기고화학쌤"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  게시물 제목
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 알칼리 금속 반응 실험 대체재 추천"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  내용
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="수업 팁, 실험 시 주의점, 질문 내용을 자유롭게 적어주세요."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-600 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  게시물 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
