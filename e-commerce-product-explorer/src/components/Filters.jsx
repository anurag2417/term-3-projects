import { FiSearch, FiFilter } from 'react-icons/fi';
import './Filters.css';

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy
}) => {
  const priceRanges = [
    { label: 'All', value: '' },
    { label: '$0 - $100', value: '0-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: '$1000+', value: '1000-' }
  ];

  const sortOptions = [
    { label: 'Default', value: '' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Rating', value: 'rating' }
  ];

  return (
    <div className="filters-container">
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <FiFilter className="filter-icon" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="filter-select"
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;