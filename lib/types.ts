export type GradeLevel = 'all' | 'integrated' | 'chem1' | 'chem2' | 'advanced';
export type MaterialCategory = 'all' | 'theory' | 'experiment' | 'simulation' | 'pedagogy';

export interface LessonMaterial {
  id: string;
  title: string;
  grade: '통합과학' | '화학 I' | '화학 II' | '고급 화학';
  gradeKey: GradeLevel;
  topic: string;
  category: '이론' | '실험' | '시뮬레이션' | '교수학습';
  categoryKey: MaterialCategory;
  summary: string;
  difficulty: '기초' | '기본' | '심화';
  keyFormulas: string[];
  safetyLevel?: '안전' | '주의' | '경고';
  safetyEquipments?: string[];
  pedagogyModel?: string;
  views: number;
  likes: number;
  downloadUrl?: string;
  content: string;
}

export interface Post {
  id: number | string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  likes: number;
}

export interface Ranking {
  id: number | string;
  nickname: string;
  score: number;
  played_at: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  concept: string;
}
