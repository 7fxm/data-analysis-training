import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Code, FileText } from 'lucide-react';
import { projects } from '@/data/projects';
import { useAppStore } from '@/context/AppContext';

const projectColors = [
  { gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20', bg: 'bg-blue-50', text: 'text-blue-600' },
  { gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { gradient: 'from-violet-500 to-purple-500', shadow: 'shadow-violet-500/20', bg: 'bg-violet-50', text: 'text-violet-600' },
  { gradient: 'from-primary-500 to-accent-500', shadow: 'shadow-primary-500/20', bg: 'bg-primary-50', text: 'text-primary-600' },
  { gradient: 'from-rose-500 to-pink-500', shadow: 'shadow-rose-500/20', bg: 'bg-rose-50', text: 'text-rose-600' },
];

export function ProjectGrid() {
  const getProgress = useAppStore((state) => state.getProgress);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-surface-800 mb-4">项目中心</h2>
          <p className="text-surface-500 max-w-2xl mx-auto">
            通过10个实战项目，在实践中掌握数据分析技能
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {projects.map((project) => {
            const progress = getProgress(project.id);
            const isCompleted = progress?.codeCompleted;
            const colorIndex = (project.id - 1) % projectColors.length;
            const color = projectColors[colorIndex];

            return (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color.gradient}`} />
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold ${color.text} ${color.bg} px-2.5 py-1 rounded-full`}>
                      项目{String(project.id).padStart(2, '0')}
                    </span>
                    {isCompleted && (
                      <div className="p-1.5 rounded-full bg-emerald-100">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-surface-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-surface-500 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.coreSkills.slice(0, 2).map((skill, i) => (
                      <span
                        key={i}
                        className={`text-xs ${color.bg} ${color.text} px-2 py-0.5 rounded-md font-medium`}
                      >
                        {skill}
                      </span>
                    ))}
                    {project.coreSkills.length > 2 && (
                      <span className="text-xs bg-surface-100 text-surface-500 px-2 py-0.5 rounded-md">
                        +{project.coreSkills.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-surface-400">
                    <span className="flex items-center gap-1">
                      <Code className="w-3.5 h-3.5" />
                      练习
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      测试
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
