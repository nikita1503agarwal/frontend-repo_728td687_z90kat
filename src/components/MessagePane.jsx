import React, { useMemo, useRef, useState } from 'react';
import { Hash, Send, Paperclip, Trash2, Edit3 } from 'lucide-react';

const seedMessages = [
  { id: 'm1', author: 'Flames Admin', content: 'Welcome to the server! Be kind and have fun.', timestamp: '09:15' },
  { id: 'm2', author: 'Blue Bot', content: 'I can help you moderate channels. Type /help to get started.', timestamp: '09:17' },
];

export default function MessagePane({ channelName = 'general' }) {
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const header = useMemo(() => `# ${channelName}`, [channelName]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const m = {
      id: Math.random().toString(36).slice(2),
      author: 'You',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, m]);
    setInput('');
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  const remove = (id) => setMessages((prev) => prev.filter(m => m.id !== id));
  const startEdit = (id) => {
    const m = messages.find(x => x.id === id);
    if (!m) return;
    const next = prompt('Edit message', m.content);
    if (next !== null) {
      setMessages((prev) => prev.map(x => x.id === id ? { ...x, content: next } : x));
    }
  };

  return (
    <section className="flex-1 h-screen bg-gray-900 flex flex-col">
      <div className="h-14 border-b border-gray-800 px-4 flex items-center gap-2 sticky top-0 bg-gray-900/80 backdrop-blur z-10">
        <Hash size={18} className="text-gray-400" />
        <h1 className="text-white font-semibold">{header}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="group flex items-start gap-3">
            <div className="size-9 rounded-full bg-gray-700 flex items-center justify-center text-sm text-white">{m.author.slice(0,1)}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">{m.author}</span>
                <span className="text-xs text-gray-400">{m.timestamp}</span>
              </div>
              <div className="text-gray-200 whitespace-pre-wrap break-words">{m.content}</div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <button aria-label="Edit" onClick={() => startEdit(m.id)} className="p-1 rounded hover:bg-gray-800 text-gray-300"><Edit3 size={16} /></button>
              <button aria-label="Delete" onClick={() => remove(m.id)} className="p-1 rounded hover:bg-gray-800 text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3">
          <button className="p-2 text-gray-400 hover:text-gray-200"><Paperclip size={18} /></button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder={`Message #${channelName}`}
            className="flex-1 bg-transparent outline-none text-gray-100 placeholder:text-gray-500 py-3"
          />
          <button onClick={send} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-2 rounded-lg">
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </section>
  );
}
