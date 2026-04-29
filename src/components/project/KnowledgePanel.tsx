import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';
import { Project } from '@/types';

interface KnowledgePanelProps {
  project: Project;
}

export function KnowledgePanel({ project }: KnowledgePanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('knowledge');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-surface-800 to-surface-900 text-white px-6 py-5">
        <h2 className="text-xl font-bold">知识点梳理</h2>
      </div>
      
      <div className="divide-y divide-surface-100">
        <div>
          <button
            onClick={() => toggleSection('knowledge')}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-surface-800">核心知识点</span>
            </div>
            {expandedSection === 'knowledge' ? (
              <ChevronUp className="w-5 h-5 text-surface-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-surface-400" />
            )}
          </button>
          
          {expandedSection === 'knowledge' && (
            <div className="px-6 pb-4">
              <ul className="space-y-2">
                {project.knowledgePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-surface-600">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <button
            onClick={() => toggleSection('mistakes')}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-surface-800">易错点总结</span>
            </div>
            {expandedSection === 'mistakes' ? (
              <ChevronUp className="w-5 h-5 text-surface-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-surface-400" />
            )}
          </button>
          
          {expandedSection === 'mistakes' && (
            <div className="px-6 pb-4">
              <ul className="space-y-2">
                {project.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2 text-surface-600">
                    <span className="text-amber-500 mt-1">⚠</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <button
            onClick={() => toggleSection('tips')}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-surface-800">学习建议</span>
            </div>
            {expandedSection === 'tips' ? (
              <ChevronUp className="w-5 h-5 text-surface-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-surface-400" />
            )}
          </button>
          
          {expandedSection === 'tips' && (
            <div className="px-6 pb-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                <ul className="space-y-2 text-sm text-surface-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">1.</span>
                    <span>先阅读项目介绍，理解任务目标</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">2.</span>
                    <span>参考代码模板，理解每行代码的作用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">3.</span>
                    <span>在代码编辑器中运行代码，观察输出结果</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">4.</span>
                    <span>尝试修改代码，加深理解</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">5.</span>
                    <span>完成练习后，参加测试检验学习成果</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
