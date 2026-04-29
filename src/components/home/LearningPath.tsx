import { CheckCircle, ArrowRight, BookOpen, Target, Zap } from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  projects: string;
  goal: string;
  skills: string[];
  prerequisites: string[];
  gradient: string;
  shadow: string;
  duration: string;
  difficulty: '入门' | '进阶' | '实战';
}

const learningStages: Stage[] = [
  {
    id: 1,
    title: '数据清洗基础',
    projects: '项目01、10',
    goal: '掌握数据预处理全流程，为后续分析打好基础',
    skills: ['缺失值/异常值处理', '时间格式化', '数据类型转换', '多源数据合并'],
    prerequisites: ['无前置要求', '基础Excel操作'],
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/25',
    duration: '2-3天',
    difficulty: '入门'
  },
  {
    id: 2,
    title: '分组聚合分析',
    projects: '项目02',
    goal: '掌握商业数据分析核心方法，学会从数据中提取洞察',
    skills: ['groupby分组', '多字段聚合', '数据透视表', '结果筛选排序'],
    prerequisites: ['数据清洗基础', '掌握Pandas基本操作'],
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/25',
    duration: '2天',
    difficulty: '入门'
  },
  {
    id: 3,
    title: '数据可视化',
    projects: '项目05',
    goal: '掌握专业数据可视化方法，让数据说话',
    skills: ['Matplotlib绑图', '趋势图/分布图制作', '图表美化', '可视化解读'],
    prerequisites: ['分组聚合分析', '熟悉Pandas数据操作'],
    gradient: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-500/25',
    duration: '2-3天',
    difficulty: '入门'
  },
  {
    id: 4,
    title: '进阶分析方法',
    projects: '项目03、04、06',
    goal: '掌握高级分析技术，解决复杂业务问题',
    skills: ['关联规则挖掘', '客户聚类', 'A/B测试', '统计显著性检验'],
    prerequisites: ['分组聚合分析', '数据可视化'],
    gradient: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-500/25',
    duration: '4-5天',
    difficulty: '进阶'
  },
  {
    id: 5,
    title: '特征工程',
    projects: '项目08',
    goal: '掌握特征工程核心技术，提升模型性能',
    skills: ['特征选择', '特征构造', '特征变换', '数据标准化'],
    prerequisites: ['进阶分析方法', '了解基本统计概念'],
    gradient: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-500/25',
    duration: '2-3天',
    difficulty: '进阶'
  },
  {
    id: 6,
    title: '时间序列与异常检测',
    projects: '项目07、09',
    goal: '掌握时序分析和异常检测，应对复杂业务场景',
    skills: ['时间序列分析', '销售预测', '异常值检测', '季节性分析'],
    prerequisites: ['特征工程', '数据可视化'],
    gradient: 'from-primary-500 to-accent-500',
    shadow: 'shadow-primary-500/25',
    duration: '3-4天',
    difficulty: '实战'
  }
];

export function LearningPath() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-4">
            📚 循序渐进的学习路径
          </h2>
          <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
            按照科学的学习顺序，从基础到进阶，逐步掌握数据分析核心技能
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 via-violet-200 via-orange-200 via-pink-200 to-primary-200 dark:from-blue-800 dark:via-emerald-800 dark:via-violet-800 dark:via-orange-800 dark:via-pink-800 dark:to-primary-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningStages.map((stage, index) => (
              <div
                key={stage.id}
                className="group relative bg-white dark:bg-surface-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-surface-100 dark:border-surface-700 hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stage.gradient}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stage.gradient} text-white font-bold shadow-lg ${stage.shadow}`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-surface-800 dark:text-surface-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-lg">
                          {stage.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            stage.difficulty === '入门' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400' :
                            stage.difficulty === '进阶' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-400' :
                            'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-400'
                          }`}>
                            {stage.difficulty}
                          </span>
                          <span className="text-xs text-surface-400 dark:text-surface-500">{stage.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {index < learningStages.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-surface-300 dark:text-surface-600" />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2">
                        <Target className="w-3.5 h-3.5" />
                        学习目标
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                        {stage.goal}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2">
                        <Zap className="w-3.5 h-3.5" />
                        核心技能
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stage.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2">
                        <BookOpen className="w-3.5 h-3.5" />
                        前置知识
                      </div>
                      <div className="space-y-1.5">
                        {stage.prerequisites.map((prereq, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{prereq}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700">
                    <p className="text-xs text-surface-400 dark:text-surface-500">
                      对应项目：<span className="text-primary-600 dark:text-primary-400 font-medium">{stage.projects}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 md:p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
              💡 学习建议
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-surface-600 dark:text-surface-300">
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                <span>按顺序学习，打好基础</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">2</span>
                <span>完成每个项目的代码练习</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">3</span>
                <span>做完测试检验学习效果</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}