import './CategoryTabs.css';

const CategoryTabs = ({ selectedCategory, setSelectedCategory, categories }) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="category-tabs">
      {allCategories.map(category => (
        <button
          key={category}
          className={`tab-btn ${selectedCategory === category || (category === 'all' && !selectedCategory) ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category === 'all' ? '' : category)}
        >
          {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;