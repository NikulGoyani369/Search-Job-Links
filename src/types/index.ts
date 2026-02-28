export type TrackedJob = {
    id: string;
    title: string;
    company: string;
    status: 'Applied' | 'Screened' | 'Interview' | 'Offer' | 'Hired';
    dateStr: string;
};

export type Opportunity = {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    icon: string;
    color: string;
    bg: string;
    url: string;
};

export type LinkedInConnection = {
    name: string;
    role: string;
    url: string;
};
