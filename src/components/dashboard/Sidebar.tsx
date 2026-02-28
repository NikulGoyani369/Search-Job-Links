import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <span className="logo-icon">💠</span> JobLink
            </div>
            <nav className="side-nav">
                <NavLink to="/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i>⊞</i> Dashboard
                </NavLink>
                <Link to="/" className="nav-item">
                    <i>🔍</i> Search
                </Link>
                <NavLink to="/networking" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i>🔗</i> Networking
                </NavLink>
                <NavLink to="/messages" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i>✉️</i> Messages
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i>⚙️</i> Settings
                </NavLink>
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
