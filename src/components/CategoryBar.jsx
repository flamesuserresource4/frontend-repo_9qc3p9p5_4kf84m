import React from 'react';

const categories = [
  'All',
  'Classroom Management',
  'Lesson Planning',
  'Assessment',
  'Parent Communication',
  'EdTech',
  'Special Education',
  'Student Engagement',
  'Wellbeing',
];

const CategoryBar = ({ selected, onSelect }) => {
  return (
    <div className="sticky top-16 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          {categories.map((cat) => {
            const isActive = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm border transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
