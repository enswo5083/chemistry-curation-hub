import { LessonMaterial } from './types';

const DB_NAME = 'ChemistryHubDB';
const DB_VERSION = 1;
const STORE_NAME = 'materials';
const LS_BACKUP_KEY = 'chemistry_materials_backup_v2';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
}

export async function saveMaterialToStorage(material: LessonMaterial): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(material);
      request.onsuccess = () => resolve();
      request.onerror = (e: any) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, trying fallback:', err);
  }

  // Also save lightweight metadata to localStorage as backup
  try {
    const lightCopy: LessonMaterial = {
      ...material,
      attachedFile: material.attachedFile
        ? {
            name: material.attachedFile.name,
            size: material.attachedFile.size,
            extension: material.attachedFile.extension,
            // Omit huge base64 from localStorage to prevent QuotaExceededError
            dataUrl: material.attachedFile.dataUrl?.slice(0, 500),
          }
        : undefined,
    };
    const saved = localStorage.getItem(LS_BACKUP_KEY);
    const list: LessonMaterial[] = saved ? JSON.parse(saved) : [];
    const filtered = list.filter((m) => m.id !== material.id);
    localStorage.setItem(LS_BACKUP_KEY, JSON.stringify([lightCopy, ...filtered]));
  } catch (lsErr) {
    console.warn('LocalStorage backup failed:', lsErr);
  }
}

export async function getMaterialsFromStorage(): Promise<LessonMaterial[]> {
  try {
    const db = await openDB();
    const items = await new Promise<LessonMaterial[]>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = (e: any) => reject(e.target.error);
    });
    if (items && items.length > 0) return items;
  } catch (err) {
    console.warn('IndexedDB load failed, trying fallback:', err);
  }

  try {
    const saved = localStorage.getItem(LS_BACKUP_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('LocalStorage load failed:', e);
  }

  return [];
}

export async function deleteMaterialFromStorage(id: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = (e: any) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete failed:', err);
  }

  try {
    const saved = localStorage.getItem(LS_BACKUP_KEY);
    if (saved) {
      const list: LessonMaterial[] = JSON.parse(saved);
      localStorage.setItem(LS_BACKUP_KEY, JSON.stringify(list.filter((m) => m.id !== id)));
    }
  } catch (e) {
    console.warn('LocalStorage delete failed:', e);
  }
}
