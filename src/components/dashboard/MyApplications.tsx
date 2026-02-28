import React from 'react';
import type { TrackedJob } from '../../types';
import { PIPELINE_STEPS } from '../../data/mockData';

type Props = {
    trackedJobs: TrackedJob[];
    updateJobStatus: (id: string, newStatus: TrackedJob['status']) => void;
};

const MyApplications: React.FC<Props> = ({ trackedJobs, updateJobStatus }) => {
    return (
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
    );
};

export default MyApplications;
