import { Link } from 'react-router-dom';
import { ArrowRight, Brush, BarChart3, ShoppingCart, Users, PieChart, FlaskConical, TrendingUp, Wrench, AlertTriangle, GitMerge } from 'lucide-react';
import { projects } from '@/data/projects';

const projectIcons = {
  '数据清洗基础': Brush,
  '销售数据分组聚合': BarChart3,
  '购物篮分析': ShoppingCart,
  '客户聚类分析': Users,
  '销售数据可视化': PieChart,
  'A/B测试分析': FlaskConical,
  '时间序列分析': TrendingUp,
  '特征工程': Wrench,
  '异常值检测': AlertTriangle,
  '多数据集合并': GitMerge,
};

const levelStyles = {
  '入门': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-700'
  },
  '进阶': {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-700'
  },
  '实战': {
    bg: 'bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30',
    text: 'text-primary-700 dark:text-primary-300',
    border: 'border-primary-200 dark:border-primary-700'
  }
};

const durationMap: Record<number, string> = {
  1: '30分钟',
  2: '30分钟',
  3: '45分钟',
  4: '45分钟',
  5: '30分钟',
  6: '45分钟',
  7: '60分钟',
  8: '60分钟',
  9: '60分钟',
  10: '30分钟',
};

export function ProjectGrid() {
  return (
    <section className="py-12 relative">
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            选择一个项目开始你的学习之旅
          </h2>
          <p className="text-white/80 text-sm">
            通过实战项目掌握数据分析技能
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((project) => {
            const levelStyle = levelStyles[project.level];
            const IconComponent = projectIcons[project.title] || BarChart3;
            const duration = durationMap[project.id] || '30分钟';

            return (
              <div
                key={project.id}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-surface-100 dark:border-surface-700"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30">
                      <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}`}>
                        {project.level}
                      </span>
                      <span className="text-xs text-surface-400 dark:text-surface-500">
                        {duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-surface-800 dark:text-surface-200 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-surface-500 dark:text-surface-400 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 px-3 py-1 rounded-lg font-medium">
                      {project.dataset}
                    </span>
                  </div>

                  <Link
                    to={`/project/${project.id}`}
                    className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                  >
                    开始学习
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
