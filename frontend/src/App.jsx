import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import PageNotFound from './views/PageNotFound';
import Jobs from './views/Jobs';
import Job from './views/Job';
import Dashboard from './views/DashBoard';
import Profile from './views/Profile';

export default function FreelanceMarketplace() {
    return (
        <Router>
            <div className="min-h-screen">
                <div className="container mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/job/:jobId" element={<Job />} />
                        <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
