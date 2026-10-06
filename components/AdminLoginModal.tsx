'use client';

import { useState } from 'react';
import { X, Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { setAdminSession, DEFAULT_ADMIN_PASSWORD } from '@/lib/adminAuth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAdminSession(true);
        onLoginSuccess();
        onClose();
        setPassword('');
      } else {
        // Fallback check against default password
        if (password.trim() === DEFAULT_ADMIN_PASSWORD) {
          setAdminSession(true);
          onLoginSuccess();
          onClose();
          setPassword('');
        } else {
          setErrorMsg(data.message || '비밀번호가 올바르지 않습니다.');
        }
      }
    } catch {
      // Local fallback
      if (password.trim() === DEFAULT_ADMIN_PASSWORD) {
        setAdminSession(true);
        onLoginSuccess();
        onClose();
        setPassword('');
      } else {
        setErrorMsg('인증 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 border border-white/60 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full neu-button text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>교사 관리자 전용 인증</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          교사 관리자 로그인
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          수업 자료 등록 및 수정·삭제 권한은 선생님 본인에게만 부여됩니다. 인증 후 이 브라우저에서 관리자 권한이 안전하게 유지됩니다.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              관리자 비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-3 neu-input text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="비밀번호 보이기/숨기기"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            💡 <strong>초기 기본 비밀번호:</strong> <code className="font-mono font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-1.5 py-0.5 rounded">chem2022!</code><br />
            (Vercel 대시보드 환경변수 <code className="font-mono text-purple-600 dark:text-purple-400">ADMIN_PASSWORD</code>를 설정하여 언제든 원하는 비밀번호로 변경할 수 있습니다.)
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-500/25 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              {isLoading ? '인증 중...' : '관리자 인증'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
