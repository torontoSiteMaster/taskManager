import React from 'react';
import Header from '../components/header/Header';



const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const { username, email } = user;
    console.log(username);
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