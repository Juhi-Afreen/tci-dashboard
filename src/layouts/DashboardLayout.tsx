import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageFooter from '../components/PageFooter';
import '../styles/Dashboard.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
            <Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`main-wrap${isSidebarCollapsed ? ' collapsed' : ''}`} id="mainWrap">
                <Header isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
                {children}
                <PageFooter />
            </div>
        </div>
    );
};

export default DashboardLayout;
