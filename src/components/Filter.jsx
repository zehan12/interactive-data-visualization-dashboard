import React from 'react';

const Filter = ({ type, options, onChange }) => {
  return (
    <div className='p-4 flex flex-col items-center justify-center'>
      <label className='mb-2 text-sm font-medium text-gray-600'>{type}</label>
      <select
        className='w-40 rounded-full py-2 px-2 border border-gray-300 focus:outline-none focus:border-blue-500'
        onChange={(e) => onChange(e.target.value)}
      >
        <option value=''>All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;