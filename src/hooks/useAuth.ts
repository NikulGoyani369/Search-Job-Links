import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = (setIsAuthenticated: (val: boolean) => void) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');

    useEffect(() => {
        const user = localStorage.getItem('jobUsername');
        if (!user) {
            navigate('/login');
        } else {
            setUsername(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jobUsername');
        setIsAuthenticated(false);
        navigate('/');
    };

    const formattedName = username.split(' ')[0] + " R.";

    return { username, formattedName, handleLogout };
};
