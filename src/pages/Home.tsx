import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?geoId=101282230', icon: '💼', tags: 'linkedin network social business connections corporate global general' },
    { name: 'StepStone', url: 'https://www.stepstone.de/en', icon: '📈', tags: 'stepstone general corporate large companies' },
    { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job/germany-jobs-SRCH_IL.0,7_IN96.htm', icon: '🚪', tags: 'glassdoor reviews transparent corporate general' },
    { name: 'XING', url: 'https://www.xing.de', icon: '🤝', tags: 'xing network social business connections recruiters' },
    { name: 'Arbeitsagentur', url: 'https://www.arbeitsagentur.de/jobsuche', icon: '🏛️', tags: 'arbeitsagentur agentur arbeit federal official general everything' },
    { name: 'Honeypot', url: 'https://www.honeypot.io', icon: '🍯', tags: 'honeypot tech developer software it reverse apply frontend backend devops' },
    { name: 'Instaffo', url: 'https://instaffo.com', icon: '⚡', tags: 'instaffo tech developer software it reverse apply frontend backend' },
    { name: 'Indeed', url: 'https://de.indeed.com/jobs-in-Germany', icon: '🔍', tags: 'indeed general global everything entry level' },
    { name: 'Aerztestellen', url: 'https://www.aerztestellen.de', icon: '⚕️', tags: 'medical doctor aerzte healthcare' },
    { name: 'Absolventa', url: 'https://www.absolventa.de', icon: '🎓', tags: 'students graduates absolventa junior' },
    { name: 'AngularJS', url: 'https://www.angularjs.de', icon: '🅰️', tags: 'angular js javascript frontend web' },
    { name: 'Badische Zeitung', url: 'https://www.badische-zeitung.de', icon: '📰', tags: 'badische zeitung news newspaper jobs local' },
    { name: 'Berliner Morgenpost', url: 'https://www.morgenpost.de', icon: '🗞️', tags: 'berliner morgenpost berlin local' },
    { name: 'Bvbc', url: 'https://www.bvbc.de', icon: '📊', tags: 'bvbc accounting finance controlling' },
    { name: 'Careerbuilder', url: 'https://www.careerbuilder.de', icon: '🏗️', tags: 'careerbuilder jobscout general all' },
    { name: 'Careerjobs', url: 'https://www.careerjobs.de', icon: '🎯', tags: 'careerjobs general professionals' },
    { name: 'Chemie', url: 'https://www.chemie.de', icon: '🧪', tags: 'chemie chemistry science' },
    { name: 'Deutsches Ärzteblatt', url: 'https://www.aerzteblatt.de', icon: '🩺', tags: 'medical doctors aerzteblatt healthcare' },
    { name: 'DV-Treff', url: 'https://www.dv-treff.de', icon: '💻', tags: 'dv treff it informatics tech' },
    { name: 'Fachärztejobs', url: 'https://www.fachaerztejobs.de', icon: '🏥', tags: 'specialists doctors fachaerzte medical' },
    { name: 'Göttinger Tageblatt', url: 'https://www.gottinger-tageblatt.de', icon: '📰', tags: 'goettinger tageblatt local news' },
    { name: 'Heisejobs', url: 'https://www.heisejobs.de', icon: '🖥️', tags: 'heise heisejobs it tech developer software' },
    { name: 'ICTJob', url: 'https://www.ictjob.de', icon: '📡', tags: 'ictjob ict tech networks support' },
    { name: 'ITJobBoard', url: 'https://www.itjobboard.de', icon: '📋', tags: 'itjobboard it tech developers' },
    { name: 'ITSteps', url: 'https://www.itsteps.de', icon: '👣', tags: 'itsteps it tech' },
    { name: 'IT-Treff', url: 'https://www.it-treff.de', icon: '🤝', tags: 'ittreff it tech networking' },
    { name: 'Jobcenter Medizin', url: 'https://www.jobcenter-medizin.de', icon: '🚑', tags: 'jobcenter medizin medical healthcare clinics' },
    { name: 'Jobmedicus', url: 'https://www.jobmedicus.de', icon: '⚕️', tags: 'jobmedicus medical healthcare' },
    { name: 'Jobs.de', url: 'https://www.jobs.de', icon: '💼', tags: 'jobs general all' },
    { name: 'Jobscout24', url: 'https://www.jobscout24.de', icon: '🔍', tags: 'jobscout24 general all search' },
    { name: 'Jobs.Heise', url: 'https://jobs.heise.de/', icon: '💻', tags: 'heise it tech developer software engineering' },
    { name: 'Jobs Nordbayern', url: 'https://www.jobs.nordbayern.de', icon: '🥨', tags: 'nordbayern bavaria local regional' },
    { name: 'Jobvector', url: 'https://www.jobvector.de', icon: '🧬', tags: 'jobvector science tech engineering' },
    { name: 'Jobware', url: 'https://www.jobware.de', icon: '👔', tags: 'jobware professionals management general' },
    { name: 'Kalaydo', url: 'https://www.kalaydo.de', icon: '🛍️', tags: 'kalaydo local classifieds general' },
    { name: 'Kieler Nachrichten', url: 'https://www.kn-jobs.de', icon: '⚓', tags: 'kieler nachrichten kiel local north' },
    { name: 'Kimeta', url: 'https://www.kimeta.de', icon: '🎯', tags: 'kimeta search engine general' },
    { name: 'Kliniken', url: 'https://www.kliniken.de', icon: '🏥', tags: 'kliniken clinics medical healthcare hospitals' },
    { name: 'Medi-jobs', url: 'https://www.medi-jobs.de', icon: '💊', tags: 'medijobs medical healthcare nursing' },
    { name: 'Meinestadt', url: 'https://www.meinestadt.de', icon: '🏙️', tags: 'meinestadt local cities general' },
    { name: 'Monster', url: 'https://www.monster.de', icon: '👾', tags: 'monster global general' },
    { name: 'MTA Portal', url: 'https://www.mta-portal.de', icon: '🔬', tags: 'mta portal medical technical healthcare laboratory' },
    { name: 'Newjob', url: 'https://www.newjob.de', icon: '⭐', tags: 'newjob general' },
    { name: 'Personalwirtschaft', url: 'https://stellen.personalwirtschaft.de/', icon: '📋', tags: 'personalwirtschaft hr human resources' },
    { name: 'Piening', url: 'https://www.piening-personal.de/de/jobboerse/', icon: '👷', tags: 'piening personal temp agency Zeitarbeit' },
    { name: 'Regio-Jobanzeiger', url: 'https://www.regio-jobanzeiger.de', icon: '📍', tags: 'regio jobanzeiger local regional' },
    { name: 'Rhein-Neckar-Z.', url: 'https://www.rnz.de', icon: '📰', tags: 'rhein neckar zeitung local heidelberg' },
    { name: 'Rosenheimjobs', url: 'https://www.rosenheimjobs.de', icon: '🏔️', tags: 'rosenheim local bavaria' },
    { name: 'Ruhr24Jobs', url: 'https://www.ruhr24jobs.de/', icon: '🏭', tags: 'ruhr24 ruhrgebiet local dortmund' },
    { name: 'Stellenanzeigen', url: 'https://www.stellenanzeigen.de', icon: '📄', tags: 'stellenanzeigen general' },
    { name: 'Süddeutsche.de', url: 'https://www.sueddeutsche.de', icon: '📰', tags: 'sueddeutsche munich national news' },
    { name: 'T3n', url: 'https://www.t3n.de', icon: '📱', tags: 't3n digital tech startup' },
    { name: 'Talent.com', url: 'https://de.talent.com/de/', icon: '💡', tags: 'talent global general aggregator' },
    { name: 'T5-Karriere', url: 'https://www.t5-karriereportal.de', icon: '🎯', tags: 't5 karriereportal healthcare technical' },
    { name: 'Vistex Talentify', url: 'https://vistex.talentify.io/', icon: '💠', tags: 'vistex talentify tech corporate' },
    { name: 'Wuv', url: 'https://www.wuv.de', icon: '📺', tags: 'wuv marketing advertising media' },
    { name: 'Yourfirm', url: 'https://www.yourfirm.de', icon: '🏢', tags: 'yourfirm mid sized hidden champions' },
];

const Home: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    const [filter, setFilter] = useState('');
    const [customLinks, setCustomLinks] = useState<{ name: string; url: string; tags: string; icon?: string }[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            const stored = JSON.parse(localStorage.getItem('customJobLinks') || '[]');
            setCustomLinks(stored);
        }
    }, [isAuthenticated]);

    const allLinks = isAuthenticated ? [...customLinks, ...defaultLinks] : defaultLinks;

    const filteredLinks = allLinks.filter(link => {
        const term = filter.toLowerCase();
        return link.name.toLowerCase().includes(term) || (link.tags || '').toLowerCase().includes(term);
    });

    const visibleLinks = isAuthenticated ? filteredLinks : filteredLinks.slice(0, 6);

    return (
        <div className="app-container">
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <nav className="nav-bar">
                {isAuthenticated ? (
                    <Link to="/dashboard" id="authBtn" className="btn btn-primary">My Dashboard</Link>
                ) : (
                    <Link to="/login" id="authBtn" className="btn">Login</Link>
                )}
            </nav>

            <header className="header">
                <h1>Job Portals <span>Germany</span></h1>
                <p>Your curated gateway to career opportunities</p>
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder={isAuthenticated ? "Search roles, platforms, or tags..." : "Login to unlock search..."}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        disabled={!isAuthenticated}
                        style={{ opacity: isAuthenticated ? 1 : 0.5, cursor: isAuthenticated ? 'text' : 'not-allowed' }}
                    />
                </div>
            </header>

            <main className="main-content">
                <div className="links-grid" id="linksList">
                    {visibleLinks.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="job-link">
                            <div className="link-icon">{link.icon || '⭐'}</div><span>{link.name}</span>
                        </a>
                    ))}

                    {!isAuthenticated && (
                        <div className="login-wall">
                            <h2>Unlock Full Access</h2>
                            <p>Login to view 50+ curated job portals, add your own custom links, and unlock full search capabilities.</p>
                            <Link to="/login" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Create Free Account</Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;
