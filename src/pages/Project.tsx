import { useParams, Link } from 'react-router-dom';
import { FileText, Play, ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectIntro } from '@/components/project/ProjectIntro';
import { CodeEditor } from '@/components/project/CodeEditor';
import { JupyterEditor } from '@/components/project/JupyterEditor';
import { KnowledgePanel } from '@/components/project/KnowledgePanel';
import { Button } from '@/components/common/Button';
import { useAppStore } from '@/context/AppContext';
import { useEffect, useState } from 'react';

export function Project() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1', 10);
  const project = projects.find((p) => p.id === projectId);
  
  const { getProgress, updateProgress } = useAppStore();
  const progress = getProgress(projectId);
  const [savedCode, setSavedCode] = useState<string>('');
  
  useEffect(() => {
    if (progress?.codeSubmission) {
      setSavedCode(progress.codeSubmission);
    }
  }, [progress]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-800 mb-4">项目不存在</h2>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCodeChange = (code: string) => {
    updateProgress(projectId, {
      codeCompleted: true,
      codeSubmission: code
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProjectIntro project={project} />
            
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-surface-800 to-surface-900 text-white px-6 py-5">
                <h2 className="text-xl font-bold">代码练习</h2>
              </div>
              <div className="p-4">
                <JupyterEditor
                  initialCode={project.codeTemplate}
                  onCodeChange={handleCodeChange}
                  savedCode={savedCode}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <KnowledgePanel project={project} />
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-5">
                <h2 className="text-xl font-bold">开始测试</h2>
              </div>
              <div className="p-6">
                <p className="text-surface-600 mb-4">
                  完成代码练习后，参加测试检验学习成果。
                </p>
                <ul className="text-sm text-surface-500 space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-primary-100">
                      <FileText className="w-4 h-4 text-primary-600" />
                    </div>
                    共10道选择题
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-accent-100">
                      <span className="text-accent-600 text-sm font-bold">10</span>
                    </div>
                    每题10分，满分100分
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-100">
                      <span className="text-emerald-600 text-sm font-bold">60</span>
                    </div>
                    60分及格
                  </li>
                </ul>
                
                <Link to={`/project/${projectId}/test`}>
                  <Button fullWidth>
                    <Play className="w-4 h-4" />
                    开始测试
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
