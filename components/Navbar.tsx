'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FlaskConical, Atom, BookOpen, Brain, Trophy, MessageSquare, Zap, Menu, X, Upload, Lock, ShieldCheck, LogOut, KeyRound, Settings, Users, UserCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AdminLoginModal from './AdminLoginModal';
import ChangePasswordModal from './ChangePasswordModal';
import { getIsAdminSession, setAdminSession } from '@/lib/adminAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleLogout = () => {
    setAdminSession(false);
    setIsAdmin(false);
    window.dispatchEvent(new Event('admin-session-change'));
    setToastMessage('사용자(학생) 모드로 전환되었습니다.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    window.dispatchEvent(new Event('admin-session-change'));
    setToastMessage('👑 관리자(교사) 모드로 전환되었습니다.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePasswordSuccess = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl font-bold text-xs sm:text-sm animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/75 border-b border-white/40 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 shadow-md shadow-violet-500/25 group-hover:scale-105 transition-transform duration-300">
              <FlaskConical className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-violet-700 via-purple-600 to-cyan-600 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  고등학교 화학 수업 모음집
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                2022 개정 화학 · 물질과 에너지 · 화학 반응의 세계
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#curation"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
            >
              <BookOpen className="w-4 h-4 text-purple-500" />
              수업 자료
            </a>
            <a
              href="#pedagogy"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
            >
              <Brain className="w-4 h-4 text-cyan-500" />
              교수학습 이론
            </a>
            <a
              href="#calculator"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
            >
              <Atom className="w-4 h-4 text-emerald-500" />
              반응식 밸런서
            </a>
            <a
              href="#quiz"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              챔피언십 퀴즈
            </a>
            <a
              href="#community"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-rose-500" />
              자료 나눔
            </a>
          </nav>

          {/* Right Action & Theme Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* 👑 / 👥 Mode Switcher Pill */}
            {isAdmin ? (
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 shadow-sm">
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-black text-amber-800 dark:text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  관리자 모드
                </span>
                <button
                  onClick={() => setPasswordModalOpen(true)}
                  title="관리자 비밀번호 변경"
                  className="p-1 rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleLogout}
                  title="사용자 모드로 전환"
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                >
                  <Users className="w-3 h-3" />
                  <span>사용자 전환</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  사용자 모드
                </span>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm hover:scale-105 transition-all"
                >
                  <Lock className="w-3 h-3" />
                  <span>관리자 전환</span>
                </button>
              </div>
            )}

            {/* Quick Upload Button (Visible if admin) */}
            {isAdmin && (
              <a
                href="#curation"
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-sm shadow-violet-500/20 transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                자료 올리기
              </a>
            )}

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 shadow-xl space-y-2 backdrop-blur-lg">
            <div className="py-2.5 border-b border-slate-200 dark:border-slate-800">
              {isAdmin ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500" /> 👑 관리자 모드 활성
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setPasswordModalOpen(true);
                      }}
                      className="text-xs text-violet-600 font-bold px-2 py-1 rounded bg-violet-50 dark:bg-violet-950/40"
                    >
                      비밀번호 변경
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-rose-500 font-bold px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/40"
                    >
                      사용자 전환
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> 👥 사용자 모드 (열람용)
                  </span>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginModalOpen(true);
                    }}
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-purple-50 dark:bg-purple-950/50 px-3 py-1.5 rounded-xl flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3" /> 관리자 전환
                  </button>
                </div>
              )}
            </div>

            <a
              href="#curation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <BookOpen className="w-4 h-4 text-purple-500" /> 수업 자료 아카이브
            </a>
            {isAdmin && (
              <a
                href="#curation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-violet-600 dark:text-violet-400 bg-purple-50 dark:bg-purple-950/40"
              >
                <Upload className="w-4 h-4" /> 신규 자료 올리기
              </a>
            )}
            <a
              href="#pedagogy"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <Brain className="w-4 h-4 text-cyan-500" /> 최신 교수학습 이론
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <Atom className="w-4 h-4 text-emerald-500" /> 반응식 밸런서
            </a>
            <a
              href="#quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <Trophy className="w-4 h-4 text-amber-500" /> 챔피언십 퀴즈
            </a>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <MessageSquare className="w-4 h-4 text-rose-500" /> 자료 나눔 게시판
            </a>
          </div>
        )}
      </header>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </>
  );
}
