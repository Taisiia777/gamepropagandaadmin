import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import TagsPage from './pages/TagsPage';
import MailingsPage from './pages/MailingsPage';
import AnalyticsPage from './pages/AnalyticsPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/tags" element={<TagsPage />} />
                <Route path="/mailings" element={<MailingsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
