import React from 'react';

const ProfileStatus: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="relative shrink-0" style={{ width: '64px', height: '64px' }}>
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="fill-none stroke-slate-100 dark:stroke-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="3" />
                        <path className="fill-none stroke-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray="11, 100" strokeLinecap="round" strokeWidth="3" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">11%</span>
                        <span className="text-[7px] uppercase font-bold text-slate-400 mt-0.5">Complete</span>
                    </div>
                </div>
                <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Profile Status</p>
                    <p className="text-xs text-slate-500 leading-snug">Complete your profile to get personalized recommendations.</p>
                </div>
            </div>
            <button className="shrink-0 bg-primary text-white font-bold py-2 px-4 rounded-xl text-xs hover:opacity-90 transition-all whitespace-nowrap">
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileStatus;
