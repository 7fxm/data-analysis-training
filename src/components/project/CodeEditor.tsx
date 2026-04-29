import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, RotateCcw, Check, AlertCircle } from 'lucide-react';
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
      
      pyodideInstance.runPythonAsync(`
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
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-slate-800 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium ml-2">Python 代码编辑器</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="!border-slate-600 !text-slate-300 hover:!bg-slate-700"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleReset}
            className="!bg-slate-600 hover:!bg-slate-500"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleRunCode}
            disabled={isRunning || isLoadingPyodide}
          >
            <Play className="w-4 h-4" />
            {isRunning ? '运行中...' : isLoadingPyodide ? '加载环境...' : '运行'}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-h-[400px] border border-slate-300 border-t-0">
        <Editor
          height="400px"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            tabSize: 4,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>
      
      <div className="bg-slate-900 text-slate-100 p-4 rounded-b-lg min-h-[120px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-slate-400 uppercase">输出</span>
          {pyodideError && (
            <span className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {pyodideError}
            </span>
          )}
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap text-green-400">
          {output || '点击"运行"按钮执行代码...'}
        </pre>
      </div>
    </div>
  );
}
