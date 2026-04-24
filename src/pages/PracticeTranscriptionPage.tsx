import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Data ──────────────────────────────────────────────────────────────────────

interface PracticeItem {
    id: number;
    title: string;
    audio: string;
    doc: string;
}

interface DifficultyGroup {
    level: 'Easy' | 'Intermediate' | 'Difficult';
    color: string;
    bg: string;
    border: string;
    icon: string;
    items: PracticeItem[];
}

const BASE = '/practice-files/';

const practiceData: DifficultyGroup[] = [
    {
        level: 'Easy',
        color: 'var(--green)',
        bg: 'var(--green-light)',
        border: '#a7d7c8',
        icon: 'signal_cellular_1_bar',
        items: [
            { id: 1, title: 'One Speaker', audio: BASE + 'goodquality1spk.mp3', doc: BASE + 'goodquality1spk.doc' },
            { id: 2, title: 'One Speaker Presentation', audio: BASE + 'onespeakerpresentation.mp3', doc: BASE + 'onespeakerpresentation.doc' },
            { id: 3, title: 'One on One Interview – Good', audio: BASE + 'oneonone_interview_good.mp3', doc: BASE + 'oneonone_interview_good.doc' },
            { id: 4, title: 'Good 1 Speaker Time Stamps Every 30 Sec', audio: BASE + 'Good_1_Speaker_time_stamps_every_30_sec.mp3', doc: BASE + 'Good_1_Speaker_time_stamps_every_30_sec.doc' },
        ],
    },
    {
        level: 'Intermediate',
        color: 'var(--blue)',
        bg: '#EEF4FF',
        border: '#b3caef',
        icon: 'signal_cellular_2_bar',
        items: [
            { id: 1, title: 'Family Therapy – Intermediate', audio: BASE + 'familytherapy.mp3', doc: BASE + 'familytherapy.doc' },
            { id: 2, title: 'Police Interrogation', audio: BASE + 'policeinterrogation.mp3', doc: BASE + 'policeinterrogation.doc' },
            { id: 3, title: 'Focus Group', audio: BASE + 'focusgroup.mp3', doc: BASE + 'focusgroup.doc' },
            { id: 4, title: '2 Speaker Fair Audio Verbatim', audio: BASE + '2_Speaker_Fair_Audio_Verbatim.mp3', doc: BASE + '2_Speaker_Fair_Audio_Verbatim.doc' },
        ],
    },
    {
        level: 'Difficult',
        color: 'var(--orange)',
        bg: '#FFF4EC',
        border: '#f5c49a',
        icon: 'signal_cellular_alt',
        items: [
            { id: 1, title: 'German Accent', audio: BASE + 'Germanaccent_interviewTimeStamps.mp3', doc: BASE + 'Germanaccent_interviewTimeStamps.doc' },
            { id: 2, title: 'Roundtable Meeting', audio: BASE + 'roundtablemeeting.mp3', doc: BASE + 'roundtablemeeting.doc' },
            { id: 3, title: 'Family Therapy – Difficult', audio: BASE + 'therapy_diff.mp3', doc: BASE + 'therapy_diff.doc' },
            { id: 4, title: '2 Speaker Difficult', audio: BASE + '2_Speaker_Difficult_Audio.mp3', doc: BASE + '2_Speaker_Difficult_Audio.doc' },
            { id: 5, title: 'Difficult Focus Group', audio: BASE + 'Difficult_Focus_Group.mp3', doc: BASE + 'Difficult_Focus_Group.doc' },
        ],
    },
];

const totalItems = practiceData.reduce((s, g) => s + g.items.length, 0);

// ── Download helpers ──────────────────────────────────────────────────────────

function downloadFile(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

function downloadAll() {
    practiceData.forEach(group =>
        group.items.forEach(item => {
            downloadFile(item.audio, item.audio.split('/').pop()!);
            downloadFile(item.doc, item.doc.split('/').pop()!);
        })
    );
}

// ── Difficulty badge colors ───────────────────────────────────────────────────

// ── Component ─────────────────────────────────────────────────────────────────

const PracticeTranscriptionPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Easy' | 'Intermediate' | 'Difficult'>('Easy');

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Practice Transcription" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Practice Transcription</h2>
                        <div
                            className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}
                        >
                            <Icon icon="mic" className="text-[22px] shrink-0 mt-0.5" style={{ color: '#1f8f6d' }} />
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Below you will find a variety of audio files and corresponding transcripts to review and test your skills.
                                We suggest you go through the lessons first before attempting to transcribe any of these files.
                                Once you feel prepared, download the audio file and transcribe it to the best of your ability — don't forget to proofread!
                            </p>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Total Exercises" value={String(totalItems)} icon="headphones" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Easy" value={String(practiceData.find(g => g.level === 'Easy')!.items.length)} icon="signal_cellular_1_bar" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Intermediate" value={String(practiceData.find(g => g.level === 'Intermediate')!.items.length)} icon="signal_cellular_2_bar" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="Difficult" value={String(practiceData.find(g => g.level === 'Difficult')!.items.length)} icon="signal_cellular_alt" borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* ── Tabs + content ── */}
                    <section>
                        <p className="text-sm font-semibold mb-5" style={{ color: 'var(--text-secondary)' }}>
                            Please click the below links to download the audio and corresponding transcribed file
                        </p>

                        {/* Tab bar */}
                        <div style={{ display: 'flex', gap: '4px', background: '#F4F7F6', borderRadius: '10px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
                            {practiceData.map(group => (
                                <button
                                    key={group.level}
                                    onClick={() => setActiveTab(group.level as 'Easy' | 'Intermediate' | 'Difficult')}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '7px',
                                        padding: '9px 20px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        fontSize: '13.5px',
                                        fontWeight: 600,
                                        transition: 'all .15s',
                                        background: activeTab === group.level ? '#fff' : 'transparent',
                                        color: activeTab === group.level ? group.color : 'var(--text-secondary)',
                                        boxShadow: activeTab === group.level ? '0 1px 6px rgba(0,0,0,.08)' : 'none',
                                    }}
                                >
                                    <Icon icon={group.icon} style={{ fontSize: '17px' }} />
                                    {group.level}
                                    <span
                                        style={{
                                            fontSize: '11px', fontWeight: 700,
                                            padding: '1px 7px', borderRadius: '20px',
                                            background: activeTab === group.level ? group.bg : 'transparent',
                                            color: activeTab === group.level ? group.color : 'var(--text-secondary)',
                                            border: activeTab === group.level ? `1px solid ${group.border}` : '1px solid transparent',
                                            transition: 'all .15s',
                                        }}
                                    >
                                        {group.items.length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Active tab content */}
                        {practiceData.filter(g => g.level === activeTab).map(group => (
                            <div key={group.level} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {group.items.map(item => (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            background: '#fff',
                                            borderRadius: '10px',
                                            padding: '13px 16px',
                                            border: '1.5px solid var(--border)',
                                            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                                        }}
                                    >
                                        {/* Number badge */}
                                        <span
                                            style={{
                                                minWidth: '28px', height: '28px',
                                                borderRadius: '8px',
                                                background: group.bg,
                                                color: group.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '12px', fontWeight: 700, flexShrink: 0,
                                                border: `1px solid ${group.border}`,
                                            }}
                                        >
                                            {item.id}
                                        </span>

                                        {/* Title */}
                                        <span style={{ flex: 1, fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                            {item.title}
                                        </span>

                                        {/* Download buttons */}
                                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                            <a
                                                href={item.audio}
                                                download
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
                                                <Icon icon="headphones" />
                                                Audio
                                            </a>
                                            <a
                                                href={item.doc}
                                                download
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
                                                <Icon icon="description" />
                                                Document
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* ── Download All button ── */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                            <button
                                onClick={downloadAll}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                                    padding: '13px 36px',
                                    borderRadius: '10px',
                                    background: 'var(--green)',
                                    color: '#fff',
                                    fontSize: '14px', fontWeight: 700,
                                    border: 'none', cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(31,142,109,.35)',
                                    transition: 'opacity .15s, transform .15s',
                                }}
                                onMouseOver={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <Icon icon="download" />
                                Download All
                            </button>
                        </div>
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default PracticeTranscriptionPage;
