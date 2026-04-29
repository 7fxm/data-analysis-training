import { Sparkles, TrendingUp, Users, Zap, BarChart3, Database, Code } from 'lucide-react';

export function HeroSection() {
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
            <div className="relative grid grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/30 hover:scale-105 transition-transform">
                <BarChart3 className="w-10 h-10 text-primary-400 mb-3" />
                <p className="text-white font-bold text-lg">10</p>
                <p className="text-surface-400 text-sm">实战项目</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/30 hover:scale-105 transition-transform">
                <Database className="w-10 h-10 text-accent-400 mb-3" />
                <p className="text-white font-bold text-lg">8</p>
                <p className="text-surface-400 text-sm">知识点文档</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 hover:scale-105 transition-transform">
                <Code className="w-10 h-10 text-emerald-400 mb-3" />
                <p className="text-white font-bold text-lg">100</p>
                <p className="text-surface-400 text-sm">测试题目</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
