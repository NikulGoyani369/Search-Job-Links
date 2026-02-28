import React from 'react';

type Props = {
    username: string;
    formattedName: string;
};

const DashboardHeader: React.FC<Props> = ({ username, formattedName }) => {
    return (
        <header className="dash-top">
            <div>
                <span className="sub-greeting">Command Center Dashboard</span>
                <h1 className="main-greeting">Welcome back, <span id="userGreeting">{username}</span></h1>
            </div>
            <div className="user-profile">
                <button className="notification-btn">🔔<span className="dot"></span></button>
                <div className="profile-info">
                    <img src={`https://ui-avatars.com/api/?name=${username}&background=1E293B&color=fff`} alt="User" id="userAvatar" />
                    <span id="userNameTop">{formattedName}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>▼</span>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
