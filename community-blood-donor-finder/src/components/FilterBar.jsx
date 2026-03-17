import { BLOOD_GROUPS } from "../data/bloodGroups";

const FilterBar = ({
  selectedBloodGroup,
  onBloodGroupChange,
  citySearch,
  onCitySearchChange,
  sortByAvailability,
  onSortChange,
  totalFiltered,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            id="bloodGroup"
            value={selectedBloodGroup}
            onChange={(e) => onBloodGroupChange(e.target.value)}
            className="filter-select"
          >
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="citySearch">Search by City</label>
          <input
            id="citySearch"
            type="text"
            placeholder="e.g. Mumbai..."
            value={citySearch}
            onChange={(e) => onCitySearchChange(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group checkbox-group">
          <label htmlFor="sortAvail" className="checkbox-label">
            <input
              id="sortAvail"
              type="checkbox"
              checked={sortByAvailability}
              onChange={(e) => onSortChange(e.target.checked)}
            />
            Sort by Availability
          </label>
        </div>
      </div>

      <p className="filter-result-count">
        Showing <strong>{totalFiltered}</strong> donor{totalFiltered !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default FilterBar;