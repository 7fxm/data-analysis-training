import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Plus, Download, Loader2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '../common/Button';
import { JupyterCell } from './JupyterCell';

interface Cell {
  id: string;
  code: string;
  output: string;
  error: string;
  isRunning: boolean;
}

interface JupyterEditorProps {
  initialCode: string;
  onCodeChange?: (code: string) => void;
  savedCode?: string;
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (packages: string | string[]) => Promise<void>;
  globals: any;
}

export function JupyterEditor({ initialCode, onCodeChange, savedCode }: JupyterEditorProps) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [isLoadingPyodide, setIsLoadingPyodide] = useState(true);
  const [pyodideError, setPyodideError] = useState<string | null>(null);
  const [isPyodideReady, setIsPyodideReady] = useState(false);

  // 初始化单元格
  useEffect(() => {
    const initialCells: Cell[] = [
      {
        id: '1',
        code: initialCode,
        output: '',
        error: '',
        isRunning: false
      }
    ];
    setCells(initialCells);
  }, [initialCode]);

  // 加载 Pyodide
  useEffect(() => {
    const loadPyodideInstance = async () => {
      setIsLoadingPyodide(true);
      setPyodideError(null);

      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Pyodide'));
        });

        const pyodideInstance = await (window as any).loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });

        // 预加载常用包
        await pyodideInstance.loadPackage(['pandas', 'numpy']);

        // 设置输出捕获
        await pyodideInstance.runPythonAsync(`
import sys
from io import StringIO
import json

class OutputCapture:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def reset(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def get_output(self):
        return self.stdout.getvalue(), self.stderr.getvalue()

_output_capture = OutputCapture()
        `);

        setPyodide(pyodideInstance);
        setIsPyodideReady(true);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setPyodideError(`Python环境加载失败: ${errorMessage}`);
      } finally {
        setIsLoadingPyodide(false);
      }
    };

    loadPyodideInstance();
  }, []);

  // 添加新单元格
  const addCell = useCallback(() => {
    const newCell: Cell = {
      id: Date.now().toString(),
      code: '# 在这里编写新代码',
      output: '',
      error: '',
      isRunning: false
    };
    setCells(prev => [...prev, newCell]);
  }, []);

  // 删除单元格
  const deleteCell = useCallback((id: string) => {
    if (cells.length === 1) {
      // 如果只有一个单元格，重置它
      setCells([{
        id: '1',
        code: initialCode,
        output: '',
        error: '',
        isRunning: false
      }]);
    } else {
      setCells(prev => prev.filter(cell => cell.id !== id));
    }
  }, [cells.length, initialCode]);

  // 更新单元格代码
  const updateCellCode = useCallback((id: string, code: string) => {
    setCells(prev => prev.map(cell => 
      cell.id === id ? { ...cell, code } : cell
    ));
  }, []);

  // 运行单个单元格
  const runCell = useCallback(async (id: string) => {
    const cell = cells.find(c => c.id === id);
    if (!cell || !pyodide) return;

    // 更新单元格状态
    setCells(prev => prev.map(c => 
      c.id === id ? { ...c, isRunning: true, output: '', error: '' } : c
    ));

    try {
      // 重置输出捕获
      await pyodide.runPythonAsync(`
_output_capture.reset()
sys.stdout = _output_capture.stdout
sys.stderr = _output_capture.stderr
      `);

      // 运行代码
      await pyodide.runPythonAsync(cell.code);

      // 获取输出
      const stdout = await pyodide.runPythonAsync('_output_capture.stdout.getvalue()');
      const stderr = await pyodide.runPythonAsync('_output_capture.stderr.getvalue()');

      setCells(prev => prev.map(c => 
        c.id === id ? { 
          ...c, 
          isRunning: false, 
          output: String(stdout || ''),
          error: String(stderr || '').replace(/^Error: /, '')
        } : c
      ));

      // 调用代码变更回调
      if (onCodeChange) {
        const allCode = cells.map(c => c.code).join('\n\n');
        onCodeChange(allCode);
      }
    } catch (error: any) {
      let errorMessage = String(error);
      // 清理 Pyodide 错误信息
      errorMessage = errorMessage.replace(/^Error: Python Error: /, '');
      errorMessage = errorMessage.replace(/^Traceback.*?\n/, '');
      errorMessage = errorMessage.split('\n')[0];

      setCells(prev => prev.map(c => 
        c.id === id ? { ...c, isRunning: false, error: errorMessage } : c
      ));
    }
  }, [cells, pyodide, onCodeChange]);

  // 运行所有单元格
  const runAllCells = useCallback(async () => {
    for (const cell of cells) {
      await runCell(cell.id);
    }
  }, [cells, runCell]);

  // 重置所有单元格
  const resetAllCells = useCallback(() => {
    setCells([{
      id: '1',
      code: initialCode,
      output: '',
      error: '',
      isRunning: false
    }]);
  }, [initialCode]);

  return (
    <div className="flex flex-col h-full">
      {/* 工具栏 */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-medium">JupyterLite 代码编辑器</span>
            <div className="flex items-center gap-2 ml-4">
              {isLoadingPyodide ? (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  加载Python环境...
                </span>
              ) : isPyodideReady ? (
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Python就绪
                </span>
              ) : pyodideError ? (
                <span className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3 h-3" />
                  环境加载失败
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={addCell}
              className="!border-slate-600 !text-slate-300 hover:!bg-slate-700"
            >
              <Plus className="w-4 h-4" />
              添加单元格
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={resetAllCells}
              className="!bg-slate-600 hover:!bg-slate-500"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={runAllCells}
              disabled={isLoadingPyodide || !isPyodideReady}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Play className="w-4 h-4" />
              运行全部
            </Button>
          </div>
        </div>
      </div>

      {/* 说明信息 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400">
          <Info className="w-4 h-4" />
          <span>这是一个基于 Pyodide 的浏览器端 Python 运行环境。代码直接在浏览器中执行，无需服务器。</span>
        </div>
      </div>

      {/* 单元格列表 */}
      <div className="flex-1 overflow-auto p-4 bg-slate-100 dark:bg-surface-900">
        {cells.map((cell, index) => (
          <JupyterCell
            key={cell.id}
            cellNumber={index + 1}
            code={cell.code}
            output={cell.output}
            error={cell.error}
            isRunning={cell.isRunning}
            onCodeChange={(code) => updateCellCode(cell.id, code)}
            onRun={() => runCell(cell.id)}
            onDelete={() => deleteCell(cell.id)}
            isLast={index === cells.length - 1}
            onAddCell={addCell}
          />
        ))}
      </div>

      {/* 底部信息 */}
      <div className="bg-slate-50 dark:bg-surface-800 px-4 py-2 border-t border-surface-200 dark:border-surface-700 rounded-b-xl">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{cells.length} 个单元格</span>
          <span>Pyodide v0.24.1 · Pandas · NumPy</span>
        </div>
      </div>
    </div>
  );
}
