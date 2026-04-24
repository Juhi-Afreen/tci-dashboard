import React, { useRef } from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Helpers ────────────────────────────────────────────────────────────────────

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const Avatar: React.FC<{ initials: string; size?: number }> = ({ initials, size = 44 }) => (
    <div
        style={{
            width: size, height: size, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
        }}
    >
        {initials}
    </div>
);

const ProgressRing: React.FC<{ pct: number; size?: number; stroke?: number; color?: string }> = ({
    pct, size = 52, stroke = 4, color = 'var(--green)',
}) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <svg width={size} height={size} style={{ flexShrink: 0 }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
                strokeWidth={stroke} strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset .6s ease' }}
            />
            <text x={size / 2} y={size / 2 + 4} textAnchor="middle"
                fontSize={size * 0.24} fontWeight={700} fill="var(--text-primary)">
                {pct}%
            </text>
        </svg>
    );
};

// ── Stat cards ─────────────────────────────────────────────────────────────────

const LessonsBarChart: React.FC<{ color: string; bg: string }> = ({ color, bg }) => {
    const bars = [18, 20, 19, 21, 22, 21, 24];
    const max = Math.max(...bars);
    const VW = 220; const VH = 52; const n = bars.length;
    const bw = 22; const gap = (VW - n * bw) / (n - 1);
    return (
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="52" preserveAspectRatio="none">
            {bars.map((v, i) => {
                const bh = Math.max(4, Math.round((v / max) * VH));
                const isLast = i === n - 1;
                return <rect key={i} x={i * (bw + gap)} y={VH - bh} width={bw} height={bh} rx={4} fill={isLast ? color : bg} />;
            })}
        </svg>
    );
};

const StreakGrid: React.FC<{ color: string; bg: string }> = ({ color, bg }) => {
    // 2 rows × 7 cols = 14 days, last 12 active
    const active = [0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const cols = 7; const VW = 220; const VH = 44;
    const tw = (VW - (cols - 1) * 6) / cols; const th = (VH - 6) / 2;
    return (
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="44" preserveAspectRatio="none">
            {active.map((on, i) => {
                const col = i % cols; const row = Math.floor(i / cols);
                return <rect key={i} x={col * (tw + 6)} y={row * (th + 6)} width={tw} height={th} rx={4} fill={on ? color : bg} />;
            })}
        </svg>
    );
};

const StudySparkline: React.FC<{ color: string; bg: string }> = ({ color }) => {
    const pts = [4.5, 5, 3.5, 6, 5.5, 7, 6];
    const max = Math.max(...pts); const min = Math.min(...pts);
    const VW = 220; const VH = 52; const n = pts.length;
    const x = (i: number) => (i / (n - 1)) * VW;
    const y = (v: number) => VH - ((v - min) / (max - min || 1)) * (VH - 12) - 6;
    const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const area = `${line} L${VW},${VH} L0,${VH} Z`;
    return (
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="52" preserveAspectRatio="none">
            <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            <path d={area} fill="url(#sparkGrad)" />
            <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={x(n - 1)} cy={y(pts[n - 1])} r={4.5} fill="#fff" stroke={color} strokeWidth={2.5} />
        </svg>
    );
};

const AccuracyDonut: React.FC<{ pct: number; color: string }> = ({ pct, color }) => {
    const size = 72; const stroke = 8; const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <svg width={size} height={size}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color + '18'} strokeWidth={stroke} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
                strokeWidth={stroke} strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`} />
            <text x={size / 2} y={size / 2 + 5} textAnchor="middle"
                fontSize={15} fontWeight={800} fill="var(--text-primary)">{pct}%</text>
        </svg>
    );
};

const STATS = [
    { key: 'lessons', icon: 'menu_book', label: 'Lessons Completed', value: '24', unit: '', sub: '+3 this week', color: '#3B82F6', bg: '#EFF6FF' },
    { key: 'streak', icon: 'local_fire_department', label: 'Day Streak', value: '12', unit: 'days', sub: 'Keep it up!', color: '#F97316', bg: '#FFF3EB' },
    { key: 'hours', icon: 'schedule', label: 'Study Hours', value: '48.5', unit: 'hrs', sub: '6h this week', color: '#A855F7', bg: '#F5F0FF' },
    { key: 'accuracy', icon: 'track_changes', label: 'Accuracy Score', value: '94', unit: '%', sub: '↑ 2% vs last', color: '#36C5D9', bg: '#E8FAFB' },
];

const StatCard: React.FC<typeof STATS[0]> = ({ key: _k, icon, label, value, unit, sub, color, bg }) => {
    const isAccuracy = label === 'Accuracy Score';
    const trendUp = sub.startsWith('+') || sub.startsWith('↑');
    return (
        <div style={{
            background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
            {/* Top: icon + label + trend pill */}
            <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10, background: bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                         <Icon icon={icon} style={{ fontSize: 18, color }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
                </div>
                <span style={{
                    fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 9px',
                    background: trendUp ? '#D1FAE5' : bg,
                    color: trendUp ? '#065F46' : color,
                    whiteSpace: 'nowrap',
                }}>{sub}</span>
            </div>

            {/* Middle: value + donut (for accuracy) */}
            <div style={{ padding: '0 18px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                        {value}
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 4 }}>{unit}</span>
                    </p>
                </div>
                {isAccuracy && <AccuracyDonut pct={Number(value)} color={color} />}
            </div>

            {/* Bottom: full-bleed chart strip */}
            <div style={{ padding: '10px 18px 12px' }}>
                {label === 'Lessons Completed' && <LessonsBarChart color={color} bg={bg} />}
                {label === 'Day Streak' && <StreakGrid color={color} bg={bg} />}
                {label === 'Study Hours' && <StudySparkline color={color} bg={bg} />}
                {isAccuracy && (
                    <div style={{ display: 'flex', gap: 6 }}>
                        {[88, 91, 89, 93, 92, 94].map((v, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                <div style={{
                                    height: 4, width: '100%', borderRadius: 2,
                                    background: i === 5 ? color : color + '35',
                                }} />
                                <span style={{ fontSize: 9, color: i === 5 ? color : 'var(--text-muted)', fontWeight: i === 5 ? 700 : 400 }}>{v}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Continue learning ──────────────────────────────────────────────────────────

const COURSES = [
    {
        id: 'general',
        title: 'General Transcription Course',
        currentLesson: 'Timestamping Techniques',
        module: 'Module 3 · Lesson 4',
        progress: 60,
        completedLessons: 12,
        totalLessons: 20,
        color: '#3B82F6',
        bg: '#EFF6FF',
        icon: 'history_edu',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/general-transcription-bg.webp',
    },
    {
        id: 'legal',
        title: 'Legal Transcription Course',
        currentLesson: 'Deposition Formatting',
        module: 'Module 2 · Lesson 3',
        progress: 25,
        completedLessons: 7,
        totalLessons: 28,
        color: '#7C6FCD',
        bg: '#EEF0FF',
        icon: 'gavel',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/legal-transcription-bg.webp',
    },
];

const ContinueLearningCard: React.FC<typeof COURSES[0] & { onResume: () => void; onViewAll: () => void }> = ({
    title, currentLesson, module, progress, completedLessons, totalLessons,
    color, bg, icon, image, onResume, onViewAll,
}) => (
    <div style={{
        background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
        {/* Course image banner */}
        <div style={{
            height: 150, backgroundImage: `url('${image}')`,
            backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative',
        }}>
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)',
            }} />
            <span style={{
                position: 'absolute', top: 10, left: 12,
                fontSize: 10, fontWeight: 700, background: 'var(--green)', color: '#fff',
                borderRadius: 20, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: 0.5,
            }}>
                Active
            </span>
        </div>

        <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</p>
            </div>

            {/* Progress bar */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {completedLessons} / {totalLessons} lessons completed
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>{progress}%</span>
                </div>
                <div style={{ height: 5, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'var(--green)', borderRadius: 4 }} />
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <button
                    onClick={onResume}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'none', border: 'none', padding: 0,
                        color: 'var(--green)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}
                >
                    <div style={{
                        background: 'var(--green-light)', borderRadius: 8,
                        width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Icon icon="play_circle" />
                    </div>
                    Resume Lesson
                    <Icon icon="arrow_forward" />
                </button>
                <button
                    onClick={onViewAll}
                    style={{
                        background: 'none', border: 'none', fontSize: 12,
                        fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer',
                    }}
                >
                    All Lessons
                </button>
            </div>
        </div>
    </div>
);

// ── Quick access ───────────────────────────────────────────────────────────────

const QUICK_LINKS = [
    { icon: 'track_changes', label: 'Accuracy Tool', sub: 'Test your transcript', to: '/tools/accuracy', color: '#1F8F6D', bg: '#E8F5F1' },
    { icon: 'work', label: 'Job Board', sub: 'Browse open positions', to: '/tools/job-board', color: '#3B82F6', bg: '#EFF6FF' },
    { icon: 'forum', label: 'Discussions', sub: 'Join the community', to: '/tools/discussions', color: '#7C6FCD', bg: '#EEF0FF' },
    { icon: 'assessment', label: 'My Progress', sub: 'View detailed report', to: '/progress', color: '#F59E0B', bg: '#FEF3C7' },
    { icon: 'spellcheck', label: 'Grammar Quizzes', sub: 'Practice your grammar', to: '/resources/quizzes', color: '#F43F5E', bg: '#FFF1F4' },
    { icon: 'keyboard', label: 'Practice Files', sub: '26 audio exercises', to: '/resources/practice', color: '#06B6D4', bg: '#ECFEFF' },
];

// ── Recent activity ────────────────────────────────────────────────────────────

const ACTIVITY = [
    { icon: 'check_circle', color: '#1F8F6D', text: 'Completed "Speaker Identification Rules"', time: '2h ago' },
    { icon: 'quiz', color: '#F59E0B', text: 'Scored 88% on Module 2 Quiz', time: '5h ago' },
    { icon: 'keyboard', color: '#3B82F6', text: 'Submitted Practice File #14', time: 'Yesterday' },
    { icon: 'forum', color: '#7C6FCD', text: 'Replied to "Best foot pedal for beginners"', time: '2 days ago' },
    { icon: 'star', color: '#F97316', text: 'Earned 12-day streak badge', time: '2 days ago' },
];

// ── Course Library ─────────────────────────────────────────────────────────────

const LIBRARY_COURSES = [
    {
        title: 'General Transcription Course',
        desc: 'Master the art of general transcription with our comprehensive program.',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/general-transcription-bg.webp',
        badge: 'Included' as const,
    },
    {
        title: 'Legal Transcription Course',
        desc: 'Specialized training for legal transcriptionists and court reporters.',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/legal-transcription-bg.webp',
        badge: 'Included' as const,
    },
    {
        title: 'AAERT CET Prep Course',
        desc: 'Exam preparation for the American Association of Electronic Reporters and Transcribers.',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/aaert-course-bg.webp',
        badge: 'Add-On' as const,
    },
    {
        title: 'Realtime Captioning Basics',
        desc: 'Introductory modules on realtime captioning workflows and tools.',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/general-transcription-bg.webp',
        badge: 'Included' as const,
    },
    {
        title: 'Medical Transcription Essentials',
        desc: 'Practice medical terminology, dictation styles, and formatting.',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/legal-transcription-bg.webp',
        badge: 'Included' as const,
    },
    {
        title: 'Advanced Punctuation Workshop',
        desc: 'Deep dive into style guides, punctuation rules, and edge cases.',
        image: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/aaert-course-bg.webp',
        badge: 'Add-On' as const,
    },
];

// ── Main component ─────────────────────────────────────────────────────────────

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const carouselRef = useRef<HTMLDivElement>(null);

    // Auto-generate today's goals from active course progress
    const autoGoals = [
        ...COURSES.map(c => ({
            icon: 'play_circle',
            color: c.color,
            bg: c.bg,
            text: `Resume "${c.currentLesson}"`,
            sub: `${c.module} · ${c.title}`,
            done: false,
        })),
        {
            icon: 'keyboard',
            color: '#3B82F6',
            bg: '#EFF6FF',
            text: 'Complete a practice transcription',
            sub: 'Daily practice · 15 min',
            done: true,
        },
        {
            icon: 'track_changes',
            color: '#1F8F6D',
            bg: '#E8F5F1',
            text: 'Check your accuracy report',
            sub: 'Last score: 94%',
            done: false,
        },
    ];
    const doneCount = autoGoals.filter(g => g.done).length;

    const scrollCarousel = (dir: 'prev' | 'next') => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: dir === 'next' ? 320 : -320, behavior: 'smooth' });
        }
    };

    return (
        <DashboardLayout>
            <main className="page-content">
                <div style={{ padding: '32px 32px 48px' }}>
                    <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>

                        {/* ── GREETING ────────────────────────────────────────── */}
                        <div>
                            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text-primary)' }}>
                                {getGreeting()}, Juhi 👋
                            </h2>
                            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', maxWidth: 480 }}>
                                You're making great progress! Complete your profile to unlock personalized course recommendations.
                            </p>
                        </div>

                        {/* ── STATS ───────────────────────────────────────────── */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                            {STATS.map(s => <StatCard key={s.key} icon={s.icon} label={s.label} value={s.value} unit={s.unit} sub={s.sub} color={s.color} bg={s.bg} />)}
                        </div>

                        {/* ── MAIN GRID ───────────────────────────────────────── */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>

                            {/* LEFT column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>

                                {/* Continue Learning */}
                                <section>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>
                                            Continue Learning
                                        </h3>
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); navigate('/courses/general/lessons'); }}
                                            style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', textDecoration: 'none' }}
                                            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                                            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                                        >
                                            View All
                                        </a>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        {COURSES.map(course => (
                                            <ContinueLearningCard
                                                key={course.id}
                                                {...course}
                                                onResume={() => navigate(`/courses/${course.id}/lessons/${course.id === 'legal' ? 8 : 13}`)}
                                                onViewAll={() => navigate(`/courses/${course.id}/lessons`)}
                                            />
                                        ))}
                                    </div>
                                </section>

                                {/* ── COURSE LIBRARY CAROUSEL ─────────────────────── */}
                                <section>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>
                                            Course Library
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <button type="button" className="course-carousel-btn" onClick={() => scrollCarousel('prev')} aria-label="Previous courses">
                                                <Icon icon="chevron_left" />
                                            </button>
                                            <button type="button" className="course-carousel-btn" onClick={() => scrollCarousel('next')} aria-label="Next courses">
                                                <Icon icon="chevron_right" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="course-carousel-viewport" ref={carouselRef}>
                                        <div className="course-carousel-track">
                                            {LIBRARY_COURSES.map((c, i) => (
                                                <div key={i} className="course-card-item" style={{
                                                    background: '#fff', border: '1px solid var(--border)', borderRadius: 16,
                                                    overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                                    display: 'flex', flexDirection: 'column',
                                                }}>
                                                    <div style={{
                                                        height: 144, backgroundImage: `url('${c.image}')`,
                                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                                    }} />
                                                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                        <h5 style={{
                                                            margin: '0 0 4px', fontSize: 13, fontWeight: 700,
                                                            color: c.badge === 'Add-On' ? 'var(--text-secondary)' : 'var(--text-primary)',
                                                        }}>{c.title}</h5>
                                                        <p style={{
                                                            margin: 0, fontSize: 11, lineHeight: 1.5, flex: 1,
                                                            color: c.badge === 'Add-On' ? '#94A3B8' : 'var(--text-secondary)',
                                                        }}>{c.desc}</p>
                                                        <div style={{ marginTop: 12 }}>
                                                            {c.badge === 'Included' ? (
                                                                <span style={{
                                                                    display: 'inline-block', fontSize: 10, fontWeight: 700,
                                                                    color: 'var(--green)', background: 'var(--green-light)',
                                                                    border: '1px solid #B6DDD4', padding: '2px 10px',
                                                                    borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5,
                                                                }}>Included</span>
                                                            ) : (
                                                                <span style={{
                                                                    display: 'inline-block', fontSize: 10, fontWeight: 700,
                                                                    color: '#64748B', background: '#F1F5F9',
                                                                    border: '1px solid #E2E8F0', padding: '2px 10px',
                                                                    borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5,
                                                                }}>Add-On</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* ── RECENT ACTIVITY ─────────────────────────────── */}
                                <section>
                                    <h3 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>
                                        Recent Activity
                                    </h3>
                                    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                                        {ACTIVITY.map((a, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 14,
                                                    padding: '13px 18px',
                                                    borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border)' : 'none',
                                                }}
                                            >
                                                <div style={{
                                                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                                                    background: a.color + '18',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                     <Icon icon={a.icon} style={{ fontSize: 17, color: a.color }} />
                                                </div>
                                                <p style={{ margin: 0, flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{a.text}</p>
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{a.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* RIGHT column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                                {/* Profile completion */}
                                <div style={{
                                    background: '#fff', border: '1px solid var(--border)',
                                    borderRadius: 12, padding: '20px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <ProgressRing pct={11} size={56} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                                                Profile Completion
                                            </p>
                                            <p style={{ margin: '3px 0 10px', fontSize: 12, color: 'var(--text-secondary)' }}>
                                                Add a bio, CV and photo to unlock recommendations.
                                            </p>
                                            <button
                                                onClick={() => navigate('/settings')}
                                                style={{
                                                    background: 'var(--green)', color: '#fff', border: 'none',
                                                    borderRadius: 7, padding: '7px 14px',
                                                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                                }}
                                            >
                                                Complete Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Today's goals */}
                                <div style={{
                                    background: '#fff', border: '1px solid #E2E8F0',
                                    borderRadius: 16, padding: '20px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                                            Today's Goals
                                        </h3>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, borderRadius: 4,
                                            padding: '2px 8px',
                                            background: '#DCFCE7', color: '#16A34A',
                                        }}>
                                            {doneCount}/{autoGoals.length} Done
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        {autoGoals.map((goal, i) => {
                                            const firstUndone = autoGoals.findIndex(g => !g.done);
                                            const isUpNext = !goal.done && i === firstUndone;
                                            if (goal.done) {
                                                return (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div style={{
                                                            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                                            background: 'var(--green)', display: 'flex',
                                                            alignItems: 'center', justifyContent: 'center',
                                                        }}>
                                                            <Icon icon="check" style={{ color: '#ffffff', fontSize: 11, lineHeight: 1, display: 'block' }} />
                                                        </div>
                                                        <span style={{
                                                            fontSize: 14, color: '#94A3B8',
                                                            textDecoration: 'line-through',
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                        }}>{goal.text}</span>
                                                    </div>
                                                );
                                            }
                                            if (isUpNext) {
                                                return (
                                                    <div key={i} style={{
                                                        display: 'flex', alignItems: 'center', gap: 12,
                                                        padding: '10px', margin: '0 -10px',
                                                        borderRadius: 12,
                                                        background: 'rgba(255,203,68,0.10)',
                                                        borderLeft: '3px solid #FFCB44',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                                    }}>
                                                        <div style={{
                                                            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                                            border: '2px solid #FFCB44', background: '#fff',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        }}>
                                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFCB44' }} />
                                                        </div>
                                                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                            <span style={{
                                                                fontSize: 14, fontWeight: 700, color: '#1E293B',
                                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            }}>{goal.text}</span>
                                                            <span style={{ fontSize: 9, fontWeight: 700, color: '#DBAB2C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Up Next</span>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{
                                                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                                        border: '2px solid #CBD5E1', background: '#fff',
                                                    }} />
                                                    <span style={{
                                                        fontSize: 14, color: '#64748B',
                                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                    }}>{goal.text}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Learning Plan */}
                                <div style={{
                                    background: 'linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%)',
                                    borderRadius: 14, padding: '20px',
                                    flex: 1, display: 'flex', flexDirection: 'column',
                                }}>
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fff' }}>Learning Plan</h3>
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                                                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
                                                borderRadius: 5, padding: '2px 7px',
                                            }}>April</span>
                                        </div>
                                        <button onClick={() => navigate('/schedule')} style={{
                                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                                            color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center',
                                        }}>
                                            <Icon icon="calendar_today" />
                                        </button>
                                    </div>

                                    {/* Week grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 28, position: 'relative' }}>
                                        {[
                                            { label: 'M', day: 14, past: true },
                                            { label: 'T', day: 15, past: true },
                                            { label: 'W', day: 16, past: true },
                                            { label: 'T', day: 17, past: true },
                                            { label: 'F', day: 18, today: true },
                                            { label: 'S', day: 19, eventDot: 'rgba(255,255,255,0.9)' },
                                            { label: 'S', day: 20, eventDot: '#FFCB44' },
                                        ].map((d, i) => (
                                            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                                                <p style={{
                                                    margin: '0 0 4px', fontSize: 8, fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    color: d.today ? '#FFCB44' : 'rgba(255,255,255,0.6)',
                                                }}>{d.label}</p>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 8, margin: '0 auto',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 10, fontWeight: 700,
                                                    ...(d.past ? {
                                                        background: 'rgba(255,255,255,0.2)', color: '#fff',
                                                        border: '1px solid rgba(255,255,255,0.3)',
                                                    } : d.today ? {
                                                        background: '#FFCB44', color: '#fff',
                                                        boxShadow: '0 2px 8px -2px rgba(255,203,68,0.6)',
                                                    } : {
                                                        background: 'transparent', color: 'rgba(255,255,255,0.6)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                    }),
                                                }}>
                                                    {d.past
                                                        ? <Icon icon="check" />
                                                        : d.day}
                                                </div>
                                                {(d.today || d.eventDot) && (
                                                    <div style={{
                                                        position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
                                                        width: 4, height: 4, borderRadius: '50%',
                                                        background: d.today ? '#FFCB44' : d.eventDot,
                                                    }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Upcoming events */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); navigate('/schedule'); }}
                                            style={{
                                                display: 'block', padding: '12px 14px',
                                                background: 'rgba(255,255,255,0.15)',
                                                backdropFilter: 'blur(4px)',
                                                borderRadius: 10,
                                                borderLeft: '3px solid rgba(255,255,255,0.8)',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#fff' }}>
                                                        Interactive Live Q&amp;A
                                                    </p>
                                                    <p style={{ margin: '4px 0 0', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Icon icon="event" />
                                                        Tomorrow at 2:00 PM
                                                    </p>
                                                </div>
                                                <div style={{
                                                    width: 20, height: 20, borderRadius: '50%',
                                                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}>
                                                    <Icon icon="arrow_outward" style={{ color: '#ffffff', fontSize: 12, lineHeight: 1, display: 'block' }} />
                                                </div>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); navigate('/assignments'); }}
                                            style={{
                                                display: 'block', padding: '12px 14px',
                                                background: 'rgba(255,255,255,0.10)',
                                                borderRadius: 10,
                                                borderLeft: '3px solid #FFCB44',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#fff' }}>
                                                        Module 3 Assignment Due
                                                    </p>
                                                    <p style={{ margin: '4px 0 0', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Icon icon="assignment" />
                                                        Sunday, Apr 20
                                                    </p>
                                                </div>
                                                <div style={{
                                                    width: 20, height: 20, borderRadius: '50%',
                                                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}>
                                                    <Icon icon="arrow_outward" style={{ color: '#ffffff', fontSize: 12, lineHeight: 1, display: 'block' }} />
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default DashboardPage;
