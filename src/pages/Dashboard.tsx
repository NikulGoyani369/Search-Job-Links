import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ExploreCareers from '../components/dashboard/ExploreCareers';
import TopOpportunities from '../components/dashboard/TopOpportunities';
import MyApplications from '../components/dashboard/MyApplications';
import NetworkingTools from '../components/dashboard/NetworkingTools';
import MiniCards from '../components/dashboard/MiniCards';
import type { TrackedJob, Opportunity } from '../types';
import { OPPORTUNITIES, LINKEDIN_CONNECTIONS } from '../data/mockData';

const Dashboard: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');
    const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [externalJobs, setExternalJobs] = useState<Opportunity[]>([]);
    const [isScraping, setIsScraping] = useState(false);

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

    const handleScrape = async () => {
        if (externalJobs.length > 0) {
            showToast("Already scraped recent opportunities!");
            return;
        }
        setIsScraping(true);
        showToast("Initializing AI Web Scraper...");
        try {
            const res = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=10');
            const data = await res.json();

            const scraped: Opportunity[] = data.jobs.slice(0, 10).map((job: any, index: number) => ({
                id: `scraped-${job.id}-${index}`,
                title: job.title,
                company: job.company_name,
                location: job.candidate_required_location || 'Remote',
                salary: job.salary || 'Market Rate',
                icon: '🌍',
                color: '#4ade80',
                bg: 'rgba(74,222,128,0.1)',
                url: job.url
            }));

            setExternalJobs(scraped);
            showToast(`Successfully scraped ${scraped.length} live jobs!`);
        } catch (err) {
            showToast("Failed to scrape opportunities.");
        } finally {
            setIsScraping(false);
        }
    };

    const formattedName = username.split(' ')[0] + " R.";

    const allOpportunities = [...OPPORTUNITIES, ...externalJobs];
    const filteredOpportunities = allOpportunities.filter(opp =>
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
                        <ExploreCareers searchTerm={searchTerm} setSearchTerm={setSearchTerm} isScraping={isScraping} handleScrape={handleScrape} />
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
