'use client';

import { useState } from 'react';
import { Atom, Scale, Calculator, Check, ArrowRight } from 'lucide-react';

interface BalancedPreset {
  name: string;
  reactants: string;
  products: string;
  balanced: string;
  description: string;
  type: string;
}

const PRESET_REACTIONS: BalancedPreset[] = [
  {
    name: '하버-보슈 암모니아 합성',
    reactants: 'N₂ + H₂',
    products: 'NH₃',
    balanced: 'N₂ + 3H₂ → 2NH₃',
    description: '화학I 양적 관계의 대표 예시. 기체 분자수 4몰이 2몰로 감소하는 반응.',
    type: '기체 반응'
  },
  {
    name: '메테인의 완전 연소',
    reactants: 'CH₄ + O₂',
    products: 'CO₂ + H₂O',
    balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    description: '탄화수소 연소 반응. 이산화탄소와 수증기가 생성되는 발열 반응.',
    type: '산화·환원'
  },
  {
    name: '물의 전기분해/합성',
    reactants: 'H₂ + O₂',
    products: 'H₂O',
    balanced: '2H₂ + O₂ → 2H₂O',
    description: '수소와 산소가 2:1의 부피비로 반응하여 물을 생성.',
    type: '화학 결합'
  },
  {
    name: '석회석과 묽은 염산 반응',
    reactants: 'CaCO₃ + HCl',
    products: 'CaCl₂ + H₂O + CO₂',
    balanced: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
    description: '질량 보존 법칙 및 이산화 탄소 기체 발생 확인 표준 탐구 실험.',
    type: '기체 발생'
  },
  {
    name: '철의 산화 반응',
    reactants: 'Fe + O₂',
    products: 'Fe₂O₃',
    balanced: '4Fe + 3O₂ → 2Fe₂O₃',
    description: '철이 산소와 결합하여 붉은 녹(산화 철(III))을 형성하는 산화 반응.',
    type: '산화·환원'
  }
];

const MOLAR_MASS_TABLE: Record<string, number> = {
  'H': 1.008, 'He': 4.003, 'C': 12.011, 'N': 14.007, 'O': 15.999,
  'F': 18.998, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085,
  'P': 30.974, 'S': 32.06, 'Cl': 35.45, 'K': 39.098, 'Ca': 40.078,
  'Fe': 55.845, 'Cu': 63.546, 'Zn': 65.38, 'Br': 79.904, 'Ag': 107.868, 'I': 126.904
};

function calculateMolarMass(formula: string): number | null {
  const clean = formula.trim();
  if (!clean) return null;
  // Match Element followed by optional digits
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let total = 0;
  let match;
  let matchedLength = 0;

  while ((match = regex.exec(clean)) !== null) {
    matchedLength += match[0].length;
    const element = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    if (MOLAR_MASS_TABLE[element] !== undefined) {
      total += MOLAR_MASS_TABLE[element] * count;
    } else {
      return null;
    }
  }

  return matchedLength === clean.length ? total : null;
}

export default function ChemicalToolSection() {
  const [selectedPreset, setSelectedPreset] = useState<BalancedPreset>(PRESET_REACTIONS[0]);
  const [formulaInput, setFormulaInput] = useState('C6H12O6');

  const computedMass = calculateMolarMass(formulaInput);

  return (
    <section id="calculator" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Atom className="w-3.5 h-3.5" />
            <span>Interactive Chemistry Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            화학 반응식 밸런서 & 몰 질량 계산기
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            수업 중 즉시 활용할 수 있는 반응식 계수 맞추기 프리셋과 화학식 몰 질량(g/mol) 실시간 계산 유틸리티
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reaction Balancer Column (7 cols) */}
          <div className="lg:col-span-7 neu-card p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Scale className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                화학 반응식 계수 맞추기 프리셋
              </h3>
            </div>

            {/* Reaction Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PRESET_REACTIONS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedPreset.name === preset.name
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Balanced Equation Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-900/10 via-purple-900/10 to-cyan-900/10 dark:from-violet-950/40 dark:to-cyan-950/40 border border-violet-200/60 dark:border-violet-900/40 text-center mb-6">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest block mb-2">
                균형 반응식 (Balanced Equation)
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider">
                {selectedPreset.balanced}
              </div>
            </div>

            {/* Explanatory details */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 w-20 shrink-0">반응 유형:</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                  {selectedPreset.type}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 w-20 shrink-0">수업 설명:</span>
                <span className="leading-relaxed">{selectedPreset.description}</span>
              </div>
            </div>
          </div>

          {/* Molar Mass Calculator Column (5 cols) */}
          <div className="lg:col-span-5 neu-card p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                몰 질량 (Molar Mass) 계산기
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              화학식을 대문자/소문자를 구분하여 입력하세요 (예: H2O, NaCl, C6H12O6, H2SO4, CaCO3).
            </p>

            {/* Input field */}
            <div className="mb-4">
              <input
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                placeholder="화학식 입력 (예: C6H12O6)"
                className="w-full px-4 py-3 neu-input font-mono text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            {/* Quick Formula chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['H2O', 'CO2', 'NaCl', 'C6H12O6', 'H2SO4', 'CaCO3', 'NH3'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFormulaInput(item)}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Calculated Result Card */}
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                계산된 화학식량
              </div>
              {computedMass !== null ? (
                <div className="text-3xl font-black font-mono text-emerald-800 dark:text-emerald-300">
                  {computedMass.toFixed(3)} <span className="text-lg font-bold">g/mol</span>
                </div>
              ) : (
                <div className="text-sm font-semibold text-rose-500 py-2">
                  유효한 화학식을 입력해 주세요 (원소 기호 확인)
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
