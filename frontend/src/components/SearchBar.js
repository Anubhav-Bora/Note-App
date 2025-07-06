import React, { useState } from 'react';

const SearchBar = ({ onSearch, onTagFilter, availableTags = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setSelectedTag(value);
    onTagFilter(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    onSearch('');
    onTagFilter('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Notes
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title or content..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tag Filter */}
        <div className="sm:w-48">
          <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Tag
          </label>
          <select
            id="tag-filter"
            value={selectedTag}
            onChange={handleTagChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || selectedTag) && (
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedTag) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Search: "{searchTerm}"
            </span>
          )}
          {selectedTag && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Tag: {selectedTag}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;