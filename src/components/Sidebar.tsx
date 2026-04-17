import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
    isSidebarCollapsed?: boolean;
    toggleSidebar?: () => void;
}

// ── SVG icon components matching the reference HTML exactly ──────────────────

const IconDashboard = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
);

const IconCourses = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const IconResources = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);

const IconProgress = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const IconSchedule = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const IconAccuracy = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const IconJobBoard = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const IconDiscussions = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
);

const IconSettings = () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
);

const ChevronDown = () => (
    <svg className="nav-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

// ── Nav data ─────────────────────────────────────────────────────────────────

type SubItem = { to: string; text: string };

type NavItemData =
    | { type: 'link'; to: string; text: string; tooltip: string; icon: React.ReactNode; badge?: string }
    | { type: 'dropdown'; text: string; tooltip: string; icon: React.ReactNode; subItems: SubItem[] };

const navSections: { label: string; items: NavItemData[] }[] = [
    {
        label: 'Main',
        items: [
            {
                type: 'link',
                to: '/dashboard',
                text: 'Dashboard',
                tooltip: 'Dashboard',
                icon: <IconDashboard />,
            },
            {
                type: 'dropdown',
                text: 'My Courses',
                tooltip: 'My Courses',
                icon: <IconCourses />,
                subItems: [
                    { to: '/courses/general', text: 'General Transcription Course' },
                    { to: '/courses/legal', text: 'Legal Transcription Course' },
                ],
            },
            {
                type: 'dropdown',
                text: 'Resources',
                tooltip: 'Resources',
                icon: <IconResources />,
                subItems: [
                    { to: '/resources/assignments', text: 'Assignment Tracking' },
                    { to: '/resources/quizzes', text: 'Grammar Quizzes' },
                    { to: '/resources/tips', text: 'Legal Transcription Tips' },
                    { to: '/resources/tips-and-tricks', text: 'Tips and Tricks' },
                    { to: '/resources/practice', text: 'Practice Transcription' },
                    { to: '/resources/verbatim', text: 'Verbatim vs Non-verbatim' },
                    { to: '/resources/ebooks', text: 'Free Ebook' },
                ],
            },
            {
                type: 'link',
                to: '/progress',
                text: 'Progress',
                tooltip: 'Progress',
                icon: <IconProgress />,
            },
            {
                type: 'link',
                to: '/schedule',
                text: 'Schedule',
                tooltip: 'Schedule',
                icon: <IconSchedule />,
            },
        ],
    },
    {
        label: 'Tools',
        items: [
            {
                type: 'link',
                to: '/tools/accuracy',
                text: 'Accuracy Tool',
                tooltip: 'Accuracy Tool',
                icon: <IconAccuracy />,
            },
            {
                type: 'link',
                to: '/tools/job-board',
                text: 'Job Board',
                tooltip: 'Job Board',
                icon: <IconJobBoard />,
            },
            {
                type: 'link',
                to: '/tools/discussions',
                text: 'Discussion Board',
                tooltip: 'Discussion Board',
                icon: <IconDiscussions />,
                badge: '6',
            },
            {
                type: 'link',
                to: '/settings',
                text: 'Settings',
                tooltip: 'Settings',
                icon: <IconSettings />,
            },
        ],
    },
];

// ── NavItem components ────────────────────────────────────────────────────────

interface NavLinkItemProps {
    item: Extract<NavItemData, { type: 'link' }>;
    isSidebarCollapsed?: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ item, isSidebarCollapsed }) => {
    const location = useLocation();
    const isActive = location.pathname === item.to;

    const iconNode = item.badge ? (
        <span className="nav-icon-wrap">
            {item.icon}
            <span className="nav-dot">{item.badge}</span>
        </span>
    ) : item.icon;

    return (
        <Link
            to={item.to}
            className={`nav-item${isActive ? ' active' : ''}`}
            data-tooltip={item.tooltip}
        >
            {iconNode}
            <span className="nav-text">{item.text}</span>
            {item.badge && !isSidebarCollapsed && (
                <span className="nav-badge">{item.badge}</span>
            )}
        </Link>
    );
};

interface NavDropdownItemProps {
    item: Extract<NavItemData, { type: 'dropdown' }>;
    isSidebarCollapsed?: boolean;
    onExpandSidebar?: () => void;
}

const NavDropdownItem: React.FC<NavDropdownItemProps> = ({ item, isSidebarCollapsed, onExpandSidebar }) => {
    const location = useLocation();
    const isSubItemActive = item.subItems.some(sub => location.pathname === sub.to);
    const [isOpen, setIsOpen] = React.useState(isSubItemActive);

    const handleClick = () => {
        if (isSidebarCollapsed) {
            // Expand sidebar first, then open this dropdown
            onExpandSidebar?.();
            setIsOpen(true);
        } else {
            setIsOpen(v => !v);
        }
    };

    return (
        <div className={`nav-dropdown${isOpen && !isSidebarCollapsed ? ' open' : ''}`}>
            <button
                className={`nav-item nav-dropdown-toggle${isSubItemActive ? ' active' : ''}`}
                data-tooltip={item.tooltip}
                onClick={handleClick}
            >
                {item.icon}
                <span className="nav-text">{item.text}</span>
                <ChevronDown />
            </button>
            <div className="nav-dropdown-menu">
                {item.subItems.map((sub, i) => (
                    <Link
                        key={i}
                        to={sub.to}
                        className={`nav-sub-item${location.pathname === sub.to ? ' active' : ''}`}
                    >
                        <span className="nav-sub-dot"></span>
                        <span className="nav-text">{sub.text}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// ── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar: React.FC<SidebarProps> = ({ isSidebarCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any auth state here if needed
        navigate('/login');
    };

    return (
        <aside className={`sidebar${isSidebarCollapsed ? ' collapsed' : ''}`} id="sidebar">

            <button className="sidebar-toggle" onClick={toggleSidebar} title="Toggle sidebar">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <div className="sidebar-logo">
                <img
                    src="https://www.transcriptioncertificationinstitute.org/images/tci-logo.png"
                    alt="TCI Logo"
                    style={{ width: '100%', maxWidth: '160px', height: 'auto' }}
                />
            </div>

            {navSections.map((section, si) => (
                <div className="nav-section" key={si}>
                    <div className="nav-label">{section.label}</div>
                    {section.items.map((item, ii) =>
                        item.type === 'link' ? (
                            <NavLinkItem
                                key={ii}
                                item={item}
                                isSidebarCollapsed={isSidebarCollapsed}
                            />
                        ) : (
                            <NavDropdownItem
                                key={ii}
                                item={item}
                                isSidebarCollapsed={isSidebarCollapsed}
                                onExpandSidebar={toggleSidebar}
                            />
                        )
                    )}
                </div>
            ))}

            <div className="sidebar-footer">
                <div className="user-card">
                    <div className="user-avatar">JD</div>
                    <div>
                        <div className="user-name">Juhi Afreen</div>
                        <div className="user-role">Student</div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                    data-tooltip="Log Out"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        width: '100%',
                        padding: '8px 12px',
                        marginTop: 4,
                        background: 'none',
                        border: 'none',
                        borderRadius: 8,
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        fontSize: 13,
                        fontWeight: 500,
                        transition: 'color .15s',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--rose)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                    }}
                >
                    <svg
                        width="15"
                        height="15"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        style={{ flexShrink: 0 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="nav-text">Log Out</span>
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;
