import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataProtection: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="app-container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-main)', minHeight: '80vh' }}>
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <nav style={{ marginBottom: '2rem' }}>
                <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>&larr; Back to Home</Link>
            </nav>

            <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Data Protection (GDPR)</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="dash-card" style={{ padding: '2rem', lineHeight: '1.6' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-primary)' }}>1. General Information</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations (GDPR) and this privacy policy.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-primary)' }}>2. Data Collection on Our Website</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    When you use our application to track jobs and authenticate using Firebase, the following data may be stored: <br /><br />
                    • Email addresses for authentication purposes. <br />
                    • Job tracking data (titles, companies, URLs, and statuses) that you manually add or track via the Kanban board. <br /><br />
                    This data is stored securely in our cloud database and is strictly linked to your private user account.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-primary)' }}>3. Analytics & Cookies</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    We may use essential cookies to maintain user sessions (to keep you logged into the dashboard). These cookies do not track cross-site browsing behavior and are necessary for the functioning of the SaaS application.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-primary)' }}>4. Your Rights (GDPR / DSGVO)</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    Under the European General Data Protection Regulation, you have the right to request information about your stored data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or completely deleted. <br /><br />
                    If you wish to delete your account and all associated job tracking data, please contact the administrator or use the tools provided in your dashboard.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-primary)' }}>5. Infrastructure Provider</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    This platform uses Google Firebase for authentication and database services. Firebase adheres to modern security standards and encryption protocols. Your passwords are never stored in plaintext.
                </p>
            </div>
        </div>
    );
};

export default DataProtection;
