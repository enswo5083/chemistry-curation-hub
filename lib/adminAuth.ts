'use client';

import { useState, useEffect } from 'react';

const ADMIN_STORAGE_KEY = 'chem_teacher_admin_session_v1';
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
