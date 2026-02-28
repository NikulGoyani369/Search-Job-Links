import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login: React.FC<{ setIsAuthenticated: (val: boolean) => void }> = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
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
                <h2 style={{ textAlign: 'center', color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '2rem' }}>
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    {isSignUp ? 'Sign up to start tracking jobs' : 'Enter your credentials'}
                </p>

                {error && <div style={{ color: '#e25555', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', padding: '10px', background: 'rgba(226, 85, 85, 0.1)', borderRadius: '8px' }}>{error}</div>}

                <form onSubmit={handleAuth}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group" style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                            {isSignUp ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </form>

                <div style={{ position: 'relative', textAlign: 'center', margin: '1.5rem 0' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255, 255, 255, 0.1)', zIndex: 1 }}></div>
                    <span style={{ position: 'relative', zIndex: 2, background: 'var(--bg-card)', padding: '0 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>or</span>
                </div>

                <button onClick={handleGoogleSignIn} className="btn" style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', color: '#333' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <div style={{ textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button onClick={() => navigate('/')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>&larr; Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
