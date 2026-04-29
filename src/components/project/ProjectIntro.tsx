import { FileText, Target, Wrench } from 'lucide-react';
import { Project } from '@/types';

interface ProjectIntroProps {
  project: Project;
}

export function ProjectIntro({ project }: ProjectIntroProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-surface-800 to-surface-900 text-white px-6 py-5">
        <h2 className="text-xl font-bold">
          项目{String(project.id).padStart(2, '0')}：{project.title}
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-surface-800">核心任务</h3>
          </div>
          <p className="text-surface-600 leading-relaxed">{project.description}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-surface-800">使用数据</h3>
          </div>
          <code className="inline-block bg-surface-100 px-4 py-2 rounded-lg text-sm text-surface-700 font-mono">
            {project.dataset}
          </code>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-surface-800">核心技能</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.coreSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-primary-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-surface-800 mb-3">学习目标</h3>
          <ul className="space-y-2">
            {project.learningGoals.map((goal, index) => (
              <li key={index} className="flex items-start gap-3 text-surface-600">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-sm font-bold shrink-0">
                  ✓
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-surface-800 mb-3">实操任务</h3>
          <ol className="space-y-2">
            {project.tasks.map((task, index) => (
              <li key={index} className="flex items-start gap-3 text-surface-600">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-surface-100 text-surface-600 text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="pt-0.5">{task}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
