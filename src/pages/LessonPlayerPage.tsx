import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Icon } from '../components/Icon';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';

// ── YouTube IFrame API types ───────────────────────────────────────────────────

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

// ── Transcript data ────────────────────────────────────────────────────────────

interface TranscriptLine {
    time: number; // seconds
    label: string; // e.g. "0:12"
    speaker: string;
    text: string;
}

const TRANSCRIPT: TranscriptLine[] = [
    { time: 0,   label: '0:00',  speaker: 'Instructor', text: 'Welcome to this lesson on timestamping techniques for professional transcription.' },
    { time: 12,  label: '0:12',  speaker: 'Instructor', text: 'Timestamping is the process of inserting time markers into a transcript to indicate when something was said in the audio.' },
    { time: 26,  label: '0:26',  speaker: 'Instructor', text: 'There are two main styles — periodic timestamps that appear every thirty seconds, and on-demand timestamps placed at the start of each speaker turn.' },
    { time: 41,  label: '0:41',  speaker: 'Instructor', text: 'The format varies by client, but the most common formats you will encounter are HH:MM:SS and MM:SS.' },
    { time: 55,  label: '0:55',  speaker: 'Instructor', text: 'Let me show you an example. Here we have a two-speaker interview. Every time the speaker changes, we insert a timestamp enclosed in square brackets.' },
    { time: 72,  label: '1:12',  speaker: 'Instructor', text: 'For example: [00:01:12] Interviewer: Can you tell me about your background?' },
    { time: 89,  label: '1:29',  speaker: 'Instructor', text: 'And then: [00:01:29] Guest: Sure, I have been working in the legal field for over ten years.' },
    { time: 104, label: '1:44',  speaker: 'Instructor', text: 'Notice that the timestamp resets to zero at the start of the file, not the start of the recording session.' },
    { time: 118, label: '1:58',  speaker: 'Instructor', text: 'Some clients require timestamps only when there is a significant pause in the audio — typically five seconds or longer.' },
    { time: 133, label: '2:13',  speaker: 'Instructor', text: 'Always refer to your style guide or client brief before beginning a transcription project, as requirements differ.' },
    { time: 148, label: '2:28',  speaker: 'Instructor', text: 'A common mistake is placing the timestamp after the speaker label instead of before it. Let me demonstrate the correct format.' },
    { time: 163, label: '2:43',  speaker: 'Instructor', text: 'Correct: [00:02:43] Speaker 1: This is the right way.' },
    { time: 175, label: '2:55',  speaker: 'Instructor', text: 'Incorrect: Speaker 1: [00:02:55] This places the marker inside the speech, which makes it harder to parse.' },
    { time: 190, label: '3:10',  speaker: 'Instructor', text: 'When using transcription software like Express Scribe or oTranscribe, most tools have a hotkey to insert the current timestamp automatically.' },
    { time: 207, label: '3:27',  speaker: 'Instructor', text: 'This saves significant time and reduces manual errors. I recommend mapping it to a foot pedal or a function key.' },
    { time: 222, label: '3:42',  speaker: 'Instructor', text: 'Let us now look at verbatim timestamping, which is slightly different from clean-read timestamping.' },
    { time: 237, label: '3:57',  speaker: 'Instructor', text: 'In verbatim transcription, you also timestamp false starts and filler words if the client requests it.' },
    { time: 252, label: '4:12',  speaker: 'Instructor', text: 'For example: [00:04:12] Um, so I was — I was trying to, you know, figure out the best approach.' },
    { time: 267, label: '4:27',  speaker: 'Instructor', text: 'This level of detail is often required for legal depositions and academic research transcription.' },
    { time: 282, label: '4:42',  speaker: 'Instructor', text: 'To summarize: always confirm the timestamp format, placement style, and frequency with your client before starting.' },
    { time: 297, label: '4:57',  speaker: 'Instructor', text: 'Practice with the exercise files attached to this lesson. In the next lesson, we will cover formatting templates.' },
    { time: 310, label: '5:10',  speaker: 'Instructor', text: 'Thank you for watching. If you have any questions, post them in the discussion board and I will respond within 24 hours.' },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const VIDEO_ID = 'F5KNbLzMvG0';

const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
};

const downloadTranscript = (title: string) => {
    const lines = TRANSCRIPT.map(
        l => `[${l.label}]  ${l.speaker}: ${l.text}`
    ).join('\n\n');
    const content = `${title}\nTranscript\n${'─'.repeat(60)}\n\n${lines}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
};

// ── Component ──────────────────────────────────────────────────────────────────

const LessonPlayerPage: React.FC = () => {
    const { courseId = 'general' } = useParams<{ courseId: string; lessonId: string }>();
    const navigate = useNavigate();

    const playerRef = useRef<any>(null);
    const playerDivRef = useRef<HTMLDivElement>(null);
    const transcriptRef = useRef<HTMLDivElement>(null);
    const tickRef = useRef<number | null>(null);

    const [playerReady, setPlayerReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeLine, setActiveLine] = useState(0);
    const [notes, setNotes] = useState('');
    const [showNotes, setShowNotes] = useState(false);
    const [completed, setCompleted] = useState(false);

    const courseTitle = courseId === 'legal' ? 'Legal Transcription Course' : 'General Transcription Course';
    const lessonTitle = courseId === 'legal' ? 'Deposition Formatting' : 'Timestamping Techniques';

    // ── Load YouTube IFrame API ──────────────────────────────────────────────

    useEffect(() => {
        const initPlayer = () => {
            if (!playerDivRef.current) return;
            playerRef.current = new window.YT.Player(playerDivRef.current, {
                videoId: VIDEO_ID,
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    color: 'white',
                },
                events: {
                    onReady: () => setPlayerReady(true),
                    onStateChange: (e: any) => {
                        if (e.data === window.YT.PlayerState.PLAYING) {
                            startTick();
                        } else {
                            stopTick();
                            if (e.data === window.YT.PlayerState.ENDED) {
                                setCompleted(true);
                                stopTick();
                            }
                        }
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
            if (!document.getElementById('yt-api-script')) {
                const script = document.createElement('script');
                script.id = 'yt-api-script';
                script.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(script);
            }
        }

        return () => {
            stopTick();
            if (playerRef.current?.destroy) playerRef.current.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Tick to sync transcript ──────────────────────────────────────────────

    const startTick = useCallback(() => {
        stopTick();
        tickRef.current = window.setInterval(() => {
            if (!playerRef.current?.getCurrentTime) return;
            const t = playerRef.current.getCurrentTime() as number;
            setCurrentTime(t);
            // Find active transcript line
            let idx = 0;
            for (let i = 0; i < TRANSCRIPT.length; i++) {
                if (t >= TRANSCRIPT[i].time) idx = i;
            }
            setActiveLine(idx);
        }, 500);
    }, []);

    const stopTick = useCallback(() => {
        if (tickRef.current !== null) {
            clearInterval(tickRef.current);
            tickRef.current = null;
        }
    }, []);

    // Auto-scroll transcript
    useEffect(() => {
        const el = transcriptRef.current?.querySelector(`[data-line="${activeLine}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [activeLine]);

    // ── Seek on transcript click ─────────────────────────────────────────────

    const seekTo = (seconds: number) => {
        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(seconds, true);
            playerRef.current.playVideo?.();
        }
    };

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 48px' }}>
                <main style={{ width: '100%', maxWidth: 1440, margin: '0 auto' }}>

                    {/* Breadcrumb */}
                    <PageBreadcrumb pageName={lessonTitle} />

                    {/* Back */}
                    <button
                        onClick={() => navigate(`/courses/${courseId}/lessons`)}
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
                        <Icon icon="arrow_back" />
                        Back to Lessons
                    </button>

                    {/* Header row */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 12,
                            marginBottom: 24,
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        background: '#EFF6FF',
                                        color: '#3B82F6',
                                        borderRadius: 20,
                                        padding: '3px 10px',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    Video Lesson
                                </span>
                                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{courseTitle}</span>
                            </div>
                            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>
                                {lessonTitle}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                onClick={() => setShowNotes(v => !v)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    padding: '8px 16px',
                                    background: showNotes ? 'var(--green-light)' : '#fff',
                                    border: `1px solid ${showNotes ? 'var(--green)' : 'var(--border)'}`,
                                    borderRadius: 8,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: showNotes ? 'var(--green)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                }}
                            >
                                <Icon icon="edit_note" />
                                Notes
                            </button>
                            <button
                                onClick={() => downloadTranscript(lessonTitle)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    padding: '8px 16px',
                                    background: '#fff',
                                    border: '1px solid var(--border)',
                                    borderRadius: 8,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                }}
                            >
                                <Icon icon="download" />
                                Download Transcript
                            </button>
                        </div>
                    </div>

                    {/* Main grid: video + transcript */}
                    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

                        {/* Left column: video + notes */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

                            {/* Video */}
                            <div
                                style={{
                                    background: '#000',
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    aspectRatio: '16 / 9',
                                    width: '100%',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    ref={playerDivRef}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>

                            {/* Completion banner */}
                            {completed && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        padding: '14px 20px',
                                        background: 'var(--green-light)',
                                        border: '1px solid #B6DDD4',
                                        borderRadius: 10,
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Icon icon="check_circle" style={{ color: 'var(--green)', fontSize: 22 }} />
                                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>
                                            Lesson complete! Great work.
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/courses/${courseId}/lessons`)}
                                        style={{
                                            background: 'var(--green)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 8,
                                            padding: '8px 18px',
                                            fontSize: 13,
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}
                                    >
                                        Next Lesson
                                        <Icon icon="arrow_forward" />
                                    </button>
                                </div>
                            )}

                            {/* Notes */}
                            {showNotes && (
                                <div
                                    style={{
                                        background: '#fff',
                                        border: '1px solid var(--border)',
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '14px 18px',
                                            borderBottom: '1px solid var(--border)',
                                        }}
                                    >
                                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                                            My Notes
                                        </span>
                                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                            {playerReady ? `at ${formatTime(currentTime)}` : ''}
                                        </span>
                                    </div>
                                    <textarea
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                        placeholder="Type your notes here while watching the video…"
                                        rows={5}
                                        style={{
                                            width: '100%',
                                            padding: '14px 18px',
                                            border: 'none',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontSize: 13,
                                            color: 'var(--text-primary)',
                                            fontFamily: 'inherit',
                                            lineHeight: 1.6,
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right column: transcript */}
                        <div
                            style={{
                                width: 380,
                                flexShrink: 0,
                                background: '#fff',
                                border: '1px solid var(--border)',
                                borderRadius: 12,
                                overflow: 'hidden',
                                position: 'sticky',
                                top: 24,
                                maxHeight: 'calc(100vh - 120px)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Transcript header */}
                            <div
                                style={{
                                    padding: '16px 18px',
                                    borderBottom: '1px solid var(--border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexShrink: 0,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Icon icon="description" style={{ fontSize: 18, color: 'var(--green)' }} />
                                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                                        Transcript
                                    </span>
                                </div>
                                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                    Click any line to jump
                                </span>
                            </div>

                            {/* Transcript lines */}
                            <div
                                ref={transcriptRef}
                                style={{ overflowY: 'auto', flex: 1, padding: '8px 0' }}
                            >
                                {TRANSCRIPT.map((line, i) => {
                                    const isActive = i === activeLine;
                                    return (
                                        <button
                                            key={i}
                                            data-line={i}
                                            onClick={() => seekTo(line.time)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 12,
                                                width: '100%',
                                                padding: '10px 18px',
                                                background: isActive ? 'var(--green-light)' : 'transparent',
                                                border: 'none',
                                                borderLeft: `3px solid ${isActive ? 'var(--green)' : 'transparent'}`,
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'background .15s',
                                            }}
                                        >
                                            {/* Timestamp chip */}
                                            <span
                                                style={{
                                                    flexShrink: 0,
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    fontFamily: 'monospace',
                                                    color: isActive ? 'var(--green)' : 'var(--text-muted)',
                                                    background: isActive ? '#fff' : '#F3F4F6',
                                                    borderRadius: 5,
                                                    padding: '2px 6px',
                                                    marginTop: 2,
                                                    minWidth: 38,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {line.label}
                                            </span>
                                            {/* Text */}
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    lineHeight: 1.55,
                                                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                    fontWeight: isActive ? 600 : 400,
                                                }}
                                            >
                                                {line.text}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Download footer */}
                            <div
                                style={{
                                    padding: '12px 18px',
                                    borderTop: '1px solid var(--border)',
                                    flexShrink: 0,
                                }}
                            >
                                <button
                                    onClick={() => downloadTranscript(lessonTitle)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        padding: '9px',
                                        background: 'var(--green-light)',
                                        border: '1px solid #B6DDD4',
                                        borderRadius: 8,
                                        color: 'var(--green)',
                                        fontSize: 13,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Icon icon="download" />
                                    Download Transcript (.txt)
                                </button>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default LessonPlayerPage;
