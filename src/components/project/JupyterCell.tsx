import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ChevronDown, ChevronRight, Trash2, Plus, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { Button } from '../common/Button';

interface JupyterCellProps {
  code: string;
  onCodeChange?: (code: string) => void;
  isRunning?: boolean;
  output?: string;
  error?: string;
  cellNumber: number;
  onRun?: () => void;
  onDelete?: () => void;
  isLast?: boolean;
  onAddCell?: () => void;
}

export function JupyterCell({
  code,
  onCodeChange,
  isRunning = false,
  output = '',
  error = '',
  cellNumber,
  onRun,
  onDelete,
  isLast = false,
  onAddCell
}: JupyterCellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const editorRef = useRef<any>(null);

  const hasOutput = output || error;
  const statusIcon = isRunning ? (
    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
  ) : error ? (
    <XCircle className="w-4 h-4 text-red-500" />
  ) : output ? (
    <CheckCircle className="w-4 h-4 text-green-500" />
  ) : (
    <Clock className="w-4 h-4 text-slate-400" />
  );

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md overflow-hidden border border-surface-200 dark:border-surface-700 mb-4">
      {/* 单元格头部 */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-surface-700 px-4 py-2 border-b border-surface-200 dark:border-surface-600">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 bg-slate-200 dark:bg-surface-600 px-2 py-0.5 rounded">
            In [{hasOutput ? (error ? '*' : cellNumber) : ''}]:
          </span>
          {statusIcon}
          <span className="text-xs text-slate-500">
            {isRunning ? '运行中...' : error ? '错误' : output ? '已完成' : '等待执行'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="!p-1"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
          {!isLast && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onAddCell}
              className="!p-1"
              title="添加单元格"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="!p-1 hover:!text-red-500"
            title="删除单元格"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 代码输入区 */}
      {!isCollapsed && (
        <>
          <div className="border-b border-surface-200 dark:border-surface-700">
            <Editor
              height="200px"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => onCodeChange?.(value || '')}
              onMount={(editor) => { editorRef.current = editor; }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                tabSize: 4,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 8, bottom: 8 },
                renderLineHighlight: 'none',
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'hidden',
                }
              }}
            />
          </div>

          {/* 运行按钮 */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-surface-700">
            <Button
              size="sm"
              variant="primary"
              onClick={onRun}
              disabled={isRunning}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Play className="w-4 h-4" />
              {isRunning ? '运行中...' : '运行'}
            </Button>
            <span className="text-xs text-slate-500">Shift + Enter 运行</span>
          </div>
        </>
      )}

      {/* 输出区 */}
      {hasOutput && !isCollapsed && (
        <div className={`p-4 ${error ? 'bg-red-50 dark:bg-red-900/20' : 'bg-slate-50 dark:bg-surface-700'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-500">Out [{error ? '*' : cellNumber}]:</span>
          </div>
          <pre className={`text-sm font-mono whitespace-pre-wrap ${
            error ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'
          }`}>
            {error || output}
          </pre>
        </div>
      )}
    </div>
  );
}
