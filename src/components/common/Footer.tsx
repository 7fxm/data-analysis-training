export function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 py-12 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4 text-lg gradient-text">数据分析技术实战训练营</h3>
            <p className="text-sm text-surface-400 leading-relaxed">
              从数据清洗到机器学习，10个实战项目带你掌握数据分析核心技能
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">学习路径</h4>
            <ul className="text-sm space-y-2 text-surface-400">
              <li className="hover:text-white transition-colors cursor-pointer">数据清洗阶段</li>
              <li className="hover:text-white transition-colors cursor-pointer">数据分析阶段</li>
              <li className="hover:text-white transition-colors cursor-pointer">数据可视化阶段</li>
              <li className="hover:text-white transition-colors cursor-pointer">机器学习入门阶段</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <ul className="text-sm space-y-2 text-surface-400">
              <li>咨询邮箱：contact@data-camp.com</li>
              <li>教学答疑入口：点击进入</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-surface-800 mt-8 pt-6 text-center text-sm text-surface-500">
          <p>© 2026 数据分析技术实战训练营 教学版</p>
        </div>
      </div>
    </footer>
  );
}
