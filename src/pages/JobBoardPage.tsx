import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Job {
    Id: number;
    JobTitle: string;
    JobURL: string;
    CompanyId: number;
    CompanyName: string;
    CompanyURL: string;
    CompanyLogo: string;
    JobTypeName: string;
    WorkLocationName: string;
    ExperienceInText: string;
    SalaryRangeInText: string;
    JobSkills: string;
    CreatedOn: string;
    CountryName: string;
    City: string;
    State: string;
}

interface ApiResponse {
    success: boolean;
    jobs: Job[];
    nextPageNumber: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const JOB_BASE = 'https://jobs.transcriptioncertificationinstitute.org';
const LOGO_BASE = 'https://jobs.transcriptioncertificationinstitute.org';

function jobUrl(job: Job) {
    const slug = (job.JobURL || '').length > 95 ? job.JobURL.substr(0, 95) : job.JobURL;
    return `${JOB_BASE}/job/${job.Id}/${slug}`;
}

function companyLogoUrl(logo: string) {
    if (!logo) return null;
    if (logo.startsWith('http')) return logo;
    return `${LOGO_BASE}${logo}`;
}

function locationText(job: Job) {
    const parts = [job.City, job.State, job.CountryName].filter(Boolean);
    return parts.length ? parts.join(', ') : job.WorkLocationName;
}

const jobTypeColor: Record<string, { color: string; bg: string }> = {
    'Full Time Job': { color: 'var(--green)', bg: 'var(--green-light)' },
    'Part Time Job': { color: 'var(--blue)', bg: '#EEF4FF' },
    'Freelance': { color: 'var(--purple)', bg: '#EEF0FF' },
    'Independent Contractor Gigs': { color: 'var(--orange)', bg: '#FFF4EC' },
    'Internship': { color: '#0891b2', bg: '#e0f7fa' },
    'Temporary': { color: '#92600a', bg: '#FFF8DC' },
};
function getTypeStyle(type: string) {
    return jobTypeColor[type] ?? { color: 'var(--green)', bg: 'var(--green-light)' };
}

// ── Fetch jobs via CRA proxy ──────────────────────────────────────────────────

async function fetchJobs(params: {
    page: number; q: string; workLocId: number; jobTypeId: number;
}): Promise<ApiResponse> {
    const body = new URLSearchParams({
        pageNo: String(params.page),
        recordCountPerPage: '10',
        cuid: '',
        q: params.q,
        workLocId: String(params.workLocId),
        jobTypeId: String(params.jobTypeId),
        exp: '0',
        skids: '',
    });
    const res = await fetch('/tci-jobs-api/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    });
    return res.json();
}

// ── Skeleton loader ───────────────────────────────────────────────────────────

const SkeletonCard = () => (
    <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1.5px solid var(--border)', padding: '20px 24px',
        animation: 'pulse 1.5s ease-in-out infinite',
    }}>
        <div style={{ height: '14px', background: '#e2e8f0', borderRadius: '6px', width: '60%', marginBottom: '12px' }} />
        <div style={{ height: '11px', background: '#e2e8f0', borderRadius: '6px', width: '40%', marginBottom: '20px' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ height: '24px', background: '#e2e8f0', borderRadius: '20px', width: '80px' }} />
            <div style={{ height: '24px', background: '#e2e8f0', borderRadius: '20px', width: '100px' }} />
            <div style={{ height: '24px', background: '#e2e8f0', borderRadius: '20px', width: '70px' }} />
        </div>
    </div>
);

// ── Job card ──────────────────────────────────────────────────────────────────

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const typeStyle = getTypeStyle(job.JobTypeName);
    const logo = companyLogoUrl(job.CompanyLogo);
    const skills = job.JobSkills
        ? job.JobSkills.replace(/&amp;/g, '&').split(',').map(s => s.trim()).filter(Boolean)
        : [];

    return (
        <div
            style={{
                background: '#fff', borderRadius: '12px',
                border: '1.5px solid var(--border)', padding: '20px 24px',
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                transition: 'box-shadow .2s, transform .2s, border-color .2s',
                position: 'relative',
            }}
            onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,.09)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.borderColor = '#a7d7c8';
            }}
            onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,.04)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            }}
        >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

                {/* Company logo */}
                <div style={{
                    width: '48px', height: '48px', flexShrink: 0,
                    borderRadius: '10px', border: '1px solid var(--border)',
                    background: '#f8fafc', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {logo ? (
                        <img src={logo} alt={job.CompanyName}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    ) : (
                        <Icon icon="business" />
                    )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>

                        {/* Title + company */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{
                                fontSize: '14.5px', fontWeight: 800,
                                color: 'var(--text-primary)', margin: '0 0 3px',
                                lineHeight: 1.35, whiteSpace: 'nowrap',
                                overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                                {job.JobTitle}
                            </h3>
                            <p style={{ fontSize: '12.5px', color: 'var(--green)', fontWeight: 600, margin: '0 0 10px' }}>
                                {job.CompanyName}
                            </p>
                        </div>

                        {/* Apply button */}
                        <a
                            href={jobUrl(job)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                                padding: '7px 16px', borderRadius: '8px',
                                background: 'var(--green)', color: '#fff',
                                fontSize: '12.5px', fontWeight: 700,
                                textDecoration: 'none', flexShrink: 0,
                                transition: 'opacity .15s',
                            }}
                            onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                        >
                            <Icon icon="open_in_new" />
                            Apply Now
                        </a>
                    </div>

                    {/* Meta row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                        {[
                            { icon: 'map_pin', text: locationText(job) },
                            { icon: 'work_history', text: job.ExperienceInText?.trim() ? `${job.ExperienceInText.trim()} Exp` : null },
                            { icon: 'payments', text: job.SalaryRangeInText?.trim() && job.SalaryRangeInText !== 'Not Disclosed' ? `$${job.SalaryRangeInText.trim()}/hr` : 'Not Disclosed' },
                            { icon: 'home_work', text: job.WorkLocationName },
                        ].filter(m => m.text).map((meta, i) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                <Icon icon={meta.icon} style={{ fontSize: '14px' }} />
                                {meta.text}
                            </span>
                        ))}
                    </div>

                    {/* Tags row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                        {/* Job type badge */}
                        <span style={{
                            fontSize: '11px', fontWeight: 700,
                            padding: '3px 10px', borderRadius: '20px',
                            background: typeStyle.bg, color: typeStyle.color,
                            border: `1px solid ${typeStyle.color}30`,
                        }}>
                            {job.JobTypeName}
                        </span>

                        {/* Skill pills */}
                        {skills.map((skill, i) => (
                            <span key={i} style={{
                                fontSize: '11px', fontWeight: 600,
                                padding: '3px 9px', borderRadius: '6px',
                                background: '#F4F7F6', color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                            }}>
                                {skill}
                            </span>
                        ))}

                        {/* Posted date */}
                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Posted {job.CreatedOn}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const JobBoardPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [workLocId, setWorkLocId] = useState(0);
    const [jobTypeId, setJobTypeId] = useState(0);

    const load = useCallback(async (pg: number, q: string, wl: number, jt: number, mode: 'replace' | 'append') => {
        if (mode === 'replace') setLoading(true);
        else setLoadingMore(true);
        setError(null);
        try {
            const data = await fetchJobs({ page: pg, q, workLocId: wl, jobTypeId: jt });
            if (data.success) {
                setJobs(prev => mode === 'append' ? [...prev, ...(data.jobs ?? [])] : (data.jobs ?? []));
                setPage(data.nextPageNumber);
                setHasMore((data.jobs ?? []).length >= 10);
            } else {
                setError('Failed to load jobs. Please try again.');
            }
        } catch {
            setError('Unable to connect to the job board. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => { load(1, search, workLocId, jobTypeId, 'replace'); }, []); // eslint-disable-line

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        load(1, searchInput, workLocId, jobTypeId, 'replace');
    };

    const handleFilter = (wl: number, jt: number) => {
        setWorkLocId(wl); setJobTypeId(jt);
        load(1, search, wl, jt, 'replace');
    };

    const handleLoadMore = () => load(page, search, workLocId, jobTypeId, 'append');

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Job Board" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '4px' }}>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Transcription Job Board</h2>
                            <a
                                href="https://jobs.transcriptioncertificationinstitute.org/jobs"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    padding: '8px 16px', borderRadius: '8px',
                                    background: 'var(--green-light)', color: 'var(--green)',
                                    border: '1.5px solid #a7d7c8',
                                    fontSize: '13px', fontWeight: 700,
                                    textDecoration: 'none',
                                }}
                            >
                                <Icon icon="open_in_new" />
                                View Full Job Board
                            </a>
                        </div>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <Icon icon="work" className="text-[22px] shrink-0 mt-0.5" style={{ color: '#1f8f6d' }} />
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Browse live transcription and translation job opportunities sourced from the TCI Job Board.
                                Find full-time, part-time, freelance, and remote positions from top companies hiring right now.
                            </p>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Live Jobs" value={loading ? '...' : String(jobs.length + (hasMore ? '+' : ''))} icon="work" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Remote" value={loading ? '...' : String(jobs.filter(j => j.WorkLocationName === 'From Home').length)} icon="home_work" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="Full Time" value={loading ? '...' : String(jobs.filter(j => j.JobTypeName === 'Full Time Job').length)} icon="badge" borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Freelance" value={loading ? '...' : String(jobs.filter(j => j.JobTypeName === 'Freelance').length)} icon="person" borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* ── Search + Filters ── */}
                    <section>
                        <form onSubmit={handleSearch}>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                {/* Search box */}
                                <div style={{ flex: '1', minWidth: '220px', position: 'relative' }}>
                                    <Icon icon="search" style={{
                                        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                                        fontSize: '18px', color: 'var(--text-secondary)',
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search job title or keyword..."
                                        value={searchInput}
                                        onChange={e => setSearchInput(e.target.value)}
                                        style={{
                                            width: '100%', padding: '10px 12px 10px 40px',
                                            borderRadius: '9px', border: '1.5px solid var(--border)',
                                            fontSize: '13.5px', fontFamily: 'inherit',
                                            outline: 'none', background: '#fff',
                                            boxSizing: 'border-box',
                                        }}
                                        onFocus={e => (e.target.style.borderColor = 'var(--green)')}
                                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                                    />
                                </div>

                                {/* Work location filter */}
                                <select
                                    value={workLocId}
                                    onChange={e => handleFilter(Number(e.target.value), jobTypeId)}
                                    style={{
                                        padding: '10px 14px', borderRadius: '9px',
                                        border: '1.5px solid var(--border)',
                                        fontSize: '13px', fontFamily: 'inherit',
                                        background: '#fff', cursor: 'pointer', outline: 'none',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <option value={0}>All Locations</option>
                                    <option value={1}>From Home</option>
                                    <option value={2}>Client Location</option>
                                    <option value={3}>Either</option>
                                </select>

                                {/* Job type filter */}
                                <select
                                    value={jobTypeId}
                                    onChange={e => handleFilter(workLocId, Number(e.target.value))}
                                    style={{
                                        padding: '10px 14px', borderRadius: '9px',
                                        border: '1.5px solid var(--border)',
                                        fontSize: '13px', fontFamily: 'inherit',
                                        background: '#fff', cursor: 'pointer', outline: 'none',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <option value={0}>All Job Types</option>
                                    <option value={1}>Full Time</option>
                                    <option value={2}>Part Time</option>
                                    <option value={3}>Freelance</option>
                                    <option value={4}>Independent Contractor</option>
                                    <option value={5}>Internship</option>
                                    <option value={6}>Temporary</option>
                                </select>

                                {/* Search button */}
                                <button
                                    type="submit"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        padding: '10px 20px', borderRadius: '9px',
                                        background: 'var(--green)', color: '#fff',
                                        fontSize: '13.5px', fontWeight: 700,
                                        border: 'none', cursor: 'pointer',
                                        transition: 'opacity .15s',
                                    }}
                                    onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                                    onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                                >
                                    <Icon icon="search" />
                                    Search
                                </button>

                                {/* Clear filters */}
                                {(search || workLocId !== 0 || jobTypeId !== 0) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchInput(''); setSearch('');
                                            setWorkLocId(0); setJobTypeId(0);
                                            load(1, '', 0, 0, 'replace');
                                        }}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                                            padding: '10px 16px', borderRadius: '9px',
                                            background: '#F4F7F6', color: 'var(--text-secondary)',
                                            border: '1.5px solid var(--border)',
                                            fontSize: '13px', fontWeight: 600,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Icon icon="close" />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* ── Job list ── */}
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
                                <Icon icon="error_outline" />
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{error}</p>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div style={{
                                textAlign: 'center', padding: '60px 20px',
                                background: '#fff', borderRadius: '14px',
                                border: '1.5px solid var(--border)',
                            }}>
                                <Icon icon="search_off" />
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No jobs found matching your search.</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {jobs.map(job => <JobCard key={job.Id} job={job} />)}
                                </div>

                                {/* Load more */}
                                {hasMore && (
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
                                                    <Icon icon="progress_activity" />
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <Icon icon="expand_more" />
                                                    Load More Jobs
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
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default JobBoardPage;
