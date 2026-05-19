/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Markdown from 'react-markdown';
import { Copy, Loader2, Sparkles, FileText, Bot } from 'lucide-react';

export default function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate');
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">AI 會議記錄生成與翻譯工具</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">Gemini 模式</div>
        </div>
      </header>

      <main className="flex-1 flex gap-6 p-6">
        <section className="w-1/2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">會議逐字稿輸入</h2>
            <button
                onClick={() => setTranscript('')}
                className="text-xs text-indigo-600 font-medium hover:underline"
            >
                清除內容
            </button>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="在此貼上會議逐字稿內容..."
              className="flex-1 w-full resize-none outline-none text-slate-700 leading-relaxed placeholder:text-slate-300"
            />
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-400">字數統計：{transcript.length} 字</div>
              <button
                onClick={generateSummary}
                disabled={loading || !transcript.trim()}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-md shadow-indigo-200 hover:bg-indigo-700 disabled:bg-gray-400 flex items-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" /> 生成中...</>
                ) : (
                  <><Sparkles size={16} /> 生成總結與翻譯</>
                )}
              </button>
            </div>
          </div>
        </section>

        <section className="w-1/2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI 處理結果</h2>
            {summary && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                <Copy size={16} /> 複製內容
              </button>
            )}
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-y-auto">
            {error && <div className="text-red-500 bg-red-50 p-4 rounded-md">{error}</div>}
            
            {summary ? (
              <div className="prose prose-slate max-w-none text-slate-800">
                <Markdown>{summary}</Markdown>
              </div>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                        <Bot size={48} className="mx-auto mb-2 opacity-50" />
                        <p>等待分析結果...</p>
                    </div>
                </div>
            )}
          </div>
        </section>
      </main>

      <footer className="h-12 bg-slate-100 border-t border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            API 狀態：連線正常
          </div>
        </div>
        <div className="text-xs text-slate-400 font-mono">v1.0.0</div>
      </footer>
    </div>
  );
}

