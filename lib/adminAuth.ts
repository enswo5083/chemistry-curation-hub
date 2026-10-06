'use client';

const ADMIN_STORAGE_KEY = 'chem_teacher_admin_session_v1';
const ADMIN_PASSWORD_CUSTOM_KEY = 'chem_custom_admin_password_v1';
export const DEFAULT_ADMIN_PASSWORD = 'chem2022!';

export function getIsAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
}

export function setAdminSession(status: boolean): void {
  if (typeof window === 'undefined') return;
  if (status) {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}

export function getStoredAdminPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSWORD;
  return localStorage.getItem(ADMIN_PASSWORD_CUSTOM_KEY) || DEFAULT_ADMIN_PASSWORD;
}

export function setCustomAdminPassword(newPassword: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_PASSWORD_CUSTOM_KEY, newPassword.trim());
}

export function hasCustomAdminPassword(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(ADMIN_PASSWORD_CUSTOM_KEY);
}

export function verifyAdminPassword(inputPass: string): boolean {
  const currentPassword = getStoredAdminPassword();
  return inputPass.trim() === currentPassword.trim();
}

export function changeAdminPassword(
  currentPass: string,
  newPass: string
): { success: boolean; message: string } {
  if (!verifyAdminPassword(currentPass)) {
    return { success: false, message: '현재 비밀번호가 일치하지 않습니다.' };
  }
  if (!newPass || newPass.trim().length < 4) {
    return { success: false, message: '새 비밀번호는 최소 4자리 이상이어야 합니다.' };
  }
  setCustomAdminPassword(newPass.trim());
  return { success: true, message: '관리자 비밀번호가 성공적으로 변경되었습니다!' };
}
