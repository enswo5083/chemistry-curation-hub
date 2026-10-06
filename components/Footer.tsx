import { FlaskConical, Zap, Globe, Heart, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/60 backdrop-blur-md pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-200/60 dark:border-slate-800">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-md">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-slate-900 dark:text-white">
                고등학교 화학 수업 모음집
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                K-High School Chemistry Curriculum & Inquiry Portal
              </p>
            </div>
          </div>

          {/* Region & Architecture Badge */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold shadow-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Vercel Serverless: Seoul (icn1)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-semibold shadow-sm">
              <Globe className="w-3.5 h-3.5 text-violet-500" />
              <span>Supabase DB: Seoul (ap-northeast-2)</span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} 고등학교 화학 수업 모음집. 2022 개정 교육과정 기준 준수.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              실험 안전 보증
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Chemistry Teachers & Students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
