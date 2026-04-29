import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { useAppStore } from '@/context/AppContext';

const levelStyles = {
  '入门': {
    bg: 'bg-primary-50 dark:bg-primary-900/30',
    text: 'text-primary-600 dark:text-primary-400',
    border: 'border-primary-200 dark:border-primary-700'
  },
  '进阶': {
    bg: 'bg-accent-50 dark:bg-accent-900/30',
    text: 'text-accent-600 dark:text-accent-400',
    border: 'border-accent-200 dark:border-accent-700'
  },
  '实战': {
    bg: 'bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30',
    text: 'text-primary-700 dark:text-primary-300',
    border: 'border-primary-200 dark:border-primary-700'
  }
};

export function ProjectGrid() {
  const getProgress = useAppStore((state) => state.getProgress);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-4">
            实战项目中心
          </h2>
          <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
            从0到1练会数据分析，拿得出手的项目作品集
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => {
            const progress = getProgress(project.id);
            const isCompleted = progress?.codeCompleted;
            const levelStyle = levelStyles[project.level];

            return (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-surface-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-surface-100 dark:border-surface-700 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 px-2 py-1 rounded-lg shadow-sm">
                      项目{String(project.id).padStart(2, '0')}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}`}>
                      {project.level}
                    </span>
                    {isCompleted && (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
                        已完成
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-lg text-primary-700 dark:text-primary-400 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-surface-500 dark:text-surface-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 px-2 py-0.5 rounded-md font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/project/${project.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                  >
                    查看项目
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
