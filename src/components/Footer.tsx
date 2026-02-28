import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer style={{
            textAlign: 'center',
            padding: '20px',
            marginTop: 'auto',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem',
            width: '100%',
            backdropFilter: 'blur(10px)',
            background: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 10,
            position: 'relative'
        }}>
            <p style={{ margin: 0 }}>
                Made with <span style={{ color: '#e25555' }}>❤️</span> by Nikul Goyani | {currentTime}
            </p>
        </footer>
    );
};

export default Footer;
