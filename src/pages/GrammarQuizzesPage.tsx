import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';
import SideCard from '../components/SideCard';

type QuizStatus = 'completed' | 'in-progress' | 'not-started';
type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface QuizCard {
    id: number;
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    difficulty: Difficulty;
    questions: number;
    status: QuizStatus;
    bestScore?: number;
}

const quizzes: QuizCard[] = [
    { id: 1, title: 'Punctuation Basics', description: 'Master commas, periods, colons, and semicolons in transcription', icon: 'format_size', iconBg: 'var(--green-light)', iconColor: 'var(--green)', difficulty: 'beginner', questions: 10, status: 'completed', bestScore: 95 },
    { id: 2, title: 'Capitalization Rules', description: 'Learn when to capitalize words, sentences, and titles', icon: 'text_fields', iconBg: '#EFF6FF', iconColor: '#3B82F6', difficulty: 'beginner', questions: 10, status: 'completed', bestScore: 90 },
    { id: 3, title: 'Abbreviations', description: 'Common abbreviations in medical and legal transcription', icon: 'short_text', iconBg: '#EEF0FF', iconColor: 'var(--purple)', difficulty: 'intermediate', questions: 10, status: 'completed', bestScore: 85 },
    { id: 4, title: 'Numbers & Dates', description: 'Format numbers, dates, times, and currency correctly', icon: 'pin', iconBg: '#FEF3C7', iconColor: '#F59E0B', difficulty: 'intermediate', questions: 10, status: 'completed', bestScore: 80 },
    { id: 5, title: 'Speaker Labels', description: 'Proper use of speaker labels in transcription', icon: 'record_voice_over', iconBg: 'var(--green-light)', iconColor: 'var(--green)', difficulty: 'beginner', questions: 10, status: 'completed', bestScore: 100 },
    { id: 6, title: 'Advanced Punctuation', description: 'Ellipses, dashes, hyphens, and more', icon: 'format_size', iconBg: 'var(--green-light)', iconColor: 'var(--green)', difficulty: 'intermediate', questions: 10, status: 'completed', bestScore: 75 },
    { id: 7, title: 'Medical Terms', description: 'Medical terminology and abbreviations', icon: 'medical_services', iconBg: '#FFF1F4', iconColor: 'var(--rose)', difficulty: 'advanced', questions: 10, status: 'in-progress' },
    { id: 8, title: 'Legal Terms', description: 'Legal terminology and court transcription', icon: 'gavel', iconBg: '#EEF0FF', iconColor: 'var(--purple)', difficulty: 'advanced', questions: 10, status: 'in-progress' },
    { id: 9, title: 'Formatting Rules', description: 'Headers, bullets, tables, and document formatting', icon: 'table_chart', iconBg: '#EFF6FF', iconColor: '#3B82F6', difficulty: 'beginner', questions: 10, status: 'not-started' },
    { id: 10, title: 'Quotation Marks', description: 'Using quotes, brackets, and parentheticals correctly', icon: 'format_quote', iconBg: 'var(--green-light)', iconColor: 'var(--green)', difficulty: 'intermediate', questions: 10, status: 'not-started' },
];

const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Not Started', value: 'not-started' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
];

const difficultyClass: Record<Difficulty, string> = {
    beginner: 'beginner',
    intermediate: 'intermediate',
    advanced: 'advanced',
};

const GrammarQuizzesPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = quizzes.filter(q =>
        activeFilter === 'all' ? true : q.status === activeFilter
    );

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* Header */}
                    <section>
                        <PageBreadcrumb pageName="Grammar Quizzes" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Grammar Quizzes</h2>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4" style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <Icon icon="quiz" className="text-[22px] shrink-0 mt-0.5" style={{ color: '#1f8f6d' }} />
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Practice transcription grammar rules to improve your accuracy. Master punctuation, capitalization, numbers, and more.&nbsp;
                                <a href="#" className="font-extrabold uppercase tracking-wide underline underline-offset-2" style={{ color: 'var(--green)', textDecorationColor: 'var(--green)' }}>View All Topics.</a>
                            </p>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Quizzes Completed" value="8" icon="check_circle" borderColor="#3B82F6" iconColor="#3B82F6" />
                        <BorderStatCard label="Average Score" value="87%" icon="analytics" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Current Streak" value="5" icon="local_fire_department" borderColor="#F59E0B" iconColor="#F59E0B" />
                        <BorderStatCard label="Topics Mastered" value="3" icon="workspace_premium" borderColor="var(--purple)" iconColor="var(--purple)" />
                    </section>

                    {/* Main + Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left: quiz list */}
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
                                {filtered.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                                            <Icon icon="quiz" className="text-3xl" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2">No quizzes found</h4>
                                        <p className="text-sm text-slate-500">There are no quizzes in this category.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filtered.map(quiz => (
                                            <div key={quiz.id} className="quiz-category-card">

                                                {/* Top: Icon + Title + Description */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <div
                                                        className="category-icon shrink-0"
                                                        style={{
                                                            background:
                                                                quiz.status === 'completed' ? 'var(--green-light)' :
                                                                    quiz.status === 'in-progress' ? '#EFF6FF' : '#f1f5f9',
                                                            color:
                                                                quiz.status === 'completed' ? 'var(--green)' :
                                                                    quiz.status === 'in-progress' ? '#3B82F6' : '#94a3b8',
                                                        }}
                                                    >
                                                        <Icon icon={quiz.icon} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <h4 className="font-bold text-slate-900 leading-snug">{quiz.title}</h4>
                                                            <span className={`difficulty-badge ${difficultyClass[quiz.difficulty]}`}>
                                                                {quiz.difficulty}
                                                            </span>
                                                            <span className="text-xs text-slate-400">{quiz.questions} questions</span>
                                                        </div>
                                                        <p className="text-sm text-slate-500 leading-relaxed">{quiz.description}</p>
                                                    </div>
                                                </div>

                                                {/* Bottom: Difficulty + Status | Button */}
                                                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                                                    <div className="flex flex-col gap-1">
                                                        {quiz.status === 'completed' && (
                                                            <span className="text-sm font-bold" style={{ color: 'var(--green)' }}>
                                                                Best: {quiz.bestScore}%
                                                            </span>
                                                        )}
                                                        {quiz.status === 'in-progress' && (
                                                            <span className="text-sm font-semibold text-blue-500">In Progress</span>
                                                        )}
                                                        {quiz.status === 'not-started' && (
                                                            <span className="text-sm text-slate-400">Not started</span>
                                                        )}
                                                    </div>

                                                    {quiz.status === 'completed' && <button className="action-btn primary">Retake</button>}
                                                    {quiz.status === 'in-progress' && <button className="action-btn secondary">Continue</button>}
                                                    {quiz.status === 'not-started' && <button className="action-btn primary">Start</button>}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-72 xl:w-80 space-y-6 shrink-0">
                            <div className="sticky top-24 space-y-6">

                                <div style={{ display: 'none' }} aria-hidden={true}>
                                    {/* Recent Activity (hidden) */}
                                    <SideCard title="Recent Activity" titleIcon="history" titleIconColor="var(--green)">
                                        <div className="space-y-4">
                                            {[
                                                { dot: 'var(--green)', text: <><strong>Punctuation Basics</strong> completed - Score: 95%</>, time: '2 hours ago' },
                                                { dot: '#3B82F6', text: <><strong>Capitalization Rules</strong> completed - Score: 90%</>, time: 'Yesterday' },
                                                { dot: 'var(--purple)', text: <><strong>Abbreviations</strong> completed - Score: 85%</>, time: '2 days ago' },
                                                { dot: '#F59E0B', text: <><strong>Numbers & Dates</strong> completed - Score: 80%</>, time: '3 days ago' },
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
                                    </SideCard>
                                </div>

                                {/* Daily Goal */}
                                <SideCard title="Daily Goal" titleIcon="track_changes" titleIconColor="var(--orange, #F59E0B)">
                                    <div className="text-center py-4">
                                        <div className="relative w-24 h-24 mx-auto mb-4">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path fill="none" stroke="#e5e7eb" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="60, 100" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-lg font-bold text-slate-900">3/5</span>
                                                <span className="text-[8px] text-slate-400">quizzes</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500">Complete 2 more quizzes today</p>
                                    </div>
                                    <button className="w-full mt-4 py-3 primary-gradient text-white font-bold rounded-lg text-sm">
                                        Start Daily Practice
                                    </button>
                                </SideCard>

                                {/* Tips */}
                                <div className="tips-card">
                                    <div className="flex items-center gap-2 mb-4" style={{ paddingTop: '24px' }}>
                                        <Icon icon="lightbulb" className="text-[20px]" />
                                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Quick Tips</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }}></div>
                                            <p className="text-sm text-slate-500 leading-relaxed">Always review explanations for incorrect answers.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }}></div>
                                            <p className="text-sm text-slate-500 leading-relaxed">Practice regularly to maintain your streak.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }}></div>
                                            <p className="text-sm text-slate-500 leading-relaxed">Review grammar rules in the TCI style guide.</p>
                                        </li>
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

export default GrammarQuizzesPage;
