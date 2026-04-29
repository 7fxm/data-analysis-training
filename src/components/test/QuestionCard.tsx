import { CheckCircle, XCircle } from 'lucide-react';
import { TestQuestion } from '@/types';
import { clsx } from 'clsx';

interface QuestionCardProps {
  question: TestQuestion;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelect: (answerIndex: number) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelect,
  showResult = false
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className={clsx(
      'bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300',
      showResult && (isCorrect ? 'ring-2 ring-emerald-500 ring-offset-2' : 'ring-2 ring-rose-500 ring-offset-2')
    )}>
      <div className="bg-gradient-to-r from-surface-800 to-surface-900 text-white px-6 py-4 flex items-center justify-between">
        <span className="font-semibold">题目 {questionNumber}</span>
        {showResult && (
          <span className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">正确</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span className="text-rose-400 text-sm font-medium">错误</span>
              </>
            )}
          </span>
        )}
      </div>
      
      <div className="p-6">
        <p className="text-lg text-surface-800 mb-6 font-medium leading-relaxed">
          {question.question}
        </p>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            let optionStyle = 'border-surface-200 hover:border-primary-300 hover:bg-primary-50';
            
            if (showResult) {
              if (isCorrectOption) {
                optionStyle = 'border-emerald-500 bg-emerald-50';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'border-rose-500 bg-rose-50';
              }
            } else if (isSelected) {
              optionStyle = 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20';
            }
            
            return (
              <button
                key={index}
                onClick={() => !showResult && onSelect(index)}
                disabled={showResult}
                className={clsx(
                  'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200',
                  optionStyle,
                  !showResult && 'cursor-pointer hover:shadow-md'
                )}
              >
                <span className="flex items-start gap-4">
                  <span className={clsx(
                    'flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold shrink-0 transition-colors',
                    isSelected 
                      ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md' 
                      : 'bg-surface-100 text-surface-600'
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-surface-700 pt-0.5">{option}</span>
                </span>
              </button>
            );
          })}
        </div>
        
        {showResult && (
          <div className={clsx(
            'mt-5 p-4 rounded-xl',
            isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-surface-50 border border-surface-200'
          )}>
            <p className="text-sm font-semibold text-surface-700 mb-2">解析：</p>
            <p className="text-sm text-surface-600 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
