import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Tips data ─────────────────────────────────────────────────────────────────

interface Tip {
    id: number;
    title: string;
    body: string;
    icon: string;
    category: 'confidentiality' | 'media' | 'legal';
}

const tipsData: Tip[] = [
    {
        id: 1,
        title: 'Never Share Audios or Transcripts',
        body: 'Never share audios or transcripts with anyone. They should only be submitted for completion, and then both audios and transcripts should be deleted from your computer. NEVER print out the transcripts.',
        icon: 'block',
        category: 'confidentiality',
    },
    {
        id: 2,
        title: 'Shred All Unnecessary Paperwork',
        body: 'When any paperwork is no longer necessary, it should not only be thrown away but also shredded prior to throwing away.',
        icon: 'delete_forever',
        category: 'confidentiality',
    },
    {
        id: 3,
        title: 'Keep Work Discussions Private',
        body: 'No work should ever be discussed with anyone other than the company for which you are performing the work.',
        icon: 'lock',
        category: 'confidentiality',
    },
    {
        id: 4,
        title: 'Protect Files From All Viewers',
        body: 'No one (other than you) should even "see" the files you are working on — even a family member in your own home.',
        icon: 'visibility_off',
        category: 'confidentiality',
    },
    {
        id: 5,
        title: 'Style Manuals Are Highly Confidential',
        body: 'Company style manuals, instructions, templates, or any type of paperwork is highly confidential and should also not be shared with anyone.',
        icon: 'menu_book',
        category: 'confidentiality',
    },
    {
        id: 6,
        title: 'Shred All Materials When Leaving a Company',
        body: 'Should you ever quit or be fired from a company, ALL materials in your possession regarding that company\'s policies, style manuals, templates, etc. should be shredded and thrown away.',
        icon: 'shredder',
        category: 'confidentiality',
    },
    {
        id: 7,
        title: 'Never Contact Clients Directly',
        body: 'Never contact, in any way, any clients for whom you are contracting work. Should you need any information on that client\'s work, you should ask your company representative.',
        icon: 'person_off',
        category: 'legal',
    },
    {
        id: 8,
        title: 'No Copies of Physical Media',
        body: 'Should you transcribe from any other types of media other than digital, you should NEVER make any copies of that media, such as cassettes, CDs, DVDs, etc. Return the original to the company and do NOT make any copies, as it is proprietary.',
        icon: 'no_sim',
        category: 'media',
    },
    {
        id: 9,
        title: 'Never Save Copies of Digital Files',
        body: 'You should never save copies of digital files for the same reason that physical media must not be copied. All digital source files are proprietary and must be handled with the same care as physical originals.',
        icon: 'cloud_off',
        category: 'media',
    },
    {
        id: 10,
        title: 'Client Confidentiality Is a Legal Right',
        body: 'Always remember when you contract with any company that the above holds true. As patients are guaranteed their personal information can never be shared, any transcription client has that same right to their own materials.',
        icon: 'gavel',
        category: 'legal',
    },
    {
        id: 11,
        title: 'Your NDA Is Legally Binding',
        body: 'When you contract with any transcription company, you are required to sign a Confidentiality/NDA Agreement, which is legally binding. Following the above regulations will prevent you from making the mistake of breaching that contract and possibly being sued.',
        icon: 'verified_user',
        category: 'legal',
    },
];

const categoryMeta: Record<Tip['category'], { label: string; color: string; bg: string; border: string }> = {
    confidentiality: { label: 'Confidentiality', color: 'var(--green)', bg: 'var(--green-light)', border: '#a7d7c8' },
    media: { label: 'Media Handling', color: 'var(--blue)', bg: '#EEF4FF', border: '#b3caef' },
    legal: { label: 'Legal & NDA', color: 'var(--purple)', bg: '#EEF0FF', border: '#c4bfef' },
};

const FILTERS = [
    { id: 'all', label: 'All Tips' },
    { id: 'confidentiality', label: 'Confidentiality' },
    { id: 'media', label: 'Media Handling' },
    { id: 'legal', label: 'Legal & NDA' },
] as const;

type FilterId = typeof FILTERS[number]['id'];

// ── Component ─────────────────────────────────────────────────────────────────

const TipsAndTricksPage: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);
    const [filter, setFilter] = useState<FilterId>('all');

    const filtered = filter === 'all' ? tipsData : tipsData.filter(t => t.category === filter);

    const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Tips and Tricks" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Tips and Tricks</h2>
                        <div
                            className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}
                        >
                            <Icon
                                icon="tips_and_updates"
                                className="text-[22px] shrink-0 mt-0.5"
                                style={{ color: '#1f8f6d' }}
                            />
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Essential confidentiality guidelines every transcriptionist must follow.
                                These rules are legally binding — breaching them may result in termination or legal action.&nbsp;
                                <span className="font-extrabold uppercase tracking-wide" style={{ color: 'var(--green)' }}>
                                    Read carefully.
                                </span>
                            </p>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Total Tips" value={String(tipsData.length)} icon="tips_and_updates" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Confidentiality" value={String(tipsData.filter(t => t.category === 'confidentiality').length)} icon="lock" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Media Handling" value={String(tipsData.filter(t => t.category === 'media').length)} icon="no_sim" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="Legal & NDA" value={String(tipsData.filter(t => t.category === 'legal').length)} icon="gavel" borderColor="var(--purple)" iconColor="var(--purple)" />
                    </section>

                    {/* ── Filter bar ── */}
                    <section>
                        <div
                            style={{
                                display: 'flex', gap: '4px', background: '#F4F7F6',
                                borderRadius: '10px', padding: '4px',
                                marginBottom: '24px', width: 'fit-content',
                            }}
                        >
                            {FILTERS.map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    style={{
                                        padding: '8px 18px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        transition: 'all .15s',
                                        background: filter === f.id ? '#fff' : 'transparent',
                                        color: filter === f.id ? 'var(--green)' : 'var(--text-secondary)',
                                        boxShadow: filter === f.id ? '0 1px 6px rgba(0,0,0,.08)' : 'none',
                                    }}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* ── Accordion list ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filtered.map(tip => {
                                const isOpen = openId === tip.id;
                                const meta = categoryMeta[tip.category];
                                return (
                                    <div
                                        key={tip.id}
                                        style={{
                                            background: '#fff',
                                            borderRadius: '12px',
                                            border: `1.5px solid ${isOpen ? meta.border : 'var(--border)'}`,
                                            overflow: 'hidden',
                                            transition: 'border-color .2s, box-shadow .2s',
                                            boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,.07)' : '0 1px 4px rgba(0,0,0,.04)',
                                        }}
                                    >
                                        {/* Trigger row */}
                                        <button
                                            onClick={() => toggle(tip.id)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px',
                                                padding: '16px 20px',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                fontFamily: 'inherit',
                                            }}
                                        >
                                            {/* Number badge */}
                                            <span
                                                style={{
                                                    minWidth: '28px', height: '28px',
                                                    borderRadius: '8px',
                                                    background: isOpen ? meta.bg : '#F4F7F6',
                                                    color: isOpen ? meta.color : 'var(--text-secondary)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '12px', fontWeight: 700,
                                                    transition: 'all .2s',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {tip.id}
                                            </span>

                                            {/* Icon */}
                                            <Icon
                                                icon={tip.icon}
                                                style={{
                                                    fontSize: '20px',
                                                    color: isOpen ? meta.color : 'var(--text-secondary)',
                                                    flexShrink: 0,
                                                    transition: 'color .2s',
                                                }}
                                             />

                                            {/* Title */}
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '14px',
                                                    fontWeight: 700,
                                                    color: isOpen ? 'var(--text-primary)' : 'var(--text-primary)',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {tip.title}
                                            </span>

                                            {/* Category pill */}
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    fontWeight: 600,
                                                    padding: '3px 10px',
                                                    borderRadius: '20px',
                                                    background: meta.bg,
                                                    color: meta.color,
                                                    border: `1px solid ${meta.border}`,
                                                    whiteSpace: 'nowrap',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {meta.label}
                                            </span>

                                            {/* Chevron */}
                                            <svg
                                                width="16" height="16"
                                                fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" strokeWidth={2.5}
                                                style={{
                                                    flexShrink: 0,
                                                    color: isOpen ? meta.color : 'var(--text-secondary)',
                                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: 'transform .2s, color .2s',
                                                }}
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>

                                        {/* Expanded body */}
                                        {isOpen && (
                                            <div
                                                style={{
                                                    padding: '0 20px 18px 62px',
                                                    borderTop: `1px solid ${meta.border}`,
                                                    background: meta.bg,
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontSize: '13.5px',
                                                        lineHeight: 1.7,
                                                        color: '#2d4a42',
                                                        marginTop: '14px',
                                                    }}
                                                >
                                                    {tip.body}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty state */}
                        {filtered.length === 0 && (
                            <div
                                style={{
                                    textAlign: 'center', padding: '60px 20px',
                                    color: 'var(--text-secondary)', fontSize: '14px',
                                }}
                            >
                                <Icon icon="search_off" style={{ fontSize: 40, display: 'block', marginBottom: 12, color: 'var(--text-secondary)' }} />
                                No tips found for this category.
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default TipsAndTricksPage;
