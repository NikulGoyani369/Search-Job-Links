import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../hooks/useAuth';

const Settings: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const { username, formattedName, handleLogout } = useAuth(setIsAuthenticated);
    const [activeTab, setActiveTab] = useState('profile');

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

                    <div className="dash-card" style={{ flex: 1, marginTop: '1rem', padding: '2rem', display: 'flex', gap: '3rem' }}>

                        {/* Settings Tabs */}
                        <div style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '2rem' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '2rem' }}>Settings</h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {['Profile', 'Account', 'Theme', 'Notifications', 'Privacy'].map((tab) => {
                                    const path = tab.toLowerCase();
                                    return (
                                        <li key={path}>
                                            <button
                                                onClick={() => setActiveTab(path)}
                                                style={{
                                                    background: activeTab === path ? 'rgba(255,255,255,0.08)' : 'transparent',
                                                    border: 'none',
                                                    color: activeTab === path ? 'var(--text-main)' : 'var(--text-muted)',
                                                    padding: '0.8rem 1rem',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    transition: '0.2s',
                                                    fontWeight: 500,
                                                    fontSize: '0.95rem',
                                                    borderLeft: activeTab === path ? '3px solid #06b6d4' : '3px solid transparent'
                                                }}
                                            >
                                                {tab}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Settings Content Area */}
                        <div style={{ flex: 1, maxWidth: '600px' }}>
                            {activeTab === 'profile' && (
                                <div style={{ animation: 'revealUp 0.4s ease' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Profile Information</h3>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
                                        <img src={`https://ui-avatars.com/api/?name=${username}&background=02040a&color=fff&size=80`} style={{ borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} alt="Profile" />
                                        <button className="btn" style={{ padding: '0.5rem 1rem' }}>Upload New Photo</button>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label>Full Name</label>
                                            <input type="text" defaultValue={username} style={{ background: 'rgba(0,0,0,0.2)' }} />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label>Job Title / Headline</label>
                                            <input type="text" defaultValue="Software Engineer | Full Stack" style={{ background: 'rgba(0,0,0,0.2)' }} />
                                        </div>
                                        <div className="form-group" style={{ margin: 0 }}>
                                            <label>Email Address</label>
                                            <input type="email" defaultValue={`${username.replace(/\s/g, '').toLowerCase()}@example.com`} style={{ background: 'rgba(0,0,0,0.2)' }} />
                                        </div>
                                        <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Changes</button>
                                    </div>
                                </div>
                            )}

                            {activeTab !== 'profile' && (
                                <div style={{ animation: 'revealUp 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                                        <div>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings coming soon.</div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
