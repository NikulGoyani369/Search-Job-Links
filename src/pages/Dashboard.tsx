import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ExploreCareers from '../components/dashboard/ExploreCareers';
import TopOpportunities from '../components/dashboard/TopOpportunities';
import MyApplications from '../components/dashboard/MyApplications';
import NetworkingTools from '../components/dashboard/NetworkingTools';
import MiniCards from '../components/dashboard/MiniCards';
import type { TrackedJob } from '../types';
import { OPPORTUNITIES, LINKEDIN_CONNECTIONS } from '../data/mockData';

const Dashboard: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');
    const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('jobUsername');
        if (!user) {
            navigate('/login');
        } else {
            setUsername(user);
        }

        const saved = localStorage.getItem('trackedJobs');
        if (saved) {
            setTrackedJobs(JSON.parse(saved));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jobUsername');
        setIsAuthenticated(false);
        navigate('/');
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

    const updateJobStatus = (id: string, newStatus: TrackedJob['status']) => {
        const updated = trackedJobs.map(j => j.id === id ? { ...j, status: newStatus } : j);
        setTrackedJobs(updated);
        localStorage.setItem('trackedJobs', JSON.stringify(updated));
        showToast(`Status updated to ${newStatus}`);
    };

    const showToast = (message: string) => {
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)";
        toast.style.color = "white";
        toast.style.padding = "1rem 2rem";
        toast.style.borderRadius = "100px";
        toast.style.boxShadow = "0 10px 30px rgba(6, 182, 212, 0.4)";
        toast.style.zIndex = "9999";
        toast.style.fontWeight = "600";
        toast.style.animation = "revealUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            toast.style.transition = "all 0.5s ease";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    const formattedName = username.split(' ')[0] + " R.";

    const filteredOpportunities = OPPORTUNITIES.filter(opp =>
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-body">
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="dashboard-wrapper">
                <Sidebar handleLogout={handleLogout} />

                <main className="dashboard-content">
                    <DashboardHeader username={username} formattedName={formattedName} />

                    <div className="bento-dashboard">
                        <ExploreCareers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <TopOpportunities opportunities={filteredOpportunities} trackedJobs={trackedJobs} handleApply={handleApply} />
                        <MyApplications trackedJobs={trackedJobs} updateJobStatus={updateJobStatus} />
                        <NetworkingTools connections={LINKEDIN_CONNECTIONS} />
                        <MiniCards />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
