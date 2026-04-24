import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Types ──────────────────────────────────────────────────────────────────────

type EventType = 'study' | 'quiz' | 'assignment' | 'exam' | 'practice';

interface ScheduleEvent {
    id: number;
    title: string;
    type: EventType;
    date: string;        // 'YYYY-MM-DD'
    time?: string;
    duration?: string;
    course?: string;
    notes?: string;
    completed?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const TODAY = new Date(2026, 3, 16); // Apr 16 2026

function isoDate(d: Date) {
    return d.toISOString().slice(0, 10);
}
function relDate(offsetDays: number) {
    const d = new Date(TODAY);
    d.setDate(d.getDate() + offsetDays);
    return isoDate(d);
}

const TYPE_CONFIG: Record<EventType, { label: string; color: string; bg: string; icon: string }> = {
    study: { label: 'Study Session', color: 'var(--green)', bg: 'var(--green-light)', icon: 'menu_book' },
    quiz: { label: 'Quiz', color: 'var(--blue)', bg: 'var(--blue-light)', icon: 'quiz' },
    assignment: { label: 'Assignment', color: 'var(--purple)', bg: 'var(--purple-light)', icon: 'assignment' },
    exam: { label: 'Exam', color: '#ef4444', bg: '#fef2f2', icon: 'school' },
    practice: { label: 'Practice', color: 'var(--orange)', bg: 'var(--orange-light)', icon: 'headphones' },
};

// ── Events data ────────────────────────────────────────────────────────────────

const EVENTS: ScheduleEvent[] = [
    // Past (completed)
    { id: 1, title: 'Module 7 Study Session', type: 'study', date: relDate(-8), time: '9:00 AM', duration: '2h', course: 'General Transcription', completed: true },
    { id: 2, title: 'Grammar Quiz 3', type: 'quiz', date: relDate(-6), time: '11:00 AM', duration: '30m', course: 'General Transcription', completed: true },
    { id: 3, title: 'Module 7 Assignment', type: 'assignment', date: relDate(-4), time: '2:00 PM', duration: '1.5h', course: 'General Transcription', completed: true },
    { id: 4, title: 'Practice Test Session', type: 'practice', date: relDate(-2), time: '10:00 AM', duration: '1h', course: 'Accuracy Tool', completed: true },
    // Today
    { id: 5, title: 'Module 8 Study Session', type: 'study', date: relDate(0), time: '9:30 AM', duration: '2h', course: 'General Transcription', notes: 'Professional Transcription Standards' },
    { id: 6, title: 'Legal Terminology Quiz 2 Review', type: 'study', date: relDate(0), time: '3:00 PM', duration: '1h', course: 'Legal Transcription' },
    // Upcoming
    { id: 7, title: 'Legal Module 4 Study', type: 'study', date: relDate(1), time: '10:00 AM', duration: '2h', course: 'Legal Transcription' },
    { id: 8, title: 'Practice Transcription', type: 'practice', date: relDate(2), time: '9:00 AM', duration: '1.5h', course: 'Practice Files' },
    { id: 9, title: 'Punctuation Quiz Retake', type: 'quiz', date: relDate(3), time: '11:00 AM', duration: '30m', course: 'General Transcription' },
    { id: 10, title: 'Module 8 Assignment Due', type: 'assignment', date: relDate(4), time: '11:59 PM', course: 'General Transcription', notes: 'Submit via Assignment Tracking' },
    { id: 11, title: 'Accuracy Practice Session', type: 'practice', date: relDate(5), time: '2:00 PM', duration: '1h', course: 'Accuracy Tool' },
    { id: 12, title: 'Legal Module 4 Review', type: 'study', date: relDate(6), time: '10:00 AM', duration: '1.5h', course: 'Legal Transcription' },
    { id: 13, title: 'Weekly Progress Review', type: 'study', date: relDate(7), time: '9:00 AM', duration: '30m', notes: 'Review all module notes' },
    { id: 14, title: 'Module 9 Preparation', type: 'study', date: relDate(9), time: '10:00 AM', duration: '2h', course: 'General Transcription' },
    { id: 15, title: 'Mid-Course Practice Exam', type: 'exam', date: relDate(11), time: '9:00 AM', duration: '3h', course: 'General Transcription', notes: 'Prepare all module notes beforehand' },
    { id: 16, title: 'Legal Terminology Quiz 3', type: 'quiz', date: relDate(14), time: '11:00 AM', duration: '30m', course: 'Legal Transcription' },
];

// ── Calendar helpers ───────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ── Mini event chip ────────────────────────────────────────────────────────────

const EventChip: React.FC<{ event: ScheduleEvent }> = ({ event }) => {
    const cfg = TYPE_CONFIG[event.type];
    return (
        <div style={{
            fontSize: '10px', fontWeight: 600, padding: '1px 5px',
            borderRadius: '4px', background: cfg.bg, color: cfg.color,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            opacity: event.completed ? 0.55 : 1,
        }}>
            {event.title}
        </div>
    );
};

// ── Event row (list view) ──────────────────────────────────────────────────────

const EventRow: React.FC<{ event: ScheduleEvent; showDate?: boolean }> = ({ event, showDate }) => {
    const cfg = TYPE_CONFIG[event.type];
    return (
        <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '14px',
            padding: '12px 0',
            opacity: event.completed ? 0.6 : 1,
        }}>
            <div style={{
                width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                background: cfg.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <Icon icon={cfg.icon} style={{ fontSize: '18px', color: cfg.color }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                        fontSize: '13.5px', fontWeight: 600,
                        color: 'var(--text-primary)',
                        textDecoration: event.completed ? 'line-through' : 'none',
                    }}>{event.title}</span>
                    {event.completed && (
                        <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '1px 7px', borderRadius: '20px', background: '#dcfce7', color: '#16a34a' }}>Done</span>
                    )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '3px' }}>
                    {showDate && (
                        <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Icon icon="calendar_today" />
                            {new Date(event.date + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                    )}
                    {event.time && (
                        <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Icon icon="schedule" />
                            {event.time}{event.duration ? ` · ${event.duration}` : ''}
                        </span>
                    )}
                    {event.course && (
                        <span style={{ fontSize: '11.5px', color: cfg.color, fontWeight: 600 }}>{event.course}</span>
                    )}
                </div>
                {event.notes && (
                    <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{event.notes}</p>
                )}
            </div>
            <span style={{
                fontSize: '11px', fontWeight: 700, padding: '3px 9px',
                borderRadius: '20px', background: cfg.bg, color: cfg.color,
                flexShrink: 0,
            }}>{cfg.label}</span>
        </div>
    );
};

// ── Page ───────────────────────────────────────────────────────────────────────

const SchedulePage: React.FC = () => {
    const [view, setView] = useState<'calendar' | 'list'>('calendar');
    const [calMonth, setCalMonth] = useState(TODAY.getMonth());
    const [calYear, setCalYear] = useState(TODAY.getFullYear());
    const [selectedDate, setSelectedDate] = useState(isoDate(TODAY));

    const upcoming = EVENTS.filter(e => e.date >= isoDate(TODAY) && !e.completed).slice(0, 5);
    const todayEvents = EVENTS.filter(e => e.date === isoDate(TODAY));
    const selectedEvents = EVENTS.filter(e => e.date === selectedDate);

    // Calendar grid
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);
    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const eventsByDate: Record<string, ScheduleEvent[]> = {};
    EVENTS.forEach(e => {
        if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
        eventsByDate[e.date].push(e);
    });

    function calDateStr(day: number) {
        return `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    const prevMonth = () => {
        if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
        else setCalMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
        else setCalMonth(m => m + 1);
    };

    const listUpcoming = EVENTS.filter(e => e.date >= isoDate(TODAY)).sort((a, b) => a.date.localeCompare(b.date));
    const listPast = EVENTS.filter(e => e.date < isoDate(TODAY)).sort((a, b) => b.date.localeCompare(a.date));

    // Group list by date
    function groupByDate(evts: ScheduleEvent[]) {
        const map: Record<string, ScheduleEvent[]> = {};
        evts.forEach(e => {
            if (!map[e.date]) map[e.date] = [];
            map[e.date].push(e);
        });
        return map;
    }

    const upcomingGrouped = groupByDate(listUpcoming);
    const pastGrouped = groupByDate(listPast);

    function dateLabel(dateStr: string) {
        const d = new Date(dateStr + 'T00:00');
        if (dateStr === isoDate(TODAY)) return 'Today';
        if (dateStr === relDate(1)) return 'Tomorrow';
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* Header */}
                    <section>
                        <PageBreadcrumb pageName="Schedule" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Schedule</h2>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <Icon icon="calendar_today" className="text-[22px] shrink-0 mt-0.5" style={{ color: '#1f8f6d' }} />
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Plan your study sessions, track assignment deadlines, and stay on top of upcoming quizzes and exams. Click any date on the calendar to see that day's events.
                            </p>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Today's Events" value={String(todayEvents.length)} icon="today" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Upcoming" value={String(upcoming.length)} icon="event_upcoming" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="This Month" value={String(EVENTS.filter(e => e.date.startsWith(`${calYear}-${String(calMonth + 1).padStart(2, '0')}`)).length)} icon="calendar_month" borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Completed" value={String(EVENTS.filter(e => e.completed).length)} icon="check_circle" borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* View toggle + content */}
                    <section>
                        {/* Toggle */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                            <div style={{ background: '#F4F7F6', borderRadius: '10px', padding: '5px', display: 'flex', gap: '4px' }}>
                                {(['calendar', 'list'] as const).map(v => {
                                    const active = view === v;
                                    return (
                                        <button key={v} onClick={() => setView(v)} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                            padding: '8px 18px', borderRadius: '7px', border: 'none',
                                            background: active ? '#fff' : 'transparent',
                                            color: active ? 'var(--green)' : 'var(--text-secondary)',
                                            fontWeight: active ? 700 : 500, fontSize: '13px',
                                            cursor: 'pointer', fontFamily: 'inherit',
                                            boxShadow: active ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
                                            transition: 'all .15s',
                                        }}>
                                            <Icon icon={v === 'calendar' ? 'calendar_month' : 'view_list'} style={{ fontSize: '16px' }} />
                                            {v === 'calendar' ? 'Calendar' : 'List'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Calendar view ── */}
                        {view === 'calendar' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
                                {/* Calendar */}
                                <div style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid var(--border)', padding: '20px' }}>
                                    {/* Nav */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <button onClick={prevMonth} style={{ background: '#F4F7F6', border: 'none', borderRadius: '8px', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon icon="chevron_left" />
                                        </button>
                                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                            {MONTH_NAMES[calMonth]} {calYear}
                                        </h3>
                                        <button onClick={nextMonth} style={{ background: '#F4F7F6', border: 'none', borderRadius: '8px', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon icon="chevron_right" />
                                        </button>
                                    </div>

                                    {/* Day headers */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
                                        {DAY_NAMES.map(d => (
                                            <div key={d} style={{ textAlign: 'center', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', padding: '4px 0' }}>{d}</div>
                                        ))}
                                    </div>

                                    {/* Days */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                                        {cells.map((day, i) => {
                                            if (!day) return <div key={i} />;
                                            const dateStr = calDateStr(day);
                                            const dayEvents = eventsByDate[dateStr] ?? [];
                                            const isToday = dateStr === isoDate(TODAY);
                                            const isSelected = dateStr === selectedDate;
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => setSelectedDate(dateStr)}
                                                    style={{
                                                        minHeight: 64, padding: '4px 6px',
                                                        borderRadius: '8px', cursor: 'pointer',
                                                        background: isSelected ? 'var(--green-light)' : isToday ? '#f0fdf4' : 'transparent',
                                                        border: isSelected ? '1.5px solid var(--green)' : isToday ? '1.5px solid #86efac' : '1.5px solid transparent',
                                                        transition: 'background .15s',
                                                    }}
                                                    onMouseOver={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = '#F4F7F6'; }}
                                                    onMouseOut={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = isToday ? '#f0fdf4' : 'transparent'; }}
                                                >
                                                    <div style={{
                                                        fontSize: '12.5px', fontWeight: isToday ? 800 : 500,
                                                        color: isToday ? 'var(--green)' : 'var(--text-primary)',
                                                        marginBottom: '3px',
                                                    }}>{day}</div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                        {dayEvents.slice(0, 2).map(e => <EventChip key={e.id} event={e} />)}
                                                        {dayEvents.length > 2 && (
                                                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>+{dayEvents.length - 2} more</div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Legend */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                                        {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                                            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                                                <span style={{ width: 10, height: 10, borderRadius: '3px', background: cfg.color, display: 'inline-block' }} />
                                                {cfg.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Day panel */}
                                <div style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid var(--border)', padding: '20px' }}>
                                    <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                        {dateLabel(selectedDate)}
                                    </h3>
                                    {selectedEvents.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-secondary)' }}>
                                            <Icon icon="event_busy" />
                                            <p style={{ fontSize: '13px', margin: 0 }}>No events scheduled</p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', divideY: '1px solid var(--border)' } as any}>
                                            {selectedEvents.map((e, i) => (
                                                <div key={e.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                                                    <EventRow event={e} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── List view ── */}
                        {view === 'list' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Upcoming */}
                                <div>
                                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>Upcoming</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {Object.entries(upcomingGrouped).map(([date, evts]) => (
                                            <div key={date} style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                                                <div style={{
                                                    padding: '10px 20px', background: date === isoDate(TODAY) ? 'var(--green-light)' : '#F4F7F6',
                                                    borderBottom: '1px solid var(--border)',
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                }}>
                                                    <Icon icon="calendar_today" />
                                                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: date === isoDate(TODAY) ? 'var(--green)' : 'var(--text-primary)' }}>
                                                        {dateLabel(date)}
                                                    </span>
                                                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginLeft: 'auto' }}>{evts.length} event{evts.length !== 1 ? 's' : ''}</span>
                                                </div>
                                                <div style={{ padding: '0 20px' }}>
                                                    {evts.map((e, i) => (
                                                        <div key={e.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                                                            <EventRow event={e} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Past */}
                                {Object.keys(pastGrouped).length > 0 && (
                                    <div>
                                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>Past</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.75 }}>
                                            {Object.entries(pastGrouped).map(([date, evts]) => (
                                                <div key={date} style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                                                    <div style={{ padding: '10px 20px', background: '#F4F7F6', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <Icon icon="history" />
                                                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>{dateLabel(date)}</span>
                                                    </div>
                                                    <div style={{ padding: '0 20px' }}>
                                                        {evts.map((e, i) => (
                                                            <div key={e.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                                                                <EventRow event={e} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default SchedulePage;
