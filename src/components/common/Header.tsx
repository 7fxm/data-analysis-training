import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, FolderOpen, GraduationCap, Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/context/AppContext';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const location = useLocation();
  const getCompletedCount = useAppStore((state) => state.getCompletedCount);
  const completedCount = getCompletedCount();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/resources', label: '学习资源', icon: FolderOpen }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-surface-900/70 border-b border-surface-200/50 dark:border-surface-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-700 dark:text-primary-400">数据分析实战训练营</h1>
              <p className="text-xs text-surface-500 dark:text-surface-400">从数据清洗到机器学习</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
            
            <div className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 border border-primary-100 dark:border-primary-800">
              <BookOpen className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                <span className="text-primary-600 dark:text-primary-400 font-bold">{completedCount}</span>
                <span className="text-surface-400 dark:text-surface-500">/10</span>
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-xl text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-300"
              aria-label="切换主题"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
