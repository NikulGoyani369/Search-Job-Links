import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() !== '') {
            localStorage.setItem('jobUsername', username);
            setIsAuthenticated(true);
            navigate('/dashboard');
        }
    };

    return (
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="background-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="form-container" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '2rem' }}>Welcome Back</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter your name to access your dashboard</p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="e.g. Alex"
                            required
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enter Dashboard</button>
                    </div>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button onClick={() => navigate('/')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>&larr; Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
