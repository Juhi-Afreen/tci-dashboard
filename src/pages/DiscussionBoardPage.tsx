import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Question {
    id: string;
    title: string;
    url: string;          // full external URL
    author: string;
    category: string;
    categoryDc: string;   // dc= value from URL
    text: string;
    date: string;
    likes: number;
    dislikes: number;
    replies: number;
    views: number;
}

interface ApiResponse {
    success: boolean;
    pageNo: number;
    isRecordExists: number;
    questionLists: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const FORUM_BASE = 'https://forum.transcriptioncertificationinstitute.org';

const CATEGORIES = [
    { id: 'all',                     label: 'All',                   icon: 'forum' },
    { id: 'transcription',           label: 'Transcription',         icon: 'mic' },
    { id: 'translation',             label: 'Translation',           icon: 'translate' },
    { id: 'captioning',              label: 'Captioning',            icon: 'closed_caption' },
    { id: 'editing-proofreading',    label: 'Editing & Proofreading',icon: 'spellcheck' },
    { id: 'grammar-writing-tips',    label: 'Grammar & Writing',     icon: 'edit_note' },
    { id: 'tools-and-resources',     label: 'Tools & Resources',     icon: 'build' },
    { id: 'jobs',                    label: 'Jobs',                  icon: 'work' },
    { id: 'other',                   label: 'Other',                 icon: 'more_horiz' },
];

// ── HTML parser ────────────────────────────────────────────────────────────────
// Parses the HTML string returned by the loadmore API into structured Question objects.

function parseQuestionHtml(html: string): Question[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const areas = doc.querySelectorAll('.single-post-area');
    const results: Question[] = [];

    areas.forEach(area => {
        try {
            // Title & URL
            const titleEl = area.querySelector('.post-title a');
            const title = titleEl?.textContent?.trim() ?? '';
            const href = titleEl?.getAttribute('href') ?? '';
            const url = href.startsWith('http') ? href : `${FORUM_BASE}${href}`;

            // ID from URL: /community/q/{slug}/{id}
            const idMatch = href.match(/\/(\d+)(?:\?|$)/);
            const id = idMatch ? idMatch[1] : href;

            // Author & category
            const postedByLinks = area.querySelectorAll('p.posted-by a');
            const author = postedByLinks[0]?.textContent?.trim() ?? 'Unknown';
            const categoryEl = postedByLinks[1];
            const category = categoryEl?.textContent?.trim() ?? '';
            const catHref = categoryEl?.getAttribute('href') ?? '';
            const dcMatch = catHref.match(/dc=(\d+)/);
            const categoryDc = dcMatch ? dcMatch[1] : '';

            // Text preview
            const text = area.querySelector('p.post-text')?.textContent?.trim() ?? '';

            // Stats from post-links
            const lis = area.querySelectorAll('ul.post-links li');
            const date = lis[0]?.textContent?.trim() ?? '';
            const likes    = parseInt(lis[1]?.querySelector('a')?.getAttribute('data-like-count')    ?? '0');
            const dislikes = parseInt(lis[2]?.querySelector('a')?.getAttribute('data-dis-like-count') ?? '0');
            const replies  = parseInt(lis[3]?.querySelector('a')?.getAttribute('title') ?? '0');
            const views    = parseInt(lis[4]?.querySelector('a')?.getAttribute('title') ?? '0');

            if (title) {
                results.push({ id, title, url, author, category, categoryDc, text, date, likes, dislikes, replies, views });
            }
        } catch {
            // skip malformed entries
        }
    });

    return results;
}

// ── Fetch questions via proxy ──────────────────────────────────────────────────

async function fetchQuestions(pageNo: number, qc: string): Promise<ApiResponse> {
    const body = new URLSearchParams({
        rowCountPerPage: '10',
        pageNo: String(pageNo),
        userId: '',
    });
    // Pass qc filter as query param if set
    const qs = qc && qc !== 'all' ? `?qc=${qc}` : '';
    const res = await fetch(`/tci-forum-api/api/v1/loadmore/questions${qs}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    });
    return res.json();
}

// ── Skeleton ───────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
    <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1.5px solid var(--border)', padding: '18px 22px',
        animation: 'pulse 1.5s ease-in-out infinite',
    }}>
        <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <div style={{ height: 13, background: '#e2e8f0', borderRadius: 6, width: '65%', marginBottom: 10 }} />
                <div style={{ height: 11, background: '#e2e8f0', borderRadius: 6, width: '40%', marginBottom: 14 }} />
                <div style={{ height: 10, background: '#e2e8f0', borderRadius: 6, width: '90%', marginBottom: 6 }} />
                <div style={{ height: 10, background: '#e2e8f0', borderRadius: 6, width: '75%' }} />
            </div>
        </div>
    </div>
);

// ── Avatar ─────────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['#1F8F6D','#3B82F6','#7C6FCD','#F59E0B','#0891b2','#ec4899','#10b981','#f97316'];
function avatarColor(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
    return AVATAR_COLORS[h];
}

const Avatar: React.FC<{ name: string; size?: number }> = ({ name, size = 36 }) => (
    <div style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        background: avatarColor(name),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 800, fontSize: size * 0.4,
    }}>
        {name.charAt(0).toUpperCase()}
    </div>
);

// ── Question card ──────────────────────────────────────────────────────────────

const QuestionCard: React.FC<{ q: Question }> = ({ q }) => (
    <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1.5px solid var(--border)', padding: '18px 22px',
        boxShadow: '0 1px 4px rgba(0,0,0,.04)',
        transition: 'box-shadow .2s, border-color .2s, transform .2s',
    }}
        onMouseOver={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,.09)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLElement).style.borderColor = '#a7d7c8';
        }}
        onMouseOut={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,.04)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        }}
    >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Avatar name={q.author} />
            <div style={{ flex: 1, minWidth: 0 }}>
                {/* Title */}
                <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <h3 style={{
                        fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)',
                        margin: '0 0 4px', lineHeight: 1.4,
                        transition: 'color .15s',
                    }}
                        onMouseOver={e => (e.currentTarget.style.color = 'var(--green)')}
                        onMouseOut={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    >
                        {q.title}
                    </h3>
                </a>

                {/* Meta: author · category · date */}
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.author}</span>
                    {q.category && (
                        <> · <span style={{ color: 'var(--green)', fontWeight: 600 }}>{q.category}</span></>
                    )}
                    {q.date && <> · {q.date}</>}
                </p>

                {/* Text preview */}
                {q.text && (
                    <p style={{
                        fontSize: '12.5px', color: 'var(--text-secondary)',
                        margin: '0 0 12px', lineHeight: 1.55,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {q.text}
                    </p>
                )}

                {/* Stats + view button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '14px' }}>
                        {[
                            { icon: 'thumb_up',          val: q.likes },
                            { icon: 'thumb_down',        val: q.dislikes },
                            { icon: 'chat_bubble_outline',val: q.replies },
                            { icon: 'visibility',        val: q.views },
                        ].map((m, i) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{m.icon}</span>
                                {m.val}
                            </span>
                        ))}
                    </div>
                    <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '12px', fontWeight: 700,
                            color: 'var(--green)', textDecoration: 'none',
                            padding: '4px 10px', borderRadius: '7px',
                            background: 'var(--green-light)',
                            border: '1px solid #a7d7c8',
                            transition: 'opacity .15s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
                        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>open_in_new</span>
                        View Thread
                    </a>
                </div>
            </div>
        </div>
    </div>
);

// ── Page ───────────────────────────────────────────────────────────────────────

const DiscussionBoardPage: React.FC = () => {
    const [questions, setQuestions]     = useState<Question[]>([]);
    const [loading, setLoading]         = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError]             = useState<string | null>(null);
    const [pageNo, setPageNo]           = useState(0);
    const [hasMore, setHasMore]         = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [search, setSearch]           = useState('');

    const load = useCallback(async (pg: number, qc: string, mode: 'replace' | 'append') => {
        if (mode === 'replace') { setLoading(true); setQuestions([]); }
        else setLoadingMore(true);
        setError(null);
        try {
            const data = await fetchQuestions(pg, qc);
            if (data.success) {
                const parsed = parseQuestionHtml(data.questionLists ?? '');
                setQuestions(prev => mode === 'append' ? [...prev, ...parsed] : parsed);
                setPageNo(data.pageNo ?? pg + 1);
                setHasMore(data.isRecordExists !== 0 && parsed.length >= 10);
            } else {
                setError('Failed to load discussions.');
            }
        } catch {
            setError('Unable to connect to the discussion board. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => { load(0, 'all', 'replace'); }, []); // eslint-disable-line

    const handleCategory = (cat: string) => {
        setActiveCategory(cat);
        load(0, cat, 'replace');
    };

    const handleLoadMore = () => load(pageNo, activeCategory, 'append');

    // client-side search filter
    const filtered = search
        ? questions.filter(q =>
            q.title.toLowerCase().includes(search.toLowerCase()) ||
            q.text.toLowerCase().includes(search.toLowerCase()) ||
            q.author.toLowerCase().includes(search.toLowerCase())
        )
        : questions;

    const totalViews = questions.reduce((s, q) => s + q.views, 0);
    const totalReplies = questions.reduce((s, q) => s + q.replies, 0);

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Discussion Board" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '4px' }}>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Discussion Board</h2>
                            <a
                                href={`${FORUM_BASE}/community/q/ask`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                                    padding: '10px 20px', borderRadius: '10px',
                                    background: 'var(--green)', color: '#fff',
                                    fontSize: '13.5px', fontWeight: 700,
                                    textDecoration: 'none', transition: 'opacity .15s',
                                }}
                                onMouseOver={e => (e.currentTarget.style.opacity = '0.87')}
                                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>add</span>
                                Ask a Question
                            </a>
                        </div>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5" style={{ color: 'var(--green)' }}>forum</span>
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Live discussions from the{' '}
                                <a href={`${FORUM_BASE}/community/q`} target="_blank" rel="noopener noreferrer"
                                    style={{ color: 'var(--green)', fontWeight: 700 }}>
                                    TCI Discussion Forum
                                </a>
                                {' '}— browse questions from fellow students and professionals on transcription,
                                editing, jobs, tools, and more. Click any thread to view the full discussion.
                            </p>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Discussions"    value={loading ? '...' : String(questions.length) + (hasMore ? '+' : '')} icon="forum"          borderColor="var(--green)"  iconColor="var(--green)"  />
                        <BorderStatCard label="Total Replies"  value={loading ? '...' : String(totalReplies)}                            icon="chat_bubble"    borderColor="var(--blue)"   iconColor="var(--blue)"   />
                        <BorderStatCard label="Total Views"    value={loading ? '...' : String(totalViews)}                              icon="visibility"     borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Categories"     value={String(CATEGORIES.length - 1)}                                    icon="category"       borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* ── Category tabs ── */}
                    <section>
                        <div style={{
                            background: '#F4F7F6', borderRadius: '12px',
                            padding: '6px', display: 'flex', gap: '4px',
                            flexWrap: 'wrap', marginBottom: '20px',
                        }}>
                            {CATEGORIES.map(cat => {
                                const active = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategory(cat.id)}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                                            padding: '8px 14px', borderRadius: '8px', border: 'none',
                                            background: active ? '#fff' : 'transparent',
                                            color: active ? 'var(--green)' : 'var(--text-secondary)',
                                            fontWeight: active ? 700 : 500,
                                            fontSize: '12.5px', cursor: 'pointer',
                                            boxShadow: active ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
                                            transition: 'all .15s', fontFamily: 'inherit',
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{cat.icon}</span>
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search */}
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                            <span className="material-symbols-outlined" style={{
                                position: 'absolute', left: '12px', top: '50%',
                                transform: 'translateY(-50%)', fontSize: '18px',
                                color: 'var(--text-secondary)',
                            }}>search</span>
                            <input
                                type="text"
                                placeholder="Search discussions..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px 12px 10px 40px',
                                    borderRadius: '9px', border: '1.5px solid var(--border)',
                                    fontSize: '13.5px', fontFamily: 'inherit',
                                    outline: 'none', background: '#fff', boxSizing: 'border-box',
                                }}
                                onFocus={e => (e.target.style.borderColor = 'var(--green)')}
                                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                            />
                            {search && (
                                <button onClick={() => setSearch('')} style={{
                                    position: 'absolute', right: '10px', top: '50%',
                                    transform: 'translateY(-50%)', background: 'none',
                                    border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>close</span>
                                </button>
                            )}
                        </div>

                        {/* List */}
                        {loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : error ? (
                            <div style={{
                                textAlign: 'center', padding: '60px 20px',
                                background: '#fff', borderRadius: '14px',
                                border: '1.5px solid var(--border)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '42px', color: '#f87171', display: 'block', marginBottom: '12px' }}>error_outline</span>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{error}</p>
                                <button
                                    onClick={() => load(0, activeCategory, 'replace')}
                                    style={{
                                        padding: '9px 20px', borderRadius: '9px',
                                        background: 'var(--green)', color: '#fff',
                                        border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                    }}
                                >
                                    Retry
                                </button>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{
                                textAlign: 'center', padding: '60px 20px',
                                background: '#fff', borderRadius: '14px',
                                border: '1.5px solid var(--border)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '42px', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>search_off</span>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No discussions found.</p>
                            </div>
                        ) : (
                            <>
                                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                    Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> discussion{filtered.length !== 1 ? 's' : ''}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {filtered.map(q => <QuestionCard key={q.id} q={q} />)}
                                </div>

                                {/* Load more */}
                                {hasMore && !search && (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                                padding: '11px 32px', borderRadius: '10px',
                                                background: loadingMore ? '#e2e8f0' : 'var(--green-light)',
                                                color: loadingMore ? 'var(--text-secondary)' : 'var(--green)',
                                                border: `1.5px solid ${loadingMore ? 'var(--border)' : '#a7d7c8'}`,
                                                fontSize: '13.5px', fontWeight: 700,
                                                cursor: loadingMore ? 'not-allowed' : 'pointer',
                                                transition: 'all .15s',
                                            }}
                                        >
                                            {loadingMore ? (
                                                <>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '17px', animation: 'spin 1s linear infinite' }}>progress_activity</span>
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>expand_more</span>
                                                    Load More Discussions
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                </main>
            </div>

            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </DashboardLayout>
    );
};

export default DiscussionBoardPage;
