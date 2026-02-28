import { useState, useEffect } from 'react';
import type { TrackedJob } from '../types';
import { showToast } from '../utils/toast';

export const useTrackedJobs = () => {
    const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('trackedJobs');
        if (saved) {
            setTrackedJobs(JSON.parse(saved));
        }
    }, []);

    const updateJobStatus = (id: string, newStatus: TrackedJob['status']) => {
        const updated = trackedJobs.map(j => j.id === id ? { ...j, status: newStatus } : j);
        setTrackedJobs(updated);
        localStorage.setItem('trackedJobs', JSON.stringify(updated));
        showToast(`Status updated to ${newStatus}`);
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

    return { trackedJobs, handleApply, updateJobStatus };
};
