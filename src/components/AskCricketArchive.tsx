'use client';

import React, { useState } from 'react';
import { Send, Bot, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  playerId: string;
  playerName: string;
}

export default function AskCricketArchive({ playerId, playerName }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; stats?: any }>>([
    {
      role: 'assistant',
      content: `Welcome to Ask The Cricket Archive. Ask any question about ${playerName}'s career records, fastest centuries, head-to-head records against opponents, format averages, or specific matches.`
    }
  ]);

  const quickQuestions = [
    "What was AB de Villiers' highest score in ODI cricket?",
    "Tell me about his fastest century against West Indies in 2015",
    "What is his Test batting average and how many centuries did he score?",
    "How many runs did he score in his IPL career for RCB and Delhi?",
    "What was his highest score in Test cricket?"
  ];

  const handleAsk = async (textToSubmit?: string) => {
    const q = textToSubmit || query;
    if (!q.trim()) return;

    const userMessage = { role: 'user' as const, content: q };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, question: q })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          stats: data.stats
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I encountered an issue retrieving the statistical records. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              ASK THE CRICKET ARCHIVE
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase font-semibold">
                Grounded Statistical Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Natural-language cricket queries verified against match database records.</p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Suggested Inquiries:</div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="text-xs text-slate-300 bg-slate-950 hover:bg-slate-800 hover:text-white border border-slate-800 px-3 py-1.5 rounded-full transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message History */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium'
                  : 'bg-slate-950 border border-slate-800 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-line">{m.content}</div>

              {m.stats && (
                <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {Object.entries(m.stats).map(([k, v]) => (
                    <div key={k} className="bg-slate-900/80 p-1.5 rounded">
                      <div className="text-[10px] text-slate-400 uppercase">{k}</div>
                      <div className="font-bold text-emerald-400">{String(v)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Querying verified match records and recalculating statistics...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder={`Ask anything about ${playerName}'s career (e.g. fastest 50, test average, IPL stats)...`}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => handleAsk()}
          disabled={loading || !query.trim()}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </button>
      </div>
    </div>
  );
}
