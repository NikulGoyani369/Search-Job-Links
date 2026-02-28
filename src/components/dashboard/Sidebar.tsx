import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <span className="logo-icon">💠</span> JobLink
            </div>
            <nav className="side-nav">
                <a href="#" className="nav-item active">
                    <i>⊞</i> Dashboard
                </a>
                <Link to="/" className="nav-item">
                    <i>🔍</i> Search
                </Link>
                <a href="#" className="nav-item">
                    <i>🔗</i> Networking
                </a>
                <a href="#" className="nav-item">
                    <i>✉️</i> Messages
                </a>
                <a href="#" className="nav-item">
                    <i>⚙️</i> Settings
                </a>
            </nav>
            <div className="sidebar-bottom">
                <button onClick={handleLogout} className="nav-item text-danger" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                    <i>🚪</i> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
