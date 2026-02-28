import { useState } from 'react';
import type { Opportunity } from '../types';
import { showToast } from '../utils/toast';

export const useExternalJobs = () => {
    const [externalJobs, setExternalJobs] = useState<Opportunity[]>([]);
    const [isScraping, setIsScraping] = useState(false);

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

    return { externalJobs, isScraping, handleScrape };
};
