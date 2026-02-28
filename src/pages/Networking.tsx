import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../hooks/useAuth';

const Networking: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const { username, formattedName, handleLogout } = useAuth(setIsAuthenticated);

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

                    <div className="dash-card" style={{ flex: 1, marginTop: '1rem', padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Networking Hub</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', fontSize: '1.1rem' }}>Connect with peers, alumni, and tech recruiters through our AI-guided networking portal.</p>

                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginTop: '2rem', display: 'inline-block' }}>
                            <span style={{ fontSize: '3rem' }}>🚀</span>
                            <div style={{ marginTop: '1rem', color: '#06b6d4' }}>Coming Soon in v2.0</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Networking;
