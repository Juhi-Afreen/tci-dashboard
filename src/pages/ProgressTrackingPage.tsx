import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Module {
    id: number;
    title: string;
    status: 'completed' | 'in-progress' | 'locked';
    score?: number;
    completedOn?: string;
}

interface Course {
    id: string;
    title: string;
    color: string;
    icon: string;
    totalModules: number;
    completedModules: number;
    overallScore: number;
    modules: Module[];
}

interface QuizResult {
    id: number;
    quiz: string;
    score: number;
    total: number;
    date: string;
    badge: string;
}

interface AccuracyEntry {
    id: number;
    date: string;
    score: number;
    label: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const COURSES: Course[] = [
    {
        id: 'general',
        title: 'General Transcription',
        color: 'var(--green)',
        icon: 'mic',
        totalModules: 10,
        completedModules: 7,
        overallScore: 91,
        modules: [
            { id: 1,  title: 'Introduction to Transcription',          status: 'completed',   score: 96, completedOn: 'Jan 10, 2026' },
            { id: 2,  title: 'Punctuation Rules',                       status: 'completed',   score: 88, completedOn: 'Jan 18, 2026' },
            { id: 3,  title: 'Grammar Fundamentals',                    status: 'completed',   score: 92, completedOn: 'Jan 25, 2026' },
            { id: 4,  title: 'Speaker Identification',                  status: 'completed',   score: 85, completedOn: 'Feb 03, 2026' },
            { id: 5,  title: 'Verbatim vs. Non-Verbatim',               status: 'completed',   score: 94, completedOn: 'Feb 12, 2026' },
            { id: 6,  title: 'Timestamps & Formatting',                 status: 'completed',   score: 89, completedOn: 'Feb 22, 2026' },
            { id: 7,  title: 'Handling Difficult Audio',                status: 'completed',   score: 87, completedOn: 'Mar 05, 2026' },
            { id: 8,  title: 'Professional Transcription Standards',    status: 'in-progress' },
            { id: 9,  title: 'Quality Review & Proofreading',           status: 'locked' },
            { id: 10, title: 'Final Certification Exam',                status: 'locked' },
        ],
    },
    {
        id: 'legal',
        title: 'Legal Transcription',
        color: 'var(--purple)',
        icon: 'gavel',
        totalModules: 10,
        completedModules: 3,
        overallScore: 88,
        modules: [
            { id: 1,  title: 'Introduction to Legal Transcription',     status: 'completed',   score: 91, completedOn: 'Mar 10, 2026' },
            { id: 2,  title: 'Legal Terminology Basics',                status: 'completed',   score: 86, completedOn: 'Mar 20, 2026' },
            { id: 3,  title: 'Court Proceedings & Depositions',         status: 'completed',   score: 88, completedOn: 'Apr 01, 2026' },
            { id: 4,  title: 'Legal Document Formatting',               status: 'in-progress' },
            { id: 5,  title: 'Verbatim Requirements in Legal Settings', status: 'locked' },
            { id: 6,  title: 'Handling Exhibits & Evidence',            status: 'locked' },
            { id: 7,  title: 'Confidentiality & Ethics',                status: 'locked' },
            { id: 8,  title: 'Advanced Legal Terminology',              status: 'locked' },
            { id: 9,  title: 'Mock Deposition Transcription',           status: 'locked' },
            { id: 10, title: 'Legal Certification Exam',                status: 'locked' },
        ],
    },
];

const QUIZ_RESULTS: QuizResult[] = [
    { id: 1,  quiz: 'Punctuation Quiz 1',        score: 18, total: 20, date: 'Jan 20, 2026', badge: 'A' },
    { id: 2,  quiz: 'Grammar Quiz 1',            score: 16, total: 20, date: 'Jan 28, 2026', badge: 'B+' },
    { id: 3,  quiz: 'Punctuation Quiz 2',        score: 20, total: 20, date: 'Feb 05, 2026', badge: 'A+' },
    { id: 4,  quiz: 'Grammar Quiz 2',            score: 17, total: 20, date: 'Feb 15, 2026', badge: 'A-' },
    { id: 5,  quiz: 'Punctuation Quiz 3',        score: 19, total: 20, date: 'Feb 24, 2026', badge: 'A' },
    { id: 6,  quiz: 'Grammar Quiz 3',            score: 15, total: 20, date: 'Mar 08, 2026', badge: 'B' },
    { id: 7,  quiz: 'Legal Terminology Quiz 1',  score: 17, total: 20, date: 'Mar 22, 2026', badge: 'A-' },
    { id: 8,  quiz: 'Legal Terminology Quiz 2',  score: 16, total: 20, date: 'Apr 05, 2026', badge: 'B+' },
];

const ACCURACY_HISTORY: AccuracyEntry[] = [
    { id: 1, date: 'Feb 01, 2026', score: 82, label: 'Practice Test 1' },
    { id: 2, date: 'Feb 08, 2026', score: 85, label: 'Practice Test 2' },
    { id: 3, date: 'Feb 15, 2026', score: 87, label: 'Practice Test 3' },
    { id: 4, date: 'Feb 22, 2026', score: 89, label: 'Practice Test 4' },
    { id: 5, date: 'Mar 01, 2026', score: 88, label: 'Practice Test 5' },
    { id: 6, date: 'Mar 10, 2026', score: 91, label: 'Practice Test 6' },
    { id: 7, date: 'Mar 20, 2026', score: 93, label: 'Practice Test 7' },
    { id: 8, date: 'Apr 01, 2026', score: 92, label: 'Practice Test 8' },
    { id: 9, date: 'Apr 10, 2026', score: 95, label: 'Practice Test 9' },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
    if (score >= 95) return '#16a34a';
    if (score >= 85) return 'var(--green)';
    if (score >= 75) return 'var(--orange)';
    return '#ef4444';
}

function badgeColor(badge: string) {
    if (badge.startsWith('A')) return { color: '#16a34a', bg: '#dcfce7' };
    if (badge.startsWith('B')) return { color: 'var(--blue)', bg: 'var(--blue-light)' };
    return { color: 'var(--orange)', bg: 'var(--orange-light)' };
}

// ── Progress ring ──────────────────────────────────────────────────────────────

const ProgressRing: React.FC<{ pct: number; size?: number; stroke?: number; color?: string }> = ({
    pct, size = 72, stroke = 7, color = 'var(--green)',
}) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;
    return (
        <svg width={size} height={size} style={{ flexShrink: 0 }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={color} strokeWidth={stroke}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dasharray .6s ease' }}
            />
            <text x={size / 2} y={size / 2 + 5} textAnchor="middle"
                style={{ fontSize: '14px', fontWeight: 800, fill: '#111827', fontFamily: 'Inter, sans-serif' }}>
                {pct}%
            </text>
        </svg>
    );
};

// ── Bar chart ──────────────────────────────────────────────────────────────────

const AccuracyChart: React.FC<{ data: AccuracyEntry[] }> = ({ data }) => {
    const max = 100;
    const chartH = 120;
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: chartH, paddingBottom: '0' }}>
            {data.map(entry => {
                const barH = (entry.score / max) * chartH;
                const clr = scoreColor(entry.score);
                return (
                    <div key={entry.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }} title={`${entry.label}: ${entry.score}%`}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: clr }}>{entry.score}%</span>
                        <div style={{
                            width: '100%', height: barH, borderRadius: '4px 4px 0 0',
                            background: clr, opacity: 0.85,
                            transition: 'height .4s ease',
                        }} />
                        <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>
                            {entry.date.split(',')[0].replace(/\w+ /, m => m.slice(0, 3))}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

// ── Page ───────────────────────────────────────────────────────────────────────

const ProgressTrackingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'accuracy'>('overview');
    const [expandedCourse, setExpandedCourse] = useState<string | null>('general');

    const totalCompleted = COURSES.reduce((s, c) => s + c.completedModules, 0);
    const totalModules   = COURSES.reduce((s, c) => s + c.totalModules, 0);
    const avgScore       = Math.round(COURSES.reduce((s, c) => s + c.overallScore, 0) / COURSES.length);
    const avgAccuracy    = Math.round(ACCURACY_HISTORY.reduce((s, a) => s + a.score, 0) / ACCURACY_HISTORY.length);

    const TABS = [
        { id: 'overview',  label: 'Course Progress', icon: 'school' },
        { id: 'quizzes',   label: 'Quiz Results',    icon: 'quiz' },
        { id: 'accuracy',  label: 'Accuracy Trend',  icon: 'trending_up' },
    ] as const;

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* Header */}
                    <section>
                        <PageBreadcrumb pageName="Progress" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Progress Tracking</h2>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5" style={{ color: 'var(--green)' }}>assessment</span>
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Track your learning progress, module completion, quiz scores, and accuracy improvements across all your TCI courses.
                            </p>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Modules Done"   value={`${totalCompleted}/${totalModules}`} icon="check_circle"  borderColor="var(--green)"  iconColor="var(--green)"  />
                        <BorderStatCard label="Avg Score"      value={`${avgScore}%`}                      icon="stars"         borderColor="var(--blue)"   iconColor="var(--blue)"   />
                        <BorderStatCard label="Quizzes Taken"  value={String(QUIZ_RESULTS.length)}         icon="quiz"          borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Avg Accuracy"   value={`${avgAccuracy}%`}                   icon="trending_up"   borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* Tabs */}
                    <section>
                        <div style={{
                            background: '#F4F7F6', borderRadius: '12px',
                            padding: '6px', display: 'flex', gap: '4px',
                            marginBottom: '24px', width: 'fit-content',
                        }}>
                            {TABS.map(tab => {
                                const active = activeTab === tab.id;
                                return (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        padding: '9px 18px', borderRadius: '8px', border: 'none',
                                        background: active ? '#fff' : 'transparent',
                                        color: active ? 'var(--green)' : 'var(--text-secondary)',
                                        fontWeight: active ? 700 : 500,
                                        fontSize: '13px', cursor: 'pointer',
                                        boxShadow: active ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
                                        transition: 'all .15s', fontFamily: 'inherit',
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Overview tab ── */}
                        {activeTab === 'overview' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {COURSES.map(course => {
                                    const pct = Math.round((course.completedModules / course.totalModules) * 100);
                                    const open = expandedCourse === course.id;
                                    return (
                                        <div key={course.id} style={{
                                            background: '#fff', borderRadius: '14px',
                                            border: '1.5px solid var(--border)',
                                            overflow: 'hidden',
                                            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                                        }}>
                                            {/* Course header */}
                                            <button
                                                onClick={() => setExpandedCourse(open ? null : course.id)}
                                                style={{
                                                    width: '100%', padding: '20px 24px',
                                                    background: 'none', border: 'none', cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: '16px',
                                                    fontFamily: 'inherit', textAlign: 'left',
                                                }}
                                            >
                                                <ProgressRing pct={pct} color={course.color} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: course.color }}>{course.icon}</span>
                                                        <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>{course.title}</span>
                                                    </div>
                                                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 10px' }}>
                                                        {course.completedModules} of {course.totalModules} modules completed · Overall score: <strong style={{ color: course.color }}>{course.overallScore}%</strong>
                                                    </p>
                                                    {/* Progress bar */}
                                                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${pct}%`, background: course.color, borderRadius: '99px', transition: 'width .6s ease' }} />
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined" style={{
                                                    fontSize: '22px', color: 'var(--text-secondary)',
                                                    transform: open ? 'rotate(180deg)' : 'rotate(0)',
                                                    transition: 'transform .25s',
                                                }}>expand_more</span>
                                            </button>

                                            {/* Module list */}
                                            {open && (
                                                <div style={{ borderTop: '1px solid var(--border)', padding: '8px 0 16px' }}>
                                                    {course.modules.map(mod => (
                                                        <div key={mod.id} style={{
                                                            display: 'flex', alignItems: 'center', gap: '14px',
                                                            padding: '10px 24px',
                                                            background: mod.status === 'in-progress' ? 'var(--green-light)' : 'transparent',
                                                        }}>
                                                            {/* Status icon */}
                                                            <div style={{
                                                                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                background: mod.status === 'completed' ? course.color : mod.status === 'in-progress' ? 'var(--orange-light)' : '#f1f5f9',
                                                            }}>
                                                                <span className="material-symbols-outlined" style={{
                                                                    fontSize: '15px',
                                                                    color: mod.status === 'completed' ? '#fff' : mod.status === 'in-progress' ? 'var(--orange)' : '#94a3b8',
                                                                }}>
                                                                    {mod.status === 'completed' ? 'check' : mod.status === 'in-progress' ? 'play_arrow' : 'lock'}
                                                                </span>
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <span style={{
                                                                    fontSize: '13.5px', fontWeight: mod.status === 'locked' ? 400 : 600,
                                                                    color: mod.status === 'locked' ? 'var(--text-secondary)' : 'var(--text-primary)',
                                                                }}>
                                                                    Module {mod.id}: {mod.title}
                                                                </span>
                                                                {mod.completedOn && (
                                                                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                                                                        · {mod.completedOn}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {mod.score !== undefined && (
                                                                <span style={{
                                                                    fontSize: '12.5px', fontWeight: 800,
                                                                    color: scoreColor(mod.score),
                                                                    background: '#f8faf9', padding: '2px 10px',
                                                                    borderRadius: '20px', border: '1px solid var(--border)',
                                                                }}>{mod.score}%</span>
                                                            )}
                                                            {mod.status === 'in-progress' && (
                                                                <span style={{
                                                                    fontSize: '11px', fontWeight: 700,
                                                                    color: 'var(--orange)', background: 'var(--orange-light)',
                                                                    padding: '2px 10px', borderRadius: '20px',
                                                                    border: '1px solid #fcd34d',
                                                                }}>In Progress</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ── Quiz results tab ── */}
                        {activeTab === 'quizzes' && (
                            <div style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                                {QUIZ_RESULTS.map((r, i) => {
                                    const pct = Math.round((r.score / r.total) * 100);
                                    const bc = badgeColor(r.badge);
                                    return (
                                        <div key={r.id} style={{
                                            display: 'flex', alignItems: 'center', gap: '16px',
                                            padding: '14px 24px',
                                            borderBottom: i < QUIZ_RESULTS.length - 1 ? '1px solid var(--border)' : 'none',
                                        }}>
                                            <span style={{
                                                width: 36, height: 36, borderRadius: '10px',
                                                background: bc.bg, color: bc.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 800, fontSize: '13px', flexShrink: 0,
                                            }}>{r.badge}</span>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: '0 0 2px', fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{r.quiz}</p>
                                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{r.date}</p>
                                            </div>
                                            {/* Mini bar */}
                                            <div style={{ width: 120 }}>
                                                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', marginBottom: '4px' }}>
                                                    <div style={{ height: '100%', width: `${pct}%`, background: scoreColor(pct), borderRadius: '99px' }} />
                                                </div>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                                                    {r.score}/{r.total} &nbsp;
                                                    <strong style={{ color: scoreColor(pct) }}>{pct}%</strong>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ── Accuracy trend tab ── */}
                        {activeTab === 'accuracy' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {/* Chart card */}
                                <div style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid var(--border)', padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>Accuracy Score Trend</h3>
                                            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)' }}>Based on Accuracy Assessment Tool results</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: '0 0 2px', fontSize: '22px', fontWeight: 900, color: scoreColor(ACCURACY_HISTORY[ACCURACY_HISTORY.length - 1].score) }}>
                                                {ACCURACY_HISTORY[ACCURACY_HISTORY.length - 1].score}%
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-secondary)' }}>Latest score</p>
                                        </div>
                                    </div>
                                    <AccuracyChart data={ACCURACY_HISTORY} />
                                    <div style={{ marginTop: '16px', padding: '12px', background: '#F4F7F6', borderRadius: '10px' }}>
                                        <p style={{ margin: 0, fontSize: '12.5px', color: '#1a5c47', fontWeight: 500 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '15px', verticalAlign: 'middle', marginRight: '6px', color: 'var(--green)' }}>trending_up</span>
                                            Your accuracy improved by <strong>{ACCURACY_HISTORY[ACCURACY_HISTORY.length - 1].score - ACCURACY_HISTORY[0].score}%</strong> over {ACCURACY_HISTORY.length} practice tests. Most employers require 98%+ — keep practicing!
                                        </p>
                                    </div>
                                </div>

                                {/* History table */}
                                <div style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--green)' }}>history</span>
                                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Score History</h3>
                                    </div>
                                    {[...ACCURACY_HISTORY].reverse().map((entry, i) => (
                                        <div key={entry.id} style={{
                                            display: 'flex', alignItems: 'center', gap: '16px',
                                            padding: '12px 24px',
                                            borderBottom: i < ACCURACY_HISTORY.length - 1 ? '1px solid var(--border)' : 'none',
                                        }}>
                                            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', minWidth: 100 }}>{entry.date}</span>
                                            <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{entry.label}</span>
                                            <div style={{ width: 100 }}>
                                                <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', marginBottom: '3px' }}>
                                                    <div style={{ height: '100%', width: `${entry.score}%`, background: scoreColor(entry.score), borderRadius: '99px' }} />
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 800, fontSize: '13px', color: scoreColor(entry.score), minWidth: 40, textAlign: 'right' }}>{entry.score}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default ProgressTrackingPage;
