import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';
import SideCard from '../components/SideCard';

type AssignmentStatus = 'in-progress' | 'overdue' | 'pending' | 'submitted' | 'graded';

interface Assignment {
    id: number;
    title: string;
    status: AssignmentStatus;
    course: string;
    iconBg: string;
    iconColor: string;
    icon: string;
    dateLabel: string;
    dateIcon: string;
    dueBadgeType: 'urgent' | 'warning' | 'normal' | 'passed';
    dueBadgeIcon?: string;
    dueBadgeText: string;
    actionLabel: string;
    actionType: 'primary' | 'secondary';
}

const assignments: Assignment[] = [
    {
        id: 1,
        title: 'Unit 3: Medical Terminology Transcription',
        status: 'in-progress',
        course: 'General Transcription',
        iconBg: 'var(--green-light)',
        iconColor: 'var(--green)',
        icon: 'description',
        dateLabel: 'Due Apr 15, 2025',
        dateIcon: 'schedule',
        dueBadgeType: 'warning',
        dueBadgeIcon: 'schedule',
        dueBadgeText: '2 days left',
        actionLabel: 'Continue',
        actionType: 'primary',
    },
    {
        id: 2,
        title: 'Legal Deposition Review Exercise',
        status: 'overdue',
        course: 'Legal Transcription',
        iconBg: 'var(--purple-light)',
        iconColor: 'var(--purple)',
        icon: 'gavel',
        dateLabel: 'Due Apr 10, 2025',
        dateIcon: 'schedule',
        dueBadgeType: 'urgent',
        dueBadgeIcon: 'priority_high',
        dueBadgeText: '3 days overdue',
        actionLabel: 'Submit Now',
        actionType: 'secondary',
    },
    {
        id: 3,
        title: 'Practice: Audio File 2A - Business Meeting',
        status: 'pending',
        course: 'General Transcription',
        iconBg: 'var(--orange-light)',
        iconColor: 'var(--orange)',
        icon: 'edit_note',
        dateLabel: 'Due Apr 18, 2025',
        dateIcon: 'schedule',
        dueBadgeType: 'normal',
        dueBadgeIcon: 'schedule',
        dueBadgeText: '5 days left',
        actionLabel: 'Start',
        actionType: 'secondary',
    },
    {
        id: 4,
        title: 'Unit 2: Foot Pedal Control Practice',
        status: 'submitted',
        course: 'General Transcription',
        iconBg: 'var(--green-light)',
        iconColor: 'var(--green)',
        icon: 'description',
        dateLabel: 'Submitted Apr 8, 2025',
        dateIcon: 'history',
        dueBadgeType: 'passed',
        dueBadgeText: 'Awaiting review',
        actionLabel: 'View',
        actionType: 'secondary',
    },
    {
        id: 5,
        title: 'Unit 1: Introduction to Transcription',
        status: 'graded',
        course: 'General Transcription',
        iconBg: 'var(--green-light)',
        iconColor: 'var(--green)',
        icon: 'description',
        dateLabel: 'Completed Apr 1, 2025',
        dateIcon: 'event',
        dueBadgeType: 'normal',
        dueBadgeIcon: 'check_circle',
        dueBadgeText: '95% Score',
        actionLabel: 'View Feedback',
        actionType: 'secondary',
    },
    {
        id: 6,
        title: 'Legal Terminology Quiz 1',
        status: 'graded',
        course: 'Legal Transcription',
        iconBg: 'var(--purple-light)',
        iconColor: 'var(--purple)',
        icon: 'gavel',
        dateLabel: 'Completed Mar 28, 2025',
        dateIcon: 'event',
        dueBadgeType: 'normal',
        dueBadgeIcon: 'check_circle',
        dueBadgeText: '88% Score',
        actionLabel: 'View Feedback',
        actionType: 'secondary',
    },
    {
        id: 7,
        title: 'Grammar Quiz 4 - Punctuation Rules',
        status: 'pending',
        course: 'General Transcription',
        iconBg: 'var(--blue-light)',
        iconColor: 'var(--blue)',
        icon: 'quiz',
        dateLabel: 'Due Apr 20, 2025',
        dateIcon: 'schedule',
        dueBadgeType: 'normal',
        dueBadgeIcon: 'schedule',
        dueBadgeText: '7 days left',
        actionLabel: 'Start',
        actionType: 'secondary',
    },
    {
        id: 8,
        title: 'Unit 4: Audio Quality Enhancement',
        status: 'in-progress',
        course: 'General Transcription',
        iconBg: 'var(--green-light)',
        iconColor: 'var(--green)',
        icon: 'description',
        dateLabel: 'Due Apr 22, 2025',
        dateIcon: 'schedule',
        dueBadgeType: 'normal',
        dueBadgeIcon: 'schedule',
        dueBadgeText: '9 days left',
        actionLabel: 'Continue',
        actionType: 'primary',
    },
    {
        id: 9,
        title: 'Legal Ethics Case Study',
        status: 'submitted',
        course: 'Legal Transcription',
        iconBg: 'var(--purple-light)',
        iconColor: 'var(--purple)',
        icon: 'gavel',
        dateLabel: 'Submitted Apr 5, 2025',
        dateIcon: 'history',
        dueBadgeType: 'passed',
        dueBadgeText: 'Awaiting review',
        actionLabel: 'View',
        actionType: 'secondary',
    },
];

const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Graded', value: 'graded' },
    { label: 'Overdue', value: 'overdue' },
];

const statusLabel: Record<AssignmentStatus, string> = {
    'in-progress': 'In Progress',
    overdue: 'Overdue',
    pending: 'Pending',
    submitted: 'Submitted',
    graded: 'Graded',
};

const AssignmentTrackingPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = assignments.filter(a =>
        activeFilter === 'all' ? true : a.status === activeFilter
    );

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* Header */}
                    <section>
                        <PageBreadcrumb pageName="Assignment Tracking" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Assignment Tracking</h2>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4" style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5" style={{ color: 'var(--green)' }}>info</span>
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Track your transcription assignments, monitor deadlines, and review your grades all in one place.&nbsp;
                                <button type="button" className="font-extrabold uppercase tracking-wide underline underline-offset-2" style={{ color: 'var(--green)', textDecorationColor: 'var(--green)', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => { /* TODO: navigate to grading guidelines */ }}>
                                    View Grading Guidelines.
                                </button>
                            </p>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Total Assignments" value="12" icon="assignment" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="Pending" value="4" icon="pending_actions" borderColor="var(--orange)" iconColor="var(--orange)" />
                        <BorderStatCard label="Submitted" value="6" icon="task_alt" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Graded" value="2" icon="grade" borderColor="var(--purple)" iconColor="var(--purple)" />
                    </section>

                    {/* Main + Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left: assignments list */}
                        <div className="flex-1 min-w-0 space-y-8">

                            <section>
                                <div
                                    style={{
                                        display: 'flex', gap: '4px', background: '#F4F7F6',
                                        borderRadius: '10px', padding: '4px',
                                        marginBottom: '24px', width: 'fit-content',
                                    }}
                                >
                                    {filterOptions.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setActiveFilter(opt.value)}
                                            style={{
                                                padding: '8px 18px',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                transition: 'all .15s',
                                                background: activeFilter === opt.value ? '#fff' : 'transparent',
                                                color: activeFilter === opt.value ? 'var(--green)' : 'var(--text-secondary)',
                                                boxShadow: activeFilter === opt.value ? '0 1px 6px rgba(0,0,0,.08)' : 'none',
                                            }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <div className="space-y-4">
                                    {filtered.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                                                <span className="material-symbols-outlined text-3xl">assignment</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 mb-2">No assignments found</h4>
                                            <p className="text-sm text-slate-500">There are no assignments in this category.</p>
                                        </div>
                                    ) : (
                                        filtered.map(a => (
                                            <div key={a.id} className="assignment-row">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: a.iconBg, color: a.iconColor }}>
                                                        <span className="material-symbols-outlined">{a.icon}</span>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                            <h4 className="font-bold text-slate-900">{a.title}</h4>
                                                            <span className={`status-badge ${a.status}`}>{statusLabel[a.status]}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium flex-wrap">
                                                            <span className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[14px]">school</span> {a.course}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[14px]">{a.dateIcon}</span> {a.dateLabel}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 flex-wrap md:mt-0 mt-2">
                                                    <span className={`due-badge ${a.dueBadgeType}`}>
                                                        {a.dueBadgeIcon && (
                                                            <span className="material-symbols-outlined text-[14px]">{a.dueBadgeIcon}</span>
                                                        )}
                                                        {a.dueBadgeText}
                                                    </span>
                                                    <button className={`action-btn ${a.actionType}`}>{a.actionLabel}</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-72 xl:w-80 space-y-6 shrink-0">
                            <div className="sticky top-24 space-y-6">

                                {/* Upcoming Deadlines */}
                                <SideCard title="Upcoming Deadlines" titleIcon="schedule" titleIconColor="var(--orange)">
                                    <div className="space-y-3">
                                        {[
                                            { type: 'urgent', icon: 'priority_high', title: 'Medical Terminology', dateColor: 'var(--rose)', date: 'Due in 2 days' },
                                            { type: 'urgent', icon: 'priority_high', title: 'Legal Deposition', dateColor: 'var(--rose)', date: '3 days overdue' },
                                            { type: 'warning', icon: 'schedule', title: 'Business Meeting', dateColor: 'var(--orange)', date: 'Due in 5 days' },
                                            { type: 'normal', icon: 'quiz', title: 'Grammar Quiz 4', dateColor: 'var(--text-muted)', date: 'Due in 7 days' },
                                        ].map((item, i) => (
                                            <div key={i} className="deadline-item">
                                                <div className={`deadline-icon ${item.type}`}>
                                                    <span className="material-symbols-outlined">{item.icon}</span>
                                                </div>
                                                <div className="deadline-info">
                                                    <div className="deadline-title">{item.title}</div>
                                                    <div className="deadline-date" style={{ color: item.dateColor }}>{item.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <button type="button" className="text-xs font-bold flex items-center justify-center gap-1 transition-all" style={{ color: 'var(--green)', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => { /* TODO: show all deadlines */ }}>
                                            View All Deadlines
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </button>
                                    </div>
                                </SideCard>

                                {/* Recent Activity */}
                                {/* <SideCard title="Recent Activity" titleIcon="history" titleIconColor="var(--green)">
                                    <div className="space-y-4">
                                        {[
                                            { dot: 'var(--green)', text: <><strong>Unit 2: Foot Pedal</strong> was submitted for review.</>, time: '2 hours ago' },
                                            { dot: 'var(--purple)', text: <><strong>Legal Quiz 1</strong> was graded - Score: 88%</>, time: 'Yesterday' },
                                            { dot: 'var(--green)', text: <><strong>Unit 1: Intro</strong> was graded - Score: 95%</>, time: '2 days ago' },
                                            { dot: 'var(--blue)', text: <><strong>Welcome to TCI!</strong> course completed.</>, time: '1 week ago' },
                                        ].map((item, i) => (
                                            <div key={i} className="activity-item">
                                                <div className="activity-dot" style={{ background: item.dot }}></div>
                                                <div className="activity-content">
                                                    <div className="activity-text">{item.text}</div>
                                                    <div className="activity-time">{item.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <a href="#" className="text-xs font-bold flex items-center justify-center gap-1 transition-all" style={{ color: 'var(--green)' }}>
                                            View All Activity
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </a>
                                    </div>
                                </SideCard> */}

                                {/* Quick Tips */}
                                <div className="tips-card">
                                    <div className="flex items-center gap-2 mb-4" style={{ paddingTop: '24px' }}>
                                        <span className="material-symbols-outlined text-[20px]" style={{ color: 'var(--green)' }}>lightbulb</span>
                                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Quick Tips</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {[
                                            'Submit assignments early to receive feedback before the deadline.',
                                            'Review graded submissions to understand scoring criteria.',
                                            'Use the Accuracy Tool to practice before submitting assignments.',
                                        ].map((tip, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }}></div>
                                                <p className="text-sm text-slate-500 leading-relaxed">{tip}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </aside>

                    </div>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default AssignmentTrackingPage;
