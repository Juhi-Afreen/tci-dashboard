import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Data ──────────────────────────────────────────────────────────────────────

const BASE = '/verbatim-files/';

interface VerbatimItem {
    id: number;
    title: string;
    audio: string;
    doc: string;
}

const verbatimItems: VerbatimItem[] = [
    { id: 1,  title: 'Interview 1',          audio: BASE + 'Interview1.wav',           doc: BASE + 'Interview1.docx' },
    { id: 2,  title: 'Interview 2',          audio: BASE + 'Interview2.wav',           doc: BASE + 'Interview2.docx' },
    { id: 3,  title: 'Interview 3',          audio: BASE + 'Interview3.wav',           doc: BASE + 'Interview3.docx' },
    { id: 4,  title: 'Interview 4',          audio: BASE + 'Interview4.wav',           doc: BASE + 'Interview4.docx' },
    { id: 5,  title: 'Interview 5',          audio: BASE + 'Interview5.wav',           doc: BASE + 'Interview5.docx' },
    { id: 6,  title: 'Interview 6',          audio: BASE + 'Interview6.wav',           doc: BASE + 'Interview6.docx' },
    { id: 7,  title: 'Interview 7',          audio: BASE + 'Interview7.wav',           doc: BASE + 'Interview7.docx' },
    { id: 8,  title: 'Interview 8',          audio: BASE + 'Interview8.wav',           doc: BASE + 'Interview8.docx' },
    { id: 9,  title: 'Interview 9',          audio: BASE + 'Interview9.wav',           doc: BASE + 'Interview9.docx' },
    { id: 10, title: 'Interview 10',         audio: BASE + 'Interview10.wav',          doc: BASE + 'Interview10.docx' },
    { id: 11, title: 'Interview 11',         audio: BASE + 'Interview11.wav',          doc: BASE + 'Interview11.docx' },
    { id: 12, title: 'Male Speaker 1',       audio: BASE + 'Male-Speaker1.wav',        doc: BASE + 'Male-Speaker-1.docx' },
    { id: 13, title: 'Male Speaker 2',       audio: BASE + 'Male-Speaker2.wav',        doc: BASE + 'Male-Speaker-2.docx' },
    { id: 14, title: 'Male Speaker 3',       audio: BASE + 'Male-Speaker3.wav',        doc: BASE + 'Male-Speaker-3.docx' },
    { id: 15, title: 'One Speaker (PC) 1',   audio: BASE + 'One-Speaker(PC)1.wav',     doc: BASE + 'One-Speaker(PC)-1.docx' },
    { id: 16, title: 'One Speaker (PC) 2',   audio: BASE + 'One-Speaker(PC)2.wav',     doc: BASE + 'One-Speaker(PC)- 2.docx' },
    { id: 17, title: 'One Speaker (PC) 3',   audio: BASE + 'One-Speaker(PC)3.wav',     doc: BASE + 'One-Speaker(PC)-3.docx' },
    { id: 18, title: 'Two Male Speakers 1',  audio: BASE + 'Two-Male-Speakers1.wav',   doc: BASE + 'Two-Male-Speakers-1.docx' },
    { id: 19, title: 'Two Male Speakers 2',  audio: BASE + 'Two-Male-Speakers2.wav',   doc: BASE + 'Two-Male-Speakers-2.docx' },
    { id: 20, title: 'Two Male Speakers 3',  audio: BASE + 'Two-Male-Speakers3.wav',   doc: BASE + 'Two-Male-Speakers-3.docx' },
    { id: 21, title: 'Two Male Speakers 4',  audio: BASE + 'Two-Male-Speakers4.wav',   doc: BASE + 'Two-Male-Speakers-4.docx' },
    { id: 22, title: 'Voicemail',            audio: BASE + 'Voicemail.m4a',            doc: BASE + 'Voicemail.docx' },
];

const PREVIEW_COUNT = 5;

// ── Download all ──────────────────────────────────────────────────────────────

function downloadAll() {
    verbatimItems.forEach(item => {
        const a = document.createElement('a');
        a.href = item.audio; a.download = item.audio.split('/').pop()!; a.click();
        const b = document.createElement('a');
        b.href = item.doc;   b.download = item.doc.split('/').pop()!;   b.click();
    });
}

// ── Row component ─────────────────────────────────────────────────────────────

const ItemRow: React.FC<{ item: VerbatimItem }> = ({ item }) => (
    <div
        style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            background: '#fff', borderRadius: '10px',
            padding: '13px 16px',
            border: '1.5px solid var(--border)',
            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
        }}
    >
        {/* Number badge */}
        <span
            style={{
                minWidth: '28px', height: '28px', borderRadius: '8px',
                background: 'var(--green-light)', color: 'var(--green)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700, flexShrink: 0,
                border: '1px solid #a7d7c8',
            }}
        >
            {item.id}
        </span>

        {/* Title */}
        <span style={{ flex: 1, fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {item.title}
        </span>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <a
                href={item.audio} download
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '7px 14px', borderRadius: '8px',
                    background: 'var(--green)', color: '#fff',
                    fontSize: '12.5px', fontWeight: 600,
                    textDecoration: 'none', cursor: 'pointer',
                    transition: 'opacity .15s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>headphones</span>
                Audio
            </a>
            <a
                href={item.doc} download
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '7px 14px', borderRadius: '8px',
                    background: '#1e293b', color: '#fff',
                    fontSize: '12.5px', fontWeight: 600,
                    textDecoration: 'none', cursor: 'pointer',
                    transition: 'opacity .15s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>description</span>
                Document
            </a>
        </div>
    </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const VerbatimPage: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const visible = showAll ? verbatimItems : verbatimItems.slice(0, PREVIEW_COUNT);

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Verbatim vs Non-verbatim" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Verbatim vs Non-verbatim</h2>
                        <div
                            className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}
                        >
                            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5" style={{ color: 'var(--green)' }}>
                                compare
                            </span>
                            <div>
                                <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                    Understanding what to type when transcribing verbatim vs. non-verbatim can be tricky, so we have compiled these audios
                                    with corresponding transcripts to show you the difference between the two. Download the audio to listen to when reviewing
                                    the corresponding transcript. The transcript will show you one version of the audio typed verbatim and a second version
                                    typed non-verbatim. You can compare the two versions to understand what words are included in verbatim and left out in
                                    non-verbatim. Remember when working with transcription companies, they may have their own rules when it comes to verbatim
                                    vs. non-verbatim, so be sure to follow those guidelines on their assignments.
                                </p>
                                <p className="text-sm leading-relaxed mt-3" style={{ color: '#1a5c47' }}>
                                    <span className="font-extrabold" style={{ color: 'var(--green)' }}>Tip:</span>{' '}
                                    Test your skills by only downloading the audios and transcribing them yourself in both verbatim and non-verbatim versions,
                                    without peeking at the provided transcripts. Then see how you did by comparing our transcript to yours.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Total Samples"    value={String(verbatimItems.length)} icon="library_music"   borderColor="var(--green)"  iconColor="var(--green)"  />
                        <BorderStatCard label="Interviews"       value="11"                           icon="record_voice_over" borderColor="var(--blue)"  iconColor="var(--blue)"   />
                        <BorderStatCard label="Speaker Samples"  value="10"                           icon="people"           borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Audio Formats"    value="2"                            icon="audio_file"       borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* ── File list ── */}
                    <section>
                        <p className="text-sm font-semibold mb-5" style={{ color: 'var(--text-secondary)' }}>
                            Please click the below links to download the audio and corresponding transcribed file
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {visible.map(item => <ItemRow key={item.id} item={item} />)}
                        </div>

                        {/* Show more / Show less */}
                        <button
                            onClick={() => setShowAll(v => !v)}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                marginTop: '16px',
                                background: 'none', border: 'none',
                                cursor: 'pointer', fontFamily: 'inherit',
                                fontSize: '13px', fontWeight: 600,
                                color: 'var(--green)',
                                padding: '4px 0',
                            }}
                        >
                            {showAll ? 'Show less' : `Show all ${verbatimItems.length} samples`}
                            <svg
                                width="14" height="14" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth={2.5}
                                style={{
                                    transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform .2s',
                                }}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {/* Download All */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                            <button
                                onClick={downloadAll}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                                    padding: '13px 36px', borderRadius: '10px',
                                    background: 'var(--green)', color: '#fff',
                                    fontSize: '14px', fontWeight: 700,
                                    border: 'none', cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(31,142,109,.35)',
                                    transition: 'opacity .15s, transform .15s',
                                }}
                                onMouseOver={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                                Download All
                            </button>
                        </div>
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default VerbatimPage;
