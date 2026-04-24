import React from 'react';
import { Icon } from './Icon';

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
                        <Icon
                            icon={titleIcon}
                            className="text-[20px]"
                            style={{ color: titleIconColor || 'var(--green)' }}
                        />
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
