import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, RotateCcw, Check, BookOpen, AlertCircle, FileCode } from 'lucide-react';
import { Button } from '../common/Button';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange?: (code: string) => void;
  savedCode?: string;
}

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (packages: string | string[]) => Promise<void>;
}

export function CodeEditor({ initialCode, onCodeChange, savedCode }: CodeEditorProps) {
  const [code, setCode] = useState(savedCode || initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [isLoadingPyodide, setIsLoadingPyodide] = useState(false);
  const [pyodideError, setPyodideError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (savedCode) {
      setCode(savedCode);
    }
  }, [savedCode]);

  const loadPyodideInstance = async () => {
    if (pyodide) return pyodide;
    
    setIsLoadingPyodide(true);
    setPyodideError(null);
    
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      document.head.appendChild(script);
      
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide script'));
      });
      
      const pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
      });
      
      await pyodideInstance.loadPackage(['pandas', 'numpy', 'matplotlib', 'scikit-learn']);
      
      setPyodide(pyodideInstance);
      return pyodideInstance;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setPyodideError(`加载Python环境失败: ${errorMessage}`);
      return null;
    } finally {
      setIsLoadingPyodide(false);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    
    try {
      const pyodideInstance = await loadPyodideInstance();
      
      if (!pyodideInstance) {
        setOutput('Python环境加载失败，请刷新页面重试');
        setIsRunning(false);
        return;
      }
      
      await pyodideInstance.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);
      
      await pyodideInstance.runPythonAsync(code);
      
      const stdout = await pyodideInstance.runPythonAsync('sys.stdout.getvalue()');
      const stderr = await pyodideInstance.runPythonAsync('sys.stderr.getvalue()');
      
      const result = String(stdout) + (stderr ? `\n错误: ${stderr}` : '');
      setOutput(result || '代码执行完成，无输出');
      
      if (onCodeChange) {
        onCodeChange(code);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`执行错误:\n${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer) {
      setCode(initialCode);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-t-xl">
        <div className="flex items-center gap-4">
          <Button
            size="md"
            variant="secondary"
            onClick={handleRunCode}
            disabled={isRunning || isLoadingPyodide}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? '运行代码中...' : isLoadingPyodide ? '加载环境中...' : '运行代码'}
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={handleReset}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重置代码
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={handleShowAnswer}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showAnswer ? '隐藏答案' : '显示参考答案'}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="!text-white/80 hover:!text-white"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      {/* 文件名标签 */}
      <div className="flex items-center gap-2 bg-slate-800 text-slate-300 px-4 py-2 border-b border-slate-700">
        <FileCode className="w-4 h-4" />
        <span className="text-sm font-mono">main.py</span>
      </div>
      
      {/* 代码编辑区 */}
      <div className="flex-1 min-h-[400px]">
        <Editor
          height="400px"
          defaultLanguage="python"
          theme="vs-dark"
          value={showAnswer ? initialCode : code}
          onChange={(value) => {
            setCode(value || '');
            if (showAnswer) setShowAnswer(false);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            tabSize: 4,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            folding: true,
            foldingHighlight: true,
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
      
      {/* 执行结果区 */}
      <div className="bg-slate-900 text-slate-100 p-4 rounded-b-xl min-h-[150px]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-slate-400 uppercase">执行结果</span>
          {pyodideError && (
            <span className="text-xs text-red-400 flex items-center gap-1 ml-auto">
              <AlertCircle className="w-3 h-3" />
              {pyodideError}
            </span>
          )}
        </div>
        <div className="bg-slate-800 rounded-lg p-3 min-h-[80px]">
          {output ? (
            <pre className="text-sm font-mono whitespace-pre-wrap text-green-400 overflow-auto max-h-[200px]">
              {output}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center h-[80px] text-slate-500">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center mb-2">
                <span className="text-slate-500 text-xl">_</span>
              </div>
              <span className="text-xs">点击"运行代码"按钮执行</span>
              <span className="text-xs mt-1">代码将在浏览器中运行</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
