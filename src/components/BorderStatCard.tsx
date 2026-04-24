import React from 'react';
import { Icon } from './Icon';

interface BorderStatCardProps {
    label: string;
    value: string | number;
    icon: string;
    borderColor: string;
    iconColor?: string;
}

const BorderStatCard: React.FC<BorderStatCardProps> = ({ label, value, icon, borderColor, iconColor }) => {
    return (
        <div className="stat-card" style={{ borderLeftColor: borderColor }}>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">{label}</p>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-slate-900">{value}</span>
                <Icon
                    icon={icon}
                    className="text-3xl"
                    style={{ color: iconColor || borderColor, opacity: 0.18 }}
                />
            </div>
        </div>
    );
};

export default BorderStatCard;
