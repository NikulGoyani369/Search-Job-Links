import type { Opportunity, LinkedInConnection, TrackedJob } from '../types';

export const OPPORTUNITIES: Opportunity[] = [
    { id: 'opp-1', title: 'Senior UI/UX Designer', company: 'Innovate Tech Studio', location: 'Remote', salary: '$120K', icon: 'UI', color: '#a5b4fc', bg: 'rgba(165,180,252,0.1)', url: 'https://www.linkedin.com/jobs/search/?keywords=UI' },
    { id: 'opp-2', title: 'Product Manager', company: 'Global Systems Inc.', location: 'Berlin', salary: '$140K', icon: 'PM', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', url: 'https://www.stepstone.de/en/jobs/Product-Manager' },
    { id: 'opp-3', title: 'Data Scientist', company: 'AI Frontiers', location: 'Munich', salary: '$160K', icon: 'DS', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', url: 'https://de.indeed.com/jobs?q=Data+Scientist' },
    { id: 'opp-4', title: 'Frontend Engineer', company: 'WebSolutions', location: 'Remote', salary: '$110K', icon: 'FE', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', url: 'https://www.honeypot.io' },
    { id: 'opp-5', title: 'DevOps Specialist', company: 'CloudCore Inc', location: 'Hamburg', salary: '$135K', icon: 'DO', color: '#facc15', bg: 'rgba(250,204,21,0.1)', url: 'https://instaffo.com' },
];

export const LINKEDIN_CONNECTIONS: LinkedInConnection[] = [
    { name: 'Sarah Miller', role: 'Tech Recruiter @ AI Frontiers', url: 'https://linkedin.com/search/results/people/?keywords=tech+recruiter' },
    { name: 'David Chen', role: 'Engineering Manager @ Innovate Tech', url: 'https://linkedin.com/search/results/people/?keywords=engineering+manager' },
    { name: 'Elena Rostova', role: 'Head of Data @ Global Systems', url: 'https://linkedin.com/search/results/people/?keywords=head+of+data' },
];

export const PIPELINE_STEPS: TrackedJob['status'][] = ['Applied', 'Screened', 'Interview', 'Offer', 'Hired'];
