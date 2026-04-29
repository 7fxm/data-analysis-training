import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  onTimeUp?: () => void;
  initialTime?: number;
}

export function Timer({ isRunning, onTimeUp, initialTime = 0 }: TimerProps) {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-surface-500 font-medium">用时</p>
          <p className="text-3xl font-bold text-surface-800 font-mono tracking-wider">
            {formatTime(seconds)}
          </p>
        </div>
      </div>
    </div>
  );
}
