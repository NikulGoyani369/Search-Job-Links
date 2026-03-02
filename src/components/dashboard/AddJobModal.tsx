import React, { useState } from 'react';
import type { TrackedJob } from '../../types';
import { PIPELINE_STEPS } from '../../data/mockData';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAddJob: (title: string, company: string, status: TrackedJob['status'], url?: string) => void;
};

const AddJobModal: React.FC<Props> = ({ isOpen, onClose, onAddJob }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState<TrackedJob['status']>('Saved' as any); // using Saved if available, else first step
    const [url, setUrl] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddJob(title, company, status, url);
        setTitle('');
        setCompany('');
        setUrl('');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px',
                width: '100%', maxWidth: '450px', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem' }}>Add Manual Job</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Job Title*</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Developer" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Company*</label>
                        <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Tech Corp" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Initial Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value as TrackedJob['status'])} style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                            {PIPELINE_STEPS.map(step => (
                                <option key={step} value={step}>{step}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Job URL (optional)</label>
                        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Job</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
