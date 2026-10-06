'use client';

import { useState } from 'react';
import { X, KeyRound, Check, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { changeAdminPassword } from '@/lib/adminAuth';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg('새 비밀번호와 확인 입력이 일치하지 않습니다.');
      return;
    }

    if (newPassword.trim().length < 4) {
      setErrorMsg('새 비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }

    const res = changeAdminPassword(currentPassword, newPassword);

    if (res.success) {
      onSuccess(res.message);
      onClose();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 border border-white/60 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full neu-button text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <KeyRound className="w-4 h-4" />
          <span>관리자 보안 설정</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          관리자 비밀번호 변경
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          선생님만의 고유한 비밀번호로 변경하여 다른 사람이 관리자 권한에 무단 접근할 수 없도록 보안을 강화하세요.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              현재 비밀번호 <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                placeholder="현재 관리자 비밀번호 입력"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              새 비밀번호 (최소 4자 이상) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                placeholder="선생님만 아는 새 비밀번호 입력"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              새 비밀번호 확인 <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="새 비밀번호 다시 입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 neu-input text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
            🛡️ <strong>안내:</strong> 비밀번호를 변경하면 즉시 새 비밀번호로 교체되며, 다음 관리자 로그인 시 새 비밀번호를 입력해야 합니다.
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
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-500/25 transition-all"
            >
              <Check className="w-4 h-4" />
              비밀번호 변경 완료
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
