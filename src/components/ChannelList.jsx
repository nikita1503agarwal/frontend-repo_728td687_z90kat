import React from 'react';
import { Hash, Volume2, Plus } from 'lucide-react';

const defaultChannels = [
  { id: 'general', name: 'general', type: 'text' },
  { id: 'announcements', name: 'announcements', type: 'text' },
  { id: 'voice-1', name: 'Lounge', type: 'voice' },
];

export default function ChannelList({ channels = defaultChannels, activeChannelId = 'general', onSelectChannel, onAddChannel }) {
  return (
    <div className="h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="px-3 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Flames Server</h2>
          <button onClick={onAddChannel} className="p-1 rounded hover:bg-gray-800 text-gray-300">
            <Plus size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-400">Manage channels</p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <Section title="Text Channels">
          {channels.filter(c => c.type==='text').map((c) => (
            <ChannelItem key={c.id} active={c.id===activeChannelId} onClick={() => onSelectChannel?.(c.id)} icon={<Hash size={16} />} name={`# ${c.name}`} />
          ))}
        </Section>
        <Section title="Voice Channels">
          {channels.filter(c => c.type==='voice').map((c) => (
            <ChannelItem key={c.id} active={c.id===activeChannelId} onClick={() => onSelectChannel?.(c.id)} icon={<Volume2 size={16} />} name={c.name} />
          ))}
        </Section>
      </div>

      <div className="p-3 border-t border-gray-800 text-xs text-gray-400">Tip: Click a channel to manage messages.</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="px-2">
      <div className="flex items-center justify-between px-2 text-[11px] uppercase tracking-wide text-gray-400 mb-1 mt-3">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ChannelItem({ icon, name, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${active ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'}`}>
      <span className="text-gray-400">{icon}</span>
      <span className="truncate">{name}</span>
    </button>
  );
}
