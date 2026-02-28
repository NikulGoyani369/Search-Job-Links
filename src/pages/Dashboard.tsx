import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type TrackedJob = {
    id: string;
    title: string;
    company: string;
    status: 'Applied' | 'Screened' | 'Interview' | 'Offer' | 'Hired';
    dateStr: string;
};

const OPPORTUNITIES = [
    { id: 'opp-1', title: 'Senior UI/UX Designer', company: 'Innovate Tech Studio', salary: '$120K', icon: 'UI', color: '#a5b4fc', bg: 'rgba(165,180,252,0.1)', url: 'https://www.linkedin.com/jobs/search/?keywords=UI' },
    { id: 'opp-2', title: 'Product Manager', company: 'Global Systems Inc.', salary: '$140K', icon: 'PM', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', url: 'https://www.stepstone.de/en/jobs/Product-Manager' },
    { id: 'opp-3', title: 'Data Scientist', company: 'AI Frontiers', salary: '$160K', icon: 'DS', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', url: 'https://de.indeed.com/jobs?q=Data+Scientist' }
];

const PIPELINE_STEPS: TrackedJob['status'][] = ['Applied', 'Screened', 'Interview', 'Offer', 'Hired'];

const Dashboard: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');
    const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);

    useEffect(() => {
        const user = localStorage.getItem('jobUsername');
        if (!user) {
            navigate('/login');
        } else {
            setUsername(user);
        }

        const saved = localStorage.getItem('trackedJobs');
        if (saved) {
            setTrackedJobs(JSON.parse(saved));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jobUsername');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleApply = (oppId: string, title: string, company: string, url: string) => {
        if (!trackedJobs.find(j => j.id === oppId)) {
            showToast("Application started!");

            window.open(url, '_blank');

            const newJob: TrackedJob = {
                id: oppId,
                title,
                company,
                status: 'Applied',
                dateStr: new Date().toLocaleDateString()
            };

            const updated = [newJob, ...trackedJobs];
            setTrackedJobs(updated);
            localStorage.setItem('trackedJobs', JSON.stringify(updated));

            const pipelineCard = document.querySelector('.applications-card') as HTMLElement;
            if (pipelineCard) {
                pipelineCard.style.boxShadow = "0 0 30px rgba(6, 182, 212, 0.3)";
                pipelineCard.style.borderColor = "rgba(6, 182, 212, 0.5)";
                setTimeout(() => {
                    pipelineCard.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
                    pipelineCard.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }, 1000);
            }
        }
    };

    const updateJobStatus = (id: string, newStatus: TrackedJob['status']) => {
        const updated = trackedJobs.map(j => j.id === id ? { ...j, status: newStatus } : j);
        setTrackedJobs(updated);
        localStorage.setItem('trackedJobs', JSON.stringify(updated));
        showToast(`Status updated to ${newStatus}`);
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
                            <span className="sub-greeting">Command Center Dashboard</span>
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
                                {OPPORTUNITIES.map((opp) => {
                                    const isApplied = trackedJobs.some(j => j.id === opp.id);
                                    return (
                                        <div className="opp-item" key={opp.id}>
                                            <div className="opp-icon" style={{ background: opp.bg, color: opp.color }}>{opp.icon}</div>
                                            <div className="opp-details">
                                                <h4>{opp.title}</h4>
                                                <p>{opp.company}</p>
                                                <span className="opp-salary">Salary: {opp.salary}</span>
                                                <div className="opp-actions">
                                                    <button className="btn-mini">View</button>
                                                    <button
                                                        className="btn-mini cyan"
                                                        onClick={() => handleApply(opp.id, opp.title, opp.company, opp.url)}
                                                        disabled={isApplied}
                                                        style={isApplied ? { background: "rgba(255, 255, 255, 0.1)", color: "#a5b4fc", pointerEvents: "none", border: "none" } : {}}
                                                    >
                                                        {isApplied ? "Applied ✓" : "Apply"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="dash-card applications-card">
                            <div className="card-title">My Applications
                                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-main)' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>⊞</span>
                                    <span id="appCounter" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>{trackedJobs.length} ▼</span>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>Active Pipeline Tracker</span>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem', maxHeight: '350px' }}>
                                {trackedJobs.length === 0 ? (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                        You haven't started any applications yet. Browse the opportunities to get started!
                                    </div>
                                ) : (
                                    trackedJobs.map(job => (
                                        <div key={job.id} style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{job.title}</h4>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.company} • {job.dateStr}</span>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                                                    {job.status}
                                                </span>
                                            </div>
                                            <div className="pipeline" style={{ marginTop: '0.5rem', padding: '0 0.5rem', '&::before': { display: 'none' } } as any}>
                                                {/* Dynamic Pipeline dots for this specific job */}
                                                <div style={{ position: 'absolute', top: '15px', left: '20px', right: '20px', height: '2px', background: 'rgba(255, 255, 255, 0.1)', zIndex: 1, pointerEvents: 'none' }}></div>
                                                {PIPELINE_STEPS.map((step, idx) => {
                                                    const currentIdx = PIPELINE_STEPS.indexOf(job.status);
                                                    const isDone = idx < currentIdx;
                                                    const isActive = idx === currentIdx;
                                                    return (
                                                        <div
                                                            key={step}
                                                            className={`pipe-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                                                            style={{ gap: '0.4rem', cursor: 'pointer' }}
                                                            onClick={() => updateJobStatus(job.id, step)}
                                                            title={`Mark as ${step}`}
                                                        >
                                                            <div className="pipe-dot" style={{ width: '28px', height: '28px', fontSize: '0.65rem', transition: '0.2s' }}>
                                                                {isDone ? '✓' : (step === 'Offer' ? '📁' : (step === 'Hired' ? '🏢' : ''))}
                                                            </div>
                                                            <span className="pipe-label" style={{ fontSize: '0.7rem' }}>{step}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))
                                )}
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
