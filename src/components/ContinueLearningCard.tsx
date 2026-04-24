import React from 'react';
import { Icon } from './Icon';
import { Link } from 'react-router-dom';

interface ContinueLearningCardProps {
    title: string;
    imageUrl: string;
    progress: number;
}

const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({ title, imageUrl, progress }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
            <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url('${imageUrl}')` }}>
                <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">Active</span>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{title}</h4>
                <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progress</span>
                        <span className="text-[10px] font-bold text-primary">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <Link to="#" className="resume-lesson-link mt-4 inline-flex items-center gap-2 text-primary font-bold text-sm">
                    <div className="bg-primary/10 text-primary p-1.5 rounded-lg flex items-center justify-center">
                        <Icon icon="play_circle" style={{ fontSize: 18 }} />
                    </div>
                    <span className="resume-lesson-text">Resume Lesson</span>
                    <Icon icon="arrow_forward" className="resume-lesson-arrow" />
                </Link>
            </div>
        </div>
    );
};

export default ContinueLearningCard;
