import React, { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ChannelList from './components/ChannelList.jsx';
import MessagePane from './components/MessagePane.jsx';
import MemberList from './components/MemberList.jsx';

// Utility shades not in default Tailwind: extend via class names
const AppShell = ({ children }) => (
  <div className="h-screen w-screen overflow-hidden bg-[#0b0d12] text-gray-100">
    {children}
  </div>
);

export default function App() {
  const [activeServer, setActiveServer] = useState('alpha');
  const [activeChannel, setActiveChannel] = useState('general');
  const [channels, setChannels] = useState([
    { id: 'general', name: 'general', type: 'text' },
    { id: 'announcements', name: 'announcements', type: 'text' },
    { id: 'voice-1', name: 'Lounge', type: 'voice' },
  ]);

  const addChannel = () => {
    const name = prompt('New channel name');
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, '-');
    setChannels((prev) => [...prev, { id, name, type: 'text' }]);
    setActiveChannel(id);
  };

  const header = useMemo(() => {
    const c = channels.find(c => c.id === activeChannel);
    return c ? c.name : 'general';
  }, [channels, activeChannel]);

  return (
    <AppShell>
      <div className="flex h-full">
        <Sidebar activeServerId={activeServer} onSelectServer={setActiveServer} />
        <ChannelList
          channels={channels}
          activeChannelId={activeChannel}
          onSelectChannel={setActiveChannel}
          onAddChannel={addChannel}
        />
        <MessagePane channelName={header} />
        <MemberList onInvite={() => alert('Invite link copied!')} />
      </div>
    </AppShell>
  );
}
