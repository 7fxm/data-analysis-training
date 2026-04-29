import { useState } from 'react';
import { Download, Database, Code, BookOpen, ChevronDown, ChevronUp, Copy, Check, HelpCircle } from 'lucide-react';
import { datasets, codeTemplates, knowledgeDocs } from '@/data/resources';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: '为什么代码运行时报错？',
    answer: '代码运行时出错通常有以下原因：1) 语法错误 - 检查括号、引号是否配对；2) 数据问题 - 确保使用的变量已定义；3) 依赖缺失 - 确保已导入需要的库（如pandas）；4) 数据文件不存在 - 当前代码使用预置数据，应能正常运行。如果仍有问题，可以点击"重置"按钮恢复原始代码。',
    category: '代码运行'
  },
  {
    id: '2',
    question: '如何学习Python数据分析？',
    answer: '建议学习路径：1) 先掌握Python基础语法；2) 学习Pandas数据处理；3) 学习NumPy数值计算；4) 学习Matplotlib/Seaborn可视化；5) 学习统计分析方法；6) 实践机器学习入门。本网站的项目就是按照这个顺序设计的。',
    category: '学习方法'
  },
  {
    id: '3',
    question: '什么是数据清洗？为什么重要？',
    answer: '数据清洗是指识别并处理数据中的错误、缺失值、异常值和不一致性的过程。高质量的数据是分析结果可靠的前提，"垃圾数据进，垃圾结果出"。数据清洗通常占数据分析项目时间的60-80%。',
    category: '概念理解'
  },
  {
    id: '4',
    question: 'pandas和Excel有什么区别？',
    answer: 'Excel适合小规模数据处理和快速分析，操作直观但处理速度慢、难以自动化。Pandas适合大规模数据处理，可以处理百万级数据，支持复杂的数据操作，并且可以编写脚本实现自动化分析流程。两者可以互补使用。',
    category: '工具选择'
  },
  {
    id: '5',
    question: '如何选择合适的图表类型？',
    answer: '选择图表类型的原则：1) 展示趋势用折线图；2) 比较大小用柱状图；3) 展示占比用饼图；4) 展示分布用直方图；5) 展示关系用散点图；6) 展示层次结构用树形图。关键是让观众能快速理解数据传达的信息。',
    category: '数据可视化'
  },
  {
    id: '6',
    question: '什么是统计学显著性？',
    answer: '统计学显著性是指观察到的结果不太可能是随机产生的。常用p值来衡量，通常p<0.05认为是显著的。但要注意：统计显著不等于实际意义上的重要，样本量足够大时很小的差异也可能显著。',
    category: '统计分析'
  },
  {
    id: '7',
    question: '如何处理缺失值？',
    answer: '处理缺失值的方法：1) 删除法 - dropna()，适用于缺失比例低的情况；2) 填充法 - fillna()，可以用均值、中位数、众数或特定值填充；3) 插值法 - 时间序列数据常用前后值插值；4) 模型预测 - 用其他特征预测缺失值。选择方法要结合业务场景。',
    category: '数据清洗'
  },
  {
    id: '8',
    question: '聚类分析有什么用？',
    answer: '聚类分析可以帮助我们：1) 发现数据中的自然分组；2) 客户分群和精准营销；3) 异常检测和欺诈识别；4) 数据压缩和特征提取。常用算法包括K-means、层次聚类、DBSCAN等。',
    category: '机器学习'
  }
];

export function Resources() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'templates' | 'docs' | 'faq'>('datasets');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleCopyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const tabs = [
    { id: 'datasets', label: '数据集资源', icon: Database },
    { id: 'templates', label: '代码模板', icon: Code },
    { id: 'docs', label: '知识点文档', icon: BookOpen },
    { id: 'faq', label: '常见问题', icon: HelpCircle }
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

        {activeTab === 'faq' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">常见问题解答</h3>
                  <p className="text-white/80 text-sm">遇到问题？先看看这里有没有答案</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqItems.map((faq) => (
                <div key={faq.id} className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden border border-surface-100 dark:border-surface-700">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-start justify-between px-6 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-2 inline-block">
                        {faq.category}
                      </span>
                      <p className="font-bold text-surface-800 dark:text-surface-200 mt-2">{faq.question}</p>
                    </div>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-surface-400 ml-4 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-surface-400 ml-4 shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4 border-t border-surface-100 dark:border-surface-700">
                      <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
