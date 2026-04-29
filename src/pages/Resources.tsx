import { useState } from 'react';
import { Download, Database, Code, BookOpen, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { datasets, codeTemplates, knowledgeDocs } from '@/data/resources';
import { Button } from '@/components/common/Button';

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
          <h1 className="text-3xl font-bold text-slate-800 mb-4">学习资源</h1>
          <p className="text-slate-600">数据集、代码模板和知识点文档</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'datasets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-4">
                  <h3 className="text-lg font-bold">{dataset.name}</h3>
                  <p className="text-sm text-slate-300">{dataset.filename}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-600 mb-4">{dataset.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-slate-800 mb-2">字段含义：</h4>
                    <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                      {dataset.fields.map((field, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <code className="bg-slate-200 px-2 py-0.5 rounded text-slate-700 shrink-0">
                            {field.name}
                          </code>
                          <span className="text-slate-500">({field.type})</span>
                          <span className="text-slate-600">{field.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-slate-800 mb-2">应用场景：</h4>
                    <div className="flex flex-wrap gap-2">
                      {dataset.useCases.map((useCase, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    下载数据集
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            {codeTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{template.name}</h3>
                    <p className="text-sm text-slate-300">{template.description}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopyCode(template.id, template.code)}
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
                  </Button>
                </div>
                
                <div className="p-4 bg-slate-900">
                  <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap overflow-x-auto">
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
              <div key={doc.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-orange-500" />
                    <span className="font-bold text-slate-800">{doc.title}</span>
                  </div>
                  {expandedDoc === doc.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                
                {expandedDoc === doc.id && (
                  <div className="px-6 pb-6">
                    <div className="prose prose-slate max-w-none">
                      <div 
                        className="text-slate-600 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: doc.content.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>').replace(/## (.*)/g, '<h2 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h2>').replace(/### (.*)/g, '<h3 class="font-bold text-slate-700 mt-3 mb-2">$1</h3>').replace(/- (.*)/g, '<li class="ml-4">$1</li>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
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
