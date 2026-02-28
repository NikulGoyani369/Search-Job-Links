import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?geoId=101282230', icon: '💼', tags: 'linkedin network social business connections corporate global general' },
    { name: 'StepStone', url: 'https://www.stepstone.de/en', icon: '📈', tags: 'stepstone general corporate large companies' },
    { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job/germany-jobs-SRCH_IL.0,7_IN96.htm', icon: '🚪', tags: 'glassdoor reviews transparent corporate general' },
    { name: 'XING', url: 'https://www.xing.de', icon: '🤝', tags: 'xing network social business connections recruiters' },
    { name: 'Arbeitsagentur', url: 'https://www.arbeitsagentur.de/jobsuche', icon: '🏛️', tags: 'arbeitsagentur agentur arbeit federal official general everything' },
    { name: 'Honeypot', url: 'https://www.honeypot.io', icon: '🍯', tags: 'honeypot tech developer software it reverse apply frontend backend devops' },
    { name: 'Instaffo', url: 'https://instaffo.com', icon: '⚡', tags: 'instaffo tech developer software it reverse apply frontend backend' },
    { name: 'Indeed', url: 'https://de.indeed.com/jobs-in-Germany', icon: '🔍', tags: 'indeed general global everything entry level' },
];

const Home: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    const [filter, setFilter] = useState('');
    const [customLinks, setCustomLinks] = useState<{ name: string; url: string; tags: string; icon?: string }[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            const stored = JSON.parse(localStorage.getItem('customJobLinks') || '[]');
            setCustomLinks(stored);
        }
    }, [isAuthenticated]);

    const allLinks = isAuthenticated ? [...customLinks, ...defaultLinks] : defaultLinks;

    const filteredLinks = allLinks.filter(link => {
        const term = filter.toLowerCase();
        return link.name.toLowerCase().includes(term) || (link.tags || '').toLowerCase().includes(term);
    });

    const visibleLinks = isAuthenticated ? filteredLinks : filteredLinks.slice(0, 6);

    return (
        <div className="app-container">
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <nav className="nav-bar">
                {isAuthenticated ? (
                    <Link to="/dashboard" id="authBtn" className="btn btn-primary">My Dashboard</Link>
                ) : (
                    <Link to="/login" id="authBtn" className="btn">Login</Link>
                )}
            </nav>

            <header className="header">
                <h1>Job Portals <span>Germany</span></h1>
                <p>Your curated gateway to career opportunities</p>
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder={isAuthenticated ? "Search roles, platforms, or tags..." : "Login to unlock search..."}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        disabled={!isAuthenticated}
                        style={{ opacity: isAuthenticated ? 1 : 0.5, cursor: isAuthenticated ? 'text' : 'not-allowed' }}
                    />
                </div>
            </header>

            <main className="main-content">
                <div className="links-grid" id="linksList">
                    {visibleLinks.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="job-link">
                            <div className="link-icon">{link.icon || '⭐'}</div><span>{link.name}</span>
                        </a>
                    ))}

                    {!isAuthenticated && (
                        <div className="login-wall">
                            <h2>Unlock Full Access</h2>
                            <p>Login to view 50+ curated job portals, add your own custom links, and unlock full search capabilities.</p>
                            <Link to="/login" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Create Free Account</Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;
