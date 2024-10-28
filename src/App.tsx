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
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/tags" element={<TagsPage />} />
                <Route path="/admin/mailings" element={<MailingsPage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
