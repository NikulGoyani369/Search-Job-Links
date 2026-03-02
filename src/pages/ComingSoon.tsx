import React, { useState } from 'react';

const ComingSoon: React.FC = () => {
    const [email, setEmail] = useState('');
    const [checked, setChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !checked) return;
        // In a real app, send this email to a database
        setSubmitted(true);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            color: '#333',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '4rem',
                alignItems: 'center'
            }}>
                {/* Left Side: Content */}
                <div style={{ maxWidth: '600px' }}>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: 800,
                        color: '#28216E',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-1px'
                    }}>
                        Stay on Top,<br />
                        <span style={{ color: '#884390' }}>Get the Job</span> You Want.
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#6b7280',
                        marginBottom: '2.5rem',
                        fontWeight: 400
                    }}>
                        Track & manage your job applications with EASE.
                    </p>

                    {submitted ? (
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            color: '#047857',
                            fontWeight: 600
                        }}>
                            🎉 Thanks for joining! We'll email you when early access opens.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1.2rem',
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        flex: 1,
                                        minWidth: '250px',
                                        padding: '1rem 1.2rem',
                                        fontSize: '1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="cs-btn"
                                    style={{
                                        padding: '1rem 2rem',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#ffffff',
                                        background: 'linear-gradient(135deg, #28216E 0%, #884390 100%)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        boxShadow: '0 4px 15px rgba(136, 67, 144, 0.3)'
                                    }}
                                >
                                    Get Early Access
                                </button>
                            </div>

                            <label style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.8rem',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                color: '#6b7280',
                                lineHeight: 1.5
                            }}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => setChecked(e.target.checked)}
                                    required
                                    style={{ marginTop: '0.2rem', width: '16px', height: '16px', accentColor: '#28216E' }}
                                />
                                <div>
                                    Yes, I'd like to receive personalized updates and offers via email.<br />
                                    I also agree to the <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Terms of Use</a> and <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Privacy Policy</a>.<br />
                                    <span style={{ fontSize: '0.75rem', marginTop: '0.3rem', display: 'block', color: '#9ca3af' }}>You can unsubscribe at any time.</span>
                                </div>
                            </label>
                        </form>
                    )}
                </div>

                {/* Right Side: Illustration */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 500 500" width="100%" height="auto" style={{ maxWidth: '500px' }} xmlns="http://www.w3.org/2000/svg">
                        <style>
                            {`
                                .cs-skin { fill: #fcd5ce; }
                                .cs-hair { fill: #312221; }
                                .cs-shirt { fill: #ffffff; stroke: #312221; stroke-width: 2; }
                                .cs-pants { fill: #ffffff; stroke: #312221; stroke-width: 2; }
                                .cs-laptop { fill: #ffffff; stroke: #312221; stroke-width: 2; }
                                .cs-plant { fill: #ffffff; stroke: #312221; stroke-width: 2; }
                                .cs-chair { fill: #ffffff; stroke: #312221; stroke-width: 2; }
                                .cs-line { fill: none; stroke: #312221; stroke-width: 2; stroke-linecap: round; }
                            `}
                        </style>
                        {/* Chair base & Stand */}
                        <path className="cs-chair" d="M 230 400 L 230 460 M 190 460 L 270 460" />
                        <ellipse cx="230" cy="460" rx="40" ry="10" className="cs-chair" />

                        {/* Plant */}
                        <path className="cs-plant" d="M 380 400 L 380 450 Q 380 460 390 460 L 430 460 Q 440 460 440 450 L 440 400 Z" />
                        <path className="cs-plant" d="M 400 400 Q 380 340 420 310 Q 440 350 400 400" />
                        <path className="cs-plant" d="M 410 400 Q 460 360 480 380 Q 460 420 410 400" />
                        <path className="cs-plant" d="M 410 400 Q 340 370 330 340 Q 360 330 410 400" />
                        <path className="cs-line" d="M 400 400 L 413 333 M 410 400 L 452 388 M 410 400 L 358 353" />

                        {/* Chair Bowl */}
                        <circle cx="230" cy="280" r="100" className="cs-chair" />
                        <path className="cs-line" d="M 140 250 Q 230 320 320 250" />

                        {/* Person - Legs */}
                        <path className="cs-pants" d="M 240 320 L 160 440 L 175 440 L 260 320 Z" />
                        <path className="cs-pants" d="M 250 310 L 300 370 L 280 380 L 230 320 Z" />
                        <path className="cs-skin" d="M 160 440 L 150 460 L 170 465 L 175 440 Z" />
                        <path className="cs-skin" d="M 290 375 L 310 375 Q 315 385 300 390 L 280 380 Z" />

                        {/* Person - Torso */}
                        <path className="cs-shirt" d="M 200 180 L 260 180 Q 270 240 260 300 L 200 300 Q 190 240 200 180 Z" />

                        {/* Person - Laptop & Arms */}
                        <rect x="150" y="240" width="80" height="50" rx="3" className="cs-laptop" />
                        <rect x="140" y="290" width="100" height="8" rx="2" className="cs-laptop" />
                        <circle cx="190" cy="265" r="5" className="cs-line" />
                        <path className="cs-skin" d="M 200 180 Q 180 230 190 290 L 200 290 Q 195 230 210 180 Z" />
                        <path className="cs-skin" d="M 260 180 Q 280 230 240 286 L 230 280 Q 265 230 250 180 Z" />

                        {/* Person - Head */}
                        <circle cx="235" cy="140" r="25" className="cs-skin" />
                        <path className="cs-hair" d="M 235 110 Q 200 110 210 160 Q 190 200 210 220 Q 250 200 260 160 Q 270 120 235 110" />
                        {/* Headphones */}
                        <path className="cs-line" d="M 210 140 Q 235 100 260 140" />
                        <rect x="205" y="130" width="8" height="20" rx="4" className="cs-shirt" />
                        <rect x="257" y="130" width="8" height="20" rx="4" className="cs-shirt" />

                        {/* Face details */}
                        <circle cx="230" cy="135" r="1.5" fill="#312221" />
                        <circle cx="245" cy="135" r="1.5" fill="#312221" />
                        <path d="M 233 145 Q 237 150 242 145" fill="none" stroke="#312221" strokeWidth="1.5" strokeLinecap="round" />

                        {/* Sparkles */}
                        <circle cx="340" cy="80" r="3" fill="none" stroke="#312221" strokeWidth="1" />
                        <circle cx="360" cy="95" r="2" fill="none" stroke="#312221" strokeWidth="1" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
