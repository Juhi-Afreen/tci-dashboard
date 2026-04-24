import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';
import resourceCover1 from '../assets/ebook-1.jpg';
import resourceCover2 from '../assets/ebook-2.jpg';
import resourceCover3 from '../assets/ebook-3.jpg';
import resourceCover4 from '../assets/ebook-4.jpg';

// ── Ebook data ─────────────────────────────────────────────────────────────────

interface Ebook {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    url: string;
    pages: string;
    category: string;
    categoryColor: string;
    categoryBg: string;
    coverColor: string;
    coverAccent: string;
    coverIcon: string;
    coverImage?: string;
    tags: string[];
}

const ebooks: Ebook[] = [
    {
        id: 1,
        title: 'Resource Guide for Transcribers',
        subtitle: 'Your complete starter toolkit',
        description: 'A comprehensive resource guide packed with tools, references, and best practices every transcriber needs — from beginners to seasoned professionals.',
        url: 'https://tcistorage.blob.core.windows.net/local/documents/resource-guide-for-transcribers.pdf',
        pages: 'PDF Guide',
        category: 'Getting Started',
        categoryColor: 'var(--green)',
        categoryBg: 'var(--green-light)',
        coverColor: '#1a5c47',
        coverAccent: '#2aa880',
        coverIcon: 'menu_book',
        coverImage: resourceCover1,
        tags: ['Resources', 'Tools', 'Reference'],
    },
    {
        id: 2,
        title: 'A Complete Guide to Transcription Jobs',
        subtitle: 'Descriptions, Requirements & Stats',
        description: 'Everything you need to know about transcription job roles — detailed job descriptions, skill requirements, salary stats, and how to land your first client.',
        url: 'https://tcistorage.blob.core.windows.net/local/documents/a-complete-guide-to-transcription-jobs-descriptions-requirements-and-stats.pdf',
        pages: 'PDF Guide',
        category: 'Career',
        categoryColor: 'var(--blue)',
        categoryBg: '#EEF4FF',
        coverColor: '#1e3a6e',
        coverAccent: '#3b7dd8',
        coverIcon: 'work',
        coverImage: resourceCover2,
        tags: ['Jobs', 'Career', 'Salary'],
    },
    {
        id: 3,
        title: 'TCI Course Brochure',
        subtitle: 'Explore our certification programs',
        description: 'An overview of all TCI certification courses — program details, curriculum highlights, pricing, and what you will achieve upon completion.',
        url: 'https://tcistorage.blob.core.windows.net/local/documents/tci-course-brochure.pdf',
        pages: 'PDF Guide',
        category: 'Courses',
        categoryColor: 'var(--purple)',
        categoryBg: '#EEF0FF',
        coverColor: '#3b2d8a',
        coverAccent: '#7c6ee0',
        coverIcon: 'school',
        coverImage: resourceCover3,
        tags: ['Courses', 'Certification', 'TCI'],
    },
    {
        id: 4,
        title: 'TCI Job Board Ebook',
        subtitle: 'Find transcription work faster',
        description: 'Learn how to use the TCI Job Board to discover high-paying transcription opportunities, build your profile, and connect with top companies hiring right now.',
        url: 'https://tcistorage.blob.core.windows.net/local/documents/tci-Job-board-ebook.pdf',
        pages: 'PDF Guide',
        category: 'Job Board',
        categoryColor: 'var(--orange)',
        categoryBg: '#FFF4EC',
        coverColor: '#7a3010',
        coverAccent: '#e8723a',
        coverIcon: 'cases',
        coverImage: resourceCover4,
        tags: ['Jobs', 'Job Board', 'Hiring'],
    },
];

// ── Book cover illustration ───────────────────────────────────────────────────

const BookCover: React.FC<{ ebook: Ebook }> = ({ ebook }) => (
    <div
        style={{
            width: '100%',
            aspectRatio: '3/4',
            borderRadius: '10px 10px 10px 10px',
            backgroundImage: ebook.coverImage
                ? `linear-gradient(160deg, ${ebook.coverColor}CC 0%, ${ebook.coverAccent}B3 100%), url(${ebook.coverImage})`
                : `linear-gradient(160deg, ${ebook.coverColor} 0%, ${ebook.coverAccent} 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '4px 4px 16px rgba(0,0,0,.25), -2px 0 0 rgba(0,0,0,.15)',
        }}
    >
        <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,.28)',
        }}>
            <Icon icon={ebook.coverIcon} style={{ fontSize: '30px', color: '#fff' }} />
        </div>
    </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const FreeEbookPage: React.FC = () => {
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleCopyLink = (ebook: Ebook) => {
        navigator.clipboard.writeText(ebook.url);
        setCopiedId(ebook.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Free Ebook" />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Free Ebooks</h2>
                            <span style={{
                                fontSize: '12px', fontWeight: 800,
                                padding: '4px 12px', borderRadius: '20px',
                                background: '#FFD700', color: '#7a3010',
                                letterSpacing: '0.5px',
                            }}>
                                100% FREE
                            </span>
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                            Free eBooks for Transcriptionists&nbsp;
                            <span style={{ fontStyle: 'italic', color: 'var(--green)', fontWeight: 600 }}>
                                (more coming soon...)
                            </span>
                        </p>
                        <div
                            className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}
                        >
                            <Icon icon="auto_stories" className="text-[22px] shrink-0 mt-0.5" style={{ color: '#1f8f6d' }} />
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Expand your transcription knowledge with our collection of free ebooks and guides.
                                Browse, preview, and download any resource — completely free for all TCI students.
                                No signup or payment required to access these materials.
                            </p>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Free Ebooks" value={String(ebooks.length)} icon="auto_stories" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Career Guides" value="2" icon="work" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="Course Guides" value="1" icon="school" borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Cost" value="$0" icon="redeem" borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* ── Ebook grid ── */}
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ebooks.map(ebook => (
                                <div
                                    key={ebook.id}
                                    style={{
                                        background: '#fff',
                                        borderRadius: '16px',
                                        border: '1.5px solid var(--border)',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 12px rgba(0,0,0,.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'box-shadow .2s, transform .2s',
                                    }}
                                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,.10)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,.05)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                                >
                                    <div style={{ display: 'flex', gap: '0', flex: 1 }}>

                                        {/* Book cover panel */}
                                        <div style={{ width: '140px', flexShrink: 0, padding: '20px 0 20px 20px' }}>
                                            <BookCover ebook={ebook} />
                                        </div>

                                        {/* Content panel */}
                                        <div style={{ flex: 1, padding: '20px 20px 16px 20px', display: 'flex', flexDirection: 'column' }}>

                                            {/* Category */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    fontSize: '11px', fontWeight: 700,
                                                    padding: '3px 10px', borderRadius: '20px',
                                                    background: ebook.categoryBg, color: ebook.categoryColor,
                                                    border: `1px solid ${ebook.categoryColor}30`,
                                                }}>
                                                    {ebook.category}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35, margin: '0 0 4px' }}>
                                                {ebook.title}
                                            </h3>
                                            <p style={{ fontSize: '12px', fontWeight: 500, color: ebook.categoryColor, margin: '0 0 10px' }}>
                                                {ebook.subtitle}
                                            </p>

                                            {/* Description */}
                                            <p style={{ fontSize: '12.5px', lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 14px', flex: 1 }}>
                                                {ebook.description}
                                            </p>

                                            {/* Tags */}
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                                {ebook.tags.map(tag => (
                                                    <span key={tag} style={{
                                                        fontSize: '10.5px', fontWeight: 600,
                                                        padding: '2px 8px', borderRadius: '6px',
                                                        background: '#F4F7F6', color: 'var(--text-secondary)',
                                                        border: '1px solid var(--border)',
                                                    }}>
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Format info */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                                                <Icon icon="picture_as_pdf" />
                                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>PDF Document · Free Download</span>
                                            </div>

                                            {/* Action buttons */}
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {/* Read Online */}
                                                <a
                                                    href={ebook.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        padding: '8px 14px', borderRadius: '8px',
                                                        background: ebook.categoryBg, color: ebook.categoryColor,
                                                        border: `1.5px solid ${ebook.categoryColor}40`,
                                                        fontSize: '12.5px', fontWeight: 700,
                                                        textDecoration: 'none', cursor: 'pointer',
                                                        transition: 'opacity .15s',
                                                        flex: '1',
                                                        justifyContent: 'center',
                                                        minWidth: '100px',
                                                    }}
                                                    onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
                                                    onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                                                >
                                                    <Icon icon="open_in_new" />
                                                    Read Online
                                                </a>

                                                {/* Download */}
                                                <a
                                                    href={ebook.url}
                                                    download
                                                    style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        padding: '8px 14px', borderRadius: '8px',
                                                        background: 'var(--green)', color: '#fff',
                                                        fontSize: '12.5px', fontWeight: 700,
                                                        textDecoration: 'none', cursor: 'pointer',
                                                        transition: 'opacity .15s',
                                                        flex: '1',
                                                        justifyContent: 'center',
                                                        minWidth: '100px',
                                                    }}
                                                    onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                                                    onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                                                >
                                                    <Icon icon="download" />
                                                    Download
                                                </a>

                                                {/* Copy link */}
                                                <button
                                                    onClick={() => handleCopyLink(ebook)}
                                                    title="Copy link"
                                                    style={{
                                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                        width: '36px', height: '36px', borderRadius: '8px',
                                                        background: copiedId === ebook.id ? '#e8f5f0' : '#F4F7F6',
                                                        color: copiedId === ebook.id ? 'var(--green)' : 'var(--text-secondary)',
                                                        border: `1.5px solid ${copiedId === ebook.id ? '#a7d7c8' : 'var(--border)'}`,
                                                        cursor: 'pointer',
                                                        transition: 'all .2s',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <Icon icon={copiedId === ebook.id ? 'check' : 'link'} style={{ fontSize: '16px' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default FreeEbookPage;
