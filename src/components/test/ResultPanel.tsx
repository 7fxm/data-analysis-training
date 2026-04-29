import { CheckCircle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

interface ResultPanelProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  projectId: number;
  onRetry: () => void;
}

export function ResultPanel({
  score,
  totalQuestions,
  correctCount,
  projectId,
  onRetry
}: ResultPanelProps) {
  const isPassed = score >= 60;
  const wrongCount = totalQuestions - correctCount;
  const percentage = (correctCount / totalQuestions) * 100;

  const getMessage = () => {
    if (score >= 80) return '优秀！你已经很好地掌握了这个项目的知识点！';
    if (score >= 60) return '及格！继续努力，争取更好的成绩！';
    return '未及格，建议复习知识点后重新测试。';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className={`bg-gradient-to-r ${isPassed ? 'from-emerald-500 to-teal-500' : 'from-rose-500 to-pink-500'} text-white px-6 py-5`}>
        <h2 className="text-xl font-bold">测试结果</h2>
      </div>
      
      <div className="p-10 text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-2xl" />
          <div className="relative p-6 rounded-full bg-gradient-to-br from-surface-50 to-surface-100 border border-surface-200">
            <svg className="w-44 h-44 transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="78"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-surface-200"
              />
              <circle
                cx="88"
                cy="88"
                r="78"
                stroke="url(#resultGradient)"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={490}
                strokeDashoffset={490 - (490 * percentage) / 100}
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isPassed ? '#10b981' : '#f43f5e'} />
                  <stop offset="100%" stopColor={isPassed ? '#14b8a6' : '#ec4899'} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${isPassed ? 'text-emerald-500' : 'text-rose-500'}`}>
                {score}
              </span>
              <span className="text-surface-400 text-sm mt-1">分</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-8 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-emerald-700 font-medium">正确 {correctCount} 题</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50">
            <XCircle className="w-5 h-5 text-rose-500" />
            <span className="text-rose-700 font-medium">错误 {wrongCount} 题</span>
          </div>
        </div>
        
        <p className={`text-lg mb-8 font-medium ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
          {getMessage()}
        </p>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onRetry}>
            <RotateCcw className="w-4 h-4" />
            重新测试
          </Button>
          <Link to={`/project/${projectId}`}>
            <Button variant="primary">
              返回项目
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
