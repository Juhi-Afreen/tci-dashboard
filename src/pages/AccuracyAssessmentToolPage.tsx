import React from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

const AccuracyAssessmentToolPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div
                className="page-content"
                style={{ padding: '28px 32px 40px' }}
            >
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* ── Page Header ── */}
                    <section>
                        <PageBreadcrumb pageName="Accuracy Tool" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                            Accuracy Assessment Tool
                        </h2>
                        <div
                            className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4"
                            style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}
                        >
                            <span
                                className="material-symbols-outlined text-[22px] shrink-0 mt-0.5"
                                style={{ color: '#1f8f6d' }}
                            >
                                info
                            </span>
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Your transcript will be assessed on accuracy, spelling, punctuation, and formatting features
                                like the use of speaker labels.&nbsp;
                                <a
                                    href="#"
                                    className="font-extrabold uppercase tracking-wide underline underline-offset-2"
                                    style={{ color: 'var(--green)', textDecorationColor: 'var(--green)' }}
                                >
                                    See the Sample Sheet as an Example.
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* ── Quick Stats ── */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard
                            label="Total Tests"
                            value="12"
                            icon="task_alt"
                            borderColor="var(--green)"
                            iconColor="var(--green)"
                        />
                        <BorderStatCard
                            label="Avg Accuracy"
                            value="92%"
                            icon="analytics"
                            borderColor="#34d399"
                            iconColor="#34d399"
                        />
                        <BorderStatCard
                            label="Last Score"
                            value="94%"
                            icon="grade"
                            borderColor="#6ee7b7"
                            iconColor="#6ee7b7"
                        />
                        <BorderStatCard
                            label="Certificates"
                            value="2"
                            icon="workspace_premium"
                            borderColor="var(--purple)"
                            iconColor="var(--purple)"
                        />
                    </section>

                    {/* ── Main + Sidebar Layout ── */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ── Main Area ── */}
                        <div className="flex-1 min-w-0 space-y-10">

                            {/* Practice Tests */}
                            <section>
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Practice Tests</h3>
                                    <button
                                        className="text-sm font-bold hover:underline"
                                        style={{ color: 'var(--green)' }}
                                    >
                                        View All
                                    </button>
                                </div>
                                <div className="space-y-4">

                                    {/* Test Row 1 */}
                                    <div className="test-row">
                                        <div className="flex items-center gap-5">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                                                style={{ background: 'var(--green-light)', color: 'var(--green)' }}
                                            >
                                                T1
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                    <h4 className="font-bold text-slate-900">
                                                        General Transcription Practice Test 1
                                                    </h4>
                                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-tighter">
                                                        Free
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium flex-wrap">
                                                    <span className="flex items-center gap-1">
                                                        <Icon icon="schedule" className="text-[14px]" />
                                                        2:30 min
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Icon icon="history" className="text-[14px]" />
                                                        Taken 3 times
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap mt-4 md:mt-0">
                                            <a
                                                href="#"
                                                className="text-xs font-bold hover:underline"
                                                style={{ color: 'var(--green)' }}
                                            >
                                                View Style Guide
                                            </a>
                                            <button className="px-4 py-2 border border-emerald-100 text-emerald-700 font-bold rounded-lg text-sm hover:bg-emerald-50 transition-colors">
                                                Upload Transcript
                                            </button>
                                            <button className="px-5 py-2 primary-gradient text-white font-bold rounded-lg text-sm shadow-sm active:scale-95 transition-all">
                                                Start Test
                                            </button>
                                        </div>
                                    </div>

                                    {/* Test Row 2 */}
                                    <div className="test-row">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                                                T2
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                    <h4 className="font-bold text-slate-900">
                                                        General Transcription Practice Test 2
                                                    </h4>
                                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase tracking-tighter">
                                                        In Progress
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium flex-wrap">
                                                    <span className="flex items-center gap-1">
                                                        <Icon icon="schedule" className="text-[14px]" />
                                                        5:15 min
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Icon icon="bolt" className="text-[14px]" />
                                                        Intermediate
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap mt-4 md:mt-0">
                                            <a
                                                href="#"
                                                className="text-xs font-bold hover:underline"
                                                style={{ color: 'var(--green)' }}
                                            >
                                                View Style Guide
                                            </a>
                                            <button className="px-4 py-2 border border-emerald-100 text-emerald-700 font-bold rounded-lg text-sm hover:bg-emerald-50 transition-colors">
                                                Upload Transcript
                                            </button>
                                            <button className="px-5 py-2 primary-gradient text-white font-bold rounded-lg text-sm shadow-sm active:scale-95 transition-all">
                                                Resume
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </section>

                            {/* Podcast Practice */}
                            <section>
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                        Practice with Podcast Episodes
                                    </h3>
                                    <button
                                        className="text-sm font-bold hover:underline"
                                        style={{ color: 'var(--green)' }}
                                    >
                                        Explore More
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Pod Card 1 */}
                                    <div className="pod-card">
                                        <div className="h-44 bg-slate-200 relative">
                                            <img
                                                alt="Podcast thumbnail"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT38CV1FdOpfA-FJdpW3UG4nSyMhE9yQbuYDS9f8rLAjEswDwDBSjIH3s3yFyjkr28oBMWT7mDtluFjikvAqf4SIYBMl_aW41E8nPdVzoyP_OUauNJRWL-XaZoXWWlC47gf0kBpm2A9epHRkO0B8ijibTjBAcQyKSJENa_T8RITLTev7pyevGHbcvLC7eaw4o1urL1wNmM8h3Pd0DExeTxDvwJGNl2ZpaNPBvBdSj-myeNjdU6JoZQ-lAVv2DWBYS6gzB9bIcg5XOA"
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                                                <div
                                                    className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                                                    style={{ color: 'var(--green)' }}
                                                >
                                                    <Icon icon="play_arrow" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span
                                                    className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                                                    style={{ color: 'var(--green)', background: 'var(--green-light)' }}
                                                >
                                                    Business
                                                </span>
                                                <span className="text-xs font-medium text-slate-400">12:45 min</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 mb-2 line-clamp-1">
                                                The Future of AI in Modern Transcription
                                            </h4>
                                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-5">
                                                An interview with lead engineers about how neural networks are changing the
                                                accuracy standards of human-led transcription.
                                            </p>
                                            <div className="flex gap-3">
                                                <button className="flex-1 py-2 primary-gradient text-white font-bold rounded-lg text-sm shadow-sm active:scale-95 transition-all">
                                                    Start Transcribing
                                                </button>
                                                <button className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors">
                                                    Rate Transcript
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pod Card 2 */}
                                    <div className="pod-card">
                                        <div className="h-44 bg-slate-200 relative">
                                            <img
                                                alt="Podcast thumbnail"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDbF_7VSUM7ORfCfi4ePG2ggR3J0nBpkMdMfBIh3lC5IMgRhQI0rgQ_jHt5Fu1OXkXvth7Jd3Vjl1-UNKNtzrgI_hwUQEOfsv8nFGBqPLX5HLfsHfTrI_9pQzarpOs4n2udgs5xJt8jkv7VmDHW_JEZ0qKiGijtHhimv2RRRAuv2sUKJqtJiyshEj40Jlgb8JOgp3vExqDJZeMakPk2US-AAlXnv4PMnDI37ml46b0GFrIa9dqplkSOU579EQbL5-l2Cyh3a5WeU7F"
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                                                <div
                                                    className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                                                    style={{ color: 'var(--green)' }}
                                                >
                                                    <Icon icon="play_arrow" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span
                                                    className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                                                    style={{ color: 'var(--green)', background: 'var(--green-light)' }}
                                                >
                                                    Legal
                                                </span>
                                                <span className="text-xs font-medium text-slate-400">08:20 min</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 mb-2 line-clamp-1">
                                                Courtroom Etiquette &amp; Speaker Patterns
                                            </h4>
                                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-5">
                                                Mastering the art of identifying multi-speaker overlaps and complex legal
                                                jargon in high-stakes environments.
                                            </p>
                                            <div className="flex gap-3">
                                                <button className="flex-1 py-2 primary-gradient text-white font-bold rounded-lg text-sm shadow-sm active:scale-95 transition-all">
                                                    Start Transcribing
                                                </button>
                                                <button className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors">
                                                    Rate Transcript
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>

                        </div>{/* end main area */}

                        {/* ── Side Panel ── */}
                        <aside className="lg:w-72 xl:w-80 space-y-6 shrink-0">
                            <div className="sticky top-24 space-y-6">

                                {/* Quick Tips card */}
                                <div className="tips-card">
                                    <div className="flex items-center gap-2 mb-4" style={{ paddingTop: '24px' }}>
                                        <span
                                            className="material-symbols-outlined text-[20px]"
                                            style={{ color: 'var(--green)' }}
                                        >
                                            lightbulb
                                        </span>
                                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                                            Quick Tips
                                        </h4>
                                    </div>
                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-3">
                                            <div
                                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ background: 'var(--green)' }}
                                            />
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Use correct{' '}
                                                <span className="font-bold text-slate-700">speaker labels</span>{' '}
                                                consistently throughout the transcript.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div
                                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ background: 'var(--green)' }}
                                            />
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Check{' '}
                                                <span className="font-bold text-slate-700">punctuation</span>{' '}
                                                carefully—especially in rapid exchanges.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div
                                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ background: 'var(--green)' }}
                                            />
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Don't guess on inaudibles; use the standard{' '}
                                                <code className="font-mono text-xs bg-slate-200 px-1 rounded">
                                                    [inaudible 00:00]
                                                </code>{' '}
                                                tag.
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="mt-5 pt-5 border-t border-slate-200">
                                        <a
                                            href="#"
                                            className="text-xs font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all"
                                            style={{ color: 'var(--green)' }}
                                        >
                                            Download Style Guide PDF
                                            <Icon icon="download" className="text-sm" />
                                        </a>
                                    </div>
                                </div>

                                {/* Upgrade card */}
                                <div className="upgrade-card">
                                    <span
                                        className="material-symbols-outlined absolute top-5 right-5 select-none"
                                        style={{ fontSize: '40px', color: 'rgba(255,255,255,.12)' }}
                                    >
                                        school
                                    </span>
                                    <h4 className="upgrade-card-title">Want to transcribe like a pro?</h4>
                                    <div className="upgrade-card-copy">
                                        <p className="upgrade-card-text">
                                            Unlock advanced legal and medical courses with certified transcription paths.
                                        </p>
                                        <button className="upgrade-card-button">Enroll Now</button>
                                    </div>
                                    <img
                                        src="https://app.transcriptioncertificationinstitute.org/_next/image/?url=https%3A%2F%2Ftcistorage.blob.core.windows.net%2Flocal%2Fimages%2Fweb%2Faccuracy-assessment-tool.webp&w=256&q=75&dpl=dpl_5SNn37CLST2Bet4rLXbfPMo89H7K"
                                        alt="Accuracy Assessment Tool preview"
                                        className="upgrade-card-preview"
                                    />
                                    <div
                                        className="absolute right-8 bottom-12 w-32 h-32 rounded-full border border-white/10"
                                        style={{ opacity: 0.18 }}
                                    />
                                </div>

                            </div>
                        </aside>

                    </div>{/* end flex layout */}

                </main>
            </div>
        </DashboardLayout>
    );
};

export default AccuracyAssessmentToolPage;
