import { clsx } from 'clsx';

interface ProgressBarProps {
  current: number;
  total: number;
  answered: number;
}

export function ProgressBar({ current, total, answered }: ProgressBarProps) {
  const progress = (answered / total) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-surface-700">
          答题进度
        </span>
        <span className="text-sm font-medium text-primary-600">
          {answered}/{total} 已答
        </span>
      </div>
      
      <div className="h-2.5 bg-surface-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'w-full aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all duration-200',
              i + 1 === current
                ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md shadow-primary-500/30'
                : i + 1 <= answered
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-surface-100 text-surface-400'
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
