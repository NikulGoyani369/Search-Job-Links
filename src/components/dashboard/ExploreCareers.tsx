import React from 'react';

type Props = {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
};

const ExploreCareers: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
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
            <div className="tag-list">
                <span className="tag active">Careers</span>
                <span className="tag">Filters</span>
                <span className="tag">Events</span>
                <span className="tag">Groups</span>
            </div>
        </div>
    );
};

export default ExploreCareers;
