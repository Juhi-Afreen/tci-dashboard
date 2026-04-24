import React from 'react';
import { Icon } from './Icon';

const LearningPlan: React.FC = () => {
    const days = [
        { label: 'M', date: null, status: 'done' },
        { label: 'T', date: null, status: 'done' },
        { label: 'W', date: null, status: 'done' },
        { label: 'T', date: null, status: 'done' },
        { label: 'F', date: 16, status: 'today' },
        { label: 'S', date: 17, status: 'event', dotColor: '#1F8F6D' },
        { label: 'S', date: 18, status: 'future', dotColor: '#a78bfa' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">Learning Plan</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-700">March</span>
                </div>
                <button className="text-slate-400 hover:text-primary transition-colors">
                    <Icon icon="calendar_today" className="text-sm" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5 mb-5 relative">
                {days.map((day, index) => (
                    <div key={index} className="text-center group cursor-pointer relative pb-4">
                        <p className={`text-[8px] font-bold uppercase mb-1 ${day.status === 'today' ? 'text-[#dbab2c]' : 'text-slate-400'}`}>{day.label}</p>

                        {day.status === 'done' && (
                            <div className="size-8 rounded-lg bg-green-50 text-primary dark:bg-primary/10 dark:text-primary text-[10px] font-bold flex items-center justify-center mx-auto border border-green-100 dark:border-primary/20 transition-colors">
                                <Icon icon="check" className="text-[14px]" />
                            </div>
                        )}

                        {day.status === 'today' && (
                            <>
                                <div className="size-8 rounded-lg bg-[#ffcb44] text-white text-[10px] font-bold flex items-center justify-center mx-auto shadow-[0_2px_8px_-2px_rgba(255,203,68,0.5)]">
                                    {day.date}
                                </div>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[#ffcb44]"></div>
                            </>
                        )}

                        {(day.status === 'event' || day.status === 'future') && (
                            <>
                                <div className="size-8 rounded-lg bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-slate-900 text-[10px] font-bold flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-700 transition-colors">
                                    {day.date}
                                </div>
                                {day.dotColor && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full" style={{ background: day.dotColor }}></div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="space-y-2 mt-2">
                <a href="#!" className="block p-3.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-xl border-l-[3px] border-primary transition-all group shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[12px] font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Interactive Live Q&A</p>
                            <p className="text-[10px] font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                                <Icon icon="event" className="text-[13px]" style={{ color: 'var(--green)' }} />
                                Tomorrow at 2:00 PM
                            </p>
                        </div>
                        <div className="size-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/40 transition-colors">
                            <Icon icon="arrow_outward" className="text-[14px]" />
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default LearningPlan;
