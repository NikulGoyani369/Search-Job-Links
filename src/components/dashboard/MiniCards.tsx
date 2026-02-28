import React from 'react';

const MiniCards: React.FC = () => {
    return (
        <>
            <div className="dash-card mini-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
                <span style={{ fontWeight: 600 }}>Bookmarked Roles</span>
                <span style={{ color: 'var(--text-muted)' }}>🔖</span>
            </div>
            <div className="dash-card mini-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
                <span style={{ fontWeight: 600 }}>Job Market Trends 2026</span>
                <span style={{ color: 'var(--text-muted)' }}>📊</span>
            </div>
        </>
    );
};

export default MiniCards;
