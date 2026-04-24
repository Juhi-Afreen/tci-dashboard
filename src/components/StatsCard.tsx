import React from 'react';
import { Icon } from './Icon';

interface StatsCardProps {
    icon: string;
    label: string;
    value: string;
    valueLabel?: string;
    iconBg: string;
    iconColor: string;
    textColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, valueLabel, iconBg, iconColor, textColor }) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full flex items-center justify-center shrink-0" style={{ background: iconBg, color: iconColor }}>
                    <Icon icon={icon} style={{ fontSize: 20 }} />
                </div>
                <div className="flex items-baseline gap-1" style={{ color: textColor }}>
                    <span className="text-xl font-bold leading-none">{value}</span>
                    {valueLabel && <span className="text-[15px] font-bold">{valueLabel}</span>}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
