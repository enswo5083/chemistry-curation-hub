-- ============================================================
-- 고등학교 화학 수업 모음집 Supabase 테이블 스키마 및 RLS 정책
-- 리전: Seoul (ap-northeast-2)
-- ============================================================

-- 1. 게시물 테이블 (posts)
CREATE TABLE IF NOT EXISTS public.posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  likes INTEGER DEFAULT 0
);

-- RLS 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 누구나 조회 가능
CREATE POLICY "Allow public read on posts" 
ON public.posts FOR SELECT 
USING (true);

-- 누구나 게시글 작성 가능
CREATE POLICY "Allow public insert on posts" 
ON public.posts FOR INSERT 
WITH CHECK (true);

-- 누구나 좋아요 업데이트 가능
CREATE POLICY "Allow public update on posts" 
ON public.posts FOR UPDATE 
USING (true);

-- 2. 점수 랭킹 테이블 (rankings)
CREATE TABLE IF NOT EXISTS public.rankings (
  id BIGSERIAL PRIMARY KEY,
  nickname TEXT NOT NULL,
  score INTEGER NOT NULL,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;

-- 누구나 랭킹 조회 가능
CREATE POLICY "Allow public read on rankings" 
ON public.rankings FOR SELECT 
USING (true);

-- 누구나 퀴즈 점수 등록 가능
CREATE POLICY "Allow public insert on rankings" 
ON public.rankings FOR INSERT 
WITH CHECK (true);

-- 초기 샘플 데이터 입력
INSERT INTO public.posts (title, content, author, likes) VALUES
  ('고2 화학I 중화 적정 마이크로스케일(MBL) 실험 팁 공유합니다', '전통적인 50mL 뷰렛 대신 점적병과 웰플레이트를 사용하는 마이크로스케일 실험을 도입했더니 폐액 발생량이 95% 줄고 학생들의 안전사고 위험도 완전히 해소되었습니다.', '화학사랑김선생', 42),
  ('오비탈 전자 배치 3D 시뮬레이션 활용 수업 후기 (학생 반응 최고)', '자기양자수와 스핀자기양자수의 개념을 칠판 그림으로만 설명하다가 WebGL 3D 오비탈 뷰어를 스마트패드로 직접 조작하게 하니 이해도가 눈에 띄게 높아졌습니다.', '사이언스박쌤', 38),
  ('화학II 평형상수 K와 반응지수 Q 구별하는 꿀팁 질문드립니다!', '기출문제 풀이할 때 온도 변화 시 평형 이동과 농도 변화 시 평형 이동에서 K값 변동 여부를 학생들이 매번 헷갈려 하는데 가장 직관적으로 각인시키는 비유가 있을까요?', '신규교사이선생', 29);

INSERT INTO public.rankings (nickname, score) VALUES
  ('라부아지에후예', 100),
  ('퀴리부인팀', 95),
  ('멘델레예프', 90),
  ('아보가드로수', 85),
  ('보어의궤도', 80);
