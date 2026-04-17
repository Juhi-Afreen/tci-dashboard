import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';

interface Update {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'feature' | 'improvement' | 'fix' | 'announcement';
}

const UPDATES: Update[] = [
    {
        id: '1',
        title: 'New Practice Transcription Module',
        description: 'We\'ve added 50+ new practice audio files covering diverse industries and accents to help you improve your transcription skills.',
        date: 'March 10, 2024',
        type: 'feature',
    },
    {
        id: '2',
        title: 'Improved Accuracy Assessment Tool',
        description: 'The accuracy assessment tool now provides real-time feedback with detailed error analysis and personalized recommendations.',
        date: 'February 28, 2024',
        type: 'improvement',
    },
    {
        id: '3',
        title: 'Fixed Audio Playback Issues',
        description: 'Resolved compatibility issues with certain audio formats. All audio files should now play smoothly across devices.',
        date: 'February 20, 2024',
        type: 'fix',
    },
    {
        id: '4',
        title: 'Legal Terminology Database Updated',
        description: 'We\'ve added 200+ new legal terms and updated existing definitions to reflect the latest court terminology.',
        date: 'February 15, 2024',
        type: 'announcement',
    },
    {
        id: '5',
        title: 'Mobile App Optimization',
        description: 'Enhanced mobile experience with improved navigation and faster loading times for on-the-go learning.',
        date: 'February 1, 2024',
        type: 'improvement',
    },
];

const getTypeStyles = (type: string) => {
    switch (type) {
        case 'feature':
            return { bg: 'var(--blue-light)', color: 'var(--blue)', icon: 'star' };
        case 'improvement':
            return { bg: '#FFF3EB', color: 'var(--orange)', icon: 'trending_up' };
        case 'fix':
            return { bg: '#DCE7FF', color: '#4F46E5', icon: 'check_circle' };
        case 'announcement':
            return { bg: 'var(--purple-light)', color: 'var(--purple)', icon: 'campaign' };
        default:
            return { bg: 'var(--bg)', color: 'var(--text-secondary)', icon: 'info' };
    }
};

const UpdatesPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="max-w-[1440px] mx-auto w-full px-4 lg:px-20 py-8">
                    {/* Breadcrumb */}
                    <PageBreadcrumb pageName="Updates" />

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">What's New</h1>
                        <p className="text-slate-600 text-lg">Stay updated with the latest features, improvements, and announcements.</p>
                    </div>

                    {/* Updates List */}
                    <div className="space-y-4 w-full">
                        {UPDATES.map(update => {
                            const typeStyles = getTypeStyles(update.type);
                            return (
                                <div key={update.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className="shrink-0 h-12 w-12 rounded-lg flex items-center justify-center" style={{ background: typeStyles.bg, color: typeStyles.color }}>
                                            <span className="material-symbols-outlined text-2xl">{typeStyles.icon}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-lg font-bold text-slate-900">{update.title}</h3>
                                                <span className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: typeStyles.bg, color: typeStyles.color }}>
                                                    {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm mb-3">{update.description}</p>
                                            <p className="text-slate-500 text-xs">{update.date}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {UPDATES.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">notifications_none</span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No updates yet</h3>
                            <p className="text-slate-600">Check back soon for the latest news and improvements.</p>
                        </div>
                    )}
                </main>
            </div>
        </DashboardLayout>
    );
};

export default UpdatesPage;
