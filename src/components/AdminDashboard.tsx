import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                <li><Link to="/tags">Управление тегами</Link></li>
                <li><Link to="/mailings">Управление рассылками</Link></li>
                <li><Link to="/analytics">Статистика</Link></li>
            </ul>
        </div>
    );
};

export default AdminDashboard;
