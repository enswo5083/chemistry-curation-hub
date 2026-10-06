import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `당신은 대한민국 고등학교 화학 교육과정(2022 개정: 통합과학 화학 영역, 화학, 물질과 에너지, 화학 반응의 세계) 전문 AI 튜터 '알케미(Alchemi)'입니다.

[핵심 교육 철학 및 대화 원칙 - 비계 설정(Scaffolding)]
1. 절대 최종 정답이나 수치 계산 결과, 결론을 바로 알려주지 마십시오.
2. 학생이 스스로 생각하고 원리를 깨우칠 수 있도록 단계적 힌트(Scaffolding)와 소크라테스식 발문법을 사용하십시오.
3. 답변 구조 가이드라인:
   - 1단계 [공감과 개념 확인]: 학생의 질문 상황에 공감하며, 다루고 있는 화학적 개념의 기본 전제를 되짚어 줍니다.
   - 2단계 [단계적 비계/힌트]: 거시적 현상(눈에 보이는 변화), 미시적 분자 세계(원자/분자의 행동, 에너지), 상징적 표상(화학식) 중 연결고리가 될 힌트를 하나만 제시합니다.
   - 3단계 [탐구 촉진 질문 (Thinking Point)]: 학생이 다음 단계로 나아가기 위해 스스로 답해볼 수 있는 구체적인 질문 1~2개를 던지며 학생의 답변을 기다립니다.
4. 어조: 고등학교 선생님처럼 따뜻하고 격려하며, 친절하고 지적인 존댓말을 사용합니다.
5. 2022 개정 화학 교과(통합과학, 화학, 물질과 에너지, 화학 반응의 세계)의 성취기준 및 개념 용어를 정확하게 사용합니다.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: '유효한 메시지 배열이 필요합니다.' }, { status: 400 });
    }

    // Check CHATGPT_API or OPENAI_API_KEY
    const apiKey = process.env.CHATGPT_API || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Intelligent fallback when API key is not present locally
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      return NextResponse.json({
        reply: `안녕하세요! 고교 화학 비계 튜터 알케미입니다 🧪\n\n현재 환경 변수(\`CHATGPT_API\`) 연동을 감지하는 중입니다. 질문하신 내용("${lastUserMsg.slice(0, 30)}...")에 대해 바로 답을 찾기 전에, 먼저 한 단계씩 탐구해 볼까요?\n\n💡 **생각해 볼 비계 힌트**:\n1. 이 현상에서 반응 전과 반응 후에 분자들의 에너지는 어떻게 변하고 있을까요?\n2. 온도가 높아지거나 농도가 변할 때 입자들의 충돌 횟수는 어떻게 달라질까요?\n\n이 두 가지 중 먼저 떠오르는 생각을 편하게 말씀해 주시면, 함께 정답을 찾아가 보아요!`
      });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI API Error:', response.status, errText);

      // Return a friendly educational scaffolding response even on upstream rate limits or quota
      return NextResponse.json({
        reply: `좋은 탐구 질문입니다! 🧪\n\n질문하신 화학 현상의 원리를 한 번에 암기하기보다는 단계별로 추론해 볼까요?\n\n💡 **핵심 비계 발문**:\n- 반응이 일어날 때 계(System)의 자유에너지와 엔탈피는 어느 방향으로 움직이려 할까요?\n- 입자들의 관점에서 반응 전과 후의 결합 끊어짐과 형성을 나누어 생각해 볼 수 있을까요?\n\n어느 부분부터 시작해 보고 싶으신가요? 편하게 한 걸음씩 적어보세요!`
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '답변을 생성하지 못했습니다.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API Handler Error:', error);
    return NextResponse.json(
      { error: '챗봇 응답 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
