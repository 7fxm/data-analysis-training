import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, FolderOpen, GraduationCap } from 'lucide-react';
import { useAppStore } from '@/context/AppContext';

export function Header() {
  const location = useLocation();
  const getCompletedCount = useAppStore((state) => state.getCompletedCount);
  const completedCount = getCompletedCount();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/resources', label: '学习资源', icon: FolderOpen }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-surface-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">数据分析实战训练营</h1>
              <p className="text-xs text-surface-500">从数据清洗到机器学习</p>
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
                      : 'text-surface-600 hover:text-surface-800 hover:bg-surface-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
            
            <div className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
              <BookOpen className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-surface-700">
                <span className="text-primary-600 font-bold">{completedCount}</span>
                <span className="text-surface-400">/10</span>
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
