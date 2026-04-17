import React from 'react';

const Goals: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Today's Goals</h3>
                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">2/3 Done</span>
            </div>
            <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-xs">check</span>
                    </div>
                    <span className="text-sm text-slate-400 line-through">Complete 2 lessons</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-xs">check</span>
                    </div>
                    <span className="text-sm text-slate-400 line-through">Practice transcription</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 -mx-2.5 rounded-xl bg-[#ffcb44]/10 border-l-[3px] border-[#ffcb44] shadow-sm">
                    <div className="size-5 rounded-full border-2 border-[#ffcb44] flex items-center justify-center shrink-0 bg-white dark:bg-transparent">
                        <div className="size-1.5 rounded-full bg-[#ffcb44]"></div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Review accuracy report</span>
                        <span className="text-[9px] text-[#dbab2c] font-bold uppercase tracking-wider">Up Next</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Goals;
