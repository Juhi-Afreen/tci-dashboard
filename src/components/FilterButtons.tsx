import React from 'react';

interface FilterOption {
    label: string;
    value: string;
}

interface FilterButtonsProps {
    filters: FilterOption[];
    active: string;
    onChange: (value: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filters, active, onChange }) => {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {filters.map((f) => (
                <button
                    key={f.value}
                    className={`filter-btn${active === f.value ? ' active' : ''}`}
                    onClick={() => onChange(f.value)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
