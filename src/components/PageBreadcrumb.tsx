import React from 'react';
import { Link } from 'react-router-dom';

interface PageBreadcrumbProps {
    pageName: string;
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ pageName }) => {
    return (
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-widest">
            <Link to="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
            </Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
            </svg>
            <span style={{ color: 'var(--green)' }}>{pageName}</span>
        </nav>
    );
};

export default PageBreadcrumb;
