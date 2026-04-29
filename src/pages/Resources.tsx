import { useState } from 'react';
import { Download, Database, Code, BookOpen, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { datasets, codeTemplates, knowledgeDocs } from '@/data/resources';

export function Resources() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'templates' | 'docs'>('datasets');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const handleCopyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const tabs = [
    { id: 'datasets', label: '数据集资源', icon: Database },
    { id: 'templates', label: '代码模板', icon: Code },
    { id: 'docs', label: '知识点文档', icon: BookOpen }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-4">学习资源</h1>
          <p className="text-surface-500 dark:text-surface-400">数据集、代码模板和数据分析技术知识</p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 shadow border border-surface-100 dark:border-surface-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'datasets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden border border-surface-100 dark:border-surface-700">
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4">
                  <h3 className="text-lg font-bold">{dataset.name}</h3>
                  <p className="text-sm text-white/80">{dataset.filename}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-surface-600 dark:text-surface-300 mb-4">{dataset.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-surface-800 dark:text-surface-200 mb-2">字段含义：</h4>
                    <div className="bg-surface-50 dark:bg-surface-900 rounded-xl p-3 space-y-2">
                      {dataset.fields.map((field, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <code className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded text-xs shrink-0">
                            {field.name}
                          </code>
                          <span className="text-surface-400 dark:text-surface-500">({field.type})</span>
                          <span className="text-surface-600 dark:text-surface-300">{field.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-surface-800 dark:text-surface-200 mb-2">应用场景：</h4>
                    <div className="flex flex-wrap gap-2">
                      {dataset.useCases.map((useCase, index) => (
                        <span
                          key={index}
                          className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25">
                    <Download className="w-4 h-4" />
                    下载数据集
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            {codeTemplates.map((template) => (
              <div key={template.id} className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden border border-surface-100 dark:border-surface-700">
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{template.name}</h3>
                    <p className="text-sm text-white/80">{template.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(template.id, template.code)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 bg-white/20 hover:bg-white/30 text-white"
                  >
                    {copiedTemplate === template.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        复制
                      </>
                    )}
                  </button>
                </div>
                
                <div className="p-4 bg-surface-900 dark:bg-surface-950 overflow-x-auto">
                  <pre className="text-sm text-surface-100 font-mono whitespace-pre">
                    {template.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-4">
            {knowledgeDocs.map((doc) => (
              <div key={doc.id} className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden border border-surface-100 dark:border-surface-700">
                <button
                  onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-surface-800 dark:text-surface-200">{doc.title}</span>
                  </div>
                  {expandedDoc === doc.id ? (
                    <ChevronUp className="w-5 h-5 text-surface-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-surface-400" />
                  )}
                </button>
                
                {expandedDoc === doc.id && (
                  <div className="px-6 pb-6 border-t border-surface-100 dark:border-surface-700">
                    <div className="prose prose-slate dark:prose-invert max-w-none pt-4">
                      <div 
                        className="text-surface-600 dark:text-surface-300 whitespace-pre-wrap text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: doc.content.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-surface-100 dark:bg-surface-900 p-4 rounded-xl overflow-x-auto my-3"><code class="text-xs">$2</code></pre>').replace(/## (.*)/g, '<h2 class="text-lg font-bold text-primary-700 dark:text-primary-400 mt-4 mb-2">$1</h2>').replace(/### (.*)/g, '<h3 class="font-bold text-surface-800 dark:text-surface-200 mt-3 mb-2">$1</h3>').replace(/- (.*)/g, '<li class="ml-4 text-surface-600 dark:text-surface-300">$1</li>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-surface-800 dark:text-surface-200">$1</strong>') }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
