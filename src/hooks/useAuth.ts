import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export const useAuth = (setIsAuthenticated: (val: boolean) => void) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else {
                setUsername(user.displayName || user.email?.split('@')[0] || 'User');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const formattedName = username.split(' ')[0] + " R.";

    return { username, formattedName, handleLogout };
};
