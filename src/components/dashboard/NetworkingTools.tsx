import React from 'react';
import type { LinkedInConnection } from '../../types';

type Props = {
    connections: LinkedInConnection[];
};

const NetworkingTools: React.FC<Props> = ({ connections }) => {
    return (
        <div className="dash-card networking-card">
            <div className="card-title">Networking Tools <span style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>›</span></div>
            <div className="resource-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {connections.map((conn, idx) => (
                    <a href={conn.url} target="_blank" rel="noreferrer" key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="res-item" style={{ justifyContent: 'flex-start', gap: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', transition: '0.2s', cursor: 'pointer' }}>
                            <div style={{ background: '#0077b5', padding: '0.4rem 0.5rem', borderRadius: '5px', fontWeight: 800, fontSize: '0.8rem' }}>in</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{conn.name}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{conn.role}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default NetworkingTools;
