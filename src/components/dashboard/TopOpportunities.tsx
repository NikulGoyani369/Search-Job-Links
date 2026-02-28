import React from 'react';
import type { Opportunity, TrackedJob } from '../../types';

type Props = {
    opportunities: Opportunity[];
    trackedJobs: TrackedJob[];
    handleApply: (oppId: string, title: string, company: string, url: string) => void;
};

const TopOpportunities: React.FC<Props> = ({ opportunities, trackedJobs, handleApply }) => {
    return (
        <div className="dash-card opportunities-card">
            <div className="card-title">Top Opportunities <span style={{ cursor: 'pointer' }}>⋯</span></div>
            <div className="opp-list" style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {opportunities.map((opp) => {
                    const isApplied = trackedJobs.some(j => j.id === opp.id);
                    return (
                        <div className="opp-item" key={opp.id}>
                            <div className="opp-icon" style={{ background: opp.bg, color: opp.color }}>{opp.icon}</div>
                            <div className="opp-details">
                                <h4>{opp.title}</h4>
                                <p>{opp.company} • {opp.location}</p>
                                <span className="opp-salary">Salary: {opp.salary}</span>
                                <div className="opp-actions">
                                    <button className="btn-mini" onClick={() => window.open(opp.url, '_blank')}>View</button>
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
                {opportunities.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No opportunities match your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopOpportunities;
