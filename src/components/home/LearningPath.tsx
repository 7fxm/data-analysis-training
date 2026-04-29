import { CheckCircle } from 'lucide-react';

const learningStages = [
  {
    id: 1,
    title: '数据清洗阶段',
    projects: '项目01、10',
    goal: '掌握数据预处理全流程',
    skills: ['缺失值/异常值处理', '时间格式化', '多源数据合并'],
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/25'
  },
  {
    id: 2,
    title: '数据分析阶段',
    projects: '项目02、03、04、06',
    goal: '掌握商业数据分析核心方法',
    skills: ['分组聚合', '关联规则', '客户聚类', 'A/B测试'],
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/25'
  },
  {
    id: 3,
    title: '数据可视化阶段',
    projects: '项目05',
    goal: '掌握专业数据可视化方法',
    skills: ['matplotlib绑图', '趋势图/分布图制作', '可视化解读'],
    gradient: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-500/25'
  },
  {
    id: 4,
    title: '机器学习入门阶段',
    projects: '项目07、08、09',
    goal: '掌握机器学习基础应用',
    skills: ['时间序列预测', '特征工程', '异常值检测'],
    gradient: 'from-primary-500 to-accent-500',
    shadow: 'shadow-primary-500/25'
  }
];

export function LearningPath() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-surface-800 mb-4">
            循序渐进的学习路径
          </h2>
          <p className="text-surface-500 max-w-2xl mx-auto">
            按照科学的学习路径，逐步掌握数据分析核心技能
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningStages.map((stage, index) => (
            <div
              key={stage.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.gradient}`} />
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stage.gradient} text-white font-bold text-sm shadow-lg ${stage.shadow}`}>
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-surface-800 group-hover:text-primary-600 transition-colors">{stage.title}</h3>
                </div>
                
                <p className="text-sm text-surface-400 mb-2">
                  对应项目：<span className="text-surface-600">{stage.projects}</span>
                </p>
                <p className="text-sm text-surface-500 mb-4">
                  {stage.goal}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">核心技能</p>
                  {stage.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-surface-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
