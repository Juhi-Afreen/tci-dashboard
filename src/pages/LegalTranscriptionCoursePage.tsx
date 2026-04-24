import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

interface AccordionItem {
    icon: string;
    title: string;
    description: string;
    buttonLabel: string;
    route: string;
}

interface ResourceItem {
    icon: string;
    label: string;
    linkLabel: string;
    route: string;
}

const accordionItems: AccordionItem[] = [
    { icon: 'gavel', title: 'Legal Terminology Quizzes', description: 'Test your knowledge of legal jargon, Latin phrases, and courtroom terminology used in transcription.', buttonLabel: 'Start Quiz', route: '/resources/quizzes' },
    { icon: 'keyboard', title: 'Deposition Practice', description: 'Practice transcribing real-world deposition and court hearing recordings with proper formatting.', buttonLabel: 'Open Editor', route: '/resources/practice' },
    { icon: 'menu_book', title: 'Formatting Style Guide', description: 'Comprehensive guide to legal document formatting, speaker identification, and exhibit references.', buttonLabel: 'Read Guide', route: '/resources/verbatim' },
    { icon: 'tips_and_updates', title: 'Tips & Tricks', description: 'Pro strategies for handling multiple speakers, simultaneous dialogue, and difficult audio in legal settings.', buttonLabel: 'View All', route: '/resources/tips-and-tricks' },
    { icon: 'account_balance', title: 'Court Procedure Overview', description: 'Understand courtroom roles, legal proceedings, and how they affect transcription requirements.', buttonLabel: 'Access Library', route: '/resources/tips' },
    { icon: 'assignment_turned_in', title: 'Assignment Tracker', description: 'Manage your deadlines and track grades for submitted transcription work.', buttonLabel: 'Track Progress', route: '/resources/assignments' },
];

const resources: ResourceItem[] = [
    { icon: 'speed', label: 'Accuracy Assessment Tool', linkLabel: 'Get Access', route: '/tools/accuracy' },
    { icon: 'auto_stories', label: 'Legal Transcription Style Guide', linkLabel: 'View', route: '/resources/tips' },
    { icon: 'work', label: 'TCI Job Board', linkLabel: 'Upload Resume', route: '/tools/job-board' },
    { icon: 'description', label: 'Legal Glossary & Reference', linkLabel: 'Download', route: '/resources/ebooks' },
];

const LegalTranscriptionCoursePage: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleAccordion = (index: number) => {
        setOpenAccordion(prev => (prev === index ? null : index));
    };

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="max-w-[1440px] mx-auto w-full px-4 lg:px-20 py-8 space-y-8">

                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm p-8">
                        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                            {/* Left */}
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                                    <Icon icon="verified" className="text-sm" />
                                    Enrolled
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Legal Transcription Course</h2>
                                <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                                    Specialize in legal terminology, court proceedings, and depositions. Build the skills to work with law firms and legal agencies.
                                </p>

                                {/* Resume lesson card */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 max-w-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#EEF0FF', color: 'var(--purple)' }}>
                                            <Icon icon="gavel" className="text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Last Activity: 1 day ago</p>
                                            <h3 className="text-base font-bold text-slate-900 mb-0.5">Resume: Deposition Formatting</h3>
                                            <p className="text-slate-600 text-sm">Module 2 - Lesson 3 · 18 mins remaining</p>
                                        </div>
                                    </div>
                                    <button className="shrink-0 px-5 py-2.5 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-all" style={{ background: 'var(--green)' }} onClick={() => navigate('/courses/legal/lessons')}>
                                        Resume
                                        <Icon icon="arrow_forward" className="text-lg" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all" onClick={() => navigate('/courses/legal/lessons')}>
                                        View All Lessons
                                    </button>
                                </div>
                            </div>

                            {/* Right: progress panel */}
                            <div className="w-full lg:w-[480px] space-y-5 bg-slate-50 p-7 rounded-xl border border-slate-100">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 font-medium">Your Progress</p>
                                    <span className="font-bold text-sm" style={{ color: 'var(--green)' }}>7 / 22 Lessons</span>
                                </div>
                                {/* Progress bar */}
                                <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-visible group/bar">
                                    <div className="h-full rounded-full transition-all duration-1000 relative" style={{ width: '32%', background: 'var(--green)' }}>
                                        <div className="absolute -top-8 right-0 translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                            32% Completed
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Course image */}
                                <div className="aspect-video w-full rounded-xl bg-slate-100 overflow-hidden relative shadow-sm border border-slate-200">
                                    <img
                                        className="w-full h-full object-contain"
                                        alt="Legal Transcription Course"
                                        src="https://www.transcriptioncertificationinstitute.org/assets_ui/images/legal-transcription-book.webp"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-4 flex flex-col justify-end">
                                        <p className="text-white text-xs font-semibold opacity-70 uppercase tracking-widest">Module 2</p>
                                        <p className="text-white text-sm font-bold truncate">Court Reporting Fundamentals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final Exam & Certificate */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Final Exam */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 flex gap-6 hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="h-12 w-12 shrink-0 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Icon icon="quiz" className="text-2xl" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className="font-bold text-lg text-slate-900">Final Exam</h4>
                                <p className="text-slate-600 text-sm">Comprehensive assessment covering legal terminology, deposition formatting, and courtroom procedures. Pass with 90% or higher.</p>
                                <button className="text-sm font-bold flex items-center gap-1 group-hover:underline pt-2" style={{ color: 'var(--green)' }}>
                                    Take Final Exam <Icon icon="lock" className="text-sm" />
                                </button>
                            </div>
                        </div>

                        {/* Certificate */}
                        <div className="relative overflow-hidden p-6 rounded-xl shadow-lg text-white group hover:-translate-y-1 transition-transform cursor-pointer border" style={{ background: 'linear-gradient(135deg, #1f8e6d 0%, #0d7a5a 100%)', borderColor: 'rgba(31,142,109,.5)' }}>
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-bl-full translate-x-8 -translate-y-8"></div>
                            <div className="relative z-10 flex justify-between items-start gap-4">
                                <div className="flex gap-4 items-start flex-1">
                                    <div className="h-12 w-12 shrink-0 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Icon icon="card_membership" className="text-2xl" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-bold text-white">Get Certificate</h3>
                                        <p className="text-white/80 text-sm leading-snug">Download your digital certificate or order a physical copy to showcase your legal transcription expertise.</p>
                                        <button className="text-white text-sm font-bold flex items-center gap-1 group-hover:underline pt-2">
                                            Download PDF <Icon icon="download" className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Eligibility</p>
                                    <p className="text-base font-bold flex items-center gap-1 justify-end">Locked <Icon icon="lock" className="text-sm" /></p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Course Content & Resources */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Accordion */}
                        <div className="lg:col-span-8 space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900">Course Content &amp; Resources</h3>
                            <div className="space-y-4">
                                {accordionItems.map((item, index) => (
                                    <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                                        <button
                                            className="w-full flex items-center justify-between p-5 cursor-pointer font-bold text-slate-900 hover:bg-slate-50 transition-colors text-left"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined" style={{ color: 'var(--green)' }}>{item.icon}</span>
                                                {item.title}
                                            </div>
                                            <Icon icon="expand_more" className="transition-transform" />
                                        </button>
                                        {openAccordion === index && (
                                            <div className="p-5 pt-0 text-slate-600 text-sm border-t border-slate-100">
                                                <p className="mb-4 mt-4">{item.description}</p>
                                                <button
                                                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 transition-all"
                                                    onMouseEnter={e => { (e.target as HTMLElement).style.background = 'var(--green)'; (e.target as HTMLElement).style.color = 'white'; (e.target as HTMLElement).style.borderColor = 'var(--green)'; }}
                                                    onMouseLeave={e => { (e.target as HTMLElement).style.background = ''; (e.target as HTMLElement).style.color = ''; (e.target as HTMLElement).style.borderColor = ''; }}
                                                    onClick={() => navigate(item.route)}>
                                                    {item.buttonLabel}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Resources */}
                        <div className="lg:col-span-4 space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900">Additional Resources</h3>
                            <div className="flex flex-col gap-4">
                                {resources.map((res, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                                                <span className="material-symbols-outlined">{res.icon}</span>
                                            </div>
                                            <span className="font-bold text-slate-900 text-sm">{res.label}</span>
                                        </div>
                                        <a href="#" className="text-sm font-bold hover:underline" style={{ color: 'var(--green)' }} onClick={e => { e.preventDefault(); navigate(res.route); }}>{res.linkLabel}</a>
                                    </div>
                                ))}
                                <div className="pt-4">
                                    <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl" onClick={() => navigate('/dashboard')}>
                                        <Icon icon="explore" />
                                        Explore More Resources
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </DashboardLayout>
    );
};

export default LegalTranscriptionCoursePage;
