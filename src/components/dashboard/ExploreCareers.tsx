import React from 'react';

type Props = {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    isScraping: boolean;
    handleScrape: () => void;
};

const ExploreCareers: React.FC<Props> = ({ searchTerm, setSearchTerm, isScraping, handleScrape }) => {
    return (
        <div className="dash-card explore-card">
            <div className="card-title">Explore Careers <span style={{ cursor: 'pointer' }}>⋮</span></div>
            <div className="search-bar-mini">
                <input
                    type="text"
                    placeholder="🔍 Search roles, companies, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1 }}
                />
                <select><option>Date</option></select>
                <select><option>Role</option></select>
                <select><option>Location</option></select>
                <button className="btn-sm-icon">⚙️</button>
            </div>
            <div className="tag-list" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="tag active">Careers</span>
                    <span className="tag">Filters</span>
                    <span className="tag">Events</span>
                    <span className="tag">Groups</span>
                </div>
                <button
                    onClick={handleScrape}
                    disabled={isScraping}
                    className="btn-mini cyan"
                    style={{ background: 'rgba(6, 182, 212, 0.2)', border: '1px solid #06b6d4', color: '#06b6d4', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: isScraping ? 'not-allowed' : 'pointer' }}
                >
                    {isScraping ? '🤖 Scraping jobs...' : '🕷️ Run Web Scraper'}
                </button>
            </div>
        </div>
    );
};

export default ExploreCareers;
