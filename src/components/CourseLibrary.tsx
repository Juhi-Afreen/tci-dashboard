import React, { useRef } from 'react';
import { Icon } from './Icon';

interface CourseLibraryCardProps {
    title: string;
    description: string;
    imageUrl: string;
    badge: string;
    badgeStyle: 'included' | 'addon';
}

const CourseLibraryCard: React.FC<CourseLibraryCardProps> = ({ title, description, imageUrl, badge, badgeStyle }) => {
    return (
        <div className="course-card-item bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
            <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
            <div className="p-4 flex flex-col flex-1">
                <h5 className={`font-bold text-sm mb-1 ${badgeStyle === 'included' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{title}</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed flex-1">{description}</p>
                <div className="mt-3">
                    {badgeStyle === 'included' ? (
                        <span className="inline-block text-[10px] font-bold text-primary bg-green-50 border border-green-100 px-2.5 py-0.5 rounded uppercase tracking-wide">{badge}</span>
                    ) : (
                        <span className="inline-block text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded uppercase tracking-wide">{badge}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const CourseLibrary: React.FC = () => {
    const viewportRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: 'prev' | 'next') => {
        if (!viewportRef.current) return;
        const amount = 300;
        viewportRef.current.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
    };

    const courses = [
        {
            title: 'General Transcription Course',
            description: 'Master the art of general transcription with our comprehensive program.',
            imageUrl: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/general-transcription-bg.webp',
            badge: 'Included',
            badgeStyle: 'included' as const,
        },
        {
            title: 'Legal Transcription Course',
            description: 'Specialized training for legal transcriptionists and court reporters.',
            imageUrl: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/legal-transcription-bg.webp',
            badge: 'Included',
            badgeStyle: 'included' as const,
        },
        {
            title: 'AAERT CET Prep Course',
            description: 'Exam preparation for the American Association of Electronic Reporters and Transcribers.',
            imageUrl: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/aaert-course-bg.webp',
            badge: 'Add-On',
            badgeStyle: 'addon' as const,
        },
        {
            title: 'Realtime Captioning Basics',
            description: 'Introductory modules on realtime captioning workflows and tools.',
            imageUrl: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/general-transcription-bg.webp',
            badge: 'Included',
            badgeStyle: 'included' as const,
        },
        {
            title: 'Medical Transcription Essentials',
            description: 'Practice medical terminology, dictation styles, and formatting.',
            imageUrl: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/legal-transcription-bg.webp',
            badge: 'Included',
            badgeStyle: 'included' as const,
        },
        {
            title: 'Advanced Punctuation Workshop',
            description: 'Deep dive into style guides, punctuation rules, and edge cases.',
            imageUrl: 'https://www.transcriptioncertificationinstitute.org/assets_ui/images/aaert-course-bg.webp',
            badge: 'Add-On',
            badgeStyle: 'addon' as const,
        },
    ];

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Course Library</h3>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scroll('prev')}
                        className="course-carousel-btn"
                        aria-label="Previous courses"
                    >
<Icon icon="chevron_left" className="text-sm" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => scroll('next')}
                                                className="course-carousel-btn"
                                                aria-label="Next courses"
                                            >
                                                <Icon icon="chevron_right" className="text-sm" />
                    </button>
                </div>
            </div>
            <div className="course-carousel-viewport" ref={viewportRef}>
                <div className="course-carousel-track">
                    {courses.map((course, index) => (
                        <CourseLibraryCard key={index} {...course} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseLibrary;
