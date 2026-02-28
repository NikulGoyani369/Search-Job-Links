import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');
    const [appCount, setAppCount] = useState(2);
    const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

    useEffect(() => {
        const user = localStorage.getItem('jobUsername');
        if (!user) {
            navigate('/login');
        } else {
            setUsername(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jobUsername');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleApply = (id: number) => {
        if (!appliedJobs.includes(id)) {
            setAppliedJobs([...appliedJobs, id]);
            setAppCount(prev => prev + 1);
            showToast("Application submitted successfully!");
        }
    };

    const showToast = (message: string) => {
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)";
        toast.style.color = "white";
        toast.style.padding = "1rem 2rem";
        toast.style.borderRadius = "100px";
        toast.style.boxShadow = "0 10px 30px rgba(6, 182, 212, 0.4)";
        toast.style.zIndex = "9999";
        toast.style.fontWeight = "600";
        toast.style.animation = "revealUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            toast.style.transition = "all 0.5s ease";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    const formattedName = username.split(' ')[0] + " R.";

    return (
        <div className="dashboard-body">
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="dashboard-wrapper">
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

                <main className="dashboard-content">
                    <header className="dash-top">
                        <div>
                            <span className="sub-greeting">2026 Box Grid</span>
                            <h1 className="main-greeting">Welcome back, <span id="userGreeting">{username}</span></h1>
                        </div>
                        <div className="user-profile">
                            <button className="notification-btn">🔔<span className="dot"></span></button>
                            <div className="profile-info">
                                <img src={`https://ui-avatars.com/api/?name=${username}&background=1E293B&color=fff`} alt="User" id="userAvatar" />
                                <span id="userNameTop">{formattedName}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>▼</span>
                            </div>
                        </div>
                    </header>

                    <div className="bento-dashboard">
                        <div className="dash-card explore-card">
                            <div className="card-title">Explore Careers <span style={{ cursor: 'pointer' }}>⋮</span></div>
                            <div className="search-bar-mini">
                                <input type="text" placeholder="🔍 Search..." />
                                <select><option>Date</option></select>
                                <select><option>Role</option></select>
                                <select><option>Location</option></select>
                                <button className="btn-sm-icon">⏳</button>
                                <button className="btn-sm-icon">⚙️</button>
                            </div>
                            <div className="tag-list">
                                <span className="tag active">Careers</span>
                                <span className="tag">Filters</span>
                                <span className="tag">Events</span>
                                <span className="tag">Groups</span>
                            </div>
                        </div>

                        <div className="dash-card opportunities-card">
                            <div className="card-title">Top Opportunities <span style={{ cursor: 'pointer' }}>⋯</span></div>
                            <div className="opp-list">
                                <div className="opp-item">
                                    <div className="opp-icon" style={{ background: 'rgba(165,180,252,0.1)', color: '#a5b4fc' }}>UI</div>
                                    <div className="opp-details">
                                        <h4>Senior UI/UX Designer</h4>
                                        <p>Innovate Tech Studio</p>
                                        <span className="opp-salary">Salary: $120K</span>
                                        <div className="opp-actions">
                                            <button className="btn-mini">View</button>
                                            <button
                                                className="btn-mini cyan"
                                                onClick={() => handleApply(1)}
                                                disabled={appliedJobs.includes(1)}
                                                style={appliedJobs.includes(1) ? { background: "rgba(255, 255, 255, 0.1)", color: "#a5b4fc", pointerEvents: "none", border: "none" } : {}}
                                            >
                                                {appliedJobs.includes(1) ? "Applied ✓" : "Apply"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="opp-item">
                                    <div className="opp-icon" style={{ background: 'rgba(244,114,182,0.1)', color: '#f472b6' }}>PM</div>
                                    <div className="opp-details">
                                        <h4>Product Manager</h4>
                                        <p>Global Systems Inc.</p>
                                        <span className="opp-salary">Salary: $140K</span>
                                        <div className="opp-actions">
                                            <button className="btn-mini">View</button>
                                            <button
                                                className="btn-mini cyan"
                                                onClick={() => handleApply(2)}
                                                disabled={appliedJobs.includes(2)}
                                                style={appliedJobs.includes(2) ? { background: "rgba(255, 255, 255, 0.1)", color: "#a5b4fc", pointerEvents: "none", border: "none" } : {}}
                                            >
                                                {appliedJobs.includes(2) ? "Applied ✓" : "Apply"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="opp-item">
                                    <div className="opp-icon" style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4' }}>DS</div>
                                    <div className="opp-details">
                                        <h4>Data Scientist</h4>
                                        <p>AI Frontiers</p>
                                        <span className="opp-salary">Salary: $160K</span>
                                        <div className="opp-actions">
                                            <button className="btn-mini">View</button>
                                            <button
                                                className="btn-mini cyan"
                                                onClick={() => handleApply(3)}
                                                disabled={appliedJobs.includes(3)}
                                                style={appliedJobs.includes(3) ? { background: "rgba(255, 255, 255, 0.1)", color: "#a5b4fc", pointerEvents: "none", border: "none" } : {}}
                                            >
                                                {appliedJobs.includes(3) ? "Applied ✓" : "Apply"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dash-card applications-card">
                            <div className="card-title">My Applications
                                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-main)' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>⊞</span>
                                    <span id="appCounter" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>{appCount} ▼</span>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Pipeline</span>
                            <div className="pipeline">
                                <div className="pipe-step done">
                                    <div className="pipe-dot">✓</div>
                                    <span className="pipe-label">Applied</span>
                                </div>
                                <div className="pipe-step done">
                                    <div className="pipe-dot">✓</div>
                                    <span className="pipe-label">Screened</span>
                                </div>
                                <div className="pipe-step active">
                                    <div className="pipe-dot"></div>
                                    <span className="pipe-label">Interview</span>
                                </div>
                                <div className="pipe-step">
                                    <div className="pipe-dot">📁</div>
                                    <span className="pipe-label">Offer</span>
                                </div>
                                <div className="pipe-step">
                                    <div className="pipe-dot">🏢</div>
                                    <span className="pipe-label">Hired</span>
                                </div>
                            </div>
                        </div>

                        <div className="dash-card networking-card">
                            <div className="card-title">Networking Tools <span style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>›</span></div>
                            <div className="resource-list">
                                <div className="res-item" style={{ justifyContent: 'flex-start', gap: '1rem', padding: '1.2rem' }}>
                                    <div style={{ background: '#0077b5', padding: '0.3rem 0.4rem', borderRadius: '5px', fontWeight: 800 }}>in</div>
                                    <span style={{ fontWeight: 600 }}>LinkedIn</span>
                                </div>
                            </div>
                        </div>

                        <div className="dash-card mini-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
                            <span style={{ fontWeight: 600 }}>Bookmarked Roles</span>
                            <span style={{ color: 'var(--text-muted)' }}>🔖</span>
                        </div>
                        <div className="dash-card mini-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
                            <span style={{ fontWeight: 600 }}>Job Market Trends 2026</span>
                            <span style={{ color: 'var(--text-muted)' }}>📊</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
