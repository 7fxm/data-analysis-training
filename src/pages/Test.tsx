import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { allQuestions } from '@/data/questions';
import { QuestionCard } from '@/components/test/QuestionCard';
import { ProgressBar } from '@/components/test/ProgressBar';
import { Timer } from '@/components/test/Timer';
import { ResultPanel } from '@/components/test/ResultPanel';
import { Button } from '@/components/common/Button';
import { TestQuestion } from '@/types';

export function Test() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = id || '1';
  
  const questions: TestQuestion[] = allQuestions[projectId] || [];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(new Array(questions.length).fill(null));
    }
  }, [questions]);

  if (questions.length === 0) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">加载中...</h2>
        </div>
      </div>
    );
  }

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsRunning(false);
  };

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setIsSubmitted(false);
    setIsRunning(true);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const correctCount = answers.reduce((count, answer, index) => {
    if (answer === questions[index]?.correctAnswer) {
      return count + 1;
    }
    return count;
  }, 0);

  if (isSubmitted) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => navigate(`/project/${projectId}`)}
            >
              <ArrowLeft className="w-4 h-4" />
              返回项目
            </Button>
          </div>
          
          <ResultPanel
            score={correctCount * 10}
            totalQuestions={questions.length}
            correctCount={correctCount}
            projectId={parseInt(projectId, 10)}
            onRetry={handleRetry}
          />
          
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-800">答案解析</h3>
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                questionNumber={index + 1}
                selectedAnswer={answers[index]}
                onSelect={() => {}}
                showResult={true}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/project/${projectId}`)}
          >
            <ArrowLeft className="w-4 h-4" />
            返回项目
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuestionCard
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              selectedAnswer={answers[currentQuestion]}
              onSelect={handleSelectAnswer}
            />
            
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="secondary"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                上一题
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={answeredCount < questions.length}
                >
                  <Send className="w-4 h-4" />
                  提交答案
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                >
                  下一题
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Timer isRunning={isRunning} />
            
            <ProgressBar
              current={currentQuestion + 1}
              total={questions.length}
              answered={answeredCount}
            />
            
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-medium text-slate-800 mb-3">快速跳转</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-orange-500 text-white'
                        : answers[index] !== null
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h4 className="font-medium text-orange-800 mb-2">测试说明</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• 共10道选择题，每题10分</li>
                <li>• 满分100分，60分及格</li>
                <li>• 请仔细阅读每道题目</li>
                <li>• 答完所有题目后提交</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
