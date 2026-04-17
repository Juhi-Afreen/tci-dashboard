import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';

// ── Types ──────────────────────────────────────────────────────────────────────

type LessonStatus = 'completed' | 'in-progress' | 'locked';
type LessonType = 'video' | 'reading' | 'quiz' | 'practice' | 'assignment';

interface Lesson {
    id: number;
    title: string;
    type: LessonType;
    duration: string;
    status: LessonStatus;
}

interface Module {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
}

interface CourseData {
    id: string;
    title: string;
    subtitle: string;
    totalLessons: number;
    completedLessons: number;
    currentModule: number;
    currentLesson: number;
    modules: Module[];
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const COURSES: Record<string, CourseData> = {
    general: {
        id: 'general',
        title: 'General Transcription Course',
        subtitle: 'Master professional transcription at your own pace.',
        totalLessons: 32,
        completedLessons: 12,
        currentModule: 3,
        currentLesson: 4,
        modules: [
            {
                id: 1,
                title: 'Module 1 — Transcription Fundamentals',
                description: 'The core skills and tools every transcriptionist needs.',
                lessons: [
                    { id: 1, title: 'Welcome & Course Overview', type: 'video', duration: '5 min', status: 'completed' },
                    { id: 2, title: 'What is Transcription?', type: 'reading', duration: '8 min', status: 'completed' },
                    { id: 3, title: 'Tools & Software Setup', type: 'video', duration: '14 min', status: 'completed' },
                    { id: 4, title: 'Keyboard Shortcuts & Foot Pedals', type: 'video', duration: '10 min', status: 'completed' },
                    { id: 5, title: 'Module 1 Quiz', type: 'quiz', duration: '15 min', status: 'completed' },
                ],
            },
            {
                id: 2,
                title: 'Module 2 — Grammar & Punctuation',
                description: 'Punctuation rules and grammar patterns specific to transcription.',
                lessons: [
                    { id: 6, title: 'Punctuation in Spoken Language', type: 'video', duration: '12 min', status: 'completed' },
                    { id: 7, title: 'Commas, Dashes & Ellipses', type: 'reading', duration: '10 min', status: 'completed' },
                    { id: 8, title: 'Commonly Confused Words', type: 'reading', duration: '8 min', status: 'completed' },
                    { id: 9, title: 'Practice: Punctuation Exercise', type: 'practice', duration: '20 min', status: 'completed' },
                    { id: 10, title: 'Module 2 Quiz', type: 'quiz', duration: '15 min', status: 'completed' },
                ],
            },
            {
                id: 3,
                title: 'Module 3 — Advanced Formatting',
                description: 'Speaker identification, timestamps, and formatting standards.',
                lessons: [
                    { id: 11, title: 'Speaker Identification Rules', type: 'video', duration: '11 min', status: 'completed' },
                    { id: 12, title: 'Verbatim vs. Clean Read', type: 'video', duration: '9 min', status: 'completed' },
                    { id: 13, title: 'Timestamping Techniques', type: 'video', duration: '15 min', status: 'in-progress' },
                    { id: 14, title: 'Formatting Templates', type: 'reading', duration: '7 min', status: 'locked' },
                    { id: 15, title: 'Practice: Formatting Exercise', type: 'practice', duration: '25 min', status: 'locked' },
                    { id: 16, title: 'Module 3 Quiz', type: 'quiz', duration: '20 min', status: 'locked' },
                ],
            },
            {
                id: 4,
                title: 'Module 4 — Handling Difficult Audio',
                description: 'Techniques for accents, cross-talk, and poor quality recordings.',
                lessons: [
                    { id: 17, title: 'Identifying Audio Quality Issues', type: 'video', duration: '10 min', status: 'locked' },
                    { id: 18, title: 'Accents & Dialects', type: 'reading', duration: '8 min', status: 'locked' },
                    { id: 19, title: 'Cross-Talk & Overlapping Speech', type: 'video', duration: '13 min', status: 'locked' },
                    { id: 20, title: 'Practice: Difficult Audio Set', type: 'practice', duration: '30 min', status: 'locked' },
                    { id: 21, title: 'Module 4 Quiz', type: 'quiz', duration: '20 min', status: 'locked' },
                ],
            },
            {
                id: 5,
                title: 'Module 5 — Professional Practice & Certification',
                description: 'Building your career and preparing for the TCI certification exam.',
                lessons: [
                    { id: 22, title: 'Finding Clients & Platforms', type: 'video', duration: '14 min', status: 'locked' },
                    { id: 23, title: 'Building a Transcription Portfolio', type: 'reading', duration: '10 min', status: 'locked' },
                    { id: 24, title: 'Rates & Contracts', type: 'reading', duration: '8 min', status: 'locked' },
                    { id: 25, title: 'Capstone Practice Project', type: 'assignment', duration: '60 min', status: 'locked' },
                    { id: 26, title: 'Final Exam Prep', type: 'reading', duration: '12 min', status: 'locked' },
                ],
            },
        ],
    },
    legal: {
        id: 'legal',
        title: 'Legal Transcription Course',
        subtitle: 'Specialize in legal terminology, court proceedings, and depositions.',
        totalLessons: 28,
        completedLessons: 7,
        currentModule: 2,
        currentLesson: 3,
        modules: [
            {
                id: 1,
                title: 'Module 1 — Legal Foundations',
                description: 'Core legal concepts and terminology every legal transcriptionist must know.',
                lessons: [
                    { id: 1, title: 'Introduction to Legal Transcription', type: 'video', duration: '8 min', status: 'completed' },
                    { id: 2, title: 'The Court System Overview', type: 'reading', duration: '12 min', status: 'completed' },
                    { id: 3, title: 'Legal Terminology Part 1', type: 'video', duration: '15 min', status: 'completed' },
                    { id: 4, title: 'Legal Terminology Part 2', type: 'reading', duration: '10 min', status: 'completed' },
                    { id: 5, title: 'Module 1 Quiz', type: 'quiz', duration: '15 min', status: 'completed' },
                ],
            },
            {
                id: 2,
                title: 'Module 2 — Depositions & Court Hearings',
                description: 'Formatting and transcribing depositions, hearings, and testimonies.',
                lessons: [
                    { id: 6, title: 'Anatomy of a Deposition', type: 'video', duration: '13 min', status: 'completed' },
                    { id: 7, title: 'Speaker Identification in Depositions', type: 'video', duration: '11 min', status: 'completed' },
                    { id: 8, title: 'Deposition Formatting', type: 'reading', duration: '9 min', status: 'in-progress' },
                    { id: 9, title: 'Practice: Sample Deposition', type: 'practice', duration: '35 min', status: 'locked' },
                    { id: 10, title: 'Module 2 Quiz', type: 'quiz', duration: '20 min', status: 'locked' },
                ],
            },
            {
                id: 3,
                title: 'Module 3 — Legal Document Formatting',
                description: 'Standards for pleadings, motions, and court documents.',
                lessons: [
                    { id: 11, title: 'Exhibit References & Indexing', type: 'video', duration: '10 min', status: 'locked' },
                    { id: 12, title: 'Formatting Styles: Q&A vs. Narrative', type: 'reading', duration: '8 min', status: 'locked' },
                    { id: 13, title: 'Page Numbering & Line Numbering', type: 'video', duration: '7 min', status: 'locked' },
                    { id: 14, title: 'Practice: Full Court Hearing', type: 'practice', duration: '45 min', status: 'locked' },
                    { id: 15, title: 'Module 3 Quiz', type: 'quiz', duration: '20 min', status: 'locked' },
                ],
            },
            {
                id: 4,
                title: 'Module 4 — Specialization & Career',
                description: 'Working with law firms, agencies, and building a legal transcription career.',
                lessons: [
                    { id: 16, title: 'Working with Law Firms', type: 'video', duration: '12 min', status: 'locked' },
                    { id: 17, title: 'Confidentiality & Ethics', type: 'reading', duration: '8 min', status: 'locked' },
                    { id: 18, title: 'Rates & Billing for Legal Work', type: 'reading', duration: '7 min', status: 'locked' },
                    { id: 19, title: 'Capstone: Full Case Transcript', type: 'assignment', duration: '90 min', status: 'locked' },
                    { id: 20, title: 'Final Exam Prep', type: 'reading', duration: '10 min', status: 'locked' },
                ],
            },
        ],
    },
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const typeConfig: Record<LessonType, { icon: string; label: string; color: string; bg: string }> = {
    video:      { icon: 'play_circle', label: 'Video',      color: '#3B82F6', bg: '#EFF6FF' },
    reading:    { icon: 'menu_book',   label: 'Reading',    color: '#7C6FCD', bg: '#EEF0FF' },
    quiz:       { icon: 'quiz',        label: 'Quiz',       color: '#F59E0B', bg: '#FEF3C7' },
    practice:   { icon: 'keyboard',    label: 'Practice',   color: '#1F8F6D', bg: '#E8F5F1' },
    assignment: { icon: 'assignment',  label: 'Assignment', color: '#F43F5E', bg: '#FFF1F4' },
};

const statusConfig: Record<LessonStatus, { icon: string; color: string; label: string }> = {
    completed:   { icon: 'check_circle', color: '#1F8F6D', label: 'Completed'   },
    'in-progress': { icon: 'play_arrow',  color: '#3B82F6', label: 'In Progress' },
    locked:      { icon: 'lock',         color: '#9CA3AF', label: 'Locked'      },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const ProgressRing: React.FC<{ pct: number; size?: number; stroke?: number }> = ({
    pct,
    size = 56,
    stroke = 5,
}) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);
    return (
        <svg width={size} height={size} style={{ flexShrink: 0 }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="var(--green)"
                strokeWidth={stroke}
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset .6s ease' }}
            />
            <text
                x={size / 2}
                y={size / 2 + 4}
                textAnchor="middle"
                fontSize={size * 0.22}
                fontWeight={700}
                fill="var(--text-primary)"
            >
                {pct}%
            </text>
        </svg>
    );
};

interface LessonRowProps {
    lesson: Lesson;
    isCurrentLesson: boolean;
    onStart: (lesson: Lesson) => void;
}

const LessonRow: React.FC<LessonRowProps> = ({ lesson, isCurrentLesson, onStart }) => {
    const type = typeConfig[lesson.type];
    const status = statusConfig[lesson.status];
    const locked = lesson.status === 'locked';

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '13px 18px',
                borderBottom: '1px solid var(--border)',
                background: isCurrentLesson ? 'var(--green-light)' : locked ? '#FAFAFA' : '#fff',
                opacity: locked ? 0.7 : 1,
                transition: 'background .15s',
                cursor: locked ? 'default' : 'pointer',
            }}
            onClick={() => !locked && onStart(lesson)}
        >
            {/* Type icon */}
            <div
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: type.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: type.color }}>
                    {type.icon}
                </span>
            </div>

            {/* Title + meta */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: isCurrentLesson ? 700 : 600,
                        color: locked ? 'var(--text-muted)' : 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {lesson.title}
                    {isCurrentLesson && (
                        <span
                            style={{
                                marginLeft: 8,
                                fontSize: 10,
                                fontWeight: 700,
                                background: 'var(--green)',
                                color: '#fff',
                                borderRadius: 20,
                                padding: '2px 8px',
                                verticalAlign: 'middle',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Current
                        </span>
                    )}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
                    {type.label} · {lesson.duration}
                </p>
            </div>

            {/* Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: status.color }}>
                    {status.icon}
                </span>
                <span style={{ fontSize: 12, color: status.color, fontWeight: 600 }}>{status.label}</span>
            </div>

            {/* Action */}
            {!locked && (
                <button
                    onClick={e => { e.stopPropagation(); onStart(lesson); }}
                    style={{
                        flexShrink: 0,
                        padding: '6px 14px',
                        borderRadius: 7,
                        border: 'none',
                        background: isCurrentLesson ? 'var(--green)' : 'var(--green-light)',
                        color: isCurrentLesson ? '#fff' : 'var(--green)',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                    }}
                >
                    {lesson.status === 'completed' ? 'Review' : lesson.status === 'in-progress' ? 'Resume' : 'Start'}
                </button>
            )}
        </div>
    );
};

interface ModuleCardProps {
    module: Module;
    defaultOpen: boolean;
    currentModuleId: number;
    currentLessonId: number;
    onStartLesson: (lesson: Lesson) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
    module,
    defaultOpen,
    currentModuleId,
    currentLessonId,
    onStartLesson,
}) => {
    const [open, setOpen] = useState(defaultOpen);
    const completed = module.lessons.filter(l => l.status === 'completed').length;
    const total = module.lessons.length;
    const pct = Math.round((completed / total) * 100);
    const allDone = completed === total;
    const allLocked = module.lessons.every(l => l.status === 'locked');

    return (
        <div
            style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <button
                onClick={() => setOpen(v => !v)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '18px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                {/* Mini progress ring */}
                <ProgressRing pct={pct} size={48} stroke={4} />

                {/* Title + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                            {module.title}
                        </p>
                        {allDone && (
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    background: '#D1FAE5',
                                    color: '#065F46',
                                    borderRadius: 20,
                                    padding: '2px 8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                }}
                            >
                                Complete
                            </span>
                        )}
                        {allLocked && (
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    background: '#F3F4F6',
                                    color: 'var(--text-muted)',
                                    borderRadius: 20,
                                    padding: '2px 8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                }}
                            >
                                Locked
                            </span>
                        )}
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
                        {module.description} · {completed}/{total} lessons
                    </p>
                </div>

                {/* Chevron */}
                <span
                    className="material-symbols-outlined"
                    style={{
                        fontSize: 20,
                        color: 'var(--text-muted)',
                        transition: 'transform .2s',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                    }}
                >
                    expand_more
                </span>
            </button>

            {/* Lessons list */}
            {open && (
                <div style={{ borderTop: '1px solid var(--border)' }}>
                    {module.lessons.map(lesson => (
                        <LessonRow
                            key={lesson.id}
                            lesson={lesson}
                            isCurrentLesson={
                                module.id === currentModuleId && lesson.id === currentLessonId
                            }
                            onStart={onStartLesson}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Main page ──────────────────────────────────────────────────────────────────

const CourseLessonsPage: React.FC = () => {
    const { courseId = 'general' } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const course = COURSES[courseId] ?? COURSES['general'];
    const pct = Math.round((course.completedLessons / course.totalLessons) * 100);

    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

    const handleStartLesson = (lesson: Lesson) => {
        if (lesson.type === 'video') {
            navigate(`/courses/${courseId}/lessons/${lesson.id}`);
        } else {
            setActiveLesson(lesson);
        }
    };

    const courseRoute = courseId === 'legal' ? '/courses/legal' : '/courses/general';

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '32px 32px 48px' }}>
                <main style={{ width: '100%', maxWidth: 1440, margin: '0 auto' }}>

                    {/* Breadcrumb */}
                    <PageBreadcrumb pageName={course.title} />

                    {/* Back link */}
                    <button
                        onClick={() => navigate(courseRoute)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '0 0 20px',
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                        Back to Course
                    </button>

                    {/* Page header */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 20,
                            marginBottom: 32,
                        }}
                    >
                        <div>
                            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                                {course.title}
                            </h2>
                            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>{course.subtitle}</p>
                        </div>

                        {/* Progress summary */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                background: '#fff',
                                border: '1px solid var(--border)',
                                borderRadius: 12,
                                padding: '14px 20px',
                            }}
                        >
                            <ProgressRing pct={pct} size={60} stroke={5} />
                            <div>
                                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
                                    Overall Progress
                                </p>
                                <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
                                    {course.completedLessons}
                                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
                                        {' '}/ {course.totalLessons} lessons
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Layout: lesson list + active lesson panel */}
                    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

                        {/* Module list */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {course.modules.map((mod, i) => (
                                <ModuleCard
                                    key={mod.id}
                                    module={mod}
                                    defaultOpen={mod.id === course.currentModule}
                                    currentModuleId={course.currentModule}
                                    currentLessonId={course.currentLesson}
                                    onStartLesson={handleStartLesson}
                                />
                            ))}
                        </div>

                        {/* Active lesson / info panel */}
                        <div
                            style={{
                                width: 320,
                                flexShrink: 0,
                                position: 'sticky',
                                top: 24,
                            }}
                        >
                            {activeLesson ? (
                                <div
                                    style={{
                                        background: '#fff',
                                        border: '1px solid var(--border)',
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Lesson type banner */}
                                    <div
                                        style={{
                                            padding: '20px',
                                            background: typeConfig[activeLesson.type].bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 10,
                                                background: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <span
                                                className="material-symbols-outlined"
                                                style={{ fontSize: 24, color: typeConfig[activeLesson.type].color }}
                                            >
                                                {typeConfig[activeLesson.type].icon}
                                            </span>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: typeConfig[activeLesson.type].color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                {typeConfig[activeLesson.type].label}
                                            </p>
                                            <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                                                {activeLesson.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                                            {activeLesson.title}
                                        </h3>
                                        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            {activeLesson.type === 'video' && 'Watch this video lesson and take notes. You can pause, rewind, and replay as many times as needed.'}
                                            {activeLesson.type === 'reading' && 'Read through the material carefully. Key terms are highlighted and there are review questions at the end.'}
                                            {activeLesson.type === 'quiz' && 'Test your knowledge of this module. You need 70% or higher to proceed. You have unlimited attempts.'}
                                            {activeLesson.type === 'practice' && 'Apply what you\'ve learned with real audio files. Submit your transcript for automated accuracy scoring.'}
                                            {activeLesson.type === 'assignment' && 'This graded assignment counts toward your final score. Read the rubric carefully before you begin.'}
                                        </p>

                                        <button
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: 'var(--green)',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 8,
                                                fontSize: 14,
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 8,
                                            }}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                                                {activeLesson.status === 'completed' ? 'replay' : 'play_arrow'}
                                            </span>
                                            {activeLesson.status === 'completed' ? 'Review Lesson' : activeLesson.status === 'in-progress' ? 'Resume Lesson' : 'Start Lesson'}
                                        </button>

                                        <button
                                            onClick={() => setActiveLesson(null)}
                                            style={{
                                                width: '100%',
                                                marginTop: 10,
                                                padding: '10px',
                                                background: 'none',
                                                border: '1px solid var(--border)',
                                                borderRadius: 8,
                                                fontSize: 13,
                                                color: 'var(--text-secondary)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Default panel: current lesson */
                                <div
                                    style={{
                                        background: '#fff',
                                        border: '1px solid var(--border)',
                                        borderRadius: 12,
                                        padding: '24px',
                                    }}
                                >
                                    <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        Continue Where You Left Off
                                    </p>
                                    <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                                        {courseId === 'legal' ? 'Deposition Formatting' : 'Timestamping Techniques'}
                                    </h3>
                                    <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-secondary)' }}>
                                        Module {course.currentModule} · Lesson {course.currentLesson}
                                    </p>

                                    {/* Progress bar */}
                                    <div style={{ marginBottom: 18 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Lesson progress</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>42%</span>
                                        </div>
                                        <div style={{ height: 6, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                                            <div style={{ width: '42%', height: '100%', background: 'var(--green)', borderRadius: 4 }} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/courses/${courseId}/lessons/${course.currentLesson}`)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: 'var(--green)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 8,
                                            fontSize: 14,
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_arrow</span>
                                        Resume Lesson
                                    </button>

                                    {/* Stats */}
                                    <div
                                        style={{
                                            marginTop: 20,
                                            paddingTop: 16,
                                            borderTop: '1px solid var(--border)',
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 12,
                                        }}
                                    >
                                        {[
                                            { label: 'Completed', value: `${course.completedLessons}` },
                                            { label: 'Remaining', value: `${course.totalLessons - course.completedLessons}` },
                                            { label: 'Modules', value: `${course.modules.length}` },
                                            { label: 'Progress', value: `${pct}%` },
                                        ].map(s => (
                                            <div
                                                key={s.label}
                                                style={{
                                                    background: 'var(--bg)',
                                                    borderRadius: 8,
                                                    padding: '10px 12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</p>
                                                <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--text-secondary)' }}>{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default CourseLessonsPage;
