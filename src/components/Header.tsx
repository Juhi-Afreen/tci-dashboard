import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    isSidebarCollapsed?: boolean;
    toggleSidebar?: () => void;
}

const NOTIFICATIONS = [
    { id: 1, icon: 'check_circle',         color: '#1F8F6D', bg: '#E8F5F1', title: 'Assignment graded',    body: 'Module 3 quiz scored 92% — great work!',          time: '2h ago',    unread: true  },
    { id: 2, icon: 'event',                 color: '#3B82F6', bg: '#EFF6FF', title: 'Upcoming webinar',     body: 'Legal Transcription Tips — tomorrow at 2 PM',      time: '5h ago',    unread: true  },
    { id: 3, icon: 'local_fire_department', color: '#F97316', bg: '#FFF3EB', title: '12-day streak!',       body: "You're on a roll — keep it up!",                   time: 'Yesterday', unread: true  },
    { id: 4, icon: 'forum',                 color: '#7C6FCD', bg: '#EEF0FF', title: 'New reply',            body: 'Someone replied to your discussion post.',          time: '2 days ago', unread: false },
    { id: 5, icon: 'download',              color: '#36C5D9', bg: '#E8FAFB', title: 'Resource available',   body: 'Free eBook: Advanced Transcription Guide',          time: '3 days ago', unread: false },
];

interface Message {
    role: 'user' | 'bot';
    text: string;
}

const BOT_RESPONSES: Record<string, string> = {
    default: "I'm here to help! You can ask me about your courses, transcription tips, assignments, or anything TCI-related.",
};

function getBotReply(input: string): string {
    const q = input.toLowerCase();
    if (q.includes('course') || q.includes('lesson'))
        return "You have 2 courses in progress: General Transcription (60% complete) and Legal Transcription (35% complete). Would you like to jump back in?";
    if (q.includes('streak') || q.includes('fire'))
        return "You're on a 12-day learning streak! Log in and complete at least one lesson today to keep it going.";
    if (q.includes('accuracy') || q.includes('score'))
        return "Your current accuracy score is 94%. Try the Accuracy Assessment Tool to practice and push it even higher!";
    if (q.includes('assignment'))
        return "You have 1 overdue assignment and 2 pending ones. Head to Assignment Tracking to review them.";
    if (q.includes('quiz') || q.includes('grammar'))
        return "Grammar quizzes cover punctuation, capitalization, numbers, and more. You've mastered 5 out of 10 categories!";
    if (q.includes('job') || q.includes('work'))
        return "The TCI Job Board has live listings updated regularly. Check it out under Tools in the sidebar!";
    if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
        return "Hi there! 👋 I'm your TCI Assistant. Ask me anything about your courses, progress, or transcription tips!";
    if (q.includes('help'))
        return "I can help with: courses & lessons, accuracy scores, assignments, grammar quizzes, the job board, and general transcription tips. What do you need?";
    if (q.includes('tip') || q.includes('transcri'))
        return "Pro tip: Always listen to the full audio once before transcribing. It helps you anticipate difficult sections and improves overall accuracy!";
    return BOT_RESPONSES.default;
}

const Header: React.FC<HeaderProps> = ({ isSidebarCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const [notifOpen, setNotifOpen]   = useState(false);
    const [chatOpen,  setChatOpen]    = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [messages, setMessages]     = useState<Message[]>([
        { role: 'bot', text: "Hi! I'm your TCI Assistant. Ask me about your courses, progress, tips, or anything transcription-related." },
    ]);
    const [input, setInput]           = useState('');
    const [typing, setTyping]         = useState(false);

    const notifRef  = useRef<HTMLDivElement>(null);
    const chatRef   = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => n.unread).length;

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (notifRef.current  && !notifRef.current.contains(e.target as Node))  setNotifOpen(false);
            if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;
        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages(prev => [...prev, { role: 'bot', text: getBotReply(text) }]);
        }, 900 + Math.random() * 400);
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    return (
        <header className="header">
            <div className="header-title">Learning Dashboard</div>
            <div className="search-wrap">
                <span className="material-symbols-outlined search-icon">search</span>
                <input type="text" placeholder="Search courses, tools, resources…" />
            </div>
            <div className="header-actions">

                {/* ── Notification bell ───────────────────────────────── */}
                <div ref={notifRef} style={{ position: 'relative' }}>
                    <button
                        className="icon-btn"
                        title="Notifications"
                        onClick={() => { setNotifOpen(o => !o); setChatOpen(false); }}
                        style={notifOpen ? { borderColor: 'var(--green)', color: 'var(--green)', background: 'var(--green-light)' } : {}}
                    >
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute', top: 6, right: 6,
                                minWidth: 16, height: 16, borderRadius: 8,
                                background: 'var(--rose)', border: '2px solid #fff',
                                fontSize: 9, fontWeight: 700, color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                lineHeight: 1, padding: '0 3px',
                            }}>{unreadCount}</span>
                        )}
                        <span className="material-symbols-outlined">notifications</span>
                    </button>

                    {notifOpen && (
                        <div style={{
                            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                            width: 340, background: '#fff',
                            border: '1px solid var(--border)', borderRadius: 14,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 1000, overflow: 'hidden',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid var(--border)' }}>
                                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
                                    Notifications{unreadCount > 0 && (
                                        <span style={{ marginLeft: 6, background: 'var(--rose)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '1px 7px' }}>{unreadCount}</span>
                                    )}
                                </span>
                                {unreadCount > 0 && (
                                    <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--green)', padding: 0 }}>Mark all read</button>
                                )}
                            </div>
                            <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                                {notifications.map(n => (
                                    <div key={n.id} onClick={() => markRead(n.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: n.unread ? '#F8FFFE' : '#fff', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background .15s' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = n.unread ? '#F8FFFE' : '#fff')}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: n.color }}>{n.icon}</span>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</span>
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{n.time}</span>
                                            </div>
                                            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.body}</p>
                                        </div>
                                        {n.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 5 }} />}
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>View all notifications</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── AI Chatbot ──────────────────────────────────────── */}
                <div>
                    <button
                        className="icon-btn"
                        title="TCI Assistant"
                        onClick={() => { setChatOpen(o => !o); setNotifOpen(false); }}
                        style={{
                            ...(chatOpen ? { borderColor: 'var(--green)', color: 'var(--green)', background: 'var(--green-light)' } : {}),
                            animation: chatOpen ? 'none' : 'chatGlow 2s ease-in-out infinite',
                        }}
                    >
                        <span className="material-symbols-outlined">smart_toy</span>
                    </button>

                    {/* Backdrop */}
                    {chatOpen && (
                        <div onClick={() => setChatOpen(false)} style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)',
                            zIndex: 1100, backdropFilter: 'blur(1px)',
                        }} />
                    )}

                    {/* Slide-in drawer */}
                    <div ref={chatRef} style={{
                        position: 'fixed', top: 0, right: 0, bottom: 0,
                        width: 380, background: '#fff',
                        borderLeft: '1px solid var(--border)',
                        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
                        zIndex: 1200,
                        display: 'flex', flexDirection: 'column', overflow: 'hidden',
                        transform: chatOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                            {/* Chat header */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '14px 16px', background: 'var(--green)',
                            }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff' }}>smart_toy</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>TCI Assistant</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A7F3D0', display: 'inline-block' }} />
                                        Online
                                    </div>
                                </div>
                                <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', padding: 0 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
                                </button>
                            </div>

                            {/* Messages */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {messages.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                                        {m.role === 'bot' && (
                                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 15, color: 'var(--green)' }}>smart_toy</span>
                                            </div>
                                        )}
                                        <div style={{
                                            maxWidth: '76%', padding: '9px 13px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                                            background: m.role === 'user' ? 'var(--green)' : 'var(--bg)',
                                            color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
                                            fontSize: 13, lineHeight: 1.5,
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                        }}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                                {typing && (
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 15, color: 'var(--green)' }}>smart_toy</span>
                                        </div>
                                        <div style={{ padding: '10px 14px', borderRadius: '14px 14px 14px 4px', background: 'var(--bg)', display: 'flex', gap: 4, alignItems: 'center' }}>
                                            {[0,1,2].map(d => (
                                                <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block', animation: `bounce 1.2s ${d * 0.2}s infinite` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggested prompts */}
                            {messages.length === 1 && (
                                <div style={{ padding: '8px 14px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid var(--border)' }}>
                                    {['My courses', 'Accuracy score', 'Transcription tips', 'Assignments'].map(p => (
                                        <button key={p} onClick={() => setInput(p)} style={{
                                            fontSize: 11, padding: '4px 10px', borderRadius: 20,
                                            border: '1px solid var(--border)', background: 'var(--bg)',
                                            color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600,
                                        }}>{p}</button>
                                    ))}
                                </div>
                            )}

                            {/* Input — pinned to bottom */}
                            <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center', background: '#fff' }}>
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="Ask me anything…"
                                    style={{
                                        flex: 1, border: '1px solid var(--border)', borderRadius: 10,
                                        padding: '8px 12px', fontSize: 13, outline: 'none',
                                        background: 'var(--bg)', color: 'var(--text-primary)',
                                    }}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim()}
                                    style={{
                                        width: 36, height: 36, borderRadius: 10, border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                                        background: input.trim() ? 'var(--green)' : 'var(--border)',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'background .15s', flexShrink: 0,
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                                </button>
                            </div>
                        </div>
                </div>

                <button className="icon-btn" title="Cart">
                    <span className="material-symbols-outlined">shopping_cart</span>
                </button>

                {/* ── Avatar menu ─────────────────────────────────────── */}
                <div ref={avatarRef} style={{ position: 'relative' }}>
                    <div
                        className="header-avatar"
                        onClick={() => { setAvatarOpen(o => !o); setNotifOpen(false); setChatOpen(false); }}
                        style={{ cursor: 'pointer', userSelect: 'none', outline: avatarOpen ? '2px solid var(--green)' : 'none', outlineOffset: 2 }}
                        title="Account"
                    >JA</div>

                    {avatarOpen && (
                        <div style={{
                            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                            width: 220, background: '#fff',
                            border: '1px solid var(--border)', borderRadius: 14,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 1000, overflow: 'hidden',
                        }}>
                            {/* User info */}
                            <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>JA</div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Juhi Afreen</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>juhi@example.com</div>
                                </div>
                            </div>

                            {/* Menu items */}
                            {[
                                { icon: 'person',           label: 'Profile',         to: '/settings', external: false },
                                { icon: 'receipt_long',     label: 'My Purchases',    to: '/purchases', external: false },
                                { icon: 'settings',         label: 'Settings',        to: '/settings', external: false },
                                { icon: 'campaign',         label: 'Updates',         to: '/updates', external: false },
                                { icon: 'emoji_events',     label: 'Accomplishments', to: '/progress', external: false },
                                { icon: 'help_outline',     label: 'Help Center',     to: 'https://www.transcriptioncertificationinstitute.org/contact-us', external: true },
                            ].map(item => (
                                <button key={item.label} onClick={() => { 
                                    setAvatarOpen(false); 
                                    if (item.external) {
                                        window.open(item.to, '_blank');
                                    } else {
                                        navigate(item.to);
                                    }
                                }} style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: 11,
                                    padding: '10px 16px', background: 'none', border: 'none',
                                    cursor: 'pointer', textAlign: 'left', transition: 'background .12s',
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--text-secondary)' }}>{item.icon}</span>
                                    <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{item.label}</span>
                                </button>
                            ))}

                            {/* Log Out */}
                            <div style={{ borderTop: '1px solid var(--border)' }}>
                                <button onClick={() => { setAvatarOpen(false); navigate('/login'); }} style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: 11,
                                    padding: '10px 16px', background: 'none', border: 'none',
                                    cursor: 'pointer', textAlign: 'left', transition: 'background .12s',
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#FFF1F4')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--rose)' }}>logout</span>
                                    <span style={{ fontSize: 13, color: 'var(--rose)', fontWeight: 600 }}>Log Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: .5; }
                    40% { transform: translateY(-5px); opacity: 1; }
                }
                @keyframes chatGlow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(31,143,109,0); border-color: var(--border); }
                    50%       { box-shadow: 0 0 0 6px rgba(31,143,109,0.18), 0 0 14px 2px rgba(31,143,109,0.22); border-color: var(--green); color: var(--green); }
                }
            `}</style>
        </header>
    );
};

export default Header;
