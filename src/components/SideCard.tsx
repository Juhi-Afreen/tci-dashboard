import React from 'react';

interface SideCardProps {
    children: React.ReactNode;
    title?: string;
    titleIcon?: string;
    titleIconColor?: string;
}

const SideCard: React.FC<SideCardProps> = ({ children, title, titleIcon, titleIconColor }) => {
    return (
        <div className="side-card">
            {(title || titleIcon) && (
                <div className="flex items-center gap-2 mb-5">
                    {titleIcon && (
                        <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ color: titleIconColor || 'var(--green)' }}
                        >
                            {titleIcon}
                        </span>
                    )}
                    {title && (
                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">{title}</h4>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default SideCard;
