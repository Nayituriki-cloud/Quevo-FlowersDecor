import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Top search & sorting bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search roses, peonies, wedding arches, gifts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-rose-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-600">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-xl border border-rose-200 bg-white py-2 px-3 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-rose-500 shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured &amp; Bestsellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Horizontal scrolling category chips / buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-rose-900 text-white shadow-sm ring-2 ring-rose-900/20'
                  : 'bg-white text-slate-700 border border-rose-100 hover:border-rose-300 hover:text-rose-900 shadow-2xs'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
