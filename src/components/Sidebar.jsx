import React from 'react';
import { Home, Plus, Settings } from 'lucide-react';

const servers = [
  { id: 'home', name: 'Home', color: 'bg-indigo-500', icon: <Home size={18} /> },
  { id: 'alpha', name: 'Alpha', color: 'bg-rose-500', icon: <span className="font-bold">A</span> },
  { id: 'beta', name: 'Beta', color: 'bg-emerald-500', icon: <span className="font-bold">B</span> },
  { id: 'gamma', name: 'Gamma', color: 'bg-amber-500', icon: <span className="font-bold">G</span> },
];

export default function Sidebar({ activeServerId = 'alpha', onSelectServer }) {
  return (
    <aside className="h-screen w-16 shrink-0 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-3 gap-3">
      {servers.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelectServer?.(s.id)}
          title={s.name}
          className={`group relative size-12 rounded-2xl grid place-items-center text-white transition-all hover:rounded-xl ${
            activeServerId === s.id ? 'ring-2 ring-white/30' : 'ring-0'
          } ${s.color}`}
        >
          {s.icon}
          <span className="absolute left-14 z-10 scale-0 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg transition-all group-hover:scale-100">
            {s.name}
          </span>
        </button>
      ))}
      <div className="mt-auto w-full flex flex-col items-center gap-2">
        <button title="Create" className="size-10 grid place-items-center rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700">
          <Plus size={18} />
        </button>
        <button title="Settings" className="size-10 grid place-items-center rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700">
          <Settings size={18} />
        </button>
      </div>
    </aside>
  );
}
