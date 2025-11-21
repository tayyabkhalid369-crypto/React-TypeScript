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
    <div className="flex gap-4 items-center">
      <span className="font-semibold text-gray-700">Filter by Gender:</span>
      <div className="flex gap-3">
        <button
          onClick={() => onFilterChange(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedGender === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('male')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedGender === 'male'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👨 Male
        </button>
        <button
          onClick={() => onFilterChange('female')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedGender === 'female'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👩 Female
        </button>
      </div>
    </div>
  );
};

export default GenderFilter;
