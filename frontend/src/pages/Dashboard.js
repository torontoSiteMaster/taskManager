import React from 'react';
import Header from '../components/header/Header';

const Dashboard = () => {
    const { username, email } = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Header />
            <div>
                <p>Welcome {username}</p>
                <div>
                    <div>Email</div>
                    <div>{email}</div>
                </div>
            </div>
        </>

    )
}

export default Dashboard;