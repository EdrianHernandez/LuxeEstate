import React from 'react';
import { PropertyType } from '../types';
import { Search, MapPin, Home } from 'lucide-react';

const SearchBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ 
      ...prev, 
      [name]: name.includes('Price') ? (value === '' ? 0 : Number(value)) : value 
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 w-full max-w-[1600px] mx-auto">
      {/* Location Search - The most prominent part */}
      <div className="relative flex-[2.5] min-w-[240px] group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
        <input
          type="text"
          name="location"
          placeholder="Enter an address, city, or ZIP code"
          value={filters.location}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 text-sm font-semibold placeholder:text-slate-400 placeholder:font-medium shadow-inner"
        />
      </div>

      {/* Property Type - Clean separation */}
      <div className="relative flex-1 min-w-[160px] group">
        <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
          className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 text-sm font-bold appearance-none cursor-pointer shadow-inner"
        >
          <option value="All">Any Property Type</option>
          {Object.values(PropertyType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Price Range - Grouped for logic */}
      <div className="flex items-center gap-1 flex-[2] min-w-[300px]">
        <div className="relative flex-1 group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold group-focus-within:text-blue-500">$</span>
          <input
            type="number"
            name="minPrice"
            placeholder="No Min"
            value={filters.minPrice === 0 ? '' : filters.minPrice}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium shadow-inner"
          />
        </div>
        <span className="text-slate-300 font-black px-1">-</span>
        <div className="relative flex-1 group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold group-focus-within:text-blue-500">$</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="No Max"
            value={filters.maxPrice === 5000000 ? '' : filters.maxPrice}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium shadow-inner"
          />
        </div>
      </div>

      {/* Search Button - Impactful and solid */}
      <button className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-blue-200 group">
        <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-sm tracking-wide">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
