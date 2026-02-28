import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ExploreCareers from '../components/dashboard/ExploreCareers';
import TopOpportunities from '../components/dashboard/TopOpportunities';
import MyApplications from '../components/dashboard/MyApplications';
import NetworkingTools from '../components/dashboard/NetworkingTools';
import MiniCards from '../components/dashboard/MiniCards';
import { OPPORTUNITIES, LINKEDIN_CONNECTIONS } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { useTrackedJobs } from '../hooks/useTrackedJobs';
import { useExternalJobs } from '../hooks/useExternalJobs';

const Dashboard: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const { username, formattedName, handleLogout } = useAuth(setIsAuthenticated);
    const { trackedJobs, handleApply, updateJobStatus } = useTrackedJobs();
    const { externalJobs, isScraping, handleScrape } = useExternalJobs();
    const [searchTerm, setSearchTerm] = useState('');

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
