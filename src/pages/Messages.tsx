import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../hooks/useAuth';

const mockMessages = [
    { id: 1, name: 'Alice Walker', role: 'Technical Recruiter @ Google', time: '10:42 AM', preview: 'Hi Nikul! Are you free for a quick chat today?', unread: true },
    { id: 2, name: 'David Chen', role: 'Engineering Manager @ Stripe', time: 'Yesterday', preview: 'We reviewed your portfolio and were really impressed.', unread: false },
    { id: 3, name: 'Sarah Jenkins', role: 'Talent Acquisition @ Meta', time: 'Mon', preview: 'Thanks for applying. We will get back to you shortly.', unread: false }
];

const Messages: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const { username, formattedName, handleLogout } = useAuth(setIsAuthenticated);
    const [activeChat, setActiveChat] = useState(mockMessages[0]);
    const [replyText, setReplyText] = useState('');

    return (
        <div className="dashboard-body">
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="dashboard-wrapper">
                <Sidebar handleLogout={handleLogout} />

                <main className="dashboard-content" style={{ display: 'flex', flexDirection: 'column' }}>
                    <DashboardHeader username={username} formattedName={formattedName} />

                    <div style={{ flex: 1, display: 'flex', gap: '2rem', marginTop: '1rem', minHeight: 0 }}>
                        {/* Inbox List */}
                        <div className="dash-card" style={{ width: '350px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Messages</h2>
                                <button className="btn-sm-icon" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '8px' }}>✏️</button>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <input type="text" placeholder="Search conversations..." style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', paddingRight: '0.5rem', flex: 1 }}>
                                {mockMessages.map(msg => (
                                    <div
                                        key={msg.id}
                                        onClick={() => setActiveChat(msg)}
                                        style={{
                                            padding: '1rem',
                                            background: activeChat.id === msg.id ? 'rgba(79, 70, 229, 0.2)' : 'rgba(0,0,0,0.2)',
                                            border: `1px solid ${activeChat.id === msg.id ? 'rgba(79, 70, 229, 0.5)' : 'rgba(255,255,255,0.05)'}`,
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            transition: '0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: msg.unread ? 'white' : 'var(--text-main)' }}>{msg.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#06b6d4', marginBottom: '0.2rem' }}>{msg.role}</div>
                                        <div style={{ fontSize: '0.85rem', color: msg.unread ? 'var(--text-main)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.preview}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Chat Area */}
                        <div className="dash-card" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                                <img src={`https://ui-avatars.com/api/?name=${activeChat.name}&background=4F46E5&color=fff`} style={{ width: '45px', height: '45px', borderRadius: '50%' }} alt="" />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{activeChat.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeChat.role}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                                    <button className="btn-sm-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>📞</button>
                                    <button className="btn-sm-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>⋮</button>
                                </div>
                            </div>

                            <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                                <div style={{ alignSelf: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 1rem', borderRadius: '20px' }}>
                                    Today
                                </div>
                                <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '15px', borderBottomLeftRadius: '0', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        {activeChat.preview}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', marginLeft: '0.5rem' }}>{activeChat.time}</div>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Type a thoughtful reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        style={{ width: '100%', padding: '1rem', paddingRight: '3rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                    />
                                </div>
                                <button className="btn-primary" style={{ padding: '0 2rem', borderRadius: '12px' }}>Send</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Messages;
