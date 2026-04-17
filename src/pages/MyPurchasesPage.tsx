import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';

interface Purchase {
    id: string;
    name: string;
    price: number;
    purchaseDate: string;
    status: 'active' | 'completed' | 'pending';
}

const PURCHASES: Purchase[] = [
    {
        id: '1',
        name: 'General Transcription Course',
        price: 499,
        purchaseDate: 'January 15, 2024',
        status: 'active',
    },
    {
        id: '2',
        name: 'Legal Transcription Course',
        price: 649,
        purchaseDate: 'December 1, 2023',
        status: 'completed',
    },
    {
        id: '3',
        name: 'AAERT Exam Prep',
        price: 399,
        purchaseDate: 'November 10, 2023',
        status: 'active',
    },
];

const MyPurchasesPage: React.FC = () => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return { bg: 'var(--green-light)', text: 'var(--green)' };
            case 'completed':
                return { bg: '#D1FAE5', text: '#059669' };
            case 'pending':
                return { bg: 'var(--orange-light)', text: 'var(--orange)' };
            default:
                return { bg: 'var(--bg)', text: 'var(--text-secondary)' };
        }
    };

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="max-w-[1440px] mx-auto w-full px-4 lg:px-20 py-8">
                    {/* Breadcrumb */}
                    <PageBreadcrumb pageName="My Purchases" />

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Purchases</h1>
                        <p className="text-slate-600 text-lg">Manage and view all your course purchases.</p>
                    </div>

                    {/* Purchases Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {PURCHASES.map(purchase => {
                            const colors = getStatusColor(purchase.status);
                            return (
                                <div key={purchase.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">{purchase.name}</h3>
                                            <p className="text-sm text-slate-600 mb-3">Purchased on {purchase.purchaseDate}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-bold" style={{ color: 'var(--green)' }}>
                                                    ${purchase.price}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: colors.bg, color: colors.text }}>
                                                    {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2.5 rounded-lg font-bold text-white transition-all flex items-center gap-2" style={{ background: 'var(--green)' }}>
                                            View Details
                                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {PURCHASES.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">shopping_bag</span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No purchases yet</h3>
                            <p className="text-slate-600">Start your learning journey by exploring our courses.</p>
                        </div>
                    )}
                </main>
            </div>
        </DashboardLayout>
    );
};

export default MyPurchasesPage;
