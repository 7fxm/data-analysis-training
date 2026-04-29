import { useAppStore } from '@/context/AppContext';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export function HeroSection() {
  const getCompletedCount = useAppStore((state) => state.getCompletedCount);
  const completedCount = getCompletedCount();
  const progress = (completedCount / 10) * 100;

  const features = [
    { icon: Sparkles, label: '零基础友好', color: 'from-primary-400 to-primary-500' },
    { icon: TrendingUp, label: '真实数据集', color: 'from-accent-400 to-accent-500' },
    { icon: Users, label: '练+复+测闭环', color: 'from-primary-400 to-accent-500' },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-surface-300">10个实战项目 · 从入门到精通</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              数据分析
              <span className="block gradient-text">技术实战训练营</span>
            </h1>
            
            <p className="text-xl text-surface-300 mb-8 leading-relaxed">
              从数据清洗到机器学习，掌握数据分析核心技能
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${feature.color}`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-surface-300">{feature.label}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-5 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-xs text-surface-400 mb-1">课程面向人群</p>
                <p className="text-sm text-white font-medium">零基础学生、职场入门者</p>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-xs text-surface-400 mb-1">课程目标</p>
                <p className="text-sm text-white font-medium">掌握Python数据分析全流程</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-2xl" />
              <div className="relative p-8 rounded-full bg-gradient-to-br from-surface-800 to-surface-900 border border-white/10">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-surface-700"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={553}
                    strokeDashoffset={553 - (553 * progress) / 100}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-white">{completedCount}</span>
                  <span className="text-surface-400 text-sm mt-1">/10 练习完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
