import { useState, useEffect } from 'react';
import type { TrackedJob } from '../types';
import { showToast } from '../utils/toast';
import { db, auth } from '../config/firebase';
import { collection, doc, setDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const useTrackedJobs = () => {
    const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!userId) {
            setTrackedJobs([]);
            return;
        }

        const jobsRef = collection(db, 'users', userId, 'trackedJobs');
        const q = query(jobsRef, orderBy('createdAt', 'desc'));

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
            const jobs: TrackedJob[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                jobs.push({
                    id: doc.id,
                    title: data.title,
                    company: data.company,
                    status: data.status,
                    dateStr: data.dateStr,
                });
            });
            setTrackedJobs(jobs);
        }, (error) => {
            console.error("Error fetching jobs: ", error);
        });

        return () => unsubscribeSnapshot();
    }, [userId]);

    const updateJobStatus = async (id: string, newStatus: TrackedJob['status']) => {
        if (!userId) return;

        // Optimistic UI update
        const updated = trackedJobs.map(j => j.id === id ? { ...j, status: newStatus } : j);
        setTrackedJobs(updated);

        try {
            const jobRef = doc(db, 'users', userId, 'trackedJobs', id);
            await updateDoc(jobRef, { status: newStatus });
            showToast(`Moved to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            showToast("Error updating job status");
        }
    };

    const handleApply = async (oppId: string, title: string, company: string, url: string) => {
        if (!userId) {
            showToast("Please log in to track jobs.");
            return;
        }

        window.open(url, '_blank');

        if (!trackedJobs.find(j => j.id === oppId)) {
            showToast("Application started & saved!");

            const newJob = {
                id: oppId,
                title,
                company,
                status: 'Applied' as const,
                dateStr: new Date().toLocaleDateString(),
                createdAt: new Date().toISOString()
            };

            // Optimistic Update
            setTrackedJobs([newJob, ...trackedJobs]);

            try {
                const jobRef = doc(db, 'users', userId, 'trackedJobs', oppId);
                await setDoc(jobRef, newJob);

                const pipelineCard = document.querySelector('.applications-card') as HTMLElement;
                if (pipelineCard) {
                    pipelineCard.style.boxShadow = "0 0 30px rgba(6, 182, 212, 0.3)";
                    pipelineCard.style.borderColor = "rgba(6, 182, 212, 0.5)";
                    setTimeout(() => {
                        if (pipelineCard) {
                            pipelineCard.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
                            pipelineCard.style.borderColor = "rgba(255, 255, 255, 0.08)";
                        }
                    }, 1000);
                }
            } catch (error) {
                console.error("Error saving new job:", error);
                showToast("Error saving application");
            }
        }
    };

    return { trackedJobs, handleApply, updateJobStatus };
};
