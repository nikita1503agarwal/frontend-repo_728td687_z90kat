import React from 'react';
import { UserPlus, Crown } from 'lucide-react';

const demoMembers = [
  { id: '1', name: 'Flames Admin', role: 'Admin', color: 'text-amber-400', icon: <Crown size={14} className="text-amber-400" /> },
  { id: '2', name: 'Blue Bot', role: 'Bot', color: 'text-sky-400' },
  { id: '3', name: 'Mika', role: 'Moderator', color: 'text-emerald-400' },
  { id: '4', name: 'Rae', role: 'Member', color: 'text-gray-300' },
];

export default function MemberList({ members = demoMembers, onInvite }) {
  return (
    <aside className="h-screen w-64 bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="px-3 py-3 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Members</h3>
        <button onClick={onInvite} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500">
          <UserPlus size={14} /> Invite
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {members.map(m => (
          <div key={m.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800">
            <div className="size-7 rounded-full bg-gray-700 grid place-items-center text-xs font-medium">{m.name.slice(0,1)}</div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-sm text-white truncate">
                {m.icon} <span className="truncate">{m.name}</span>
              </div>
              <div className={`text-xs ${m.color}`}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
