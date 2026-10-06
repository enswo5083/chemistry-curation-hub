import { LessonMaterial, Post, Ranking, QuizQuestion } from './types';

export const INITIAL_MATERIALS: LessonMaterial[] = [
  {
    id: 'mat-1',
    title: '원소의 주기성과 화학 결합의 형성 메커니즘',
    grade: '통합과학',
    gradeKey: 'integrated',
    topic: '물질의 규칙성과 결합',
    category: '이론',
    categoryKey: 'theory',
    summary: '주기율표의 족과 주기에 따른 원자가 전자 수의 규칙성을 발견하고, 옥텟 규칙을 만족하기 위한 이온 결합과 공유 결합의 차이를 탐구합니다.',
    difficulty: '기초',
    keyFormulas: ['Octet Rule (ns² np⁶)', 'NaCl -> Na⁺ + Cl⁻', 'H₂O (공유 전자쌍 2개, 비공유 2개)'],
    safetyLevel: '안전',
    pedagogyModel: '개념기반 탐구학습 (Concept-Based Inquiry)',
    views: 1420,
    likes: 89,
    content: `### 1. 학습 목표
- 원소들의 주기적 성질(원자가 전자, 유효 핵전하 경향)을 설명할 수 있다.
- 금속 원소와 비금속 원소가 결합하여 안정한 전자 배치를 형성하는 과정을 비교할 수 있다.

### 2. 핵심 개념 전개
1. **옥텟 규칙 (Octet Rule)**: 18족 비활성 기체와 같은 8개의 최외각 전자 배치를 갖추어 에너지적으로 가장 안정한 상태를 유지하려는 경향.
2. **이온 결합**: 전기음성도 차이가 큰 금속 원소(전자를 잃기 쉬움)와 비금속 원소(전자를 얻기 쉬움) 간의 정전기적 인력.
3. **공유 결합**: 비금속 원소 간에 전자를 공유하여 옥텟을 만족시키는 결합.

### 3. 수업 적용 팁 (교수학습 전략)
- **일반화 진술 도출**: "원자의 전자 배치는 화학 결합의 유형과 물질의 거시적 성질을 결정한다."
- 학생들이 카드 분류 활동(Card Sorting)을 통해 스스로 이온 결합 물질과 공유 결합 물질의 물리적 특성을 도출하도록 유도합니다.`
  },
  {
    id: 'mat-2',
    title: '식초 속 아세트산 함량 분석: 중화 적정 정량 실험',
    grade: '화학 I',
    gradeKey: 'chem1',
    topic: '산·염기 중화 반응',
    category: '실험',
    categoryKey: 'experiment',
    summary: '표준 수산화 나트륨(NaOH) 용액을 뷰렛에 넣고 페놀프탈레인 지시약을 이용해 시판 식초 속 아세트산의 몰 농도와 질량 백분율을 정량 측정합니다.',
    difficulty: '기본',
    keyFormulas: ['CH₃COOH + NaOH → CH₃COONa + H₂O', 'c₁V₁ = c₂V₂ (중화점 공식)'],
    safetyLevel: '주의',
    safetyEquipments: ['보안경 필수', '라텍스 장갑', '실험복 착용', '환기 후드'],
    pedagogyModel: '5E 순환학습 모형 (Explore & Explain)',
    views: 2890,
    likes: 215,
    content: `### 1. 실험 개요 및 준비물
- **시약**: 시판 사과식초, 0.1M 표준 NaOH 용액, 1% 페놀프탈레인 지시약, 증류수
- **기구**: 50mL 뷰렛, 100mL 삼각플라스크, 홀피펫(10mL), 깔때기, 스탠드 및 뷰렛 클램프, 흰색 종이

### 2. 실험 절차 (Protocol)
1. 시판 식초 10.0mL를 정확히 피펫팅하여 100mL 부피플라스크에 넣고 증류수로 표선까지 묽힌다.
2. 묽힌 식초 20.0mL를 삼각플라스크에 넣고 페놀프탈레인 2~3방울을 가한다.
3. 뷰렛에 0.10M NaOH 표준 용액을 채우고 공기방울을 제거한 뒤 눈금을 0.0mL에 맞춘다.
4. 삼각플라스크를 흔들며 엷은 분홍색이 30초 이상 지속되는 종말점까지 적정하고 소비 부피를 기록한다 (3회 반복).

### 3. 실험실 안전 및 폐액 처리
- 뷰렛 설치 시 클램프가 유리를 압박해 깨지지 않도록 고무 패드를 확인하십시오.
- 중화 반응 완료 후 혼합 폐액은 산·염기 중화 폐액통에 별도 수거합니다.`
  },
  {
    id: 'mat-3',
    title: '화학 반응의 몰(Mole) 계산과 기체 반응 법칙 인터랙티브 시뮬레이션',
    grade: '화학 I',
    gradeKey: 'chem1',
    topic: '화학의 첫걸음 / 양적 관계',
    category: '시뮬레이션',
    categoryKey: 'simulation',
    summary: '학생들이 가장 어려워하는 한계 반응물(Limiting Reagent)과 기체의 부피-몰수 관계를 인터랙티브 분자 시뮬레이션으로 시각화합니다.',
    difficulty: '심화',
    keyFormulas: ['n = w / M = V / 22.4L (0℃, 1기압)', 'N₂ + 3H₂ → 2NH₃'],
    safetyLevel: '안전',
    pedagogyModel: '플립드 러닝 (Flipped Learning)',
    views: 3120,
    likes: 274,
    content: `### 1. 시뮬레이션 활용 목적
- 화학 반응식의 계수비 = 몰수비 = 분자수비 = 기체의 부피비(온도, 압력 일정) 관계를 직관적으로 체득.
- 반응물 A와 B의 주입량을 조절할 때 생성물의 양과 남는 반응물의 양을 실시간 분자 모델로 확인.

### 2. 수업 설계 아이디어
- **사전 과제(Pre-class)**: 온라인 분자 시뮬레이터를 통해 질소와 수소의 비를 바꾸며 암모니아가 생성되는 그래프를 그리고 제출.
- **본 수업(In-class)**: 생성된 분자 수를 바탕으로 오개념(질량 보존과 계수비의 혼동)을 그룹 토의로 교정하고 수능 기출 양적관계 문항 해결.`
  },
  {
    id: 'mat-4',
    title: '화학 평형과 르샤틀리에 원리: 농도·압력·온도 변화 가역 반응',
    grade: '화학 II',
    gradeKey: 'chem2',
    topic: '반응 속도와 화학 평형',
    category: '이론',
    categoryKey: 'theory',
    summary: '동적 평형의 개념을 이해하고, 외부 조건 변화에 따라 평형이 어떻게 이동하여 새로운 평형 상태에 도달하는지 반응 지수(Q)와 평형 상수(K)로 분석합니다.',
    difficulty: '심화',
    keyFormulas: ['K = [C]^c [D]^d / ([A]^a [B]^b)', 'N₂O₄(무색) ⇌ 2NO₂(적갈색), ΔH > 0'],
    safetyLevel: '주의',
    safetyEquipments: ['후드 사용 필수', 'NO₂ 기체 흡입 방지 마스크'],
    pedagogyModel: '개념기반 탐구학습 (Concept-Based Inquiry)',
    views: 1980,
    likes: 162,
    content: `### 1. 개념적 렌즈 (Conceptual Lens)
- **균형과 항상성(Equilibrium & Homeostasis)**: 닫힌계에서 반응이 정지한 것이 아니라 정반응 속도와 역반응 속도가 같아 겉보기에 변화가 없는 동적 평형(Dynamic Equilibrium) 상태.

### 2. 르샤틀리에 원리 핵심 정리
1. **농도 변화**: 반응물을 가하면 반응물을 소모하는 정반응 방향으로 이동.
2. **압력(부피) 변화**: 기체 분자 수가 감소하는 방향으로 평형 이동.
3. **온도 변화**:
   - 흡열 반응(ΔH > 0): 온도 상승 시 열을 흡수하는 정반응 방향 진행 (K 증가).
   - 발열 반응(ΔH < 0): 온도 상승 시 역반응 방향 진행 (K 감소).`
  },
  {
    id: 'mat-5',
    title: '시계 반응(Clock Reaction)을 이용한 반응 속도식 결정 탐구',
    grade: '화학 II',
    gradeKey: 'chem2',
    topic: '반응 속도론',
    category: '실험',
    categoryKey: 'experiment',
    summary: '아이오딘산 이온과 아황산수소 이온의 산화-환원 반응에서 녹말 지시약이 푸른색으로 변하는 시간을 측정하여 반응 차수와 속도 상수를 산출합니다.',
    difficulty: '심화',
    keyFormulas: ['v = k[IO₃⁻]^m [HSO₃⁻]^n', 'ln(k) = -Ea/(RT) + ln(A) (아레니우스 식)'],
    safetyLevel: '주의',
    safetyEquipments: ['보안경', '실험용 장갑', '초시계', '항온 수조'],
    pedagogyModel: '5E 탐구 모형 (Elaborate & Evaluate)',
    views: 2450,
    likes: 198,
    content: `### 1. 실험의 묘미
- 투명한 용액이 정확히 계산된 수 초 후에 순간적으로 짙은 남색(녹말-아이오딘 착물)으로 변하는 극적인 시각적 효과로 학생들의 몰입도가 극대화되는 대표적인 탐구 실험입니다.

### 2. 학생 주도 변인 통제 가이드
- **조작 변인**: 반응물(IO₃⁻)의 농도, 반응 온도(10℃, 20℃, 30℃, 40℃)
- **통제 변인**: 용액의 전체 부피, 교반 속도, 녹말 지시약의 양
- **종속 변인**: 색 변화가 일어나는 데 걸린 시간(t) → 초기 반응 속도(1/t) 산출`
  },
  {
    id: 'mat-6',
    title: '전기화학전지(갈바니 전지)와 표준 환원 전위 분석 실험',
    grade: '고급 화학',
    gradeKey: 'advanced',
    topic: '전기화학 & 열역학',
    category: '실험',
    categoryKey: 'experiment',
    summary: '아연과 구리 반쪽 전지를 염다리로 연결하여 다니엘 전지를 구성하고, 전위차계를 활용해 표준 기전력(E°cell)과 네른스트 식(Nernst Equation)을 실증 검증합니다.',
    difficulty: '심화',
    keyFormulas: ['E°cell = E°(cathode) - E°(anode)', 'E = E° - (RT/nF) ln Q'],
    safetyLevel: '경고',
    safetyEquipments: ['보안경', '중금속(Cu²⁺, Zn²⁺) 분리수거 폐액통', '멀티미터'],
    pedagogyModel: '생성형 AI 활용 화학 탐구 프레임워크',
    views: 1750,
    likes: 145,
    content: `### 1. 심화 탐구 목표
- 화학 결합의 깁스 자유에너지 변화(ΔG°)와 전기적 일(W = -nFE°)의 동등성을 이해하고 계산할 수 있다.
- 농도차 전지를 제작하여 네른스트 식에 따른 전압 변화를 예측하고 측정값과 비교 분석한다.

### 2. AI 프롬프트 연계 탐구 활동
- 학생들에게 LLM(대화형 AI)을 보조 연구원으로 활용하도록 지도:
  - "다니엘 전지에서 질산칼륨 염다리 대신 염화나트륨 염다리를 사용할 때 은(Ag) 전극 반응에 생길 수 있는 부반응을 열역학적 침전 관점에서 검토해 줘."`
  },
  {
    id: 'mat-7',
    title: '분자 궤도함수론(MO Theory)과 동핵 이원자 분자의 상자성 탐구',
    grade: '고급 화학',
    gradeKey: 'advanced',
    topic: '현대 화학 결합론',
    category: '이론',
    categoryKey: 'theory',
    summary: '루이스 구조식과 원자가 결합 이론(VB)의 한계를 극복하는 분자 궤도함수(σ, π 결합 및 반결합 오비탈)를 이해하고 산소 분자(O₂)가 자석에 끌리는 원리를 증명합니다.',
    difficulty: '심화',
    keyFormulas: ['Bond Order = (N_b - N_a) / 2', 'O₂ 결합 차수 = (8 - 4) / 2 = 2 (홀전자 2개)'],
    safetyLevel: '안전',
    pedagogyModel: '개념기반 탐구학습',
    views: 1320,
    likes: 110,
    content: `### 1. 오개념 교정 포인트
- 루이스 구조식으로는 산소 분자(O=O)의 모든 전자가 쌍을 이루고 있어 반자성(diamagnetic)이어야 할 것 같지만, 실제 액체 산소는 강력한 네오디뮴 자석 극 사이에 매달리는 상자성(paramagnetic)을 보입니다.
- π* 반결합 오비탈에 2개의 홑전자가 훈트 규칙에 따라 평행 스핀으로 배치됨을 MO 다이어그램을 그리며 도출합니다.`
  },
  {
    id: 'mat-8',
    title: '2022 개정 화학과 교육과정 기반 5E 수업 설계 템플릿 & 루브릭',
    grade: '화학 I',
    gradeKey: 'chem1',
    topic: '교수학습 자료 / 교사용',
    category: '교수학습',
    categoryKey: 'pedagogy',
    summary: '참여(Engage)부터 평가(Evaluate)까지 단계별 핵심 질문, 학생 활동지 구성 및 교과 역량(과학적 사고력, 탐구능력) 중심 과정평가 루브릭을 제공합니다.',
    difficulty: '기본',
    keyFormulas: ['Engage → Explore → Explain → Elaborate → Evaluate'],
    safetyLevel: '안전',
    pedagogyModel: '5E 모형 & 과정중심 평가',
    views: 2650,
    likes: 312,
    content: `### 1. 5E 모형 단계별 수업 흐름표
- **Engage (참여)**: 일상 현상(예: 베이킹소다와 식초 반응, 탄산음료 기포)으로 인지적 갈등 유발
- **Explore (탐구)**: 조작적 변인 가설 설정 및 미세 실험(Microscale experiment) 수행
- **Explain (설명)**: 학생 언어로 현상 설명 유도 후 교사가 정형화된 화학 용어 및 법칙 도입
- **Elaborate (정교화)**: 일상생활의 오존층 분해, 제산제 작용 등 새로운 맥락으로 원리 전이
- **Evaluate (평가)**: 동료 피드백 및 자기 성찰 체크리스트를 통한 과정중심 피드백 제공`
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    title: '고2 화학I 중화 적정 마이크로스케일(MBL) 실험 팁 공유합니다',
    content: '전통적인 50mL 뷰렛 대신 점적병과 웰플레이트를 사용하는 마이크로스케일 실험을 도입했더니 폐액 발생량이 95% 줄고 학생들의 안전사고 위험도 완전히 해소되었습니다. 실험 레시피 첨부합니다!',
    author: '화학사랑김선생',
    created_at: '2026-10-06T15:30:00Z',
    likes: 42
  },
  {
    id: 2,
    title: '오비탈 전자 배치 3D 시뮬레이션 활용 수업 후기 (학생 반응 최고)',
    content: '자기양자수와 스핀자기양자수의 개념을 칠판 그림으로만 설명하다가 WebGL 3D 오비탈 뷰어를 스마트패드로 직접 회전하며 조작하게 하니 이해도가 눈에 띄게 높아졌습니다. 다음 주 옥텟 규칙 수업에도 적용 예정입니다.',
    author: '사이언스박쌤',
    created_at: '2026-10-06T16:15:00Z',
    likes: 38
  },
  {
    id: 3,
    title: '화학II 평형상수 K와 반응지수 Q 구별하는 꿀팁 질문드립니다!',
    content: '기출문제 풀이할 때 온도 변화 시 평형 이동과 농도 변화 시 평형 이동에서 K값 변동 여부를 학생들이 매번 헷갈려 하는데 가장 직관적으로 각인시키는 비유가 있을까요?',
    author: '신규교사이선생',
    created_at: '2026-10-06T17:00:00Z',
    likes: 29
  }
];

export const INITIAL_RANKINGS: Ranking[] = [
  { id: 1, nickname: '라부아지에후예', score: 100, played_at: '2026-10-06T17:10:00Z' },
  { id: 2, nickname: '퀴리부인팀', score: 95, played_at: '2026-10-06T17:25:00Z' },
  { id: 3, nickname: '멘델레예프', score: 90, played_at: '2026-10-06T17:40:00Z' },
  { id: 4, nickname: '아보가드로수', score: 85, played_at: '2026-10-06T18:05:00Z' },
  { id: 5, nickname: '보어의궤도', score: 80, played_at: '2026-10-06T18:20:00Z' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '0℃, 1기압(STP) 상태에서 모든 기체 1몰이 차지하는 이상적인 부피는 약 얼마일까요?',
    options: ['11.2 L', '22.4 L', '33.6 L', '44.8 L'],
    answer: 1,
    explanation: '아보가드로 법칙에 따라 0℃, 1기압에서 모든 기체 1몰의 부피는 기체의 종류에 관계없이 약 22.4 L입니다.',
    concept: '몰과 기체 부피 (화학 I)'
  },
  {
    id: 2,
    question: '다음 중 물(H₂O) 분자의 중심 산소(O) 원자에 존재하는 비공유 전자쌍의 수는?',
    options: ['0쌍', '1쌍', '2쌍', '3쌍'],
    answer: 2,
    explanation: '산소는 최외각 전자가 6개이며, 수소 2개와 각각 전자 1개씩을 공유하여 결합 전자쌍 2쌍, 비공유 전자쌍 2쌍(굽은형 구조, 결합각 약 104.5°)을 갖습니다.',
    concept: '전자쌍 반발 이론 (VSEPR)'
  },
  {
    id: 3,
    question: '수용액의 수소 이온 농도 [H⁺]가 1.0 × 10⁻⁴ M일 때, 이 용액의 pH와 액성은?',
    options: ['pH 4, 산성', 'pH 4, 염기성', 'pH 10, 산성', 'pH 10, 염기성'],
    answer: 0,
    explanation: 'pH = -log[H⁺] = -log(10⁻⁴) = 4입니다. 25℃에서 pH가 7보다 작으므로 산성입니다.',
    concept: 'pH와 산·염기 평형'
  },
  {
    id: 4,
    question: '반응 속도론에서 정촉매(Catalyst)를 첨가했을 때 일어나는 올바른 변화는?',
    options: [
      '반응 엔탈피(ΔH)가 감소한다.',
      '활성화 에너지(Ea)가 낮아져 반응 속도가 빨라진다.',
      '생성물의 총 수득량이 증가한다.',
      '평형 상수가 큰 폭으로 증가한다.'
    ],
    answer: 1,
    explanation: '촉매는 반응 경로를 바꾸어 활성화 에너지를 낮춤으로써 반응 속도를 증가시키며, 반응 엔탈피나 평형 상수, 이론적 수득량은 변화시키지 않습니다.',
    concept: '반응 속도와 촉매 (화학 II)'
  },
  {
    id: 5,
    question: '다음 중 산화-환원 반응에서 전자를 잃고 산화수가 증가하는 물질을 가리키는 용어는?',
    options: ['산화제', '환원제', '중화제', '촉매'],
    answer: 1,
    explanation: '자신은 전자를 잃어 산화되면서 다른 물질을 환원시키는 물질을 "환원제(Reducing agent)"라고 부릅니다.',
    concept: '산화·환원 정의'
  }
];

export const PEDAGOGY_THEORIES = [
  {
    id: 'ped-1',
    title: '개념기반 탐구학습 (Concept-Based Inquiry)',
    founder: 'H. Lynn Erickson & Lois Lanning',
    tag: '2022 개정 핵심 역량',
    summary: '단순한 화학 사실(Fact) 암기를 넘어 거시적 개념(거시-미시-상징 3중 표상)을 융합하여 깊이 있는 원리와 일반화를 스스로 도출하는 귀납적 교수 모델.',
    steps: [
      '맥락 속 사실 탐구 (거시 현상 관찰)',
      '개념적 렌즈 부여 (균형, 상호작용, 에너지)',
      '미시적 분자 모델링을 통한 일반화 도출',
      '새로운 상황에 화학 법칙 전이(Transfer)'
    ],
    color: 'from-violet-500 to-indigo-600',
    icon: 'Sparkles'
  },
  {
    id: 'ped-2',
    title: '5E 순환학습 모형 (5E Instructional Model)',
    founder: 'Rodger Bybee (BSCS)',
    tag: '과학교육 표준 모형',
    summary: '구성주의 인식론에 기반하여 인지적 갈등부터 개념 정립, 탐구의 정교화까지 5단계 나선형 탐구를 통해 과학적 오개념을 과학적 개념으로 재구성.',
    steps: [
      'Engage (참여): 일상 호기심 자극 및 사전 개념 진단',
      'Explore (탐구): 가설 검증 실험 및 데이터 수집',
      'Explain (설명): 학생 토론 및 교사의 과학적 개념 공식화',
      'Elaborate (정교화): 새로운 화학 문제에 심화 적용',
      'Evaluate (평가): 루브릭 기반 자기·동료 과정평가'
    ],
    color: 'from-cyan-500 to-blue-600',
    icon: 'Compass'
  },
  {
    id: 'ped-3',
    title: '생성형 AI 융합 화학 탐구 프레임워크',
    founder: '미래형 지능형 과학실 (Smart SciLab)',
    tag: '에듀테크 융합',
    summary: '대화형 AI를 탐구 파트너로 삼아 가설 설정, 화학 반응식 오류 검증, 분자 가상 스크리닝 등 고차원적 비판적 사고력을 육성하는 최신 에듀테크 교수학습 모델.',
    steps: [
      'AI 페르소나 설정 (화학교수 / 분자 분석가)',
      '실험 설계서 프롬프트 검증 및 위험요소 사전 점검',
      '실험 오차 원인에 대한 AI 교차 질의 및 팩트체크',
      'AI 생성 결과에 대한 비판적 평가 보고서 작성'
    ],
    color: 'from-emerald-500 to-teal-600',
    icon: 'Brain'
  },
  {
    id: 'ped-4',
    title: '과정중심 성취기준 역량 루브릭 (Formative Rubrics)',
    founder: '교육부 학생평가 혁신 모델',
    tag: '성취평가제 최적화',
    summary: '일회성 지필평가를 탈피하여 탐구 설계 능력, 실험실 안전 준수도, 과학적 소통 능력을 4단계 척도로 다면 평가하여 피드백을 수업 중에 실시간 환류.',
    steps: [
      '성취수준 A/B/C/D 명확한 행동 지표 규정',
      '실험 수행 중 교사의 관찰 및 즉각적 형성 피드백',
      '학생 모둠별 상호 동료평가 워크시트 작성',
      '학교생활기록부 과목별 세부능력 및 특기사항 연계'
    ],
    color: 'from-amber-500 to-rose-500',
    icon: 'CheckCircle2'
  }
];
