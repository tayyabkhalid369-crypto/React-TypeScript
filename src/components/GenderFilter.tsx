import React from 'react';

interface GenderFilterProps {
  selectedGender: string | null;
  onFilterChange: (gender: string | null) => void;
}

const GenderFilter: React.FC<GenderFilterProps> = ({
  selectedGender,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <span className="font-semibold text-gray-700 text-sm">Filter by Gender:</span>
      <div className="flex gap-2">
        {[
          { value: null, label: 'All Users', icon: '👥' },
          { value: 'male', label: 'Male', icon: '👨' },
          { value: 'female', label: 'Female', icon: '👩' },
        ].map((filter) => (
          <button
            key={filter.label}
            onClick={() => onFilterChange(filter.value as string | null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
              selectedGender === filter.value
                ? 'btn-primary shadow-lg shadow-sky-200 scale-105'
                : 'btn-secondary'
            }`}
          >
            <span className="mr-1">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderFilter;
